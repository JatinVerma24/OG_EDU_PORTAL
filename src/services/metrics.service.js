const promClient = require('prom-client');

// Create a custom registry
const register = new promClient.Registry();

// Enable default system metrics (CPU, Memory, event loop lag, etc.)
promClient.collectDefaultMetrics({ register });

// ── CUSTOM METRICS DEFINITIONS ──────────────────────────────────────────────

const httpRequestCounter = new promClient.Counter({
    name: 'http_request_count_total',
    help: 'Total number of HTTP requests processed',
    labelNames: ['method', 'route', 'status_code'],
});

const httpRequestDuration = new promClient.Histogram({
    name: 'http_request_duration_seconds',
    help: 'HTTP request duration in seconds',
    labelNames: ['method', 'route', 'status_code'],
    buckets: [0.05, 0.1, 0.3, 0.5, 1, 1.5, 2.5, 5, 10] // Latency buckets
});

const geminiLatencyHistogram = new promClient.Histogram({
    name: 'gemini_api_latency_seconds',
    help: 'Gemini API call response time latency',
    labelNames: ['status'],
    buckets: [0.2, 0.5, 1, 2, 3, 5, 10, 15]
});

const scraperLatencyHistogram = new promClient.Histogram({
    name: 'scraper_latency_seconds',
    help: 'Web scraper target fetch response latency',
    labelNames: ['sem', 'code', 'status'],
    buckets: [0.2, 0.5, 1, 2, 3, 5, 8, 12]
});

const dbResponseTimeHistogram = new promClient.Histogram({
    name: 'database_response_latency_seconds',
    help: 'MongoDB query response latency',
    labelNames: ['operation', 'model', 'status'],
    buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2]
});

const activeUsersGauge = new promClient.Gauge({
    name: 'active_users_current',
    help: 'Current active user sessions'
});

// Register custom metrics
register.registerMetric(httpRequestCounter);
register.registerMetric(httpRequestDuration);
register.registerMetric(geminiLatencyHistogram);
register.registerMetric(scraperLatencyHistogram);
register.registerMetric(dbResponseTimeHistogram);
register.registerMetric(activeUsersGauge);

module.exports = {
    register,
    httpRequestCounter,
    httpRequestDuration,
    geminiLatencyHistogram,
    scraperLatencyHistogram,
    dbResponseTimeHistogram,
    activeUsersGauge
};
