const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

// Add index to speed up resource category queries
resourceSchema.index({ category: 1 });

module.exports = mongoose.model('Resource', resourceSchema);
