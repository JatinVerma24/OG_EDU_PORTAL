const { error } = require('../utils/response');

function errorHandler(err, req, res, next) {
    console.error('Unhandled Server Error:', err.stack || err.message || err);
    
    const statusCode = err.status || 500;
    return error(res, err.message || 'Internal Server Error', err, statusCode);
}

function notFoundHandler(req, res, next) {
    if (req.path.startsWith('/api/')) {
        return error(res, `API Route not found: ${req.method} ${req.path}`, null, 404);
    }
    next();
}

module.exports = {
    errorHandler,
    notFoundHandler
};
