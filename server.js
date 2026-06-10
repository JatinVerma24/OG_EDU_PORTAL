const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dns = require('dns');

// Use Google DNS to bypass local SRV lookup resolution issues (ECONNREFUSED)
dns.setServers(['8.8.8.8', '8.8.4.4']);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB Atlas Connection
const MONGO_URI = 'mongodb+srv://OGEDUPORTAL:RJKanchan%40%262068@cluster0.ythy8bs.mongodb.net/ogedu_portal?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas successfully.'))
    .catch(err => console.error('MongoDB Atlas connection error:', err));

// Checklist Mongoose Schema
const checklistSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true, uppercase: true, trim: true },
    checklist: { type: Map, of: Boolean, default: {} }
}, { timestamps: true });

const Checklist = mongoose.model('Checklist', checklistSchema);

// Paths
const dataPath = path.join(__dirname, 'data.json');
const NOTES_DIR = path.join(__dirname, 'senior_portal', 'notes');

// Load static programmes data
let programmes = [];
try {
    if (fs.existsSync(dataPath)) {
        programmes = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        console.log(`Loaded ${programmes.length} programmes from data.json`);
    } else {
        console.error("data.json not found in root!");
    }
} catch (err) {
    console.error("Failed to parse data.json:", err);
}

// ── FRESHERS PORTAL ENDPOINTS ───────────────────────────────────────────────

// API: Get all programmes
app.get('/api/programmes', (req, res) => {
    res.json(programmes);
});

// API: Get student checklist
app.get('/api/checklists/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId.trim().toUpperCase();
        if (!studentId) {
            return res.status(400).json({ error: "Student ID is required" });
        }
        
        const doc = await Checklist.findOne({ studentId });
        res.json({ studentId, checklist: doc ? doc.checklist : {} });
    } catch (err) {
        console.error("Error reading checklist from MongoDB:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// API: Save student checklist
app.post('/api/checklists/:studentId', async (req, res) => {
    try {
        const studentId = req.params.studentId.trim().toUpperCase();
        const { checklist } = req.body;
        
        if (!studentId) {
            return res.status(400).json({ error: "Student ID is required" });
        }
        if (!checklist) {
            return res.status(400).json({ error: "Checklist state is required" });
        }
        
        const doc = await Checklist.findOneAndUpdate(
            { studentId },
            { checklist },
            { new: true, upsert: true }
        );
        
        res.json({ success: true, studentId, checklist: doc.checklist });
    } catch (err) {
        console.error("Error writing checklist to MongoDB:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// ── SENIORS PORTAL ENDPOINTS ────────────────────────────────────────────────

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

app.get('/api/me', (req, res) => {
    // Return standard guest session for unified local deployment
    return res.json({
        id: null,
        email: null,
        firstName: 'Guest',
        lastName: '',
        imageUrl: null,
        createdAt: null,
    });
});

app.get('/api/auth-status', (req, res) => {
    // Return standard authenticated: false to trigger guest flow or sign in redirect
    return res.json({ 
        authenticated: false, 
        userId: null 
    });
});

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

// ── STATIC FILE SERVING & ROUTING ───────────────────────────────────────────

// Serve landing page at /
app.use(express.static(path.join(__dirname, 'landing')));

// Serve Freshers Portal compiled app at /fresher/
app.use('/fresher', express.static(path.join(__dirname, 'frontend', 'dist')));

// Serve Seniors Portal compiled app at /senior/
app.use('/senior', express.static(path.join(__dirname, 'senior_portal', 'client', 'dist')));

// SPA Wildcard routing for Freshers
app.get('/fresher/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

// SPA / Multi-page routing for Seniors
app.get('/senior/*', (req, res) => {
    const subpath = req.params[0] || '';
    const distPath = path.join(__dirname, 'senior_portal', 'client', 'dist');

    if (subpath === 'auth.html' || req.path === '/senior/auth.html') {
        res.sendFile(path.join(distPath, 'auth.html'));
    } else if (subpath === 'dashboard.html' || req.path === '/senior/dashboard.html') {
        res.sendFile(path.join(distPath, 'dashboard.html'));
    } else {
        res.sendFile(path.join(distPath, 'index.html'));
    }
});

// Root fallback to landing page index.html
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api/')) return next();
    res.sendFile(path.join(__dirname, 'landing', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Express server running on http://localhost:${PORT}`);
});
