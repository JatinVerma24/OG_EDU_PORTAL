const express = require('express');
const chatController = require('../controllers/chat.controller');
const { chatLimiter } = require('../middleware/rateLimiter.middleware');

const router = express.Router();

router.post('/chat', chatLimiter, chatController.handleChat);

module.exports = router;
