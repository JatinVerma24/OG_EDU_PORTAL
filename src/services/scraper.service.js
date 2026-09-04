const fs = require('fs').promises;
const path = require('path');
const cheerio = require('cheerio');

const CATALOG_PATH = path.join(__dirname, '..', '..', 'data', 'lpu_catalog.json');
const CACHE_DIR = path.join(__dirname, '..', '..', 'data', 'lpu_cache');

class ScraperService {
    constructor() {
        this.cacheInitialized = false;
    }

    async ensureCacheDir() {
        if (this.cacheInitialized) return;
        try {
            await fs.mkdir(CACHE_DIR, { recursive: true });
            this.cacheInitialized = true;
        } catch (err) {
            if (err.code !== 'EEXIST') {
                console.error('ScraperService: Failed to create cache directory:', err.message);
            }
        }
    }

    // Advanced fetch with retries, timeouts, and logging
    async fetchWithRetry(url, retries = 3, timeoutMs = 5000, delay = 1000) {
        for (let attempt = 1; attempt <= retries; attempt++) {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

            try {
                console.log(`ScraperService: Fetching (Attempt ${attempt}/${retries}): ${url}`);
                const res = await fetch(url, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return await res.text();
            } catch (err) {
                clearTimeout(timeoutId);
                const isTimeout = err.name === 'AbortError';
                console.warn(`ScraperService: Attempt ${attempt} failed (${isTimeout ? 'Timeout' : err.message})`);

                if (attempt === retries) {
                    throw new Error(`Failed to fetch page after ${retries} attempts. Last error: ${err.message}`);
                }

                // Exponential backoff
                await new Promise(resolve => setTimeout(resolve, delay * Math.pow(2, attempt - 1)));
            }
        }
    }

    // Helper to get cached content or fetch
    async getPageContent(url, cacheKey) {
        await this.ensureCacheDir();
        const safeKey = cacheKey.replace(/[^a-zA-Z0-9]/g, '_') + '.html';
        const cachePath = path.join(CACHE_DIR, safeKey);
        
        try {
            // Check cache
            const cachedHtml = await fs.readFile(cachePath, 'utf8');
            console.log(`ScraperService: Cache hit for key: ${cacheKey}`);
            return cachedHtml;
        } catch (err) {
            // Cache miss - Fetch and write to cache
            console.log(`ScraperService: Cache miss for key: ${cacheKey}. Initiating download...`);
            try {
                const html = await this.fetchWithRetry(url);
                await fs.writeFile(cachePath, html, 'utf8');
                return html;
            } catch (fetchErr) {
                console.error(`ScraperService: Scrape failed for ${url}:`, fetchErr.message);
                throw fetchErr;
            }
        }
    }

    async getCatalog() {
        try {
            await fs.access(CATALOG_PATH);
        } catch {
            throw new Error('Catalog data not found. Please run scrape script.');
        }
        
        const dataRaw = await fs.readFile(CATALOG_PATH, 'utf8');
        return JSON.parse(dataRaw);
    }

    async getSubjectUnits(sem, code) {
        try {
            const url = `https://notes.lpuverto.xyz/${sem}/${code}`;
            const html = await this.getPageContent(url, `${sem}_${code}`);
            const $ = cheerio.load(html);
            
            const description = $('p.overview-preview').text().trim();
            
            let credits = 4;
            const creditsMatch = $('body').text().match(/(\d+)\s+Credits/);
            if (creditsMatch) {
                credits = parseInt(creditsMatch[1], 10);
            }
            
            const units = [];
            
            $('span').each((i, el) => {
                const spanText = $(el).text().trim();
                if (/^Unit\s+\d+$/i.test(spanText)) {
                    const card = $(el).closest('.group');
                    if (card.length) {
                        const unitTitle = card.find('h3').first().text().replace(/\s+/g, ' ').trim();
                        const notesLink = card.find('a[href*="notes"]').attr('href') || null;
                        const mcqLink = card.find('a[href*="mcq"]').attr('href') || null;
                        
                        units.push({
                            name: spanText,
                            title: unitTitle,
                            notesLink: notesLink || `/${sem}/${code}/${spanText.replace(/\s+/g, '')}/notes`,
                            mcqLink: mcqLink || `/${sem}/${code}/${spanText.replace(/\s+/g, '')}/mcq`
                        });
                    }
                }
            });
            
            if (units.length > 0) {
                return { code, sem, credits, description, units };
            }
        } catch (err) {
            console.warn(`ScraperService: Live fetch for ${sem}/${code} failed (${err.message}). Using local fallback.`);
        }

        // Local Fallback from lpu_catalog.json
        try {
            const catalog = await this.getCatalog();
            const semSubjects = catalog[sem] || [];
            const found = semSubjects.find(s => s.code.toLowerCase() === code.toLowerCase());
            if (found) {
                const fallbackUnits = (found.units || []).map((u, i) => ({
                    name: u.unit || `Unit ${i + 1}`,
                    title: `${found.name} - ${u.unit || 'Unit ' + (i + 1)} Materials`,
                    notesLink: u.url || `/${sem}/${code}/${u.unit}/notes`,
                    mcqLink: u.url || `/${sem}/${code}/${u.unit}/mcq`
                }));
                return {
                    code: found.code,
                    sem,
                    credits: found.credits || 4,
                    description: found.description || `Study materials for ${found.name}`,
                    units: fallbackUnits.length ? fallbackUnits : [1,2,3,4,5,6].map(i => ({
                        name: `Unit ${i}`,
                        title: `${found.name} - Unit ${i} Detailed Overview`,
                        notesLink: `/${sem}/${code}/Unit${i}/notes`,
                        mcqLink: `/${sem}/${code}/Unit${i}/mcq`
                    }))
                };
            }
        } catch (fallbackErr) {
            console.error('ScraperService: Fallback catalog read error:', fallbackErr.message);
        }

        // Default empty structure if not found
        return {
            code,
            sem,
            credits: 4,
            description: `Study module and notes repository for ${code}.`,
            units: [1,2,3,4,5,6].map(i => ({
                name: `Unit ${i}`,
                title: `${code} Unit ${i} Notes & Study Guide`,
                notesLink: `/${sem}/${code}/Unit${i}/notes`,
                mcqLink: `/${sem}/${code}/Unit${i}/mcq`
            }))
        };
    }

    async getUnitNotes(sem, code, unit) {
        try {
            const url = `https://notes.lpuverto.xyz/${sem}/${code}/${unit}/notes`;
            const html = await this.getPageContent(url, `${sem}_${code}_${unit}_notes`);
            const $ = cheerio.load(html);
            
            const markdownContent = $('#markdown-content');
            if (markdownContent.length) {
                return {
                    sem,
                    code,
                    unit,
                    content: markdownContent.html().trim()
                };
            }
        } catch (err) {
            console.warn(`ScraperService: Live notes fetch failed for ${sem}/${code}/${unit}: ${err.message}`);
        }

        // Fallback Content
        return {
            sem,
            code,
            unit,
            content: `
                <div class="fallback-notes-content">
                    <h2>${code} - ${unit.toUpperCase()} Notes</h2>
                    <p>Comprehensive course summary and key concepts for <strong>${code} ${unit}</strong>.</p>
                    <h3>Key Topics & Syllabus Breakdown</h3>
                    <ul>
                        <li>Fundamental Principles & Theoretical Architecture</li>
                        <li>Practical Implementation & Code Examples</li>
                        <li>Solved Numerical Problems & Formula Sheet</li>
                        <li>Previous Year Examination Short & Long Questions</li>
                    </ul>
                    <blockquote>
                        <p><strong>Note:</strong> Full lecture slides and reference PDF links are available directly in your course LMS and drive vault.</p>
                    </blockquote>
                </div>
            `
        };
    }

    async getUnitMCQ(sem, code, unit) {
        try {
            const url = `https://notes.lpuverto.xyz/${sem}/${code}/${unit}/mcq`;
            const html = await this.getPageContent(url, `${sem}_${code}_${unit}_mcq`);
            const $ = cheerio.load(html);
            const questions = [];
            
            $('[id^="question-"]').each((idx, el) => {
                const qEl = $(el);
                
                const questionClone = qEl.find('p.font-semibold').clone();
                questionClone.find('.inline-flex').remove(); 
                
                const textSpan = questionClone.find('.katex-content');
                const text = textSpan.length ? textSpan.html() : questionClone.html();
                
                const options = [];
                qEl.find('[data-option]').each((optIdx, optEl) => {
                    const optLetter = $(optEl).attr('data-option');
                    const optClone = $(optEl).clone();
                    optClone.find('strong').remove(); 
                    
                    const optSpan = optClone.find('.katex-content');
                    const optText = optSpan.length ? optSpan.html() : optClone.html();
                    
                    options.push({
                        letter: optLetter,
                        text: optText.replace(/^[A-D]\.\s*/i, '').trim()
                    });
                });
                
                let correctAnswer = '';
                const correctEl = qEl.find('.answer-section strong');
                if (correctEl.length) {
                    correctAnswer = correctEl.html().trim();
                } else {
                    const textMatch = qEl.text().match(/Correct Answer:\s*([A-D])/i);
                    if (textMatch) {
                        correctAnswer = textMatch[1];
                    }
                }
                
                let explanation = '';
                const expEl = qEl.find('.answer-section .markdown-content');
                if (expEl.length) {
                    explanation = expEl.html().trim();
                }
                
                questions.push({
                    index: idx,
                    text: text ? text.trim() : '',
                    options,
                    correctAnswer,
                    explanation
                });
            });
            
            if (questions.length > 0) {
                return { sem, code, unit, questions };
            }
        } catch (err) {
            console.warn(`ScraperService: Live MCQ fetch failed for ${sem}/${code}/${unit}: ${err.message}`);
        }

        // Fallback Practice Quiz Questions
        return {
            sem,
            code,
            unit,
            questions: [
                {
                    index: 0,
                    text: `What is the primary objective of studying ${code} in ${unit}?`,
                    options: [
                        { letter: "A", text: "Understanding core theoretical principles and foundational concepts." },
                        { letter: "B", text: "Hardware manufacturing and physical fabrication." },
                        { letter: "C", text: "Memorizing historical timelines only." },
                        { letter: "D", text: "None of the above." }
                    ],
                    correctAnswer: "Understanding core theoretical principles and foundational concepts.",
                    explanation: `${code} ${unit} focuses on establishing strong foundational theory and practical problem-solving skills.`
                },
                {
                    index: 1,
                    text: `Which of the following best describes the key methodology applied in ${code}?`,
                    options: [
                        { letter: "A", text: "Structured analytical problem solving and algorithmic logic." },
                        { letter: "B", text: "Random estimation without validation." },
                        { letter: "C", text: "Static manual observation." },
                        { letter: "D", text: "Unregulated data processing." }
                    ],
                    correctAnswer: "Structured analytical problem solving and algorithmic logic.",
                    explanation: "Analytical frameworks ensure predictable, optimal performance across engineering modules."
                }
            ]
        };
    }
}

module.exports = new ScraperService();
