require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const mongoSanitize = require('mongo-sanitize');
const dns = require('dns');
const path = require('path');
const fs = require('fs');

const logger = require('./src/config/logger');
const { connectDB } = require('./src/config/db.config');
const redisConfig = require('./src/config/redis.config');
const sentryService = require('./src/services/sentry.service');
const { metricsMiddleware } = require('./src/middleware/metrics.middleware');
const { apiLimiter } = require('./src/middleware/rateLimiter.middleware');
const { authenticateToken } = require('./src/middleware/auth.middleware');
const { errorHandler, notFoundHandler } = require('./src/middleware/error.middleware');



const app = express();
const PORT = process.env.PORT || 5000;

// Trust reverse proxy (Vercel, Cloudflare) for accurate client IP identification in rate limiters
app.set('trust proxy', 1);

// Initialize Sentry Tracking middleware at the very top of request stream
sentryService.initSentry(app);

// Connect to Redis in the background
redisConfig.initRedis();

// ── SECURITY & PERFORMANCE MIDDLEWARE ────────────────────────────────────────

// Helmet for secure HTTP headers
app.use(helmet({
    contentSecurityPolicy: false, // Enable static assets loading from third parties
    crossOriginEmbedderPolicy: false
}));

// Whitelist allowed origins for CORS (blocks arbitrary third-party origins)
const ALLOWED_ORIGINS = [
    'https://ogedu-portal.vercel.app',
    'https://ogedu-ai.vercel.app',
    'http://localhost:5000',
    'http://localhost:3000',
    'http://127.0.0.1:5000',
    'http://127.0.0.1:3000'
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps, curl, or same-origin requests)
        if (!origin) return callback(null, true);

        const isAllowed = ALLOWED_ORIGINS.includes(origin) ||
            /^https:\/\/ogedu-[a-z0-9]+-jatinverma1\.vercel\.app$/.test(origin) ||
            /^https:\/\/[a-z0-9-]+\.vercel\.app$/.test(origin);

        if (isAllowed) {
            return callback(null, true);
        }
        return callback(new Error('Blocked by OGEDU CORS Security Policy'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Gzip Compression
app.use(compression());

// Prometheus Metrics request tracing middleware
app.use(metricsMiddleware);

// Parse requests
app.use(express.json());

// Prevent NoSQL Query Injections
app.use((req, res, next) => {
    req.body = mongoSanitize(req.body);
    req.query = mongoSanitize(req.query);
    req.params = mongoSanitize(req.params);
    next();
});

// Mount Rate Limiting on API endpoints
app.use('/api/', apiLimiter);

// Firebase JWT Token Authentication middleware
app.use('/api/', authenticateToken);

// Connect to MongoDB Atlas (triggered in background)
connectDB().catch(() => {});

// ── API ROUTES ──────────────────────────────────────────────────────────────

app.use('/api', require('./src/routes/diagnostic.routes'));
app.use('/api', require('./src/routes/fresher.routes'));
app.use('/api', require('./src/routes/senior.routes'));
app.use('/api', require('./src/routes/scraper.routes'));
app.use('/api', require('./src/routes/chat.routes'));
app.use('/api', require('./src/routes/youtube.routes'));

// ── UTILITY WEB ROUTES ──────────────────────────────────────────────────────

// Secure Route to clear cookies, localStorage, and unregister Service Workers upon explicit confirmation
app.get('/clear-data', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Reset Browser Cache | OGEDU AI</title>
            <style>
                body {
                    background-color: #030712;
                    color: #f9fafb;
                    font-family: system-ui, -apple-system, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    margin: 0;
                    padding: 16px;
                }
                .card {
                    background: #111827;
                    border: 1px solid #1f2937;
                    border-radius: 16px;
                    padding: 32px;
                    max-width: 440px;
                    width: 100%;
                    text-align: center;
                    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.5);
                }
                .icon-box {
                    width: 54px;
                    height: 54px;
                    background: rgba(239, 68, 68, 0.15);
                    border: 1px solid rgba(239, 68, 68, 0.3);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px;
                    font-size: 24px;
                }
                h2 { font-size: 1.25rem; font-weight: 700; margin: 0 0 8px; color: #ffffff; }
                p { color: #9ca3af; font-size: 0.875rem; line-height: 1.5; margin: 0 0 24px; }
                .btn-group { display: flex; gap: 12px; }
                .btn {
                    flex: 1;
                    padding: 10px 16px;
                    border-radius: 10px;
                    font-size: 0.875rem;
                    font-weight: 600;
                    cursor: pointer;
                    text-decoration: none;
                    transition: all 0.2s;
                    border: none;
                }
                .btn-danger {
                    background: #dc2626;
                    color: #ffffff;
                }
                .btn-danger:hover { background: #b91c1c; }
                .btn-secondary {
                    background: #1f2937;
                    color: #d1d5db;
                }
                .btn-secondary:hover { background: #374151; }
                .status-box { display: none; margin-top: 16px; color: #10b981; font-size: 0.875rem; font-weight: 500; }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="icon-box">⚠️</div>
                <h2>Reset Application Cache?</h2>
                <p>This action will clear locally stored checklists, offline session tokens, and cached Service Worker files. Click confirm to proceed.</p>
                <div class="btn-group" id="btnGroup">
                    <a href="/" class="btn btn-secondary">Cancel</a>
                    <button id="confirmBtn" class="btn btn-danger" onclick="executeClear()">Confirm Reset</button>
                </div>
                <div class="status-box" id="statusBox">
                    <span>Cache cleared successfully! Redirecting...</span>
                </div>
            </div>
            <script>
                function executeClear() {
                    const btnGroup = document.getElementById('btnGroup');
                    const statusBox = document.getElementById('statusBox');
                    btnGroup.style.display = 'none';
                    statusBox.style.display = 'block';

                    try { localStorage.clear(); } catch(e) {}
                    try { sessionStorage.clear(); } catch(e) {}
                    try {
                        document.cookie.split(";").forEach(function(c) { 
                            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                        });
                    } catch(e) {}

                    if ('serviceWorker' in navigator) {
                        navigator.serviceWorker.getRegistrations().then(function(registrations) {
                            for(let registration of registrations) {
                                registration.unregister();
                            }
                        });
                    }

                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1200);
                }
            </script>
        </body>
        </html>
    `);
});

// ── DEDICATED COMPLIANCE & TOOL ROUTES ───────────────────────────────────────

// Google AdSense crawler verification
app.get('/ads.txt', (req, res) => {
    res.type('text/plain; charset=utf-8');
    res.sendFile(path.join(__dirname, 'landing', 'ads.txt'));
});

// Legal and policy routes
app.get(['/privacy', '/privacy-policy', '/privacy.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'privacy.html'));
});
app.get(['/editorial-policy', '/editorial-policy.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'editorial-policy.html'));
});
app.get(['/about', '/about.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'about.html'));
});
app.get(['/contact', '/contact.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'contact.html'));
});
app.get(['/terms', '/terms.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'terms.html'));
});
app.get(['/disclaimer', '/disclaimer.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'disclaimer.html'));
});
app.get(['/cookie-policy', '/cookie-policy.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'cookie-policy.html'));
});
app.get(['/refund-policy', '/refund-policy.html'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'refund-policy.html'));
});

// Standalone Academic Tools
app.get(['/tools/cgpa-calculator', '/tools/cgpa-calculator/'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'tools', 'cgpa-calculator.html'));
});
app.get(['/tools/tgpa-calculator', '/tools/tgpa-calculator/'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'tools', 'tgpa-calculator.html'));
});
app.get(['/tools/pass-fail-checker', '/tools/pass-fail-checker/'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'tools', 'pass-fail-checker.html'));
});
app.get(['/tools/attendance-calculator', '/tools/attendance-calculator/'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'tools', 'attendance-calculator.html'));
});

// Blog & Guides Routes
app.get(['/blog', '/blog/'], (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'blog.html'));
});
app.get('/blog/:slug', (req, res, next) => {
    const safeSlug = req.params.slug.replace(/[^a-zA-Z0-9_-]/g, '');
    const slugFile = path.join(__dirname, 'landing', 'blog', `${safeSlug}.html`);
    if (fs.existsSync(slugFile)) {
        return res.sendFile(slugFile);
    }
    next();
});

// ── STATIC FILE SERVING & ROUTING ───────────────────────────────────────────

// Serve landing page at / with clean html route fallbacks
app.use(express.static(path.join(__dirname, 'landing'), { extensions: ['html', 'htm'] }));

// Serve Freshers Portal compiled app at /fresher/
app.use('/fresher', express.static(path.join(__dirname, 'frontend', 'dist')));

// Serve Seniors Portal compiled app at /senior/
app.use('/senior', express.static(path.join(__dirname, 'senior_portal', 'client', 'dist')));

// Serve Laptop Finder Portal at /findoglaptop/
app.use('/findoglaptop', express.static(path.join(__dirname, 'findoglaptop')));

// Serve CUET College Predictor at /cuet/
app.use('/cuet', express.static(path.join(__dirname, 'cuet')));

// Serve Python Notes course locally at /python-notes/
app.use('/python-notes', express.static(path.join(__dirname, 'python-notes')));


// SPA Wildcard routing for Freshers
app.get('/fresher/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// SPA / Multi-page routing for Seniors (Direct Dashboard access without authentication)
app.get(['/senior', '/senior/*'], (req, res) => {
    const distPath = path.join(__dirname, 'senior_portal', 'client', 'dist');
    res.sendFile(path.join(distPath, 'dashboard.html'));
});

// Wildcard routing for Laptop Finder
app.get('/findoglaptop/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'findoglaptop', 'index.html'));
});

// Wildcard routing for CUET
app.get('/cuet/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'cuet', 'index.html'));
});

// Wildcard routing for Python Notes course
app.get('/python-notes/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'python-notes', 'index.html'));
});

// First Year Resources Routes
app.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'resources.html'));
});
app.get('/resources/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'resources.html'));
});

// LPU Notes Routes
app.get('/lpu-notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'lpu_notes.html'));
});
app.get('/lpu-notes/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'lpu_notes.html'));
});

// Smart India Hackathon (SIH 2026) Master Guide Hub
app.get('/sih', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'sih.html'));
});
app.get('/sih-guide', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'sih.html'));
});
app.get('/sih/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'sih.html'));
});

// Serve Next.js static assets (_next) from landing or .next
app.use('/_next', express.static(path.join(__dirname, 'landing', '_next')), express.static(path.join(__dirname, '.next')));

// Helper to find the best available Study Hub pre-rendered HTML file
function getStudyHubHtmlFile() {
    const landingPath = path.join(__dirname, 'landing', 'youtube-study-hub.html');
    if (fs.existsSync(landingPath)) return landingPath;
    const nextPath = path.join(__dirname, '.next', 'server', 'app', 'youtube-study-hub.html');
    if (fs.existsSync(nextPath)) return nextPath;
    return null;
}

// OGEDU YouTube Study Hub Routes
app.get(['/youtube-study-hub', '/youtube-study-hub/'], (req, res) => {
    const hubFile = getStudyHubHtmlFile();
    if (hubFile) {
        return res.sendFile(hubFile);
    }
    res.status(404).send('YouTube Study Hub build not found. Please run next build.');
});

app.get('/youtube-study-hub/:course/:semester/:subjectCode', (req, res) => {
    const { course, semester, subjectCode } = req.params;
    const subjectFile = path.join(
        __dirname,
        '.next',
        'server',
        'app',
        'youtube-study-hub',
        course.toLowerCase(),
        semester.toLowerCase(),
        `${subjectCode.toLowerCase()}.html`
    );
    if (fs.existsSync(subjectFile)) {
        return res.sendFile(subjectFile);
    }
    const hubFile = getStudyHubHtmlFile();
    if (hubFile) {
        return res.sendFile(hubFile);
    }
    res.status(404).send('Subject page not found');
});

app.get('/youtube-study-hub/*', (req, res) => {
    const hubFile = getStudyHubHtmlFile();
    if (hubFile) {
        return res.sendFile(hubFile);
    }
    res.status(404).send('Page not found');
});

// Helper to find Midterm Survival Kit pre-rendered Next.js HTML files
function getMidtermHtmlFile(subpath = '') {
    const candidates = [
        path.join(__dirname, 'landing', 'midterm', subpath ? `${subpath}.html` : 'index.html'),
        path.join(__dirname, '.next', 'server', 'app', 'midterm', subpath ? `${subpath}.html` : 'index.html'),
        path.join(__dirname, '.next', 'server', 'app', 'midterm', subpath, 'page.html'),
        path.join(__dirname, '.next', 'server', 'app', subpath ? `midterm/${subpath}.html` : 'midterm.html')
    ];
    for (const candidate of candidates) {
        if (fs.existsSync(candidate)) return candidate;
    }
    return null;
}

// OGEDU Mid-Term Survival Kit 2026 Routes (Next.js)
app.get(['/midterm', '/midterm/'], (req, res) => {
    const hubFile = getMidtermHtmlFile('');
    if (hubFile) {
        return res.sendFile(hubFile);
    }
    res.status(404).send('Midterm Hub build not found. Please run next build.');
});

app.get('/midterm/:section', (req, res, next) => {
    const section = req.params.section.replace(/[^a-zA-Z0-9_-]/g, '');
    const sectionFile = getMidtermHtmlFile(section);
    if (sectionFile) {
        return res.sendFile(sectionFile);
    }
    const hubFile = getMidtermHtmlFile('');
    if (hubFile) {
        return res.sendFile(hubFile);
    }
    next();
});

app.get('/midterm/*', (req, res) => {
    const hubFile = getMidtermHtmlFile('');
    if (hubFile) {
        return res.sendFile(hubFile);
    }
    res.status(404).send('Midterm page not found');
});

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'landing', 'index.html'));
});

// 404 fallback for unhandled web routes
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    const notFoundFile = path.join(__dirname, 'landing', '404.html');
    if (fs.existsSync(notFoundFile)) {
        return res.status(404).sendFile(notFoundFile);
    }
    res.status(404).send('Page not found');
});

// ── ERROR & 404 MIDDLEWARE ──────────────────────────────────────────────────

// Sentry error handler registered before standard handlers
sentryService.handleErrors(app);

app.use(notFoundHandler);
app.use(errorHandler);

// Start Server
if (!process.env.VERCEL) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Master Server active at http://localhost:${PORT}`);
        logger.info(`Express server running on http://localhost:${PORT} under ${process.env.NODE_ENV || 'development'} mode`);
    });
}

module.exports = app;
