class GeminiService {
    async chat(message, history = []) {
        const apiKey = process.env.GEMINI_API_KEY;
        
        if (!apiKey) {
            console.log('GeminiService: GEMINI_API_KEY is not set. Operating in offline/mock mode.');
            return this.getOfflineResponse(message);
        }

        const model = 'gemini-3.6-flash';
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

        // Construct standard prompt with system instructions
        const systemInstruction = 
            `You are OG AI (developed for OGEDU AI), a world-class academic and hackathon mentor for university students. ` +
            `Your expertise covers: ` +
            `1. Smart India Hackathon (SIH 2026): PS selection strategy, strict 6-slide PPT structure, 3-minute pitch formula, rapid MVP tech stacks, and judge defense. ` +
            `2. LPU Freshers & Academics: Induction, Baldev Raj Mittal Unipolis physical reporting, hostel check-in, exam passing criteria calculators, C/C++/Python study notes, and campus guides. ` +
            `Ensure your responses are highly structured, empowering, concise, and helpful. Use formatting, bold highlights, and bullet points where helpful.`;

        // Format history and current message into Gemini request layout
        const contents = [];
        
        // Add system constraint as first message
        contents.push({
            role: 'user',
            parts: [{ text: `System Constraints: ${systemInstruction}` }]
        });
        contents.push({
            role: 'model',
            parts: [{ text: "Understood. I will act strictly as the ogeduAI assistant under these guidelines." }]
        });

        // Add history
        history.forEach(item => {
            contents.push({
                role: item.role === 'user' ? 'user' : 'model',
                parts: [{ text: item.text }]
            });
        });

        // Add current query
        contents.push({
            role: 'user',
            parts: [{ text: message }]
        });

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents,
                    generationConfig: {
                        temperature: 0.3,
                        maxOutputTokens: 500
                    }
                })
            });

            if (!res.ok) {
                const errText = await res.text();
                throw new Error(`Gemini API error: ${res.status} - ${errText}`);
            }

            const payload = await res.json();
            
            if (payload.candidates && payload.candidates[0] && payload.candidates[0].content) {
                return {
                    text: payload.candidates[0].content.parts[0].text,
                    source: 'Gemini AI'
                };
            }
            
            throw new Error('Unexpected empty candidate response format from Gemini');
        } catch (err) {
            console.error('GeminiService: API call failed. Falling back to offline matcher.', err.message);
            return {
                text: this.getOfflineResponse(message).text,
                source: 'Offline Fallback (API error)'
            };
        }
    }

    getOfflineResponse(message) {
        const query = message.toLowerCase().trim();
        
        // SIH & Hackathon Specific Offline Intelligence
        if (query.includes('ps') || query.includes('problem statement') || query.includes('select') || query.includes('choose')) {
            return {
                text: `🎯 <strong>OG AI • Problem Statement Selection Strategy:</strong><br><br>` +
                      `1. <strong>Do NOT spend >12 hours choosing a PS</strong>. Lock it within 2-3 hours.<br>` +
                      `2. <strong>Avoid Over-Saturated Generic Categories</strong> (like basic grievance apps) unless you have a 10x offline/hardware edge.<br>` +
                      `3. <strong>Pick High-Leverage Niche Domains:</strong> Satellite analytics (ISRO), Power Grid automation, Critical Infra security, or AgriTech with ground data.<br>` +
                      `4. <strong>Score on 5 Factors:</strong> Real-world Impact, MVP Feasibility in 7 days, 10x Differentiation, Ministry Adoption Fit, and Team Skill Alignment.<br><br>` +
                      `👉 <em>Use the <strong>PS Winning Calculator</strong> in the top menu to score your shortlisted statements!</em>`,
                source: 'OG AI Offline Knowledge Base'
            };
        }

        if (query.includes('ppt') || query.includes('slide') || query.includes('presentation format')) {
            return {
                text: `📊 <strong>OG AI • Official 6-Slide PPT Blueprint:</strong><br><br>` +
                      `• <strong>Slide 1:</strong> Title Page (Official format fields only, no fancy art).<br>` +
                      `• <strong>Slide 2:</strong> Idea Title, 1-line Tagline & Figma UI wireframe mockup.<br>` +
                      `• <strong>Slide 3:</strong> Technical Approach (Input ➔ AI/Processing ➔ Output flowchart).<br>` +
                      `• <strong>Slide 4:</strong> Feasibility & Risks (2-column Challenges vs Mitigation table).<br>` +
                      `• <strong>Slide 5:</strong> Impact & Social/Economic Benefits (quantified metrics & ₹ savings).<br>` +
                      `• <strong>Slide 6:</strong> Research Credibility & Policy References (Ministry/data.gov.in links).<br><br>` +
                      `👉 <em>Strict rule: Exactly 6 slides maximum!</em>`,
                source: 'OG AI Offline Knowledge Base'
            };
        }

        if (query.includes('pitch') || query.includes('script') || query.includes('verbal') || query.includes('teleprompter')) {
            return {
                text: `🎤 <strong>OG AI • 3-Minute Universal Pitch Formula:</strong><br><br>` +
                      `1. <strong>0:00 - 0:15 (Hook & Title):</strong> Introduce Team, PS ID, and Theme.<br>` +
                      `2. <strong>0:15 - 0:45 (Pain Point & Big Idea):</strong> State the problem in 1 line + your 10x solution mechanism.<br>` +
                      `3. <strong>0:45 - 01:45 (Architecture & LIVE DEMO):</strong> Walk judges through your live working prototype.<br>` +
                      `4. <strong>01:45 - 02:15 (Feasibility & Mitigation):</strong> Address top 2 risks and offline/low-cost fallbacks.<br>` +
                      `5. <strong>02:15 - 03:00 (Measurable Impact & Closing):</strong> State user benefits and ministry vision alignment.<br><br>` +
                      `👉 <em>Use the interactive <strong>Pitch Timer & Teleprompter</strong> tab to practice!</em>`,
                source: 'OG AI Offline Knowledge Base'
            };
        }

        if (query.includes('team') || query.includes('member') || query.includes('role') || query.includes('rule') || query.includes('spoc')) {
            return {
                text: `👥 <strong>OG AI • SIH Team Composition Rules:</strong><br><br>` +
                      `• <strong>Team Size:</strong> Exactly 6 members.<br>` +
                      `• <strong>Mandatory Rule:</strong> At least <strong>1 female member</strong> is compulsory.<br>` +
                      `• <strong>No Inter-College Teams:</strong> All 6 members must belong to the same institute.<br>` +
                      `• <strong>Ideal Startup Roles:</strong> Tech Lead (Backend), AI/ML Lead, UI/UX Lead, IoT/Hardware (if applicable), and Pitch/Storytelling Lead.<br>` +
                      `• <strong>College SPOC:</strong> Contact your Single Point of Contact at <a href="https://sih.gov.in/know-your-spoc" target="_blank" style="color:#c084fc;">sih.gov.in/know-your-spoc</a>.`,
                source: 'OG AI Offline Knowledge Base'
            };
        }

        if (query.includes('judge') || query.includes('q&a') || query.includes('question') || query.includes('cross') || query.includes('google')) {
            return {
                text: `🛡️ <strong>OG AI • 3-Step Judge Q&A Survival Formula:</strong><br><br>` +
                      `1. <strong>Step 1 (Acknowledge):</strong> <em>"That is a great point, respected judge..."</em> (Never argue or deflect).<br>` +
                      `2. <strong>Step 2 (Highlight Moat):</strong> <em>"While big companies have broad solutions, our moat is localized edge deployment, offline rural support, and direct API integrations with ministry databases."</em><br>` +
                      `3. <strong>Step 3 (Show Roadmap):</strong> <em>"In the next 2-3 months post-hackathon, our roadmap expands our pilot with 20 real users as shown in our architecture."</em>`,
                source: 'OG AI Offline Knowledge Base'
            };
        }

        if (query.includes('24') || query.includes('mvp') || query.includes('ai tool') || query.includes('tool') || query.includes('prototype')) {
            return {
                text: `🤖 <strong>OG AI • Rapid 24-Hour AI Prototyping Suite:</strong><br><br>` +
                      `• <strong>Full-Stack MVP Generators:</strong> Lovable.dev, Bolt.new, v0.dev.<br>` +
                      `• <strong>Code & Debugging:</strong> Cursor IDE, GitHub Copilot, Replit AI.<br>` +
                      `• <strong>System Architecture Diagrams:</strong> Whimsical AI, Draw.io, Figma.<br>` +
                      `• <strong>Datasets & Analytics:</strong> Kaggle AI Assistant, data.gov.in, Google Colab.<br>` +
                      `• <strong>DevOps & Database:</strong> Supabase, Vercel, Railway.`,
                source: 'OG AI Offline Knowledge Base'
            };
        }

        if (query.includes('winner') || query.includes('past') || query.includes('project') || query.includes('sheet') || query.includes('sample')) {
            return {
                text: `🏆 <strong>OG AI • 50+ Past Winners Reference Vault:</strong><br><br>` +
                      `Access the official curated spreadsheet of 50+ previous SIH winning projects and PPT reference decks:<br>` +
                      `🔗 <a href="https://docs.google.com/spreadsheets/d/1nUJ3BuhuWiARink2pI4_4wBomkf2SiOUxn1cM5xqFBU/edit?usp=sharing" target="_blank" style="color:#c084fc; font-weight:bold;">Open 50+ Winner Projects Sheet ↗</a>`,
                source: 'OG AI Offline Knowledge Base'
            };
        }
        
        // General Academic Fallback
        if (query.includes('doc') || query.includes('certificate') || query.includes('checklist')) {
            return {
                text: `📚 <strong>Document Checklist:</strong><br>1. Admission Offer Letter & receipts.<br>2. Original Marksheets + 3 copies.<br>3. Migration Certificate.<br>4. Medical Fitness Certificate.<br>5. 6 Passport photos.`,
                source: 'OG AI Offline Knowledge Base'
            };
        }

        return {
            text: `🤖 <strong>OG AI • SIH & Academic Assistant:</strong><br><br>` +
                  `I can instantly answer any doubt regarding:<br>` +
                  `• 🎯 <strong>Problem Statement selection & feasibility</strong><br>` +
                  `• 📊 <strong>Official 6-Slide PPT structure & design</strong><br>` +
                  `• 🎤 <strong>3-minute verbal pitch script formatting</strong><br>` +
                  `• 👥 <strong>Team rules & SPOC registration</strong><br>` +
                  `• 🛡️ <strong>Toughest Judge Q&A defense formulas</strong><br>` +
                  `• 🤖 <strong>Best AI tools for 24-hr MVP building</strong><br><br>` +
                  `<em>Try asking: "How to pick a winning PS?" or "What are the 6 PPT slides?"</em>`,
            source: 'OG AI Instant Intelligence'
        };
    }
}

module.exports = new GeminiService();
