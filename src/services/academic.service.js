const resourceRepository = require('../repositories/resource.repository');
const mongoose = require('mongoose');

const defaultResources = [
    {
        title: "Smart India Hackathon (SIH 2026) Master Playbook",
        category: "Syllabus & Guides",
        description: "All-in-One SIH winning playbook: Problem Statement strategy, PPT decks, timed pitch script, AI toolkits & Judge Q&A formulas.",
        link: "/sih"
    },
    {
        title: "B.Tech CSE First Year Roadmap",
        category: "Syllabus & Guides",
        semester: "Sem1",
        description: "Official B.Tech 1st Year CSE Orientation & Academic Roadmap PDF guide extracted from Google Doc.",
        link: "https://drive.google.com/file/d/1KOyGgwkp2hgjNDiDbhrK0U0aOpg_LO1t/view"
    },
    {
        title: "B.Tech First Year Study Resources Drive",
        category: "CSE/IT Core",
        semester: "Sem1",
        description: "Comprehensive B.Tech 1st Year study drive containing notes, reference books, practice questions & unit materials.",
        link: "https://drive.google.com/file/d/1rjE5CYswCjfuJtrPqo4y_-b0wfc11cj0/view?usp=sharing"
    },
    {
        title: "Python Notes Course",
        category: "Coding & Tech",
        description: "9-unit interactive Python course — variables to OOP, with code examples and practice questions, zero cost.",
        link: "/python-notes/"
    },
    {
        title: "First Year CSE Syllabus",
        category: "Syllabus & Guides",
        description: "Official curriculum details, credit distribution, and subject codes for B.Tech CSE (Class of 2026).",
        link: "https://docs.google.com/document/d/16MHkIyiyxC-E4wzH0gfK7qePIg82DkQIFyK0kQpXB4w/edit?tab=t.0"
    },
    {
        title: "Basic Engineering Mathematics",
        category: "Mathematics & Physics",
        description: "Syllabus-aligned units covering Matrices, Calculus, and Differential Equations with solved examples.",
        link: "/lpu-notes"
    },
    {
        title: "Engineering Physics Reference",
        category: "Mathematics & Physics",
        description: "Formulas, lecture slides, and notes for electromagnetic theory, quantum mechanics, and optics.",
        link: "/lpu-notes"
    },
    {
        title: "Web Development & JS Starter Guide",
        category: "Coding & Tech",
        description: "Introductory guide to HTML5, CSS3 layout design, and core JavaScript programming.",
        link: "/senior/dashboard.html"
    },
    {
        title: "C & C++ Lecture Notes Vault",
        category: "Coding & Tech",
        description: "Comprehensive lecture notes, code snippets, and unit breakdown for C and C++ programming.",
        link: "/senior/dashboard.html"
    },
    {
        title: "Freshers Campus Reporting Guide",
        category: "Syllabus & Guides",
        description: "Step-by-step reporting roadmap, document verification checklist, and hostel allocation guide.",
        link: "/fresher"
    },
    {
        title: "Laptop Finder Tool for Freshers",
        category: "Syllabus & Guides",
        description: "Smart survey tool recommending the ideal laptop specs based on your engineering branch.",
        link: "/findoglaptop"
    }
];

