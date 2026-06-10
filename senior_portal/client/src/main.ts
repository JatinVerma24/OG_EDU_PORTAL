import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

// Global fetch wrapper with Firebase ID Token
async function authFetch(url: string, options: any = {}) {
    const user = auth.currentUser;
    if (user) {
        const token = await user.getIdToken();
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    return fetch(url, options);
}

// Listen for auth state changes
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "/senior/auth.html";
        return;
    }

    // Update UI with user info
    const logoSub = document.querySelector('.logo-sub');
    if (logoSub) {
        logoSub.innerHTML = `RESULT CHECKER<br><span style="color: var(--color-primary); font-size: 0.85rem; font-weight: 600; text-transform: none; margin-top: 4px; display: inline-block;">Welcome, ${user.displayName || user.email?.split('@')[0] || 'User'} 👋</span>`;
    }

    // Initializations
    initNavigation();
    initThemeToggle();
    initPassChecker();
    initTGPA();
    initCGPA();
    initPercentage();
    initAttendance();
    initChatbot();
    initResources();
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
            const targetPage = (item as HTMLElement).dataset.page;

            // Update nav
            navItems.forEach(n => n.classList.remove('active'));
            item.classList.add('active');

            // Update pages
            pages.forEach(p => p.classList.remove('active'));
            document.getElementById(`page-${targetPage}`)?.classList.add('active');

            // Close mobile sidebar
            sidebar?.classList.remove('open');
            overlay.classList.remove('active');
            hamburgerBtn?.classList.remove('active');
        });
    });

    // Hamburger
    hamburgerBtn?.addEventListener('click', () => {
        sidebar?.classList.toggle('open');
        overlay.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    });

    overlay.addEventListener('click', () => {
        sidebar?.classList.remove('open');
        overlay.classList.remove('active');
        hamburgerBtn?.classList.remove('active');
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
    if (icon) icon.textContent = savedTheme === 'dark' ? '🌙' : '☀️';

    toggle?.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        html.setAttribute('data-theme', next);
        if (icon) icon.textContent = next === 'dark' ? '🌙' : '☀️';
        localStorage.setItem('jvog-theme', next);
    });
}

