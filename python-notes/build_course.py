import os
import json

def build_website():
    print("--- Starting compilation of Python Zero to Hero Course Website ---")
    
    # Path setup
    workspace_dir = os.path.dirname(os.path.abspath(__file__))
    units_dir = os.path.join(workspace_dir, "units")
    
    if not os.path.exists(units_dir):
        print(f"Creating units directory: {units_dir}")
        os.makedirs(units_dir)
        
    template_path = os.path.join(workspace_dir, "template.html")
    output_path = os.path.join(workspace_dir, "index.html")
    
    if not os.path.exists(template_path):
        print("Error: template.html not found in workspace.")
        return
        
    # Read units
    units_data = []
    for i in range(1, 10):
        unit_file = os.path.join(units_dir, f"unit{i}.json")
        if os.path.exists(unit_file):
            print(f"Reading Unit {i} data from {unit_file}...")
            with open(unit_file, "r", encoding="utf-8") as f:
                units_data.append(json.load(f))
        else:
            print(f"Warning: unit{i}.json is missing! Skipping Unit {i} for now.")
            
    # Read template
    with open(template_path, "r", encoding="utf-8") as f:
        html_content = f.read()
        
    # Generate navigation links HTML (with dynamic SPA javascript triggers instead of hashes)
    nav_links = ""
    for unit in units_data:
        num = unit["unit_number"]
        title = unit["short_title"]
        nav_links += f'<a onclick="openUnit({num})" class="nav-item" style="cursor:pointer;">Unit {num}: {title}</a>\n'
        
    # Generate hero cards HTML (reproducing the image grid layout)
    grid_cards = ""
    for unit in units_data:
        num = unit["unit_number"]
        full_title = unit["title"]
        desc = unit["short_description"]
        icon = unit["icon"]
        border_class = f"card-border-{num}"
        
        grid_cards += f'''
        <div class="unit-card" onclick="openUnit({num})">
            <div class="card-glow-border {border_class}"></div>
            <div class="card-content-wrapper">
                <div class="card-icon-container">
                    <span class="card-icon">{icon}</span>
                </div>
                <div class="card-text-container">
                    <h3>{full_title}</h3>
                    <p>{desc}</p>
                </div>
                <div class="card-arrow">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                </div>
            </div>
        </div>
        '''
        
    # Generate full sections HTML (including the beautiful ← Back button at the top of each)
    full_sections = ""
    for idx, unit in enumerate(units_data):
        num = unit["unit_number"]
        title = unit["title"]
        icon = unit["icon"]
        quote = unit.get("bro_quote", "")  # Optional bro_quote, defaults to empty string
        subtopics = unit["subtopics"]
        questions = unit["questions"]
        
        sections_html = ""
        for s_idx, sub in enumerate(subtopics):
            # Check for motivational banner insertion
            # Banners are inserted after every 2 or 3 subtopics
            banner_html = ""
            if s_idx > 0 and s_idx % 3 == 0:
                banners = [
                    "Great progress! ✅ You are learning Python step by step — keep it up!",
                    "Well done! 💪 You have covered a lot. Stay focused and keep reading!",
                    "You are doing really well! 🌟 Python is getting easier with every section!",
                    "Excellent work! 🚀 You are almost through this unit — finish strong!"
                ]
                banner_text = banners[s_idx % len(banners)]
                banner_html = f'''
                <div class="motivation-banner reveal-on-scroll">
                    <div class="banner-gradient"></div>
                    <div class="banner-content">
                        <span class="banner-icon">🔥</span>
                        <p>{banner_text}</p>
                    </div>
                </div>
                '''
            
            sections_html += banner_html
            
            # Subtopic Code Snippets
            snippets_html = ""
            for sn_idx, snip in enumerate(sub.get("snippets", [])):
                comment = snip.get("comment", "")
                code = snip.get("code", "")
                filename = snip.get("filename", f"example{sn_idx+1}.py")
                
                # HTML escaping for code
                safe_code = code.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
                
                # Highlight language is python
                snippets_html += f'''
                <div class="terminal-window">
                    <div class="terminal-header">
                        <div class="terminal-dots">
                            <span class="dot dot-red"></span>
                            <span class="dot dot-yellow"></span>
                            <span class="dot dot-green"></span>
                        </div>
                        <div class="terminal-filename">📄 {filename}</div>
                    </div>
                    <div class="terminal-body">
                        <div class="terminal-comment"># {comment}</div>
                        <pre><code class="language-python">{safe_code}</code></pre>
                    </div>
                </div>
                '''
                
            sections_html += f'''
            <div class="subtopic-block reveal-on-scroll">
                <h3 class="subtopic-heading">👉 {sub["name"]}</h3>
                <div class="subtopic-explanation">
                    {sub["explanation"]}
                </div>
                <div class="snippets-grid">
                    {snippets_html}
                </div>
            </div>
            '''
            
        # Compile questions
        questions_html = ""
        for q_idx, q in enumerate(questions):
            questions_html += f'''
            <div class="question-card">
                <span class="question-num">{q_idx+1}</span>
                <p class="question-text">{q}</p>
            </div>
            '''
            
        full_sections += f'''
        <section id="unit-{num}" class="unit-section">
            <div class="section-container">
                <button class="back-directory-btn" onclick="goHome()">← Back to Course Directory</button>
                <div class="unit-section-header reveal-on-scroll">
                    <div class="unit-badge">Unit {num}</div>
                    <h2><span class="unit-emoji">{icon}</span> {title}</h2>
                    <blockquote class="bro-quote">
                        <span class="quote-mark">“</span>
                        {quote}
                        <span class="quote-mark">”</span>
                    </blockquote>
                </div>
                
                <div class="subtopics-container">
                    {sections_html}
                </div>
                
                <div class="practice-questions-section reveal-on-scroll">
                    <div class="practice-header">
                        <span class="practice-icon">🧠</span>
                        <h3>Test Your Brain — 10 Practice Questions</h3>
                        <p class="practice-subtitle">Try to solve each question below. These will test your understanding of this unit! 🧠</p>
                    </div>
                    <div class="questions-grid">
                        {questions_html}
                    </div>
                </div>
            </div>
        </section>
        '''
        
    # Replace placeholders in template
    output_html = html_content.replace("<!-- NAV_LINKS_PLACEHOLDER -->", nav_links)
    output_html = output_html.replace("<!-- GRID_CARDS_PLACEHOLDER -->", grid_cards)
    output_html = output_html.replace("<!-- FULL_SECTIONS_PLACEHOLDER -->", full_sections)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(output_html)
        
    print(f"Successfully built index.html! Total size: {os.path.getsize(output_path) / 1024:.2f} KB")

if __name__ == "__main__":
    build_website()
