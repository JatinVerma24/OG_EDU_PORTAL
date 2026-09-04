const rateLimit = require('express-rate-limit');
const { error } = require('../utils/response');

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per window
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        return error(res, 'Too many requests from this IP, please try again after 15 minutes', null, 429);
    }
});

const chatLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 chatbot requests per minute
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        return error(res, 'Too many chatbot requests, please wait 1 minute before sending more queries', null, 429);
    }
});

module.exports = {
    apiLimiter,
    chatLimiter
};
