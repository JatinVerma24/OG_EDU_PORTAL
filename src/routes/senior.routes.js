const express = require('express');
const seniorController = require('../controllers/senior.controller');
const { checkPassingCheck, feedbackCheck } = require('../validators/request.validator');
const { cacheMiddleware } = require('../middleware/cache.middleware');

const router = express.Router();

router.post('/check', checkPassingCheck, seniorController.checkPassingCriteria);
router.post('/feedback', feedbackCheck, seniorController.submitFeedback);

router.get('/me', seniorController.getMe);
router.get('/auth-status', seniorController.getAuthStatus);

router.get('/notes', cacheMiddleware(3600), seniorController.getNotesUnits);
router.get('/notes/:unitId', cacheMiddleware(3600), seniorController.getUnitNotesContent);

router.get('/resources', seniorController.getResources);

module.exports = router;
