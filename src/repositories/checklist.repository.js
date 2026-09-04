const Checklist = require('../models/checklist.model');

class ChecklistRepository {
    async findByStudentId(studentId) {
        return await Checklist.findOne({ studentId: studentId.trim().toUpperCase() });
    }

    async upsert(studentId, checklist) {
        const cleanStudentId = studentId.trim().toUpperCase();
        return await Checklist.findOneAndUpdate(
            { studentId: cleanStudentId },
            { checklist },
            { new: true, upsert: true }
        );
    }
}

module.exports = new ChecklistRepository();
