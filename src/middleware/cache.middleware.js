const redisConfig = require('../config/redis.config');

/**
 * Express middleware to cache GET requests in Redis.
 * Supports configurable TTL (default 1 hour).
 */
const cacheMiddleware = (ttlSeconds = 3600) => {
    return async (req, res, next) => {
        // Only cache GET requests
        if (req.method !== 'GET') {
            return next();
        }

        const redisStatus = redisConfig.getRedisStatus();
        if (!redisStatus.connected) {
            // If Redis is not connected, skip caching silently (fail-open SRE best practice)
            return next();
        }

        const cacheKey = `cache:${req.originalUrl}`;

        try {
            const cachedData = await redisConfig.client.get(cacheKey);
            if (cachedData) {
                // Add header to indicate cache HIT
                res.setHeader('X-Cache', 'HIT');
                return res.status(200).json(JSON.parse(cachedData));
            }

            // Cache MISS - hijack res.json to capture response
            res.setHeader('X-Cache', 'MISS');
            const originalJson = res.json;

            res.json = function (body) {
                // Restore original json method to send response
                res.json = originalJson;

                // Cache only successful JSON responses
                if (res.statusCode >= 200 && res.statusCode < 300 && body && body.success) {
                    redisConfig.client.setEx(cacheKey, ttlSeconds, JSON.stringify(body))
                        .catch(err => console.error('CacheMiddleware: Failed to write to Redis:', err.message));
                }

                return originalJson.call(this, body);
            };

            next();
        } catch (err) {
            console.error('CacheMiddleware: Error querying Redis cache:', err.message);
            next();
        }
    };
};

module.exports = {
    cacheMiddleware
};
