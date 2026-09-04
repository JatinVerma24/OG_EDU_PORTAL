const { httpRequestCounter, httpRequestDuration } = require('../services/metrics.service');

function metricsMiddleware(req, res, next) {
    // Skip static assets and resource queries to keep metrics clean
    if (req.path.includes('.') || req.path.startsWith('/fresher') || req.path.startsWith('/senior')) {
        return next();
    }

    const start = process.hrtime();

    // Hook response close/finish event
    res.on('finish', () => {
        const diff = process.hrtime(start);
        const durationSeconds = diff[0] + diff[1] / 1e9;
        
        // Find matching route or fallback to URL pathname
        const route = req.route ? req.route.path : req.path;
        const method = req.method;
        const status = String(res.statusCode);

        // Record metrics
        httpRequestCounter.inc({ method, route, status_code: status });
        httpRequestDuration.observe({ method, route, status_code: status }, durationSeconds);
    });

    next();
}

module.exports = {
    metricsMiddleware
};
