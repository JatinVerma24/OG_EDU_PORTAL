require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
const admin = require('firebase-admin');

// Initialize Firebase Admin
if (!admin.apps.length) {
    admin.initializeApp({
        projectId: process.env.FIREBASE_PROJECT_ID || 'ogedu-portal'
    });
}

// Middleware to authenticate Firebase tokens
async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        req.user = null;
        return next();
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Error verifying Firebase token:', error);
        req.user = null;
        next();
    }
}

app.use(authenticateToken);

// Helper logic for passing criteria
function checkResult(data) {
    const {
        attendance = { obtained: 0, max: 0 },
        ca = { obtained: 0, max: 0 },
        mte = { obtained: 0, max: 0 },
        ete = { obtained: 0, max: 0 },
        subjectType = 'theory',
        examType = 'regular'
    } = data;

    const etePercent = ete.max > 0 ? (ete.obtained / ete.max) * 100 : 0;
    const combinedObtained = mte.obtained + ete.obtained;
    const combinedMax = mte.max + ete.max;
    const combinedPercent = combinedMax > 0 ? (combinedObtained / combinedMax) * 100 : 0;

    let rule1Passed = false;
    let rule1Reason = "";

    if (examType === 'reappear') {
        if (combinedPercent >= 30) {
            rule1Passed = true;
            rule1Reason = `Combined MTE+ETE is ${combinedPercent.toFixed(1)}% (Min 30%)`;
        } else {
            rule1Reason = `Combined MTE+ETE is ${combinedPercent.toFixed(1)}% (Min 30% required)`;
        }
    } else {
        if (etePercent >= 30) {
            rule1Passed = true;
            rule1Reason = `ETE is ${etePercent.toFixed(1)}% (>= 30%)`;
        } else if (combinedPercent >= 30) {
            rule1Passed = true;
            rule1Reason = `ETE < 30% but Combined (MTE+ETE) is ${combinedPercent.toFixed(1)}% (>= 30%)`;
        } else {
            rule1Reason = `ETE is ${etePercent.toFixed(1)}% and Combined (MTE+ETE) is ${combinedPercent.toFixed(1)}%. Neither met 30%.`;
        }
    }

    const totalObtained = attendance.obtained + ca.obtained + mte.obtained + ete.obtained;
    const totalMax = attendance.max + ca.max + mte.max + ete.max;
    const overallPercent = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;

    let rule2Passed = false;
    let rule2Reason = "";

    if (overallPercent >= 40) {
        rule2Passed = true;
        rule2Reason = `Overall Score is ${overallPercent.toFixed(1)}% (>= 40%)`;
    } else {
        rule2Reason = `Overall Score is ${overallPercent.toFixed(1)}% (Min 40% required)`;
    }

    const isPassed = rule1Passed && rule2Passed;

    return {
        status: isPassed ? 'PASS' : 'FAIL',
        details: {
            rule1: {
                passed: rule1Passed,
                description: "Min Marks Criteria (30%)",
                reason: rule1Reason
            },
            rule2: {
                passed: rule2Passed,
                description: "Overall Weightage Criteria (40%)",
                reason: rule2Reason,
                score: overallPercent.toFixed(1)
            }
        }
    };
}

app.post('/api/check', (req, res) => {
    try {
        const result = checkResult(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/me', async (req, res) => {
    if (!req.user) {
        return res.json({
            id: null,
            email: null,
            firstName: 'Guest',
            lastName: '',
            imageUrl: null,
            createdAt: null,
        });
    }

    return res.json({
        id: req.user.uid,
        email: req.user.email,
        firstName: req.user.name ? req.user.name.split(' ')[0] : (req.user.email ? req.user.email.split('@')[0] : 'User'),
        lastName: req.user.name ? req.user.name.split(' ').slice(1).join(' ') : '',
        imageUrl: req.user.picture || null,
        createdAt: req.user.auth_time,
    });
});

app.get('/api/auth-status', (req, res) => {
    return res.json({ 
        authenticated: !!req.user, 
        userId: req.user ? req.user.uid : null 
    });
});

// ── Subject Resources: Notes API ─────────────────────────────────────────────
const NOTES_DIR = path.join(__dirname, '..', 'notes');

const UNIT_META = [
    { id: 'unit1', file: 'Unit1_C_Basics.md',                 title: 'C Basics & Introduction',      icon: '🚀', color: '#6c3fe8' },
    { id: 'unit2', file: 'Unit2_Control_Structures.md',       title: 'Control Structures',            icon: '🔀', color: '#0ea5e9' },
    { id: 'unit3', file: 'Unit3_Functions_StorageClasses.md', title: 'Functions & Storage Classes',   icon: '⚙️', color: '#10b981' },
    { id: 'unit4', file: 'Unit4_Arrays.md',                   title: 'Arrays',                        icon: '📦', color: '#f59e0b' },
    { id: 'unit5', file: 'Unit5_Pointers_Strings.md',         title: 'Pointers & Strings',            icon: '🎯', color: '#ef4444' },
    { id: 'unit6', file: 'Unit6_Structures_Unions.md',        title: 'Structures & Unions',           icon: '🏗️', color: '#8b5cf6' },
    { id: 'unit7', file: 'Unit7_CPP_Basics.md',               title: 'C++ Basics',                   icon: '⚡', color: '#ec4899' },
];

app.get('/api/notes', (req, res) => {
    const units = UNIT_META.map(u => ({ id: u.id, title: u.title, icon: u.icon, color: u.color, file: u.file }));
    res.json({ units });
});

app.get('/api/notes/:unitId', (req, res) => {
    const unit = UNIT_META.find(u => u.id === req.params.unitId);
    if (!unit) return res.status(404).json({ error: 'Unit not found' });
    const filePath = path.join(NOTES_DIR, unit.file);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'File not found on disk' });
    const content = fs.readFileSync(filePath, 'utf-8');
    res.json({ id: unit.id, title: unit.title, icon: unit.icon, color: unit.color, content });
});

// ── Serve Frontend Statically ────────────────────────────────────────────────
const distPath = path.join(__dirname, '../client/dist');
app.use(express.static(distPath));

app.get(/.*/, (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    
    if (req.path === '/auth.html') {
        res.sendFile(path.join(distPath, 'auth.html'));
    } else if (req.path === '/dashboard.html') {
        res.sendFile(path.join(distPath, 'dashboard.html'));
    } else {
        res.sendFile(path.join(distPath, 'index.html'));
    }
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

module.exports = app;
