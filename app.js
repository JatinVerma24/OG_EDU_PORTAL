// Global State
let programmeData = [];
let filteredData = [];
let visibleCount = 24;
let pinnedProgramme = null;
let checklistState = {};

// Target Date for Countdown: July 17, 2026
const targetDate = new Date('2026-07-17T09:00:00+05:30'); // 9 AM IST

// On-Arrival Reporting Steps Content
const reportingSteps = [
    {
        title: "24-Hour Free Pick-up Service",
        desc: "LPU offers free 24-hour pick-up service for all incoming freshers from nearby railway stations (Phagwara Jn, Jalandhar Cantt) and the Phagwara bus stand. To avail this, log into your LPUADMIT portal under 'Travel Arrangements' and submit your travel details at least 48 hours prior. LPU student help desks will be stationed at the exit gates to guide you."
    },
    {
        title: "Entry & Venue: Baldev Raj Mittal Unipolis",
        desc: "Once you arrive at the campus main gates, campus security and signs will direct you to the Baldev Raj Mittal Unipolis, the central reporting hub. This is where all help desks, document verification counters, and account activation support are located. Bring your heavy luggage here; bag-storage facility is available."
    },
    {
        title: "QR Scan & OTP Validation",
        desc: "At the entry of Unipolis, scan the official reporting QR code with your mobile. This will redirect you to download your 'Reporting & Induction Sheet.' Complete the login and validate with the OTP sent to your registered mobile number. This digital sheet tracks your progress through the registration counters."
    },
    {
        title: "Counter Verification & Sheet Stamping",
        desc: "You must visit the designated counters for document verification, eligibility checks, and fee clearance. Show your original documents and submit 3 sets of photocopies. Collect your physical Checklist Document from the help desk. Ensure that the coordinator stamps your digital/physical sheet at each counter. Warning: Leaving any step unstamped will block your class attendance."
    },
    {
        title: "Residential Slip & Hostel Check-in",
        desc: "Once all verification stamps are marked as completed and outstanding dues are verified as cleared, your status on the portal will update to 'Reported.' You can then download your 'Residential Reporting Slip' directly on LPUADMIT. Proceed to your allotted Hostel Block (BH/GH) reception, show this slip, and collect your keys."
    }
];

let activeReportingStep = 0;

// Induction Vibe Tabs Content
const vibeTabs = {
    orientation: {
        title: "Academic Systems & Portals Walkthrough",
        desc: "Get a detailed walkthrough of LPU's academic ecosystem. Academicians and senior mentors will guide you in setting up and navigating your daily tools:",
        bullets: [
            "<strong>UMS (University Management System):</strong> Your daily dashboard for monitoring class attendance, checking assignment marks, and viewing timetables.",
            "<strong>Evaluation Criteria:</strong> Insights into internal marks, mid-term examinations, and final end-term grading rules.",
            "<strong>LPU Touch App:</strong> Complete the setup on your smartphone so you can submit queries, request leaves, and check notifications instantly."
        ],
        icon: "fa-laptop-code"
    },
    career: {
        title: "Classroom to Corporate Placement Roadmap",
        desc: "LPU starts training you for placements from your very first year. Learn about the resources and support networks designed to secure high-tier placements:",
        bullets: [
            "<strong>PEP (Placement Enhancement Programme):</strong> Weekly training starting early in your course covering soft skills, coding challenges, and mock interviews.",
            "<strong>Industry Certifications:</strong> Gain access to specialized tie-ups with Google, Microsoft, AWS, and Salesforce to learn in-demand skills.",
            "<strong>Placement Drives:</strong> Explore LPU's placement cell networks hosting recruitment drives with top MNCs and Fortune 500 companies."
        ],
        icon: "fa-graduation-cap"
    },
    culture: {
        title: "Cultural Showcases & Student Engagement",
        desc: "College life is about self-expression. Induction highlights the vibrant campus culture with high-energy activities:",
        bullets: [
            "<strong>Band Performances & Cypher:</strong> Enjoy performances by LPU's music society and participate in outdoor cypher dance battles.",
            "<strong>Youth Vibe & Clubs:</strong> Introduction to 60+ student-led clubs spanning robotics, literature, theatre, social service, and gaming.",
            "<strong>Auditions & Talent Hunt:</strong> Register for upcoming cultural, athletic, and innovation trials to represent LPU at national tournaments."
        ],
        icon: "fa-champagne-glasses"
    },
    connect: {
        title: "LPU Engage Pre-Induction Portal",
        desc: "Before regular classes begin, get a head start using the self-paced 'LPU Engage' portal to master basic concepts and fit in easily:",
        bullets: [
            "<strong>Bridge Courses:</strong> Self-paced modules covering fundamental math, logic, or writing concepts tailored to your discipline.",
            "<strong>Virtual Interactions:</strong> Pre-campus webinars with department heads and career counselors to clarify doubts.",
            "<strong>Value-Added Courses:</strong> Free access to micro-credentials to boost your resume before you even attend your first lecture."
        ],
        icon: "fa-link"
    }
};

