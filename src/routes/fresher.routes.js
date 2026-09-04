const express = require('express');
const fresherController = require('../controllers/fresher.controller');
const { studentIdCheck } = require('../validators/request.validator');
const { cacheMiddleware } = require('../middleware/cache.middleware');

const router = express.Router();

router.get('/programmes', cacheMiddleware(3600), fresherController.getProgrammes);

router.get('/checklists/:studentId', studentIdCheck, fresherController.getChecklist);
router.post('/checklists/:studentId', studentIdCheck, fresherController.saveChecklist);

module.exports = router;
