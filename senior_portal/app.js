// ===== JVOG Result Checker - Main Application Logic =====

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initThemeToggle();
    initPassChecker();
    initTGPA();
    initCGPA();
    initPercentage();
    initAttendance();
    initChatbot();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const sidebar = document.getElementById('sidebar');
    const hamburgerBtn = document.getElementById('hamburgerBtn');

    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('sidebar-overlay');
    document.body.appendChild(overlay);

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetPage = item.dataset.page;

            // Update nav
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Update pages
            pages.forEach(p => p.classList.remove('active'));
            document.getElementById(`page-${targetPage}`).classList.add('active');

            // Close mobile sidebar
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            hamburgerBtn.classList.remove('active');
        });
    });

    // Hamburger
    hamburgerBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        hamburgerBtn.classList.remove('active');
    });
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const icon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // Load saved theme
    const savedTheme = localStorage.getItem('jvog-theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    icon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    toggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        icon.textContent = next === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('jvog-theme', next);
    });
}

// ===== PASS CHECKER =====
function initPassChecker() {
    const examTypeGroup = document.getElementById('examType');
    const subjectTypeGroup = document.getElementById('subjectType');

    // Toggle buttons
    [examTypeGroup, subjectTypeGroup].forEach(group => {
        group.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                group.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updateVerdict();
            });
        });
    });

    // Marks inputs - live update
    const markInputs = ['attObt', 'attMax', 'caObt', 'caMax', 'mteObt', 'mteMax', 'eteObt', 'eteMax'];
    markInputs.forEach(id => {
        document.getElementById(id).addEventListener('input', updateVerdict);
    });
}

function updateVerdict() {
    const examType = document.querySelector('#examType .toggle-btn.active').dataset.value;
    const subjectType = document.querySelector('#subjectType .toggle-btn.active').dataset.value;

    const attObt = parseFloat(document.getElementById('attObt').value) || 0;
    const attMax = parseFloat(document.getElementById('attMax').value) || 0;
    const caObt = parseFloat(document.getElementById('caObt').value) || 0;
    const caMax = parseFloat(document.getElementById('caMax').value) || 0;
    const mteObt = parseFloat(document.getElementById('mteObt').value) || 0;
    const mteMax = parseFloat(document.getElementById('mteMax').value) || 0;
    const eteObt = parseFloat(document.getElementById('eteObt').value) || 0;
    const eteMax = parseFloat(document.getElementById('eteMax').value) || 0;

    const totalObt = attObt + caObt + mteObt + eteObt;
    const totalMax = attMax + caMax + mteMax + eteMax;

    const verdictText = document.getElementById('verdictText');
    const verdictContent = document.getElementById('verdictContent');

    if (totalMax === 0) {
        verdictText.className = 'verdict-text gradient-text-purple';
        verdictText.textContent = 'Enter your marks to see the verdict';
        // Remove existing details
        const existingDetails = verdictContent.querySelector('.verdict-details');
        if (existingDetails) existingDetails.remove();
        return;
    }

    const percentage = (totalObt / totalMax) * 100;

    // Pass criteria
    let passPercentage = 40; // Regular
    if (examType === 'reappear') passPercentage = 35;

    // ETE criteria: need at least 35% in ETE
    let etePercentage = eteMax > 0 ? (eteObt / eteMax) * 100 : 100;
    let etePass = etePercentage >= 35;

    let passed = percentage >= passPercentage && etePass;

    // Build verdict
    verdictText.className = 'verdict-text';
    if (passed) {
        verdictText.classList.add('verdict-pass');
        verdictText.textContent = '✅ PASS';
    } else {
        verdictText.classList.add('verdict-fail');
        if (!etePass) {
            verdictText.textContent = '❌ FAIL (ETE criteria not met)';
        } else {
            verdictText.textContent = '❌ FAIL';
        }
    }

    // Details
    let detailsDiv = verdictContent.querySelector('.verdict-details');
    if (!detailsDiv) {
        detailsDiv = document.createElement('div');
        detailsDiv.classList.add('verdict-details');
        verdictContent.appendChild(detailsDiv);
    }

    detailsDiv.innerHTML = `
        <p>Total: ${totalObt} / ${totalMax}</p>
        <p>ETE: ${eteObt} / ${eteMax} (${eteMax > 0 ? etePercentage.toFixed(1) : 0}%)</p>
        <p>Required: ${passPercentage}% overall + 35% ETE</p>
        <p class="total-percentage ${passed ? 'verdict-pass' : 'verdict-fail'}">${percentage.toFixed(1)}%</p>
    `;
}