// ===== PASS CHECKER =====
function initPassChecker() {
    const examTypeGroup = document.getElementById('examType');
    const subjectTypeGroup = document.getElementById('subjectType');

    // Toggle buttons
    [examTypeGroup, subjectTypeGroup].forEach(group => {
        group?.querySelectorAll('.toggle-btn').forEach(btn => {
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
        document.getElementById(id)?.addEventListener('input', updateVerdict);
    });
}

async function updateVerdict() {
    const examType = (document.querySelector('#examType .toggle-btn.active') as HTMLElement)?.dataset.value;
    const subjectType = (document.querySelector('#subjectType .toggle-btn.active') as HTMLElement)?.dataset.value;

    const attObt = parseFloat((document.getElementById('attObt') as HTMLInputElement).value) || 0;
    const attMax = parseFloat((document.getElementById('attMax') as HTMLInputElement).value) || 0;
    const caObt = parseFloat((document.getElementById('caObt') as HTMLInputElement).value) || 0;
    const caMax = parseFloat((document.getElementById('caMax') as HTMLInputElement).value) || 0;
    const mteObt = parseFloat((document.getElementById('mteObt') as HTMLInputElement).value) || 0;
    const mteMax = parseFloat((document.getElementById('mteMax') as HTMLInputElement).value) || 0;
    const eteObt = parseFloat((document.getElementById('eteObt') as HTMLInputElement).value) || 0;
    const eteMax = parseFloat((document.getElementById('eteMax') as HTMLInputElement).value) || 0;

    const totalObt = attObt + caObt + mteObt + eteObt;
    const totalMax = attMax + caMax + mteMax + eteMax;

    const verdictText = document.getElementById('verdictText');
    const verdictContent = document.getElementById('verdictContent');

    if (totalMax === 0) {
        if (verdictText) {
            verdictText.className = 'verdict-text gradient-text-purple';
            verdictText.textContent = 'Enter your marks to see the verdict';
        }
        // Remove existing details
        const existingDetails = verdictContent?.querySelector('.verdict-details');
        if (existingDetails) existingDetails.remove();
        return;
    }

    if (verdictText) {
        verdictText.className = 'verdict-text gradient-text-purple';
        verdictText.textContent = 'Checking...';
    }

    try {
        const payload = {
            examType,
            subjectType,
            attendance: { obtained: attObt, max: attMax },
            ca: { obtained: caObt, max: caMax },
            mte: subjectType === 'practical' ? { obtained: 0, max: 0 } : { obtained: mteObt, max: mteMax },
            ete: { obtained: eteObt, max: eteMax }
        };

        const response = await authFetch('/api/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.error || 'Failed to check result');
        }

        // Build verdict
        if (verdictText) {
            verdictText.className = 'verdict-text';
            if (result.status === 'PASS') {
                verdictText.classList.add('verdict-pass');
                verdictText.textContent = '✅ PASS';
            } else {
                verdictText.classList.add('verdict-fail');
                if (!result.details.rule1.passed && result.details.rule2.passed) {
                    verdictText.textContent = '❌ FAIL (Min criteria not met)';
                } else {
                    verdictText.textContent = '❌ FAIL';
                }
            }
        }

        // Details
        let detailsDiv = verdictContent?.querySelector('.verdict-details');
        if (!detailsDiv) {
            detailsDiv = document.createElement('div');
            detailsDiv.classList.add('verdict-details');
            verdictContent?.appendChild(detailsDiv);
        }

        const rule2Score = result.details.rule2.score ? parseFloat(result.details.rule2.score) : ((totalObt / totalMax) * 100);

        detailsDiv.innerHTML = `
            <p>Total: ${totalObt} / ${totalMax}</p>
            <p>Min Marks Criteria: ${result.details.rule1.passed ? 'PASSED' : 'FAILED'} (${result.details.rule1.reason})</p>
            <p>Overall Weightage: ${result.details.rule2.passed ? 'PASSED' : 'FAILED'} (${result.details.rule2.reason})</p>
            <p class="total-percentage ${result.status === 'PASS' ? 'verdict-pass' : 'verdict-fail'}">${rule2Score.toFixed(1)}%</p>
        `;
    } catch (err) {
        console.error("Calculation API Error:", err);
        if (verdictText) {
            verdictText.className = 'verdict-text verdict-fail';
            verdictText.textContent = '❌ Connection Error';
        }
    }
}

// ===== TGPA CALCULATOR =====
let subjectCount = 0;
let relativeGrading = false;

function initTGPA() {
    addSubjectRow(); // Start with one row

    document.getElementById('addSubjectBtn')?.addEventListener('click', () => addSubjectRow());
    document.getElementById('calcTgpaBtn')?.addEventListener('click', calculateTGPA);
    document.getElementById('tgpaReset')?.addEventListener('click', resetTGPA);
    document.getElementById('loadBtech')?.addEventListener('click', loadBTech);
    document.getElementById('loadBba')?.addEventListener('click', loadBBA);

    // Toggle relative grading
    const toggleRel = document.getElementById('toggleRelative');
    toggleRel?.addEventListener('click', () => {
        relativeGrading = !relativeGrading;
        toggleRel.classList.toggle('active', relativeGrading);
        toggleRel.textContent = relativeGrading ? 'Disable Relative Grading' : 'Enable Relative Grading';
    });

    // Tabs
    document.getElementById('tabMarksInput')?.addEventListener('click', () => switchTGPATab('marks-input'));
    document.getElementById('tabAnalysis')?.addEventListener('click', () => switchTGPATab('analysis'));
}

function switchTGPATab(tab: string) {
    document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

    if (tab === 'marks-input') {
        document.getElementById('tabMarksInput')?.classList.add('active');
        document.getElementById('tabContentMarks')?.classList.add('active');
    } else {
        document.getElementById('tabAnalysis')?.classList.add('active');
        document.getElementById('tabContentAnalysis')?.classList.add('active');
    }
}

function addSubjectRow(name = '', credits = 3, marks = '') {
    subjectCount++;
    const row = document.createElement('div');
    row.classList.add('subject-row');
    row.dataset.id = subjectCount.toString();

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
    row.querySelector('.marks-field')?.addEventListener('input', (e) => {
        const marksVal = parseFloat((e.target as HTMLInputElement).value);
        const gradeDisplay = row.querySelector('.grade-display');
        if (gradeDisplay) {
            if (isNaN(marksVal) || marksVal < 0) {
                gradeDisplay.textContent = '-';
            } else {
                gradeDisplay.textContent = getGrade(marksVal);
            }
        }
    });

    // Remove button
    row.querySelector('.remove-subject-btn')?.addEventListener('click', () => {
        row.remove();
    });

    document.getElementById('subjectRows')?.appendChild(row);
}

function getGrade(marks: number) {
    if (marks >= 90) return 'A+';
    if (marks >= 80) return 'A';
    if (marks >= 70) return 'B+';
    if (marks >= 60) return 'B';
    if (marks >= 50) return 'C+';
    if (marks >= 40) return 'C';
    if (marks >= 35) return 'D';
    return 'F';
}

function getGradePoint(grade: string) {
    const gradePoints: any = {
        'A+': 10, 'A': 9, 'B+': 8, 'B': 7,
        'C+': 6, 'C': 5, 'D': 4, 'F': 0
    };
    return gradePoints[grade] || 0;
}

function getGradeColor(grade: string) {
    const colors: any = {
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
    const subjectData: any[] = [];

    rows.forEach(row => {
        const name = (row.querySelector('.subject-name-input') as HTMLInputElement).value || 'Unnamed';
        const credits = parseInt((row.querySelector('.credit-btn.active') as HTMLElement)?.dataset.credit || '3');
        const marks = parseFloat((row.querySelector('.marks-field') as HTMLInputElement).value);

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
    const resultEl = document.getElementById('tgpaResult');
    if (resultEl) resultEl.style.display = 'block';
    const valueEl = document.getElementById('tgpaValue');
    if (valueEl) valueEl.textContent = tgpa.toFixed(2);

    // Update analysis
    updateAnalysis(subjectData, tgpa, totalCredits);
}

function updateAnalysis(subjects: any[], tgpa: number, totalCredits: number) {
    const container = document.getElementById('analysisContent');
    if (!container) return;

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
    const rows = document.getElementById('subjectRows');
    if (rows) rows.innerHTML = '';
    const resEl = document.getElementById('tgpaResult');
    if (resEl) resEl.style.display = 'none';
    const analysis = document.getElementById('analysisContent');
    if (analysis) analysis.innerHTML = '<p>Calculate your TGPA first to see the analysis.</p>';
    subjectCount = 0;
    addSubjectRow();
}

function loadBTech() {
    const rows = document.getElementById('subjectRows');
    if (rows) rows.innerHTML = '';
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
    const rows = document.getElementById('subjectRows');
    if (rows) rows.innerHTML = '';
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
    document.getElementById('calcCgpaBtn')?.addEventListener('click', calculateCGPA);
    document.getElementById('cgpaReset')?.addEventListener('click', resetCGPA);

    for (let i = 1; i <= 8; i++) {
        document.getElementById(`sem${i}`)?.addEventListener('input', () => {
            // Optional: live calculation
        });
    }
}

function calculateCGPA() {
    let total = 0;
    let count = 0;

    for (let i = 1; i <= 8; i++) {
        const val = parseFloat((document.getElementById(`sem${i}`) as HTMLInputElement).value);
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
        if (emojiEl) emojiEl.textContent = '✨';
        if (messageEl) messageEl.textContent = 'Enter your semester TGPAs to see the future.';
        if (displayEl) displayEl.style.display = 'none';
        return;
    }

    if (displayEl) displayEl.style.display = 'block';
    if (valueEl) valueEl.textContent = cgpa.toFixed(2);

    if (emojiEl && messageEl) {
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
}

function resetCGPA() {
    for (let i = 1; i <= 8; i++) {
        const input = document.getElementById(`sem${i}`) as HTMLInputElement;
        if (input) input.value = '';
    }
    const emoji = document.getElementById('cgpaEmoji');
    if (emoji) emoji.textContent = '✨';
    const msg = document.getElementById('cgpaMessage');
    if (msg) msg.textContent = 'Enter your semester TGPAs to see the future.';
    const disp = document.getElementById('cgpaValueDisplay');
    if (disp) disp.style.display = 'none';
}

// ===== PERCENTAGE TOOLS =====
function initPercentage() {
    const tabs = document.querySelectorAll('.pct-tab');
    const contents: any = {
        marksToPercent: document.getElementById('pctMarksToPercent'),
        percentToMarks: document.getElementById('pctPercentToMarks'),
        goal: document.getElementById('pctGoal')
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            Object.values(contents).forEach((c: any) => c.classList.remove('active'));
            contents[(tab as HTMLElement).dataset.pcttab as string].classList.add('active');
        });
    });

    document.getElementById('calcPercentBtn')?.addEventListener('click', () => {
        const total = parseFloat((document.getElementById('pctTotalMarks') as HTMLInputElement).value);
        const obtained = parseFloat((document.getElementById('pctObtainedMarks') as HTMLInputElement).value);

        if (isNaN(total) || isNaN(obtained) || total === 0) return;

        const percent = (obtained / total) * 100;
        const res = document.getElementById('pctResult');
        if (res) res.style.display = 'block';
        const val = document.getElementById('pctResultValue');
        if (val) val.textContent = percent.toFixed(2) + '%';
    });

    document.getElementById('calcMarksBtn')?.addEventListener('click', () => {
        const total = parseFloat((document.getElementById('pctTotalMarks2') as HTMLInputElement).value);
        const targetPct = parseFloat((document.getElementById('pctTargetPercent') as HTMLInputElement).value);

        if (isNaN(total) || isNaN(targetPct)) return;

        const marks = (targetPct / 100) * total;
        const res = document.getElementById('marksResult');
        if (res) res.style.display = 'block';
        const val = document.getElementById('marksResultValue');
        if (val) val.textContent = marks.toFixed(1);
    });

    document.getElementById('calcGoalBtn')?.addEventListener('click', () => {
        const total = parseFloat((document.getElementById('goalTotalMarks') as HTMLInputElement).value);
        const current = parseFloat((document.getElementById('goalCurrentMarks') as HTMLInputElement).value);
        const remaining = parseFloat((document.getElementById('goalRemainingMax') as HTMLInputElement).value);
        const targetPct = parseFloat((document.getElementById('goalTargetPct') as HTMLInputElement).value);

        if (isNaN(total) || isNaN(current) || isNaN(remaining) || isNaN(targetPct)) return;

        const targetMarks = (targetPct / 100) * total;
        const needed = targetMarks - current;

        const resultEl = document.getElementById('goalResult');
        const valueEl = document.getElementById('goalResultValue');

        if (resultEl) resultEl.style.display = 'block';

        if (valueEl) {
            if (needed <= 0) {
                valueEl.textContent = '🎉 Already achieved!';
            } else if (needed > remaining) {
                valueEl.textContent = `${needed.toFixed(1)} (Not possible with ${remaining} remaining)`;
                valueEl.style.color = '#ef4444';
                // valueEl.style.webkitTextFillColor = '#ef4444';
                valueEl.style.background = 'none';
            } else {
                valueEl.textContent = `${needed.toFixed(1)} / ${remaining}`;
                valueEl.style.color = '';
                // valueEl.style.webkitTextFillColor = '';
                valueEl.style.background = '';
            }
        }
    });
}

// ===== BONUS ATTENDANCE CALCULATOR =====
function initAttendance() {
    document.getElementById('calcAttendanceBtn')?.addEventListener('click', calculateAttendance);
    
    const firstWeekToggle = document.getElementById('attendedFirstWeekToggle');
    const missedClassesGroup = document.getElementById('missedClassesGroup');

    if(firstWeekToggle) {
        firstWeekToggle.querySelectorAll('.toggle-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if(btn.classList.contains('active')) return;
                
                firstWeekToggle.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                if(missedClassesGroup) {
                    if((btn as HTMLElement).dataset.value === 'no') {
                        missedClassesGroup.style.display = 'none';
                        (document.getElementById('missedClasses') as HTMLInputElement).value = '';
                    } else {
                        missedClassesGroup.style.display = 'block';
                    }
                }
            });
        });
    }
}

