const Feedback = require('../models/feedback.model');

class FeedbackRepository {
    async create(data) {
        const feedback = new Feedback(data);
        return await feedback.save();
    }
}

module.exports = new FeedbackRepository();
