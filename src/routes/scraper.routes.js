const express = require('express');
const scraperController = require('../controllers/scraper.controller');
const { cacheMiddleware } = require('../middleware/cache.middleware');

const router = express.Router();

router.get('/lpu-notes/catalog', cacheMiddleware(3600), scraperController.getCatalog);
router.get('/lpu-notes/subject', cacheMiddleware(3600), scraperController.getSubjectUnits);
router.get('/lpu-notes/notes', cacheMiddleware(3600), scraperController.getUnitNotes);
router.get('/lpu-notes/mcq', cacheMiddleware(3600), scraperController.getUnitMCQ);

module.exports = router;
