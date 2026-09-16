const mongoose = require('mongoose');
const { success, error } = require('../utils/response');
const { connectDB } = require('../config/db.config');
const redisConfig = require('../config/redis.config');

class DiagnosticController {
    async getDbStatus(req, res) {
        try {
            await connectDB();
            const readyState = mongoose.connection.readyState;
            const statusMap = ['disconnected', 'connected', 'connecting', 'disconnecting'];
            
            return success(res, 'Database status retrieved successfully', {
                readyState,
                statusText: statusMap[readyState] || 'unknown',
                vercelEnv: process.env.VERCEL || null
            });
        } catch (err) {
            return error(res, 'Failed to fetch database diagnostics', err, 500);
        }
    }

    // GET /api/health
    async getHealth(req, res) {
        const dbState = mongoose.connection.readyState;
        const redisState = redisConfig.getRedisStatus();
        const statusMap = ['disconnected', 'connected', 'connecting', 'disconnecting'];
        
        const healthStats = {
            status: (dbState === 1) ? 'UP' : 'DEGRADED',
            timestamp: new Date(),
            version: '1.0.0',
            uptime: process.uptime(),
            services: {
                database: statusMap[dbState] || 'unknown',
                redis: redisState.connected ? 'connected' : 'disconnected'
            }
        };

        if (dbState === 1) {
            return success(res, 'System is healthy', healthStats, 200);
        } else {
            return error(res, 'System is degraded: Database disconnected', healthStats, 503);
        }
    }

    // GET /api/live (Liveness probe)
    async getLive(req, res) {
        const liveStats = {
            status: 'UP',
            uptime: Math.floor(process.uptime()),
            timestamp: new Date().toISOString()
        };
        return success(res, 'Server is running', liveStats, 200);
    }

    // GET /api/ready (Readiness probe)
    async getReady(req, res) {
        const dbState = mongoose.connection.readyState;
        const redisState = redisConfig.getRedisStatus();
        
        const isReady = dbState === 1; // MongoDB connection is critical for readiness

        const statusDetails = {
            ready: isReady,
            database: dbState === 1 ? 'ready' : 'unavailable',
            cache: redisState.connected ? 'ready' : 'standalone'
        };

        if (isReady) {
            return success(res, 'System is ready to receive requests', statusDetails, 200);
        } else {
            return error(res, 'System is not ready: Database connection unavailable', statusDetails, 503);
        }
    }
}

module.exports = new DiagnosticController();