// ===== TGPA CALCULATOR =====
let subjectCount = 0;
let relativeGrading = false;

function initTGPA() {
    addSubjectRow(); // Start with one row

    document.getElementById('addSubjectBtn').addEventListener('click', addSubjectRow);
    document.getElementById('calcTgpaBtn').addEventListener('click', calculateTGPA);
    document.getElementById('tgpaReset').addEventListener('click', resetTGPA);
    document.getElementById('loadBtech').addEventListener('click', loadBTech);
    document.getElementById('loadBba').addEventListener('click', loadBBA);

    // Toggle relative grading
    document.getElementById('toggleRelative').addEventListener('click', () => {
        relativeGrading = !relativeGrading;
        document.getElementById('toggleRelative').classList.toggle('active', relativeGrading);
        document.getElementById('toggleRelative').textContent = relativeGrading ? 'Disable Relative Grading' : 'Enable Relative Grading';
    });

    // Tabs
    document.getElementById('tabMarksInput').addEventListener('click', () => switchTGPATab('marks-input'));
    document.getElementById('tabAnalysis').addEventListener('click', () => switchTGPATab('analysis'));
}

function switchTGPATab(tab) {
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    if (tab === 'marks-input') {
        document.getElementById('tabMarksInput').classList.add('active');
        document.getElementById('tabContentMarks').classList.add('active');
    } else {
        document.getElementById('tabAnalysis').classList.add('active');
        document.getElementById('tabContentAnalysis').classList.add('active');
    }
}