function calculateAttendance() {
    const currentAgg = parseFloat((document.getElementById('currentAggregate') as HTMLInputElement).value);
    const currentSub = parseFloat((document.getElementById('currentSubject') as HTMLInputElement).value);
    const prevSem = parseFloat((document.getElementById('prevAvg') as HTMLInputElement).value);
    
    const attendedFirstWeekBtn = document.querySelector('#attendedFirstWeekToggle .toggle-btn.active') as HTMLElement;
    const attendedFirstWeek = attendedFirstWeekBtn ? attendedFirstWeekBtn.dataset.value === 'yes' : true;
    
    let missedClasses = 0;
    if(attendedFirstWeek) {
        missedClasses = parseInt((document.getElementById('missedClasses') as HTMLInputElement).value) || 0;
    }

    const percentEl = document.getElementById('attendancePercent');
    const finalAggEl = document.getElementById('finalAggregate');
    const finalSubEl = document.getElementById('finalSubject');
    const adviceEl = document.getElementById('attendanceAdvice');

    if (isNaN(currentAgg) || isNaN(currentSub)) {
        if (adviceEl) {
            adviceEl.textContent = 'Please enter at least current aggregate and subject attendance.';
            adviceEl.className = 'attendance-advice need-attend';
        }
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
            if (validPrevSem >= 95) bonus = 10;
            else if (validPrevSem >= 90) bonus = 8;
            else if (validPrevSem >= 85) bonus = 6;
            else if (validPrevSem >= 80) bonus = 4;
            else if (validPrevSem >= 75) bonus = 2;
            
            if (missedClasses > 2) {
                const deduction = (missedClasses - 2) * 2;
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

    if (percentEl) percentEl.textContent = `+${appliedBonus}%`;
    if (finalAggEl) finalAggEl.textContent = `${finalAgg.toFixed(1)}%`;
    if (finalSubEl) finalSubEl.textContent = `${finalSub.toFixed(1)}%`;
    
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

    if (adviceEl) {
        adviceEl.textContent = message + statusMsg;
        adviceEl.className = adviceClass;
    }
}

// ===== CHATBOT LOGIC =====
function initChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatWindow = document.getElementById('chatWindow');
    const chatClose = document.getElementById('chatClose');
    const chatInput = document.getElementById('chatInput') as HTMLInputElement;
    const chatSendBtn = document.getElementById('chatSendBtn');
    const chatBody = document.getElementById('chatBody');
    const chatSuggestions = document.getElementById('chatSuggestions');

    if(!chatbotToggle) return;

    chatbotToggle.addEventListener('click', () => {
        chatWindow?.classList.add('active');
        chatbotToggle.classList.add('open');
        chatInput?.focus();
    });

    chatClose?.addEventListener('click', () => {
        chatWindow?.classList.remove('active');
        chatbotToggle.classList.remove('open');
    });

    function addMessage(text: string, sender: string, suggestions: string[] = []) {
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
        
        chatBody?.appendChild(msgDiv);
        if (chatBody) chatBody.scrollTop = chatBody.scrollHeight;
    }

    function processInput(input: string) {
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
            return {
                reply: "I'm not quite sure. You can ask me about Bonus Criteria, Grace Rules, Backlog Risks, or Missed Classes penalties!",
                sugs: ["Bonus Criteria", "Grace Rules", "Backlog Rule"]
            };
        }
    }

    function handleUserInput(text: string) {
        if(!text.trim()) return;
        
        const oldChips = chatBody?.querySelectorAll('.chat-suggestion-chip');
        oldChips?.forEach(chip => (chip as HTMLElement).style.pointerEvents = 'none');

        addMessage(text, 'user');
        if (chatInput) chatInput.value = '';

        setTimeout(() => {
            const response = processInput(text);
            addMessage(response.reply, 'bot', response.sugs);
        }, 400); 
    }

    chatSendBtn?.addEventListener('click', () => {
        handleUserInput(chatInput?.value || '');
    });

    chatInput?.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') {
            handleUserInput(chatInput.value);
        }
    });

    if(chatSuggestions) {
        chatSuggestions.querySelectorAll('.chat-suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                handleUserInput(chip.textContent || '');
            });
        });
    }
}