class AcademicService {
    evaluatePassingCriteria(data) {
        const {
            attendance = { obtained: 0, max: 0 },
            ca = { obtained: 0, max: 0 },
            mte = { obtained: 0, max: 0 },
            ete = { obtained: 0, max: 0 },
            subjectType = 'theory',
            examType = 'regular'
        } = data;

        const etePercent = ete.max > 0 ? (ete.obtained / ete.max) * 100 : 0;
        const combinedObtained = mte.obtained + ete.obtained;
        const combinedMax = mte.max + ete.max;
        const combinedPercent = combinedMax > 0 ? (combinedObtained / combinedMax) * 100 : 0;

        let rule1Passed = false;
        let rule1Reason = "";

        if (examType === 'reappear') {
            if (combinedPercent >= 30) {
                rule1Passed = true;
                rule1Reason = `Combined MTE+ETE is ${combinedPercent.toFixed(1)}% (Min 30%)`;
            } else {
                rule1Reason = `Combined MTE+ETE is ${combinedPercent.toFixed(1)}% (Min 30% required)`;
            }
        } else {
            if (etePercent >= 30) {
                rule1Passed = true;
                rule1Reason = `ETE is ${etePercent.toFixed(1)}% (>= 30%)`;
            } else if (combinedPercent >= 30) {
                rule1Passed = true;
                rule1Reason = `ETE < 30% but Combined (MTE+ETE) is ${combinedPercent.toFixed(1)}% (>= 30%)`;
            } else {
                rule1Reason = `ETE is ${etePercent.toFixed(1)}% and Combined (MTE+ETE) is ${combinedPercent.toFixed(1)}%. Neither met 30%.`;
            }
        }

        const totalObtained = (attendance.obtained || 0) + (ca.obtained || 0) + (mte.obtained || 0) + (ete.obtained || 0);
        const totalMax = (attendance.max || 0) + (ca.max || 0) + (mte.max || 0) + (ete.max || 0);
        const overallPercent = totalMax > 0 ? (totalObtained / totalMax) * 100 : 0;

        let rule2Passed = false;
        let rule2Reason = "";

        if (overallPercent >= 40) {
            rule2Passed = true;
            rule2Reason = `Overall score is ${overallPercent.toFixed(1)}% (>= 40%)`;
        } else {
            rule2Reason = `Overall score is ${overallPercent.toFixed(1)}% (Min 40% required)`;
        }

        const isPassed = rule1Passed && rule2Passed;

        return {
            isPassed,
            overallPercent: Number(overallPercent.toFixed(2)),
            totalObtained,
            totalMax,
            rule1: { passed: rule1Passed, reason: rule1Reason },
            rule2: { passed: rule2Passed, reason: rule2Reason },
            summary: isPassed 
                ? "PASSED: Both end-term component & overall 40% criteria satisfied."
                : "FAILED: Minimum criteria not met."
        };
    }

    async getResources() {
        let extractedNotes = [];
        try {
            const fs = require('fs');
            const path = require('path');
            const notesPath = path.join(__dirname, '..', '..', 'data', 'lpuverto_notes.json');
            if (fs.existsSync(notesPath)) {
                const raw = fs.readFileSync(notesPath, 'utf-8');
                extractedNotes = JSON.parse(raw);
            }
        } catch (e) {
            console.warn('AcademicService: Could not load extracted notes json:', e.message);
        }

        const combinedFallback = [...defaultResources, ...extractedNotes];

        try {
            if (mongoose.connection.readyState === 1) {
                const Resource = require('../models/resource.model');
                for (const defItem of defaultResources) {
                    const exists = await Resource.findOne({ title: defItem.title });
                    if (!exists) {
                        await Resource.create(defItem);
                    }
                }
                let resources = await resourceRepository.findAll();
                
                // Pin the 2 new extracted Google Doc items to the VERY TOP (Index 0 & 1)
                const topTitles = new Set(["B.Tech CSE First Year Roadmap", "B.Tech First Year Study Resources Drive"]);
                const topItems = defaultResources.filter(d => topTitles.has(d.title));
                const otherDbResources = resources.filter(r => !topTitles.has(r.title));
                const uniqueExtracted = extractedNotes.filter(item => !topTitles.has(item.title) && !otherDbResources.some(r => r.title === item.title));

                return [...topItems, ...otherDbResources, ...uniqueExtracted];
            } else {
                const topTitles = new Set(["B.Tech CSE First Year Roadmap", "B.Tech First Year Study Resources Drive"]);
                const topItems = defaultResources.filter(d => topTitles.has(d.title));
                const remainingFallback = combinedFallback.filter(f => !topTitles.has(f.title));
                return [...topItems, ...remainingFallback];
            }
        } catch (err) {
            console.error('AcademicService: Failed to retrieve or seed resources:', err.message);
            return combinedFallback;
        }
    }
}

module.exports = new AcademicService();