// DOM Elements
const elements = {
    themeToggle: document.getElementById('theme-toggle'),
    countdown: {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds')
    },
    searchInput: document.getElementById('search-input'),
    clearSearchBtn: document.getElementById('clear-search-btn'),
    eligibilityFilter: document.getElementById('eligibility-filter'),
    disciplineFilter: document.getElementById('discipline-filter'),
    facultyFilter: document.getElementById('faculty-filter'),
    resultsCount: document.getElementById('results-count'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    loader: document.getElementById('loader'),
    resultsGrid: document.getElementById('results-grid'),
    emptyState: document.getElementById('empty-state'),
    emptyResetBtn: document.getElementById('empty-reset-btn'),
    
    // Reporting Steps
    stepProgressItems: document.querySelectorAll('.step-progress-item'),
    stepBadgeNum: document.getElementById('step-badge-num'),
    stepDetailTitle: document.getElementById('step-detail-title'),
    stepDetailDescription: document.getElementById('step-detail-description'),
    prevStepBtn: document.getElementById('prev-step-btn'),
    nextStepBtn: document.getElementById('next-step-btn'),
    
    // Vibe Tabs
    vibeTabBtns: document.querySelectorAll('.vibe-tab-btn'),
    vibeTabContent: document.getElementById('vibe-tab-content'),

    // Pinned Area
    myPlanSection: document.getElementById('my-plan-section'),
    unpinBtn: document.getElementById('unpin-btn'),
    pinnedFaculty: document.getElementById('pinned-faculty'),
    pinnedTitle: document.getElementById('pinned-title'),
    pinnedCode: document.getElementById('pinned-code'),
    pinnedDuration: document.getElementById('pinned-duration'),
    pinnedEligibility: document.getElementById('pinned-eligibility'),
    pinnedReporting: document.getElementById('pinned-reporting-date'),
    pinnedInduction: document.getElementById('pinned-induction-date'),
    pinnedClass: document.getElementById('pinned-class-date'),
    addCalendarBtn: document.getElementById('add-calendar-btn'),
    shareScheduleBtn: document.getElementById('share-schedule-btn'),
    
    // Checklist
    checklistProgress: document.getElementById('checklist-progress'),
    checklistList: document.getElementById('checklist-items-list'),
    resetChecklistBtn: document.getElementById('reset-checklist-btn'),
    
    // Toast
    toast: document.getElementById('toast'),
    toastMessage: document.getElementById('toast-message')
};

// Initialize Application
document.addEventListener('DOMContentLoaded', async () => {
    initTheme();
    initCountdown();
    initFAQ();
    initReportingSteps();
    initVibeTabs();
    await loadData();
    initEvents();
    checkPinnedFromStorage();
});

// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark-theme';
    document.body.className = savedTheme;
    updateThemeIcon(savedTheme);
    
    elements.themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.className = 'light-theme';
            localStorage.setItem('theme', 'light-theme');
            updateThemeIcon('light-theme');
            showToast("Switched to Light Theme", "success");
        } else {
            document.body.className = 'dark-theme';
            localStorage.setItem('theme', 'dark-theme');
            updateThemeIcon('dark-theme');
            showToast("Switched to Dark Theme", "success");
        }
    });
}

