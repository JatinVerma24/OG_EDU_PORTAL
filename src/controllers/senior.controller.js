const fs = require('fs').promises;
const path = require('path');
const { success, error } = require('../utils/response');
const academicService = require('../services/academic.service');
const feedbackRepository = require('../repositories/feedback.repository');

const NOTES_DIR = path.join(__dirname, '..', '..', 'senior_portal', 'notes');

const UNIT_META = [
    { id: 'unit1', file: 'Unit1_C_Basics.md',                 title: 'C Basics & Introduction',      icon: '🚀', color: '#6c3fe8' },
    { id: 'unit2', file: 'Unit2_Control_Structures.md',       title: 'Control Structures',            icon: '🔀', color: '#0ea5e9' },
    { id: 'unit3', file: 'Unit3_Functions_StorageClasses.md', title: 'Functions & Storage Classes',   icon: '⚙️', color: '#10b981' },
    { id: 'unit4', file: 'Unit4_Arrays.md',                   title: 'Arrays',                        icon: '📦', color: '#f59e0b' },
    { id: 'unit5', file: 'Unit5_Pointers_Strings.md',         title: 'Pointers & Strings',            icon: '🎯', color: '#ef4444' },
    { id: 'unit6', file: 'Unit6_Structures_Unions.md',        title: 'Structures & Unions',           icon: '🏗️', color: '#8b5cf6' },
    { id: 'unit7', file: 'Unit7_CPP_Basics.md',               title: 'C++ Basics',                   icon: '⚡', color: '#ec4899' },
];

class SeniorController {
    checkPassingCriteria(req, res) {
        try {
            const result = academicService.evaluatePassingCriteria(req.body);
            return success(res, 'Passing criteria check completed', result);
        } catch (err) {
            return error(res, 'Failed to check passing criteria', err, 500);
        }
    }

    async submitFeedback(req, res) {
        try {
            const { name, email, score, message } = req.body;
            const newFeedback = await feedbackRepository.create({ name, email, score, message });
            return success(res, 'Feedback submitted successfully', newFeedback, 201);
        } catch (err) {
            return error(res, 'Failed to save feedback data', err, 500);
        }
    }

    async getMe(req, res) {
        // Reads authenticated user info set by Firebase middleware
        if (!req.user) {
            return success(res, 'Guest user session returned', {
                id: null,
                email: null,
                firstName: 'Guest',
                lastName: '',
                imageUrl: null,
                createdAt: null,
            });
        }

        return success(res, 'User session retrieved', {
            id: req.user.uid,
            email: req.user.email,
            firstName: req.user.name ? req.user.name.split(' ')[0] : (req.user.email ? req.user.email.split('@')[0] : 'User'),
            lastName: req.user.name ? req.user.name.split(' ').slice(1).join(' ') : '',
            imageUrl: req.user.picture || null,
            createdAt: req.user.auth_time,
        });
    }

    getAuthStatus(req, res) {
        return success(res, 'Auth status verified', {
            authenticated: !!req.user,
            userId: req.user ? req.user.uid : null
        });
    }

    getNotesUnits(req, res) {
        const units = UNIT_META.map(u => ({ id: u.id, title: u.title, icon: u.icon, color: u.color, file: u.file }));
        return success(res, 'C/C++ units metadata retrieved', { units });
    }

    async getUnitNotesContent(req, res) {
        const { unitId } = req.params;
        const unit = UNIT_META.find(u => u.id === unitId);
        if (!unit) {
            return error(res, 'Requested unit not found', null, 404);
        }
        
        const filePath = path.join(NOTES_DIR, unit.file);
        
        try {
            await fs.access(filePath);
        } catch {
            return error(res, 'Course markdown file not found on disk', null, 404);
        }

        try {
            const content = await fs.readFile(filePath, 'utf-8');
            return success(res, 'Notes content loaded successfully', {
                id: unit.id,
                title: unit.title,
                icon: unit.icon,
                color: unit.color,
                content
            });
        } catch (err) {
            return error(res, 'Failed to read notes content from disk', err, 500);
        }
    }

    async getResources(req, res) {
        try {
            const resources = await academicService.getResources();
            return success(res, 'Resources list retrieved successfully', resources);
        } catch (err) {
            return error(res, 'Failed to retrieve academic resources', err, 500);
        }
    }
}

module.exports = new SeniorController();