function addSubjectRow(name = '', credits = 3, marks = '') {
    subjectCount++;
    const row = document.createElement('div');
    row.classList.add('subject-row');
    row.dataset.id = subjectCount;

    row.innerHTML = `
        <input type="text" class="subject-name-input" placeholder="Subject ${subjectCount}" value="${name}">
        <div class="credits-selector">
            ${[1, 2, 3, 4].map(c => `
                <button class="credit-btn ${c === credits ? 'active' : ''}" data-credit="${c}">${c}</button>
            `).join('')}
        </div>
        <input type="number" class="marks-field" placeholder="0-100" min="0" max="100" value="${marks}">
        <span class="grade-display">-</span>
        <button class="remove-subject-btn" title="Remove">×</button>
    `;

    // Credit buttons
    row.querySelectorAll('.credit-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            row.querySelectorAll('.credit-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Marks input - live grade
    row.querySelector('.marks-field').addEventListener('input', (e) => {
        const marks = parseFloat(e.target.value);
        const gradeDisplay = row.querySelector('.grade-display');
        if (isNaN(marks) || marks < 0) {
            gradeDisplay.textContent = '-';
        } else {
            gradeDisplay.textContent = getGrade(marks);
        }
    });

    // Remove button
    row.querySelector('.remove-subject-btn').addEventListener('click', () => {
        row.remove();
    });

    document.getElementById('subjectRows').appendChild(row);
}

function getGrade(marks) {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C+';
    if (marks >= 40) return 'C';
    if (marks >= 35) return 'D';
    return 'F';
}

function getGradePoint(grade) {
    const gradePoints = {
        'A+': 10, 'A': 9, 'B+': 8, 'B': 7,
        'C+': 6, 'C': 5, 'D': 4, 'F': 0
    };
    return gradePoints[grade] || 0;
}

function getGradeColor(grade) {
    const colors = {
        'A+': '#22c55e', 'A': '#4ade80', 'B+': '#a3e635',
        'B': '#facc15', 'C+': '#fb923c', 'C': '#f87171',
        'D': '#ef4444', 'F': '#dc2626'
    };
    return colors[grade] || '#94a3b8';
}

function calculateTGPA() {
    const rows = document.querySelectorAll('.subject-row');
    let totalCredits = 0;
    let totalPoints = 0;
    const subjectData = [];

    rows.forEach(row => {
        const name = row.querySelector('.subject-name-input').value || 'Unnamed';
        const credits = parseInt(row.querySelector('.credit-btn.active')?.dataset.credit || 3);
        const marks = parseFloat(row.querySelector('.marks-field').value);

        if (!isNaN(marks)) {
            const grade = getGrade(marks);
            const gradePoint = getGradePoint(grade);
            totalCredits += credits;
            totalPoints += credits * gradePoint;

            subjectData.push({ name, credits, marks, grade, gradePoint });
        }
    });

    const tgpa = totalCredits > 0 ? (totalPoints / totalCredits) : 0;

    // Show result
    document.getElementById('tgpaResult').style.display = 'block';
    document.getElementById('tgpaValue').textContent = tgpa.toFixed(2);

    // Update analysis
    updateAnalysis(subjectData, tgpa, totalCredits);
}

function updateAnalysis(subjects, tgpa, totalCredits) {
    const container = document.getElementById('analysisContent');

    if (subjects.length === 0) {
        container.innerHTML = '<p>Calculate your TGPA first to see the analysis.</p>';
        return;
    }

    const highestGrade = subjects.reduce((a, b) => getGradePoint(a.grade) > getGradePoint(b.grade) ? a : b);
    const lowestGrade = subjects.reduce((a, b) => getGradePoint(a.grade) < getGradePoint(b.grade) ? a : b);
    const avgMarks = subjects.reduce((sum, s) => sum + s.marks, 0) / subjects.length;

    container.innerHTML = `
        <div class="analysis-grid">
            <div class="analysis-card">
                <div class="analysis-card-value gradient-text-purple">${tgpa.toFixed(2)}</div>
                <div class="analysis-card-label">Your TGPA</div>
            </div>
            <div class="analysis-card">
                <div class="analysis-card-value" style="color: var(--accent-teal)">${totalCredits}</div>
                <div class="analysis-card-label">Total Credits</div>
            </div>
            <div class="analysis-card">
                <div class="analysis-card-value" style="color: #22c55e">${highestGrade.grade}</div>
                <div class="analysis-card-label">Highest Grade</div>
            </div>
            <div class="analysis-card">
                <div class="analysis-card-value" style="color: #ef4444">${lowestGrade.grade}</div>
                <div class="analysis-card-label">Lowest Grade</div>
            </div>
            <div class="analysis-card">
                <div class="analysis-card-value" style="color: #f59e0b">${avgMarks.toFixed(1)}</div>
                <div class="analysis-card-label">Average Marks</div>
            </div>
            <div class="analysis-card">
                <div class="analysis-card-value" style="color: var(--accent-indigo)">${subjects.length}</div>
                <div class="analysis-card-label">Subjects</div>
            </div>
        </div>

        <div class="analysis-subject-list">
            <h3 style="margin-bottom: 16px; color: var(--text-primary);">Subject-wise Breakdown</h3>
            ${subjects.map(s => `
                <div class="analysis-subject-item">
                    <div>
                        <span class="analysis-subject-name">${s.name}</span>
                        <span style="color: var(--text-muted); font-size: 0.8rem; margin-left: 8px;">${s.credits} credits · ${s.marks} marks</span>
                    </div>
                    <span class="analysis-grade-badge" style="background: ${getGradeColor(s.grade)}20; color: ${getGradeColor(s.grade)}">${s.grade} (${s.gradePoint})</span>
                </div>
            `).join('')}
        </div>
    `;
}

function resetTGPA() {
    document.getElementById('subjectRows').innerHTML = '';
    document.getElementById('tgpaResult').style.display = 'none';
    document.getElementById('analysisContent').innerHTML = '<p>Calculate your TGPA first to see the analysis.</p>';
    subjectCount = 0;
    addSubjectRow();
}

function loadBTech() {
    document.getElementById('subjectRows').innerHTML = '';
    subjectCount = 0;

    const subjects = [
        { name: 'Mathematics', credits: 4 },
        { name: 'Physics', credits: 4 },
        { name: 'Programming', credits: 4 },
        { name: 'Electronics', credits: 3 },
        { name: 'English', credits: 2 },
        { name: 'Workshop', credits: 1 }
    ];

    subjects.forEach(s => addSubjectRow(s.name, s.credits));
}

function loadBBA() {
    document.getElementById('subjectRows').innerHTML = '';
    subjectCount = 0;

    const subjects = [
        { name: 'Business Communication', credits: 3 },
        { name: 'Financial Accounting', credits: 4 },
        { name: 'Marketing Management', credits: 3 },
        { name: 'Organizational Behavior', credits: 3 },
        { name: 'Economics', credits: 3 },
        { name: 'Business Law', credits: 2 }
    ];

    subjects.forEach(s => addSubjectRow(s.name, s.credits));
}

// ===== CGPA CALCULATOR =====
function initCGPA() {
    document.getElementById('calcCgpaBtn').addEventListener('click', calculateCGPA);
    document.getElementById('cgpaReset').addEventListener('click', resetCGPA);

    // Live update
    for (let i = 1; i <= 8; i++) {
        document.getElementById(`sem${i}`).addEventListener('input', () => {
            // Optional: could do live calculation
        });
    }
}

function calculateCGPA() {
    let total = 0;
    let count = 0;

    for (let i = 1; i <= 8; i++) {
        const val = parseFloat(document.getElementById(`sem${i}`).value);
        if (!isNaN(val) && val > 0) {
            total += val;
            count++;
        }
    }

    const cgpa = count > 0 ? total / count : 0;
    const emojiEl = document.getElementById('cgpaEmoji');
    const messageEl = document.getElementById('cgpaMessage');
    const displayEl = document.getElementById('cgpaValueDisplay');
    const valueEl = document.getElementById('cgpaValue');

    if (count === 0) {
        emojiEl.textContent = '✨';
        messageEl.textContent = 'Enter your semester TGPAs to see the future.';
        displayEl.style.display = 'none';
        return;
    }

    displayEl.style.display = 'block';
    valueEl.textContent = cgpa.toFixed(2);

    if (cgpa >= 9) {
        emojiEl.textContent = '🏆';
        messageEl.textContent = 'Outstanding! You\'re a star! 🌟';
    } else if (cgpa >= 8) {
        emojiEl.textContent = '🎊';
        messageEl.textContent = 'Excellent performance! Keep it up!';
    } else if (cgpa >= 7) {
        emojiEl.textContent = '😊';
        messageEl.textContent = 'Good going! Room for improvement.';
    } else if (cgpa >= 6) {
        emojiEl.textContent = '💪';
        messageEl.textContent = 'Average. Push harder next semester!';
    } else if (cgpa >= 5) {
        emojiEl.textContent = '😐';
        messageEl.textContent = 'Below average. Time to focus!';
    } else {
        emojiEl.textContent = '😢';
        messageEl.textContent = 'Needs improvement. Don\'t give up!';
    }
}

function resetCGPA() {
    for (let i = 1; i <= 8; i++) {
        document.getElementById(`sem${i}`).value = '';
    }
    document.getElementById('cgpaEmoji').textContent = '✨';
    document.getElementById('cgpaMessage').textContent = 'Enter your semester TGPAs to see the future.';
    document.getElementById('cgpaValueDisplay').style.display = 'none';
}

// ===== PERCENTAGE TOOLS =====
function initPercentage() {
    const tabs = document.querySelectorAll('.pct-tab');
    const contents = {
        marksToPercent: document.getElementById('pctMarksToPercent'),
        percentToMarks: document.getElementById('pctPercentToMarks'),
        goal: document.getElementById('pctGoal')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            Object.values(contents).forEach(c => c.classList.remove('active'));
            contents[tab.dataset.pcttab].classList.add('active');
        });
    });

    // Calculate Percentage
    document.getElementById('calcPercentBtn').addEventListener('click', () => {
        const total = parseFloat(document.getElementById('pctTotalMarks').value);
        const obtained = parseFloat(document.getElementById('pctObtainedMarks').value);

        if (isNaN(total) || isNaN(obtained) || total === 0) return;

        const percent = (obtained / total) * 100;
        document.getElementById('pctResult').style.display = 'block';
        document.getElementById('pctResultValue').textContent = percent.toFixed(2) + '%';
    });

    // Calculate Marks from percentage
    document.getElementById('calcMarksBtn').addEventListener('click', () => {
        const total = parseFloat(document.getElementById('pctTotalMarks2').value);
        const targetPct = parseFloat(document.getElementById('pctTargetPercent').value);

        if (isNaN(total) || isNaN(targetPct)) return;

        const marks = (targetPct / 100) * total;
        document.getElementById('marksResult').style.display = 'block';
        document.getElementById('marksResultValue').textContent = marks.toFixed(1);
    });

    // Calculate Goal
    document.getElementById('calcGoalBtn').addEventListener('click', () => {
        const total = parseFloat(document.getElementById('goalTotalMarks').value);
        const current = parseFloat(document.getElementById('goalCurrentMarks').value);
        const remaining = parseFloat(document.getElementById('goalRemainingMax').value);
        const targetPct = parseFloat(document.getElementById('goalTargetPct').value);

        if (isNaN(total) || isNaN(current) || isNaN(remaining) || isNaN(targetPct)) return;

        const targetMarks = (targetPct / 100) * total;
        const needed = targetMarks - current;

        const resultEl = document.getElementById('goalResult');
        const valueEl = document.getElementById('goalResultValue');

        resultEl.style.display = 'block';

        if (needed <= 0) {
            valueEl.textContent = '🎉 Already achieved!';
        } else if (needed > remaining) {
            valueEl.textContent = `${needed.toFixed(1)} (Not possible with ${remaining} remaining)`;
            valueEl.style.color = '#ef4444';
            valueEl.style.webkitTextFillColor = '#ef4444';
            valueEl.style.background = 'none';
        } else {
            valueEl.textContent = `${needed.toFixed(1)} / ${remaining}`;
            valueEl.style.color = '';
            valueEl.style.webkitTextFillColor = '';
            valueEl.style.background = '';
        }
    });
}

