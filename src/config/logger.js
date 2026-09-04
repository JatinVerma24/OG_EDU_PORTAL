const winston = require('winston');
const path = require('path');

const isVercel = !!process.env.VERCEL;

// Define log formatting rules
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

// Define console format for clean reading
const consoleFormat = winston.format.combine(
    winston.format.colorize(),
    winston.format.printf(({ level, message, timestamp, stack }) => {
        return `${timestamp} [${level}]: ${message} ${stack ? `\n${stack}` : ''}`;
    })
);

const transports = [
    new winston.transports.Console({
        format: process.env.NODE_ENV === 'production' ? logFormat : consoleFormat
    })
];

// File logging is only enabled in non-serverless local environments
if (!isVercel) {
    try {
        const DailyRotateFile = require('winston-daily-rotate-file');
        const LOGS_DIR = path.join(__dirname, '..', '..', 'logs');
        
        transports.push(
            new DailyRotateFile({
                filename: path.join(LOGS_DIR, 'error-%DATE%.log'),
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                level: 'error'
            }),
            new DailyRotateFile({
                filename: path.join(LOGS_DIR, 'combined-%DATE%.log'),
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '14d',
                level: 'info'
            })
        );
    } catch (err) {
        console.warn('Winston DailyRotateFile disabled:', err.message);
    }
}

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: logFormat,
    defaultMeta: { service: 'ogedu-portal-api' },
    transports: transports,
    exitOnError: false
});

module.exports = logger;
