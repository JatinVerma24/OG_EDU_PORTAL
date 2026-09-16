const express = require('express');
const diagnosticController = require('../controllers/diagnostic.controller');
const { register } = require('../services/metrics.service');

const router = express.Router();

router.get('/db-status', diagnosticController.getDbStatus);
router.get('/health', diagnosticController.getHealth);
router.get('/live', diagnosticController.getLive);
router.get('/ready', diagnosticController.getReady);

// Expose Prometheus metrics endpoint with authorization
router.get('/metrics', async (req, res) => {
    const adminToken = req.headers['x-admin-token'] || req.query.token;
    const requiredToken = process.env.ADMIN_METRICS_TOKEN;

    // Block unauthenticated metrics access in production
    if (process.env.NODE_ENV === 'production' && (!requiredToken || adminToken !== requiredToken)) {
        return res.status(403).json({ error: 'Access forbidden: unauthorized metrics collection.' });
    }

    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (err) {
        res.status(500).end(err.message || err.toString());
    }
});

module.exports = router;
