const geminiService = require('../services/gemini.service');
const { success, error } = require('../utils/response');

class ChatController {
    async handleChat(req, res) {
        const { message, history } = req.body;
        
        if (!message || message.trim() === '') {
            return error(res, 'Message query string cannot be empty', null, 400);
        }

        try {
            const reply = await geminiService.chat(message, history || []);
            return success(res, 'Chat response generated successfully', reply);
        } catch (err) {
            return error(res, 'AI chatbot handler error', err, 500);
        }
    }
}

module.exports = new ChatController();