// ===== BONUS ATTENDANCE CALCULATOR =====
function initAttendance() {
    document.getElementById('calcAttendanceBtn').addEventListener('click', calculateAttendance);
    
    // Toggle logic for first week attendance
    const firstWeekToggle = document.getElementById('attendedFirstWeekToggle');
    const missedClassesGroup = document.getElementById('missedClassesGroup');

    if(firstWeekToggle) {
        firstWeekToggle.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if(btn.classList.contains('active')) return;
                
                firstWeekToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if(btn.dataset.value === 'no') {
                    missedClassesGroup.style.display = 'none';
                    document.getElementById('missedClasses').value = '';
                } else {
                    missedClassesGroup.style.display = 'block';
                }
            });
        });
    }
}

function calculateAttendance() {
    const currentAgg = parseFloat(document.getElementById('currentAggregate').value);
    const currentSub = parseFloat(document.getElementById('currentSubject').value);
    const prevSem = parseFloat(document.getElementById('prevAvg').value);
    
    const attendedFirstWeekBtn = document.querySelector('#attendedFirstWeekToggle .toggle-btn.active');
    const attendedFirstWeek = attendedFirstWeekBtn ? attendedFirstWeekBtn.dataset.value === 'yes' : true;
    
    let missedClasses = 0;
    if(attendedFirstWeek) {
        missedClasses = parseInt(document.getElementById('missedClasses').value) || 0;
    }

    const percentEl = document.getElementById('attendancePercent');
    const finalAggEl = document.getElementById('finalAggregate');
    const finalSubEl = document.getElementById('finalSubject');
    const adviceEl = document.getElementById('attendanceAdvice');

    if (isNaN(currentAgg) || isNaN(currentSub)) {
        adviceEl.textContent = 'Please enter at least current aggregate and subject attendance.';
        adviceEl.className = 'attendance-advice need-attend';
        return;
    }

    let bonus = 0;
    let grace = 0;
    let message = "";

    const validPrevSem = !isNaN(prevSem) ? prevSem : 0;

    if (currentAgg <= 50) {
        message = "No bonus allowed (<= 50% attendance). ";
    } else {
        if (attendedFirstWeek) {
            // First week attendance bonus based on 1st semester performance
            if (validPrevSem >= 95) bonus = 10;
            else if (validPrevSem >= 90) bonus = 8;
            else if (validPrevSem >= 85) bonus = 6;
            else if (validPrevSem >= 80) bonus = 4;
            else if (validPrevSem >= 75) bonus = 2;
            
            // Deduction for missed classes > 2
            if (missedClasses > 2) {
                const deduction = (missedClasses - 2) * 2; // Reduce by 2% for each additional class missed
                const originalBonus = bonus;
                bonus = Math.max(0, bonus - deduction);
                
                if (originalBonus > 0) {
                    message = `Missed ${missedClasses} classes. Bonus reduced from ${originalBonus}% to ${bonus}%. `;
                }
            } else if (bonus > 0 && missedClasses > 0) {
                 message = `Missed ${missedClasses} classes. Full bonus retained. `;
            }
        }

        if (bonus > 0) {
            if (!message) message = `Allocated ${bonus}% bonus! `;
        } else if (currentAgg < 75) {
            // Give 2.5% grace if aggregate is below 75% and no other bonus is given
            grace = 2.5; 
            if (message) {
                message += " Eligible for ~2.5% grace. ";
            } else {
                message = "Eligible for ~2.5% grace based on 1st semester record. ";
            }
        } else {
            if (!message) message = "No bonus needed/allocated. ";
        }
    }

    const appliedBonus = bonus > 0 ? bonus : grace;
    const finalAgg = currentAgg + appliedBonus;
    const finalSub = currentSub + appliedBonus;

    percentEl.textContent = `+${appliedBonus}%`;
    finalAggEl.textContent = `${finalAgg.toFixed(1)}%`;
    finalSubEl.textContent = `${finalSub.toFixed(1)}%`;
    
    let adviceClass = "attendance-advice";
    let statusMsg = "";

    if (finalSub < 65) {
        statusMsg += "High chance of backlog in subject (<65%).";
        adviceClass += " need-attend";
    } else if (finalAgg < 75) {
        statusMsg += "Aggregate shortage (<75%).";
        adviceClass += " need-attend";
    } else {
        statusMsg += "Safe! Requirements met ✅";
        adviceClass += " can-bunk";
    }

    adviceEl.textContent = message + statusMsg;
    adviceEl.className = adviceClass;
}

