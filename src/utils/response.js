/**
 * Standard API response layout helper conforming to enterprise patterns:
 * { success, message, data, error }
 */

exports.success = (res, message, data = {}, status = 200) => {
    return res.status(status).json({
        success: true,
        message,
        data,
        error: null
    });
};

exports.error = (res, message, error = null, status = 500) => {
    return res.status(status).json({
        success: false,
        message,
        data: null,
        error: error ? (error.message || error.toString() || error) : null
    });
};
