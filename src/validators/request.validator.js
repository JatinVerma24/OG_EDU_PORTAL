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
    body('name').trim().notEmpty().withMessage('Name field is required'),
    body('email').trim().isEmail().withMessage('A valid email address is required'),
    body('message').trim().notEmpty().withMessage('Message content is required'),
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
    feedbackCheck,
    checkPassingCheck
};
