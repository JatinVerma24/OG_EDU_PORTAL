const { param, body, validationResult } = require('express-validator');
const { error } = require('../utils/response');

// Middleware to execute validations
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    return error(res, 'Request parameters validation failed', { details: errors.array() }, 400);
};

// Validation chains
const studentIdCheck = [
    param('studentId')
        .trim()
        .isAlphanumeric()
        .withMessage('Student ID must contain alphanumeric characters only')
        .isLength({ min: 5, max: 20 })
        .withMessage('Student ID length must be between 5 and 20 characters'),
    validate
];

const feedbackCheck = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name field is required')
        .isLength({ max: 100 })
        .withMessage('Name must not exceed 100 characters'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('A valid email address is required')
        .isLength({ max: 120 })
        .withMessage('Email must not exceed 120 characters'),
    body('score')
        .optional()
        .trim()
        .isLength({ max: 10 })
        .withMessage('Score length invalid'),
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message content is required')
        .isLength({ max: 2000 })
        .withMessage('Message must not exceed 2000 characters'),
    validate
];

const saveChecklistCheck = [
    param('studentId')
        .trim()
        .isAlphanumeric()
        .withMessage('Student ID must contain alphanumeric characters only')
        .isLength({ min: 5, max: 20 })
        .withMessage('Student ID length must be between 5 and 20 characters'),
    body('checklist')
        .isObject()
        .withMessage('Checklist payload must be a JSON object')
        .custom((obj) => {
            const keys = Object.keys(obj);
            if (keys.length > 100) {
                throw new Error('Checklist contains too many items (max 100 allowed)');
            }
            for (const key of keys) {
                if (key.length > 50) {
                    throw new Error('Checklist item key exceeds 50 characters');
                }
                if (typeof obj[key] !== 'boolean') {
                    throw new Error('Checklist values must be boolean');
                }
            }
            return true;
        }),
    validate
];

const checkPassingCheck = [
    body('attendance.obtained').isNumeric().withMessage('Attendance obtained score must be a number'),
    body('attendance.max').isNumeric().withMessage('Attendance max score must be a number'),
    body('ca.obtained').isNumeric().withMessage('CA obtained score must be a number'),
    body('ca.max').isNumeric().withMessage('CA max score must be a number'),
    body('mte.obtained').isNumeric().withMessage('MTE obtained score must be a number'),
    body('mte.max').isNumeric().withMessage('MTE max score must be a number'),
    body('ete.obtained').isNumeric().withMessage('ETE obtained score must be a number'),
    body('ete.max').isNumeric().withMessage('ETE max score must be a number'),
    validate
];

module.exports = {
    studentIdCheck,
    saveChecklistCheck,
    feedbackCheck,
    checkPassingCheck
};
