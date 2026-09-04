const express = require('express');
const diagnosticController = require('../controllers/diagnostic.controller');
const { register } = require('../services/metrics.service');

const router = express.Router();

router.get('/db-status', diagnosticController.getDbStatus);
router.get('/health', diagnosticController.getHealth);
router.get('/live', diagnosticController.getLive);
router.get('/ready', diagnosticController.getReady);

// Expose Prometheus metrics endpoint
router.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        res.status(500).end(err.message || err.toString());
    }
});

module.exports = router;