function updateThemeIcon(theme) {
    const icon = elements.themeToggle.querySelector('i');
    if (theme === 'light-theme') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

// Countdown Timer
function initCountdown() {
    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate.getTime() - now;

        if (diff <= 0) {
            // If the date passed, set to B.Tech default (Aug 3, 2026) or show active message
            const nextTarget = new Date('2026-08-03T09:00:00+05:30');
            const nextDiff = nextTarget.getTime() - now;
            if (nextDiff <= 0) {
                document.querySelector('.countdown-title').textContent = "Campus Welcome!";
                document.querySelector('.countdown-grid').innerHTML = "<div style='grid-column: span 4; font-size: 1.25rem; font-weight: bold; color: var(--primary);'>Induction is Currently Active! Welcome to Campus! 🎓</div>";
                return;
            }
            calculateAndRenderTimer(nextDiff);
            document.querySelector('.countdown-note').innerHTML = "Phase 1 Induction started. Phase 2 starts <strong>August 3, 2026</strong>.";
            return;
        }

        calculateAndRenderTimer(diff);
    }

    function calculateAndRenderTimer(timeDifference) {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        elements.countdown.days.textContent = String(days).padStart(2, '0');
        elements.countdown.hours.textContent = String(hours).padStart(2, '0');
        elements.countdown.minutes.textContent = String(minutes).padStart(2, '0');
        elements.countdown.seconds.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// FAQ Accordion
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            faqItems.forEach(i => i.classList.remove('active'));
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Interactive On-Arrival Steps
function initReportingSteps() {
    function updateStepUI(index) {
        // Update Active Progress Indicator
        elements.stepProgressItems.forEach((item, idx) => {
            if (idx <= index) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
        
        // Update detail card
        const step = reportingSteps[index];
        elements.stepBadgeNum.textContent = `Step ${index + 1} of 5`;
        elements.stepDetailTitle.textContent = step.title;
        elements.stepDetailDescription.textContent = step.desc;
        
        // Enable/Disable buttons
        elements.prevStepBtn.disabled = index === 0;
        elements.nextStepBtn.innerHTML = index === 4 ? `Finish Process <i class="fas fa-check"></i>` : `Next Step <i class="fas fa-chevron-right"></i>`;
    }

    elements.stepProgressItems.forEach((item, idx) => {
        item.addEventListener('click', () => {
            activeReportingStep = idx;
            updateStepUI(activeReportingStep);
            showToast(`Viewing Step ${idx + 1}`, "success");
        });
    });

    elements.prevStepBtn.addEventListener('click', () => {
        if (activeReportingStep > 0) {
            activeReportingStep--;
            updateStepUI(activeReportingStep);
        }
    });

    elements.nextStepBtn.addEventListener('click', () => {
        if (activeReportingStep < 4) {
            activeReportingStep++;
            updateStepUI(activeReportingStep);
        } else {
            showToast("You are ready for LPU campus reporting! 🚀", "success");
        }
    });
}

// Induction Vibe Tabs
function initVibeTabs() {
    elements.vibeTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active classes
            elements.vibeTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Render tab details
            const tabKey = btn.dataset.tab;
            const data = vibeTabs[tabKey];
            
            elements.vibeTabContent.innerHTML = `
                <div class="tab-grid">
                    <div class="tab-text">
                        <h3>${data.title}</h3>
                        <p>${data.desc}</p>
                        <ul class="vibe-list">
                            ${data.bullets.map(b => `<li><i class="fas fa-circle-check"></i> ${b}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="tab-icon-box">
                        <i class="fas ${data.icon}"></i>
                    </div>
                </div>
            `;
            
            showToast(`Opened ${btn.textContent}`, "success");
        });
    });
}

// Load Data
async function loadData() {
    try {
        elements.loader.classList.remove('hidden');
        elements.resultsGrid.innerHTML = '';
        
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        programmeData = await response.json();
        filteredData = [...programmeData];
        
        populateDisciplineFilter();
        
        elements.loader.classList.add('hidden');
        renderGrid();
    } catch (error) {
        console.error("Failed to load programme data:", error);
        elements.loader.innerHTML = `
            <i class="fas fa-exclamation-triangle" style="font-size: 2.5rem; color: #ef4444; margin-bottom: 12px;"></i>
            <h3>Database Load Failed</h3>
            <p>Could not load schedule data. Please make sure the JSON file exists and is accessible.</p>
        `;
    }
}

// Populate Discipline Dropdown
function populateDisciplineFilter() {
    const disciplines = new Set();
    programmeData.forEach(p => {
        if (p.discipline) {
            disciplines.add(p.discipline.trim());
        }
    });
    
    const sortedDisciplines = Array.from(disciplines).sort();
    
    elements.disciplineFilter.innerHTML = '<option value="">All Disciplines</option>';
    sortedDisciplines.forEach(d => {
        const option = document.createElement('option');
        option.value = d;
        option.textContent = d;
        elements.disciplineFilter.appendChild(option);
    });
}

// Event Listeners
function initEvents() {
    elements.searchInput.addEventListener('input', () => {
        if (elements.searchInput.value.trim().length > 0) {
            elements.clearSearchBtn.classList.remove('hidden');
        } else {
            elements.clearSearchBtn.classList.add('hidden');
        }
        filterData();
    });

    elements.clearSearchBtn.addEventListener('click', () => {
        elements.searchInput.value = '';
        elements.clearSearchBtn.classList.add('hidden');
        filterData();
        elements.searchInput.focus();
    });

    elements.eligibilityFilter.addEventListener('change', filterData);
    elements.disciplineFilter.addEventListener('change', filterData);
    elements.facultyFilter.addEventListener('change', filterData);

    elements.resetFiltersBtn.addEventListener('click', resetFilters);
    elements.emptyResetBtn.addEventListener('click', resetFilters);
    
    elements.unpinBtn.addEventListener('click', unpinProgramme);
    elements.resetChecklistBtn.addEventListener('click', resetChecklist);
    elements.addCalendarBtn.addEventListener('click', downloadCalendarFile);
    elements.shareScheduleBtn.addEventListener('click', shareScheduleLink);
}

// Filter Logic
function filterData() {
    const searchVal = elements.searchInput.value.toLowerCase().trim();
    const eligibilityVal = elements.eligibilityFilter.value;
    const disciplineVal = elements.disciplineFilter.value;
    const facultyVal = elements.facultyFilter.value;

    filteredData = programmeData.filter(item => {
        let matchesSearch = true;
        if (searchVal) {
            const progName = item.programmeName.toLowerCase();
            const progCode = item.programmeCode.toLowerCase();
            const discipline = item.discipline.toLowerCase();
            
            // Check direct match
            if (progName.includes(searchVal) || progCode.includes(searchVal) || discipline.includes(searchVal)) {
                matchesSearch = true;
            } else {
                // Split by spaces to check keywords (all keywords must be matched)
                const keywords = searchVal.split(/\s+/);
                matchesSearch = keywords.every(keyword => {
                    if (!keyword) return true;
                    
                    let target = keyword;
                    // Common abbreviations mapping
                    if (keyword === 'cse') target = 'computer science';
                    else if (keyword === 'ece') target = 'electronics';
                    else if (keyword === 'me' && !progCode.includes('dmlt')) target = 'mechanical';
                    else if (keyword === 'ce') target = 'civil';
                    else if (keyword === 'ee') target = 'electrical';
                    else if (keyword === 'it') target = 'information technology';
                    else if (keyword === 'btech') target = 'b.tech';
                    else if (keyword === 'mtech') target = 'm.tech';
                    else if (keyword === 'bca') target = 'bca';
                    else if (keyword === 'mca') target = 'mca';
                    else if (keyword === 'mba') target = 'mba';
                    
                    return progName.includes(target) || progCode.includes(target) || discipline.includes(target) ||
                           progName.includes(keyword) || progCode.includes(keyword) || discipline.includes(keyword);
                });
            }
        }

        let matchesEligibility = true;
        if (eligibilityVal) {
            if (eligibilityVal === 'After 10th') {
                matchesEligibility = item.eligibility.toLowerCase().includes('after 10th');
            } else if (eligibilityVal === 'After 10+2') {
                matchesEligibility = item.eligibility.toLowerCase().includes('after 10+2') || item.eligibility.toLowerCase().includes('12th');
            } else if (eligibilityVal === 'Lateral Entry') {
                matchesEligibility = item.eligibility.toLowerCase().includes('lateral entry') || item.eligibility.toLowerCase().includes('iti') || item.eligibility.toLowerCase().includes('diploma');
            } else if (eligibilityVal === 'After Graduation') {
                matchesEligibility = item.eligibility.toLowerCase().includes('after graduation') || item.eligibility.toLowerCase().includes('post graduation');
            }
        }

        const matchesDiscipline = !disciplineVal || item.discipline === disciplineVal;
        const matchesFaculty = !facultyVal || item.faculty === facultyVal;

        return matchesSearch && matchesEligibility && matchesDiscipline && matchesFaculty;
    });

    visibleCount = 24;
    renderGrid();
}

function resetFilters() {
    elements.searchInput.value = '';
    elements.clearSearchBtn.classList.add('hidden');
    elements.eligibilityFilter.value = '';
    elements.disciplineFilter.value = '';
    elements.facultyFilter.value = '';
    filterData();
    showToast("Filters Cleared", "success");
}

// Render Results Grid
function renderGrid() {
    elements.resultsGrid.innerHTML = '';
    
    if (filteredData.length === 0) {
        elements.resultsCount.textContent = "0 matches";
        elements.resultsGrid.classList.add('hidden');
        elements.emptyState.classList.remove('hidden');
        return;
    }

    elements.emptyState.classList.add('hidden');
    elements.resultsGrid.classList.remove('hidden');
    elements.resultsCount.textContent = `Showing ${Math.min(visibleCount, filteredData.length)} of ${filteredData.length} programmes`;

    const sliced = filteredData.slice(0, visibleCount);
    sliced.forEach(item => {
        const card = document.createElement('div');
        card.className = 'programme-card glass-panel';
        
        const isPinned = pinnedProgramme && pinnedProgramme.programmeCode === item.programmeCode;
        const facultyClass = item.faculty.toLowerCase();
        
        card.innerHTML = `
            <div>
                <div class="card-header-area">
                    <div class="card-badge-row">
                        <span class="faculty-badge ${facultyClass}">${item.faculty}</span>
                        ${item.discipline ? `<span class="faculty-badge" style="background: rgba(255,255,255,0.03); color: var(--text-secondary); border: 1px solid var(--border-color);">${item.discipline}</span>` : ''}
                    </div>
                    <button class="pin-btn ${isPinned ? 'pinned' : ''}" data-code="${item.programmeCode}" title="${isPinned ? 'Unselect' : 'Select Plan'}">
                        <i class="${isPinned ? 'fas' : 'far'} fa-thumbtack"></i>
                    </button>
                </div>
                
                <h3 class="programme-name-title">${item.programmeName}</h3>
                <span class="programme-code-txt">Code: ${item.programmeCode}</span>
                
                <div class="card-dates-list">
                    <div class="date-row">
                        <span class="date-label"><i class="far fa-address-card"></i> Reporting & ID Verification</span>
                        <span class="date-text">${formatCellText(item.reportingDate)}</span>
                    </div>
                    <div class="date-row">
                        <span class="date-label"><i class="far fa-comments"></i> Induction Schedule</span>
                        <span class="date-text">${formatCellText(item.inductionSchedule)}</span>
                    </div>
                    <div class="date-row">
                        <span class="date-label"><i class="far fa-circle-play"></i> Start of Classes</span>
                        <span class="date-text">${formatCellText(item.classesStart)}</span>
                    </div>
                </div>
            </div>
            
            <div class="card-footer-actions">
                <span class="duration-info"><i class="far fa-calendar"></i> ${item.duration}</span>
                <button class="btn btn-secondary btn-sm card-action-btn" data-code="${item.programmeCode}">
                    ${isPinned ? 'View Plan' : 'Select Plan'}
                </button>
            </div>
        `;
        
        const pinBtn = card.querySelector('.pin-btn');
        pinBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            togglePin(item);
        });

        const actionBtn = card.querySelector('.card-action-btn');
        actionBtn.addEventListener('click', () => {
            if (!isPinned) {
                pinProgramme(item);
            }
            document.getElementById('my-plan-section').scrollIntoView({ behavior: 'smooth' });
        });
        
        elements.resultsGrid.appendChild(card);
    });

    if (filteredData.length > visibleCount) {
        const loadMoreWrapper = document.createElement('div');
        loadMoreWrapper.style.gridColumn = '1 / -1';
        loadMoreWrapper.style.display = 'flex';
        loadMoreWrapper.style.justify = 'center';
        loadMoreWrapper.style.paddingTop = '20px';
        
        const loadMoreBtn = document.createElement('button');
        loadMoreBtn.className = 'btn btn-primary';
        loadMoreBtn.innerHTML = 'Load More Programmes <i class="fas fa-chevron-down"></i>';
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += 24;
            renderGrid();
        });
        
        loadMoreWrapper.appendChild(loadMoreBtn);
        elements.resultsGrid.appendChild(loadMoreWrapper);
    }
}

function formatCellText(text) {
    if (!text || text.trim() === "") return "-";
    if (text.includes('\n')) {
        return `<ul class="cell-list">` + 
            text.split('\n').map(line => {
                const trimmed = line.trim();
                if (trimmed.includes(':')) {
                    const idx = trimmed.indexOf(':');
                    const label = trimmed.substring(0, idx);
                    const val = trimmed.substring(idx + 1);
                    return `<li><strong>${label}:</strong> ${val}</li>`;
                }
                return `<li>${trimmed}</li>`;
            }).join('') + 
            `</ul>`;
    }
    return text;
}

// Pinned Programme Logic
function togglePin(programme) {
    if (pinnedProgramme && pinnedProgramme.programmeCode === programme.programmeCode) {
        unpinProgramme();
    } else {
        pinProgramme(programme);
    }
}

function pinProgramme(programme) {
    pinnedProgramme = programme;
    localStorage.setItem('pinnedProgrammeCode', programme.programmeCode);
    
    elements.pinnedFaculty.className = `faculty-tag ${programme.faculty.toLowerCase()}`;
    elements.pinnedFaculty.textContent = programme.faculty;
    elements.pinnedTitle.textContent = programme.programmeName;
    elements.pinnedCode.innerHTML = `<i class="fas fa-barcode"></i> ${programme.programmeCode}`;
    elements.pinnedDuration.innerHTML = `<i class="fas fa-clock"></i> ${programme.duration}`;
    elements.pinnedEligibility.innerHTML = `<i class="fas fa-graduation-cap"></i> ${programme.eligibility}`;
    
    elements.pinnedReporting.innerHTML = formatCellText(programme.reportingDate);
    elements.pinnedInduction.innerHTML = formatCellText(programme.inductionSchedule);
    elements.pinnedClass.innerHTML = formatCellText(programme.classesStart);
    
    loadChecklist(programme);
    
    elements.myPlanSection.classList.remove('hidden');
    renderGrid();
    showToast(`Plan selected: ${programme.programmeName}`, "success");
}

function unpinProgramme() {
    if (pinnedProgramme) {
        const code = pinnedProgramme.programmeCode;
        pinnedProgramme = null;
        localStorage.removeItem('pinnedProgrammeCode');
        localStorage.removeItem(`checklist_${code}`);
        elements.myPlanSection.classList.add('hidden');
        renderGrid();
        showToast("Plan unselected", "success");
    }
}

function checkPinnedFromStorage() {
    const savedCode = localStorage.getItem('pinnedProgrammeCode');
    if (savedCode) {
        const prog = programmeData.find(p => p.programmeCode === savedCode);
        if (prog) {
            pinProgramme(prog);
        }
    }
}

// Checklist System
function loadChecklist(programme) {
    const storageKey = `checklist_${programme.programmeCode}`;
    const savedState = localStorage.getItem(storageKey);
    checklistState = savedState ? JSON.parse(savedState) : {};
    
    let docs = [];
    const eligibility = programme.eligibility.toLowerCase();
    
    // Core LPU document checklist
    const commonDocs = [
        "Printed LPUADMIT Admission Offer Letter & Fee Receipts",
        "Original Character Certificate from previous institution",
        "Self-Attested Anti-Ragging Affidavit (Student & Parent signed)",
        "Hostel Residential Slip / Mess booking printout (if applicable)",
        "Medical Fitness Certificate (LPU format)",
        "6 Passport-sized colored photographs with white background",
        "Photocopy of Aadhaar Card (Student & Parents)"
    ];
    
    if (eligibility.includes('10th')) {
        docs = [
            "10th Marksheet & Passing Certificate (Original + 3 photocopies)",
            "School Transfer Certificate / Leaving Certificate",
            ...commonDocs
        ];
    } else if (eligibility.includes('12th') || eligibility.includes('10+2')) {
        docs = [
            "12th Marksheet & Passing Certificate (Original + 3 photocopies)",
            "10th Marksheet & Passing Certificate (Original + 3 photocopies)",
            "Original Migration Certificate (issued by central/state board)",
            "School Leaving Certificate (SLC) / Transfer Certificate",
            ...commonDocs
        ];
    } else if (eligibility.includes('lateral entry') || eligibility.includes('diploma')) {
        docs = [
            "3-Year Diploma Transcript / ITI Marks sheets (Original + 3 copies)",
            "10th Marksheet & Passing Certificate (Original + 3 copies)",
            "Original Migration Certificate from previous Board/University",
            "College leaving certificate / Transfer Certificate",
            ...commonDocs
        ];
    } else if (eligibility.includes('graduation') || eligibility.includes('graduate')) {
        docs = [
            "Graduation Semester transcripts & Degree (Original + 3 copies)",
            "12th & 10th Marksheets & Passing Certificates (Original + 3 copies)",
            "Original Migration Certificate from graduating University",
            "College leaving certificate / Transfer Certificate",
            ...commonDocs
        ];
    } else {
        docs = [
            "12th & 10th Marksheets & Passing Certificates (Original + 3 copies)",
            "Original Migration Certificate & Transfer Certificate",
            ...commonDocs
        ];
    }
    
    elements.checklistList.innerHTML = '';
    
    docs.forEach((doc, idx) => {
        const id = `item_${idx}`;
        const isChecked = checklistState[id] || false;
        
        const li = document.createElement('li');
        li.className = 'checklist-item';
        li.innerHTML = `
            <input type="checkbox" id="${id}" ${isChecked ? 'checked' : ''}>
            <label for="${id}" class="checklist-item-text">${doc}</label>
        `;
        
        const checkbox = li.querySelector('input');
        checkbox.addEventListener('change', () => {
            checklistState[id] = checkbox.checked;
            localStorage.setItem(storageKey, JSON.stringify(checklistState));
            updateChecklistProgress(docs.length);
        });
        
        elements.checklistList.appendChild(li);
    });
    
    updateChecklistProgress(docs.length);
}

function updateChecklistProgress(total) {
    const checkedCount = Object.values(checklistState).filter(val => val === true).length;
    elements.checklistProgress.textContent = `${checkedCount}/${total} Done`;
    
    if (checkedCount === total && total > 0) {
        elements.checklistProgress.className = "progress-badge success-glow";
        elements.checklistProgress.style.background = "var(--success-glow)";
        elements.checklistProgress.style.color = "var(--success)";
        showToast("Awesome! All document requirements checked! 🎓", "success");
    } else {
        elements.checklistProgress.className = "progress-badge";
        elements.checklistProgress.style.background = "";
        elements.checklistProgress.style.color = "";
    }
}

function resetChecklist() {
    if (pinnedProgramme) {
        const storageKey = `checklist_${pinnedProgramme.programmeCode}`;
        checklistState = {};
        localStorage.removeItem(storageKey);
        loadChecklist(pinnedProgramme);
        showToast("Checklist progress reset", "success");
    }
}

// Toast Notifications
function showToast(message, type = "success") {
    elements.toastMessage.textContent = message;
    
    const icon = elements.toast.querySelector('.toast-icon');
    if (type === "success") {
        elements.toast.style.borderColor = "var(--success)";
        icon.className = "fas fa-check-circle";
        icon.style.color = "var(--success)";
    } else {
        elements.toast.style.borderColor = "var(--primary)";
        icon.className = "fas fa-circle-exclamation";
        icon.style.color = "var(--primary)";
    }
    
    elements.toast.classList.remove('hidden');
    
    if (window.toastTimeout) {
        clearTimeout(window.toastTimeout);
    }
    
    window.toastTimeout = setTimeout(() => {
        elements.toast.classList.add('hidden');
    }, 3000);
}

// Generate Calendar (.ics) file
function downloadCalendarFile() {
    if (!pinnedProgramme) return;
    
    const name = pinnedProgramme.programmeName;
    const code = pinnedProgramme.programmeCode;
    
    let reportingDateStr = "20260727T090000";
    let classDateStr = "20260803T090000";
    
    if (pinnedProgramme.reportingDate.includes("29,30 July")) {
        reportingDateStr = "20260729T090000";
    } else if (pinnedProgramme.reportingDate.includes("27,28 July")) {
        reportingDateStr = "20260727T090000";
    } else if (pinnedProgramme.reportingDate.includes("30,31 July")) {
        reportingDateStr = "20260730T090000";
    } else if (pinnedProgramme.reportingDate.includes("28,29 July")) {
        reportingDateStr = "20260728T090000";
    } else if (pinnedProgramme.reportingDate.includes("4,5 Aug")) {
        reportingDateStr = "20260804T090000";
    } else if (pinnedProgramme.reportingDate.includes("17-Jul")) {
        reportingDateStr = "20260717T090000";
    }
    
    if (pinnedProgramme.classesStart.includes("4-Aug")) {
        classDateStr = "20260804T090000";
    } else if (pinnedProgramme.classesStart.includes("3-Aug")) {
        classDateStr = "20260803T090000";
    } else if (pinnedProgramme.classesStart.includes("5-Aug")) {
        classDateStr = "20260805T090000";
    } else if (pinnedProgramme.classesStart.includes("6-Aug")) {
        classDateStr = "20260806T090000";
    } else if (pinnedProgramme.classesStart.includes("10-Aug")) {
        classDateStr = "20260810T090000";
    } else if (pinnedProgramme.classesStart.includes("20-Jul")) {
        classDateStr = "20260720T090000";
    }
    
    const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//LPU Induction Portal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:reporting_${code}@lpu.edu
DTSTAMP:20260609T170000Z
DTSTART;TZID=Asia/Kolkata:${reportingDateStr}
DURATION:PT8H
SUMMARY:LPU Reporting & Document Verification (${code})
DESCRIPTION:Physical verification of documents and residential facility reporting for ${name}. Ensure you report to Baldev Raj Mittal Unipolis.
LOCATION:Lovely Professional University, Phagwara, Punjab
END:VEVENT
BEGIN:VEVENT
UID:classes_${code}@lpu.edu
DTSTAMP:20260609T170000Z
DTSTART;TZID=Asia/Kolkata:${classDateStr}
DURATION:PT6H
SUMMARY:LPU Classes Commencement (${code})
DESCRIPTION:Commencement of regular academic classes for ${name}.
LOCATION:Lovely Professional University Campus
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', `LPU_Induction_Schedule_${code}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Induction Calendar File Downloaded!", "success");
}

// Copy sharing link
function shareScheduleLink() {
    if (!pinnedProgramme) return;
    
    const url = new URL(window.location.href);
    url.searchParams.set('progCode', pinnedProgramme.programmeCode);
    
    navigator.clipboard.writeText(url.toString())
        .then(() => {
            showToast("Plan link copied to clipboard!", "success");
        })
        .catch(err => {
            console.error("Could not copy sharing URL:", err);
            showToast("Failed to copy link", "error");
        });
}

// Process search parameter if shared link loaded
window.addEventListener('load', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedCode = urlParams.get('progCode');
    if (sharedCode) {
        const checkInterval = setInterval(() => {
            if (programmeData.length > 0) {
                clearInterval(checkInterval);
                const prog = programmeData.find(p => p.programmeCode === sharedCode);
                if (prog) {
                    pinProgramme(prog);
                    document.getElementById('my-plan-section').scrollIntoView({ behavior: 'smooth' });
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            }
        }, 100);
    }
});