// ===== CHATBOT LOGIC =====
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput');
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatBody = document.getElementById('chatBody');
    const chatSuggestions = document.getElementById('chatSuggestions');

    if(!chatbotToggle) return;

    chatbotToggle.addEventListener('click', () => {
        chatWindow.classList.add('active');
        chatbotToggle.classList.add('open');
        chatInput.focus();
    });

    chatClose.addEventListener('click', () => {
        chatWindow.classList.remove('active');
        chatbotToggle.classList.remove('open');
    });

    function addMessage(text, sender, suggestions = []) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `chat-message ${sender}`;
        msgDiv.textContent = text;
        
        if(suggestions.length > 0) {
            const sugDiv = document.createElement('div');
            sugDiv.className = 'chat-suggestions';
            suggestions.forEach(s => {
                const chip = document.createElement('span');
                chip.className = 'chat-suggestion-chip';
                chip.textContent = s;
                chip.addEventListener('click', () => {
                    handleUserInput(s);
                });
                sugDiv.appendChild(chip);
            });
            msgDiv.appendChild(sugDiv);
        }
        
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function processInput(input) {
        const lowerInput = input.toLowerCase();
        
        if (lowerInput.includes('bonus') || lowerInput.includes('criteria')) {
            return {
                reply: "Bonus attendance is given if you attended the 1st week! It's based on your 1st Semester record: 95-100% gets 10% bonus, 90-95% gets 8%, 85-90% gets 6%, 80-85% gets 4%, 75-80% gets 2%. Note: Missing >2 classes in the 1st week reduces your bonus!",
                sugs: ["What if I miss classes?", "Grace Rules"]
            };
        } else if (lowerInput.includes('miss') || lowerInput.includes('reduce') || lowerInput.includes('penalty')) {
            return {
                reply: "If you attend the 1st week but miss 1 or 2 classes, your bonus is safe! But if you miss MORE than 2 classes, 2% is deducted from your bonus for every extra class missed.",
                sugs: ["What if I don't attend 1st week?", "Backlog Rule"]
            };
        } else if (lowerInput.includes("don't attend") || lowerInput.includes("not attend") || lowerInput.includes("grace") || lowerInput.includes("first week")) {
            return {
                reply: "If you didn't attend the 1st week, you don't get the performance bonus. BUT, if your overall attendance is below 75%, you might be given a 2.5% grace buffer based on your previous record to help you out.",
                sugs: ["Under 50%", "Backlog Rule"]
            };
        } else if (lowerInput.includes('backlog') || lowerInput.includes('subject') || lowerInput.includes('minimum')) {
            return {
                reply: "You need AT LEAST 65% attendance in each individual subject. If any subject falls below 65% (even after bonus/grace), you have a HIGH chance of getting a backlog in that subject!",
                sugs: ["Under 50%", "Bonus Criteria"]
            };
        } else if (lowerInput.includes('50') || lowerInput.includes('fail') || lowerInput.includes('zero') || lowerInput.includes('under') || lowerInput.includes('below')) {
            return {
                reply: "If your Current Aggregate Attendance is 50% or below, NO bonus or grace will be provided. You are completely ineligible.",
                sugs: ["Bonus Criteria"]
            };
        } else if (lowerInput.includes('hi') || lowerInput.includes('hello')) {
            return {
                reply: "Hello! How can I help you regarding your attendance or result checker today?",
                sugs: ["Bonus Criteria", "Grace Rules"]
            };
        } else {
            let generalReply = "Mujhe iska direct answer nahi pata, but general tip ye hai ki class regular attend karo aur attendance 75% se upar rakho. ";
            if (lowerInput.includes('laptop') || lowerInput.includes('computer') || lowerInput.includes('specs')) {
                generalReply = "Laptop selection ke liye aap homepage par **FindOGlaptop** tool use kar sakte hain, jahan specifications aur courses ke filters available hain!";
            } else if (lowerInput.includes('score') || lowerInput.includes('marks') || lowerInput.includes('result') || lowerInput.includes('sgpa') || lowerInput.includes('cgpa')) {
                generalReply = "Marks aur SGPA/CGPA calculation ke liye aap is dashboard ke **Result Calculator** card ko use karein, wahan weighted calculation pre-coded hai!";
            } else if (lowerInput.includes('counsel') || lowerInput.includes('admission') || lowerInput.includes('cuet')) {
                generalReply = "CUET college admission predictions ke liye humara **CUET Predictor** portal best hai. Aap directly custom cutoffs checklist browse kar sakte hain.";
            } else {
                generalReply += "Aap attendance guidelines (Bonus Criteria, Grace Rules, Backlog Rule) ke baare me detail me pooch sakte hain. Kis subject me attendance weak hai aapki?";
            }
            return {
                reply: generalReply,
                sugs: ["Bonus Criteria", "Grace Rules", "Backlog Rule"]
            };
        }
    }

    function handleUserInput(text) {
        if(!text.trim()) return;
        
        const oldChips = chatBody.querySelectorAll('.chat-suggestion-chip');
        oldChips.forEach(chip => chip.style.pointerEvents = 'none');

        addMessage(text, 'user');
        chatInput.value = '';

        setTimeout(() => {
            const response = processInput(text);
            addMessage(response.reply, 'bot', response.sugs);
        }, 400); 
    }

    chatSendBtn.addEventListener('click', () => {
        handleUserInput(chatInput.value);
    });

    chatInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            handleUserInput(chatInput.value);
        }
    });

    if(chatSuggestions) {
        chatSuggestions.querySelectorAll('.chat-suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                handleUserInput(chip.textContent);
            });
        });
    }
}