// ===== SUBJECT RESOURCES =====
function initResources() {
    const unitsGrid = document.getElementById('resUnitsGrid');
    const loadingMsg = document.getElementById('resLoadingMsg');
    const viewer = document.getElementById('resViewer');
    const viewerTitle = document.getElementById('resViewerTitle');
    const viewerLoading = document.getElementById('resViewerLoading');
    const markdownBody = document.getElementById('resMarkdownBody');
    const backBtn = document.getElementById('resBackBtn');

    if (!unitsGrid) return;

    // Configure marked
    if ((window as any).marked) {
        (window as any).marked.setOptions({ breaks: true, gfm: true });
    }

    // Fetch unit list
    authFetch('/api/notes')
        .then(r => r.json())
        .then(data => {
            if (loadingMsg) loadingMsg.remove();

            data.units.forEach((unit: any) => {
                const card = document.createElement('div');
                card.className = 'res-unit-card';
                card.style.setProperty('--unit-color', unit.color);
                card.innerHTML = `
                    <div class="res-unit-icon">${unit.icon}</div>
                    <div class="res-unit-info">
                        <h3 class="res-unit-title">${unit.title}</h3>
                        <p class="res-unit-sub">Tap to read notes</p>
                    </div>
                    <div class="res-unit-arrow">→</div>
                `;
                card.addEventListener('click', () => loadUnit(unit));
                unitsGrid.appendChild(card);
            });
        })
        .catch(err => {
            if (loadingMsg) loadingMsg.innerHTML = '<p style="color:#ef4444">⚠️ Failed to load units.</p>';
            console.error('Notes API error:', err);
        });

    function loadUnit(unit: any) {
        if (!unitsGrid || !viewer || !viewerLoading || !markdownBody || !viewerTitle) return;

        unitsGrid.style.display = 'none';
        viewer.style.display = 'block';
        viewerLoading.style.display = 'flex';
        markdownBody.innerHTML = '';
        viewerTitle.innerHTML = `<span>${unit.icon}</span> ${unit.title}`;

        authFetch(`/api/notes/${unit.id}`)
            .then(r => r.json())
            .then(data => {
                viewerLoading.style.display = 'none';
                if ((window as any).marked) {
                    markdownBody.innerHTML = (window as any).marked.parse(data.content);
                } else {
                    markdownBody.innerHTML = `<pre style="white-space:pre-wrap">${data.content}</pre>`;
                }
                // Syntax highlight
                if ((window as any).hljs) {
                    markdownBody.querySelectorAll('pre code').forEach((block) => {
                        (window as any).hljs.highlightElement(block);
                    });
                }
                markdownBody.scrollTop = 0;
                const mainContent = document.getElementById('mainContent');
                if (mainContent) mainContent.scrollTop = 0;
            })
            .catch(err => {
                viewerLoading.style.display = 'none';
                markdownBody.innerHTML = `<p style="color:#ef4444">Failed to load notes: ${err.message}</p>`;
            });
    }

    backBtn?.addEventListener('click', () => {
        if (viewer) viewer.style.display = 'none';
        if (unitsGrid) unitsGrid.style.display = 'grid';
        if (markdownBody) markdownBody.innerHTML = '';
    });
}
