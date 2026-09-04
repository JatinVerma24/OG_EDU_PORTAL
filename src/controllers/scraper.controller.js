const scraperService = require('../services/scraper.service');
const { success, error } = require('../utils/response');

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

        try {
            const data = await scraperService.getSubjectUnits(sem, code);
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

        try {
            const data = await scraperService.getUnitNotes(sem, code, unit);
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

        try {
            const data = await scraperService.getUnitMCQ(sem, code, unit);
            return success(res, 'Unit MCQs retrieved', data);
        } catch (err) {
            return error(res, 'Failed to scrape unit MCQs', err, 500);
        }
    }
}

module.exports = new ScraperController();
