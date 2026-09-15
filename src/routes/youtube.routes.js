const express = require('express');
const router = express.Router();

/**
 * GET /api/youtube/search?q=...&maxResults=...
 * Server-side YouTube search route handler with input validation and zero API key leakage
 */
router.get('/youtube/search', async (req, res) => {
    try {
        const query = (req.query.q || '').trim();
        const maxResults = Math.min(Math.max(parseInt(req.query.maxResults, 10) || 5, 1), 10);

        if (!query) {
            return res.status(400).json({ error: 'Search query parameter (q) is required.' });
        }

        const apiKey = process.env.YOUTUBE_API_KEY;
        if (!apiKey) {
            // Return clean empty result without throwing or exposing missing key
            return res.json({
                query,
                resultsCount: 0,
                results: [],
                message: 'YouTube API key is optional or not configured in environment.'
            });
        }

        const url = new URL('https://www.googleapis.com/youtube/v3/search');
        url.searchParams.set('part', 'snippet');
        url.searchParams.set('q', query);
        url.searchParams.set('type', 'video');
        url.searchParams.set('maxResults', maxResults.toString());
        url.searchParams.set('key', apiKey);

        const response = await fetch(url.toString(), {
            headers: { Accept: 'application/json' }
        });

        if (!response.ok) {
            return res.json({
                query,
                resultsCount: 0,
                results: [],
                status: response.status
            });
        }

        const data = await response.json();
        const items = Array.isArray(data.items) ? data.items : [];

        const results = items.map(item => ({
            id: item.id?.videoId || '',
            title: item.snippet?.title || '',
            channelTitle: item.snippet?.channelTitle || '',
            description: item.snippet?.description || '',
            thumbnailUrl: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.default?.url || '',
            videoUrl: `https://www.youtube.com/watch?v=${item.id?.videoId}`
        }));

        return res.json({
            query,
            resultsCount: results.length,
            results
        });
    } catch (err) {
        console.error('Express YouTube Search Route Error:', err.message);
        return res.status(500).json({ error: 'Internal server error while searching YouTube' });
    }
});

module.exports = router;
