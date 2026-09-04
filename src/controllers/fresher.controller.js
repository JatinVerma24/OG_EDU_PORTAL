const fs = require('fs');
const path = require('path');
const { success, error } = require('../utils/response');
const checklistService = require('../services/checklist.service');

const dataPath = path.join(__dirname, '..', '..', 'data.json');

// Load static programmes once synchronously on initialization
let programmes = [];
try {
    if (fs.existsSync(dataPath)) {
        programmes = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        console.log(`FresherController: Loaded ${programmes.length} programmes successfully.`);
    } else {
        console.error("FresherController: data.json not found in root!");
    }
} catch (err) {
    console.error("FresherController: Failed to parse data.json:", err.message);
}

class FresherController {
    getProgrammes(req, res) {
        return success(res, 'Programmes list retrieved successfully', programmes);
    }

    async getChecklist(req, res) {
        const { studentId } = req.params;
        try {
            const data = await checklistService.getChecklist(studentId);
            return success(res, 'Student checklist retrieved successfully', data);
        } catch (err) {
            return error(res, 'Failed to fetch student checklist', err, 500);
        }
    }

    async saveChecklist(req, res) {
        const { studentId } = req.params;
        const { checklist } = req.body;
        try {
            const data = await checklistService.saveChecklist(studentId, checklist);
            return success(res, 'Student checklist saved successfully', data);
        } catch (err) {
            return error(res, 'Failed to save student checklist', err, 500);
        }
    }
}

module.exports = new FresherController();
