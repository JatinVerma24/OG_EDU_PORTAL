async function authenticateToken(req, res, next) {
    req.user = null;
    next();
}

module.exports = {
    authenticateToken
};
