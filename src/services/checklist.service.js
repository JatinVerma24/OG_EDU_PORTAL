const checklistRepository = require('../repositories/checklist.repository');

class ChecklistService {
    async getChecklist(studentId) {
        if (!studentId) {
            throw new Error('Student ID is required');
        }
        
        const doc = await checklistRepository.findByStudentId(studentId);
        return {
            studentId: studentId.toUpperCase(),
            checklist: doc ? doc.checklist : {}
        };
    }

    async saveChecklist(studentId, checklist) {
        if (!studentId) {
            throw new Error('Student ID is required');
        }
        if (!checklist) {
            throw new Error('Checklist data is required');
        }

        const doc = await checklistRepository.upsert(studentId, checklist);
        return {
            studentId: doc.studentId,
            checklist: doc.checklist
        };
    }
}

module.exports = new ChecklistService();
