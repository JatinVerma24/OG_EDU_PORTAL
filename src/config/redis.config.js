const redis = require('redis');

const REDIS_URL = process.env.REDIS_URL;
let redisClient = null;
let isRedisConnected = false;

function initRedis() {
    if (redisClient) return redisClient;
    if (!REDIS_URL) {
        console.log('RedisConfig: Skipping Redis initialization (No REDIS_URL provided).');
        return null;
    }

    const url = REDIS_URL || 'redis://127.0.0.1:6379';
    console.log('RedisConfig: Connecting to Redis URL:', url);
    redisClient = redis.createClient({
        url: url,
        socket: {
            reconnectStrategy: (retries) => {
                if (retries > 3 && !REDIS_URL) {
                    console.warn('RedisConfig: Max retries reached without REDIS_URL. Disconnecting Redis client.');
                    return false; // Stop reconnecting
                }
                const delay = Math.min(retries * 500, 5000);
                return delay;
            },
            connectTimeoutMS: 3000
        }
    });

    redisClient.on('connect', () => {
        console.log('RedisConfig: Redis client establishing connection...');
    });

    redisClient.on('ready', () => {
        console.log('RedisConfig: Redis client is ready and active.');
        isRedisConnected = true;
    });

    redisClient.on('error', (err) => {
        console.error('RedisConfig: Redis client connection error:', err.message);
        isRedisConnected = false;
    });

    redisClient.on('end', () => {
        console.warn('RedisConfig: Redis client connection ended.');
        isRedisConnected = false;
    });

    redisClient.connect().catch(() => {});

    return redisClient;
}

function getRedisStatus() {
    return {
        connected: isRedisConnected,
        url: REDIS_URL
    };
}

module.exports = {
    initRedis,
    getRedisStatus,
    get client() {
        if (!redisClient) {
            return initRedis();
        }
        return redisClient;
    }
};
