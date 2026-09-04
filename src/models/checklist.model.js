const mongoose = require('mongoose');

const checklistSchema = new mongoose.Schema({
    studentId: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        index: true // Ensure fast $O(1)$ lookups on studentId
    },
    checklist: {
        type: Map,
        of: Boolean,
        default: {}
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Checklist', checklistSchema);
