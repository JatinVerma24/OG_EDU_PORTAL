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

// CORS Configuration
app.use(cors({
    origin: true,
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

// Route to clear all cookies, localStorage, and unregister Service Workers
app.get('/clear-data', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Clearing Cache...</title>
            <style>
                body {
                    background-color: #030712;
                    color: #f9fafb;
                    font-family: sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    text-align: center;
                }
                .loader {
                    border: 4px solid rgba(255,255,255,0.1);
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    border-left-color: #f97316;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 20px;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                h3 { margin-bottom: 8px; font-weight: 600; }
                p { color: #9ca3af; font-size: 0.9rem; }
            </style>
        </head>
        <body>
            <div>
                <div class="loader"></div>
                <h3>Clearing Cookies & Site Data...</h3>
                <p>Please wait, you will be redirected shortly.</p>
            </div>
            <script>
                // Clear localStorage
                localStorage.clear();
                // Clear sessionStorage
                sessionStorage.clear();
                // Delete all cookies
                document.cookie.split(";").forEach(function(c) { 
                    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
                });
                
                // Unregister all Service Workers to force update of old cached PWA files
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function(registrations) {
                        for(let registration of registrations) {
                            registration.unregister();
                        }
                    });
                }
                
                // Redirect back to landing selector page
                setTimeout(() => {
                    window.location.href = '/';
                }, 1200);
            </script>
        </body>
        </html>
    `);
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

// Serve Next.js static assets (_next)
app.use('/_next', express.static(path.join(__dirname, '.next')));

// OGEDU YouTube Study Hub Routes
app.get(['/youtube-study-hub', '/youtube-study-hub/'], (req, res) => {
    const hubFile = path.join(__dirname, '.next', 'server', 'app', 'youtube-study-hub.html');
    if (fs.existsSync(hubFile)) {
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
    const hubFile = path.join(__dirname, '.next', 'server', 'app', 'youtube-study-hub.html');
    if (fs.existsSync(hubFile)) {
        return res.sendFile(hubFile);
    }
    res.status(404).send('Subject page not found');
});

app.get('/youtube-study-hub/*', (req, res) => {
    const hubFile = path.join(__dirname, '.next', 'server', 'app', 'youtube-study-hub.html');
    if (fs.existsSync(hubFile)) {
        return res.sendFile(hubFile);
    }
    res.status(404).send('Page not found');
});

// Root fallback to landing page index.html
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(__dirname, 'landing', 'index.html'));
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
