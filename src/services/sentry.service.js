const Sentry = require('@sentry/node');

function initSentry(app) {
    const dsn = process.env.SENTRY_DSN;
    
    if (!dsn) {
        console.log('SentryService: SENTRY_DSN is not configured. Skipping Sentry initialization.');
        return;
    }

    try {
        Sentry.init({
            dsn,
            environment: process.env.NODE_ENV || 'development',
            tracesSampleRate: 1.0, // Capture 100% of transactions for performance monitoring
        });
        
        console.log('SentryService: Sentry initialized successfully.');
        
        // Sentry RequestHandler must be the first middleware on the app
        app.use(Sentry.Handlers.requestHandler());
        
        // Sentry TracingHandler creates a trace for every incoming request
        app.use(Sentry.Handlers.tracingHandler());
    } catch (err) {
        console.error('SentryService: Failed to initialize Sentry:', err.message);
    }
}

function handleErrors(app) {
    if (process.env.SENTRY_DSN) {
        // Sentry error handler must be before any other error middleware
        app.use(Sentry.Handlers.errorHandler());
        console.log('SentryService: Sentry Error Handler middleware registered.');
    }
}

module.exports = {
    initSentry,
    handleErrors
};
