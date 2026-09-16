const scraperService = require('../services/scraper.service');
const { success, error } = require('../utils/response');

// Strict alphanumeric whitelisting to block path traversal, URL authority injection, or SSRF
const SAFE_PARAM_REGEX = /^[a-zA-Z0-9_-]{1,30}$/;

function isSafeParam(val) {
    return typeof val === 'string' && SAFE_PARAM_REGEX.test(val.trim());
}

class ScraperController {
    async getCatalog(req, res) {
        try {
            const data = await scraperService.getCatalog();
            return success(res, 'Scraped catalog retrieved successfully', data);
        } catch (err) {
            return error(res, 'Failed to fetch catalog directory', err, 500);
        }
    }

    async getSubjectUnits(req, res) {
        const { sem, code } = req.query;
        if (!sem || !code) {
            return error(res, 'Missing sem or code query parameter', null, 400);
        }

        if (!isSafeParam(sem) || !isSafeParam(code)) {
            return error(res, 'Invalid characters in semester or subject code parameter', null, 400);
        }

        try {
            const data = await scraperService.getSubjectUnits(sem.trim(), code.trim());
            return success(res, 'Subject units details retrieved', data);
        } catch (err) {
            return error(res, 'Failed to scrape subject details', err, 500);
        }
    }

    async getUnitNotes(req, res) {
        const { sem, code, unit } = req.query;
        if (!sem || !code || !unit) {
            return error(res, 'Missing sem, code, or unit parameters', null, 400);
        }

        if (!isSafeParam(sem) || !isSafeParam(code) || !isSafeParam(unit)) {
            return error(res, 'Invalid characters in semester, code, or unit parameter', null, 400);
        }

        try {
            const data = await scraperService.getUnitNotes(sem.trim(), code.trim(), unit.trim());
            return success(res, 'Unit notes content retrieved', data);
        } catch (err) {
            return error(res, 'Failed to scrape unit notes content', err, 500);
        }
    }

    async getUnitMCQ(req, res) {
        const { sem, code, unit } = req.query;
        if (!sem || !code || !unit) {
            return error(res, 'Missing sem, code, or unit parameters', null, 400);
        }

        if (!isSafeParam(sem) || !isSafeParam(code) || !isSafeParam(unit)) {
            return error(res, 'Invalid characters in semester, code, or unit parameter', null, 400);
        }

        try {
            const data = await scraperService.getUnitMCQ(sem.trim(), code.trim(), unit.trim());
            return success(res, 'Unit MCQs retrieved', data);
        } catch (err) {
            return error(res, 'Failed to scrape unit MCQs', err, 500);
        }
    }
}

module.exports = new ScraperController();
