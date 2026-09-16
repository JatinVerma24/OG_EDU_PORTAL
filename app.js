// Global State
let programmeData = [];
let filteredData = [];
let visibleCount = 24;
let pinnedProgramme = null;
let checklistState = {};

// Target Date for Countdown: July 17, 2026
const targetDate = new Date('2026-07-17T09:00:00+05:30'); // 9 AM IST

let activeReportingCategory = 'preArrival'; // preArrival, onCampus, hostelAllocation, scheduleNotes
let activeReportingStep = 0;


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
    initChatbot();
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
function getActiveStepList() {
    if (activeReportingCategory === 'preArrival') return PRE_ARRIVAL_STEPS;
    if (activeReportingCategory === 'onCampus') return ON_CAMPUS_STEPS;
    if (activeReportingCategory === 'hostelAllocation') return HOSTEL_ALLOCATION_STEPS;
    return [];
}

function initReportingSteps() {
    const progressContainer = document.getElementById('reporting-steps-progress');
    const schedulesContainer = document.getElementById('schedule-notes-container');
    const m2mContainer = document.getElementById('minute-to-minute-container');
    const detailsCard = document.getElementById('step-details-card');
    const tabButtons = document.querySelectorAll('.rep-tab-btn');

    function renderProgressCircles() {
        const stepList = getActiveStepList();
        progressContainer.className = `steps-progress-bar-container steps-${stepList.length}`;
        
        let html = '';
        stepList.forEach((step, idx) => {
            const isActive = idx === activeReportingStep;
            const isCompleted = idx < activeReportingStep;
            let iconHtml = `${idx + 1}`;
            
            if (isCompleted) {
                iconHtml = `<i class="fas fa-check"></i>`;
            } else {
                let iconClass = "fa-circle";
                if (activeReportingCategory === 'preArrival') {
                    const icons = ["fa-file-upload", "fa-hotel", "fa-credit-card", "fa-shirt", "fa-plane-departure", "fa-map-location-dot"];
                    iconClass = icons[idx] || iconClass;
                } else if (activeReportingCategory === 'onCampus') {
                    const icons = ["fa-door-open", "fa-stamp", "fa-fingerprint", "fa-bed", "fa-indian-rupee-sign", "fa-user-circle", "fa-mobile-alt", "fa-graduation-cap"];
                    iconClass = icons[idx] || iconClass;
                } else if (activeReportingCategory === 'hostelAllocation') {
                    const icons = ["fa-walking", "fa-receipt", "fa-sync-alt", "fa-file-invoice", "fa-key"];
                    iconClass = icons[idx] || iconClass;
                }
                iconHtml = `<i class="fas ${iconClass}"></i>`;
            }
            
            let shortTitle = "";
            if (activeReportingCategory === 'preArrival') {
                shortTitle = ["Docs", "Book", "Fees", "Uniform", "Travel", "Reach"][idx];
            } else if (activeReportingCategory === 'onCampus') {
                shortTitle = ["Unipolis", "Verify", "Biometric", "Book", "Fees", "Uniform", "UMS", "Induct"][idx];
            } else if (activeReportingCategory === 'hostelAllocation') {
                shortTitle = ["Reported", "Dues", "Sync", "Slip", "Key"][idx];
            }

            html += `
                <div class="step-progress-item ${isActive ? 'active' : ''}" data-step="${idx}">
                    <div class="step-progress-circle">${iconHtml}</div>
                    <span class="step-progress-title d-none-mobile">${shortTitle}</span>
                </div>
            `;
        });
        
        progressContainer.innerHTML = html;
        
        // Add click events to newly created circles
        const circles = progressContainer.querySelectorAll('.step-progress-item');
        circles.forEach((circle, idx) => {
            circle.addEventListener('click', () => {
                activeReportingStep = idx;
                updateStepUI();
                showToast(`Viewing Step ${idx + 1}`, "success");
            });
        });
    }

    function updateStepUI() {
        const stepList = getActiveStepList();
        if (stepList.length === 0) return;

        // Render circles to reflect completion/active state
        renderProgressCircles();

        const step = stepList[activeReportingStep];
        let categoryName = "Pre-Arrival";
        if (activeReportingCategory === 'onCampus') categoryName = "On-Campus";
        if (activeReportingCategory === 'hostelAllocation') categoryName = "Hostel Keys";

        elements.stepBadgeNum.textContent = `${categoryName} • Step ${activeReportingStep + 1} of ${stepList.length}`;
        elements.stepDetailTitle.textContent = step.title;
        elements.stepDetailDescription.textContent = step.desc;

        elements.prevStepBtn.disabled = activeReportingStep === 0;
        elements.nextStepBtn.innerHTML = activeReportingStep === stepList.length - 1 ? 
            `Finish Category <i class="fas fa-check"></i>` : 
            `Next Step <i class="fas fa-chevron-right"></i>`;
    }

    function renderSchedules() {
        let html = '';
        SCHEDULE_NOTES.forEach((note, idx) => {
            let borderClass = "";
            if (idx % 3 === 0) borderClass = "";
            else if (idx % 3 === 1) borderClass = "blue";
            else borderClass = "purple";
            
            if (note.title.includes("Helpline")) borderClass = "green";
            
            let iconClass = "fa-calendar-alt";
            if (note.icon.includes("magnifying")) iconClass = "fa-search";
            else if (note.icon.includes("business")) iconClass = "fa-business-time";
            else if (note.icon.includes("code")) iconClass = "fa-code-branch";
            else if (note.icon.includes("play")) iconClass = "fa-play";
            else if (note.icon.includes("phone")) iconClass = "fa-phone-volume";
            else if (note.icon.includes("globe")) iconClass = "fa-globe";

            html += `
                <div class="schedule-card ${borderClass}">
                    <div class="schedule-card-header">
                        <div class="schedule-card-icon"><i class="fas ${iconClass}"></i></div>
                        <h4 class="schedule-card-title">${note.title}</h4>
                    </div>
                    <p class="schedule-card-desc">${note.desc}</p>
                </div>
            `;
        });
        schedulesContainer.innerHTML = html;
    }

    function handleTabChange(category) {
        activeReportingCategory = category;
        activeReportingStep = 0;

        tabButtons.forEach(btn => {
            if (btn.dataset.category === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        if (category === 'scheduleNotes') {
            progressContainer.classList.add('hidden');
            detailsCard.classList.add('hidden');
            if (m2mContainer) m2mContainer.classList.add('hidden');
            schedulesContainer.classList.remove('hidden');
            renderSchedules();
            showToast("Viewing Admission Schedules", "success");
        } else if (category === 'minuteToMinute') {
            progressContainer.classList.add('hidden');
            detailsCard.classList.add('hidden');
            schedulesContainer.classList.add('hidden');
            if (m2mContainer) {
                m2mContainer.classList.remove('hidden');
                renderMinuteToMinute();
            }
            showToast("Viewing Minute-to-Minute Schedule", "success");
        } else {
            if (m2mContainer) m2mContainer.classList.add('hidden');
            schedulesContainer.classList.add('hidden');
            progressContainer.classList.remove('hidden');
            detailsCard.classList.remove('hidden');
            updateStepUI();
            showToast(`Switched Category`, "success");
        }
    }

    let activeM2mDayId = 'reporting';
    function renderMinuteToMinute() {
        const container = document.getElementById('minute-to-minute-container');
        if (!container) return;
        const data = window.MINUTE_TO_MINUTE_SCHEDULE;
        if (!data) return;

        const activeDay = data.days.find(d => d.id === activeM2mDayId) || data.days[0];

        let dayButtonsHtml = '';
        data.days.forEach(day => {
            const isActive = day.id === activeM2mDayId;
            dayButtonsHtml += `
                <button class="m2m-day-btn ${isActive ? 'active' : ''}" data-day="${day.id}" style="padding: 10px 18px; border-radius: 10px; border: ${isActive ? '1px solid #f97316' : '1px solid rgba(255,255,255,0.1)'}; background: ${isActive ? '#f97316' : 'rgba(255,255,255,0.04)'}; color: ${isActive ? '#fff' : 'inherit'}; font-weight: 600; font-size: 0.85rem; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; margin: 4px;">
                    <i class="${day.icon}"></i> ${day.dayLabel}
                </button>
            `;
        });

        let eventsHtml = '';
        activeDay.events.forEach(ev => {
            eventsHtml += `
                <div class="m2m-event-card" style="padding: 16px; border-radius: 12px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.07); display: grid; grid-template-columns: 140px 1fr; gap: 16px; align-items: center; margin-bottom: 12px;">
                    <div class="m2m-time-pill" style="padding: 8px 12px; background: rgba(249, 115, 22, 0.15); border: 1px solid rgba(249, 115, 22, 0.3); color: #f97316; border-radius: 8px; font-weight: 700; font-size: 0.85rem; text-align: center;">
                        <i class="far fa-clock"></i> ${ev.time}
                    </div>
                    <div>
                        <h4 style="margin: 0 0 4px 0; font-size: 0.95rem; font-weight: 700;">${ev.activity}</h4>
                        <div style="display: flex; gap: 12px; flex-wrap: wrap; align-items: center; font-size: 0.8rem; opacity: 0.85;">
                            <span style="color: #38bdf8;"><i class="fas fa-location-dot"></i> ${ev.venue}</span>
                            ${ev.desc ? `<span>• ${ev.desc}</span>` : ''}
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="minute-to-minute-wrapper">
                <div class="m2m-disclaimer-card glass-panel" style="margin-bottom: 24px; padding: 16px 20px; border-left: 4px solid #f97316; background: rgba(249, 115, 22, 0.08); border-radius: 12px;">
                    <div style="display: flex; gap: 12px; align-items: flex-start;">
                        <i class="fas fa-info-circle" style="font-size: 1.4rem; color: #f97316; margin-top: 2px;"></i>
                        <div>
                            <h4 style="margin: 0 0 6px 0; font-size: 0.95rem; font-weight: 700;">Tentative Approximation & Course Variation Notice</h4>
                            <p style="margin: 0; font-size: 0.85rem; line-height: 1.5;">${data.disclaimerNote}</p>
                        </div>
                    </div>
                </div>

                <div class="m2m-day-tabs" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; justify-content: center;">
                    ${dayButtonsHtml}
                </div>

                <div class="m2m-day-container glass-panel" style="padding: 24px; border-radius: 16px;">
                    <div style="margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 10px;">
                        <h3 style="margin: 0; font-size: 1.15rem; font-weight: 700; display: flex; align-items: center; gap: 10px;">
                            <i class="${activeDay.icon}" style="color: #f97316;"></i> ${activeDay.title}
                        </h3>
                        <span style="padding: 4px 10px; background: rgba(249, 115, 22, 0.2); color: #f97316; border-radius: 20px; font-size: 0.75rem; font-weight: 600;">
                            ${activeDay.events.length} Events Scheduled
                        </span>
                    </div>

                    <div class="m2m-timeline-grid">
                        ${eventsHtml}
                    </div>
                </div>
            </div>
        `;

        container.querySelectorAll('.m2m-day-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                activeM2mDayId = btn.dataset.day;
                renderMinuteToMinute();
            });
        });
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            handleTabChange(btn.dataset.category);
        });
    });

    elements.prevStepBtn.addEventListener('click', () => {
        if (activeReportingStep > 0) {
            activeReportingStep--;
            updateStepUI();
        }
    });

    elements.nextStepBtn.addEventListener('click', () => {
        const stepList = getActiveStepList();
        if (activeReportingStep < stepList.length - 1) {
            activeReportingStep++;
            updateStepUI();
        } else {
            showToast(`Ready for ${activeReportingCategory === 'preArrival' ? 'Arrival' : activeReportingCategory === 'onCampus' ? 'Classes' : 'Hostel Check-in'}! 🚀`, "success");
        }
    });

    // Initial setup
    updateStepUI();
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
function parseDateToICSString(dateStr, defaultFallback) {
    if (!dateStr || typeof dateStr !== 'string') return defaultFallback;
    
    const matches = dateStr.match(/(\d+)/g);
    const monthMatch = dateStr.match(/([a-zA-Z]+)/);
    
    if (!matches || matches.length === 0 || !monthMatch) {
        return defaultFallback;
    }
    
    const day = parseInt(matches[0], 10);
    let year = 2026;
    if (matches.length > 1) {
        const lastNum = matches[matches.length - 1];
        if (lastNum.length === 4) {
            year = parseInt(lastNum, 10);
        }
    }
    
    const monthStr = monthMatch[1].toLowerCase();
    let month = 7;
    if (monthStr.startsWith('jan')) month = 1;
    else if (monthStr.startsWith('feb')) month = 2;
    else if (monthStr.startsWith('mar')) month = 3;
    else if (monthStr.startsWith('apr')) month = 4;
    else if (monthStr.startsWith('may')) month = 5;
    else if (monthStr.startsWith('jun')) month = 6;
    else if (monthStr.startsWith('jul')) month = 7;
    else if (monthStr.startsWith('aug')) month = 8;
    else if (monthStr.startsWith('sep')) month = 9;
    else if (monthStr.startsWith('oct')) month = 10;
    else if (monthStr.startsWith('nov')) month = 11;
    else if (monthStr.startsWith('dec')) month = 12;
    
    return `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}T090000`;
}

function downloadCalendarFile() {
    if (!pinnedProgramme) return;
    
    const name = pinnedProgramme.programmeName;
    const code = pinnedProgramme.programmeCode;
    
    const reportingDateStr = parseDateToICSString(pinnedProgramme.reportingDate, "20260727T090000");
    const classDateStr = parseDateToICSString(pinnedProgramme.classesStart, "20260803T090000");
    
    const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//ogeduAI//NONSGML v1.0//EN
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

// ================= OFFLINE CHATBOT IMPLEMENTATION =================
const CHATBOT_SUGGESTIONS = [
  { id: 'docs', label: "📋 Document Checklist", text: "What documents do I need to bring?" },
  { id: 'unipolis', label: "🏫 Reporting at Unipolis", text: "Where do I report when arriving at LPU?" },
  { id: 'hostel', label: "🔑 Hostel Keys & Slip", text: "How do I get my hostel keys?" },
  { id: 'mba_mca', label: "📅 MBA & MCA Schedules", text: "What are the MBA pre-term and MCA bridge dates?" },
  { id: 'cse', label: "💻 B.Tech CSE Dates", text: "How do I check B.Tech CSE reporting dates?" },
  { id: 'helpline', label: "📞 LPU Helpline", text: "How can I contact the reporting helpline?" }
];

const CHATBOT_BOT_RESPONSES = {
  docs: `📚 <strong>Required Document Checklist:</strong><br>1. <strong>Admission Offer Letter</strong> & fee receipts (printed).<br>2. <strong>Original Marksheets</strong> (10th, 12th, or graduation transcripts) + 3 sets of photocopies.<br>3. <strong>Original Migration Certificate</strong> & Transfer/Leaving Certificate.<br>4. <strong>Character Certificate</strong> from your last institution.<br>5. <strong>Self-Attested Anti-Ragging Affidavit</strong> (signed by student and parent).<br>6. <strong>Medical Fitness Certificate</strong> in LPU's official format.<br>7. <strong>6 Passport-size photographs</strong> (white background).<br>8. <strong>Aadhaar Card</strong> photocopies of student and parents.<br><br><em>Tip: Carry all originals in a secure, transparent folder for auditing.</em>`,

  unipolis: `🏫 <strong>On-Campus Reporting Steps at Baldev Raj Mittal Unipolis:</strong><br>1. <strong>Unipolis Entry:</strong> Report here, scan the venue QR code, and validate using the OTP sent to your phone to download your digital 'Reporting & Induction Sheet'.<br>2. <strong>Checklist Collection:</strong> Collect your physical checklist paper.<br>3. <strong>Desk Auditing:</strong> Visit designated desks in order: Document Verification → Biometrics → Accounts/Dues → Uniform Counter → UMS Login Desk.<br>4. <strong>Stamping:</strong> Ensure coordinators stamp your sheet at every counter. Leaving any counter unstamped will block your class attendance!`,

  hostel: `🔑 <strong>Hostel Allocation Process:</strong><br>1. <strong>Report on Campus:</strong> Complete physical document verification at Unipolis first.<br>2. <strong>Settle Dues:</strong> Settle all pending hostel, mess, or laundry fees online or at the Accounts Help Desk in Unipolis.<br>3. <strong>Update Slip:</strong> The system updates your hostel slip within 15 minutes of fee clearance.<br>4. <strong>Download Slip:</strong> Go to UMS portal → Residential Services → View Residential Reporting Slip.<br>5. <strong>Collect Key:</strong> Report to your allotted hostel Warden's Office, show the slip, and pick up your keys!`,

  mba_mca: `📅 <strong>Special Programme Schedules (Compulsory):</strong><br>• <strong>MBA Programmes:</strong> Compulsory Pre-Term classes run from <strong>30th July to 7th August 2026</strong>. Regular classes start <strong>10th August 2026</strong>.<br>• <strong>MCA Programmes:</strong> Compulsory Bridge Course starts on <strong>16th July 2026</strong>. Regular classes start <strong>6th August 2026</strong>.`,

  cse: `💻 <strong>B.Tech CSE Reporting Details:</strong><br>• B.Tech CSE students can search their dates on the guide portal using their <strong>Candidate ID</strong> or programme name.<br>• <strong>Note:</strong> Candidate IDs take approximately 8 hours to generate after completing your initial admission payment. Until then, use the programme name (e.g., CSE) to search!`,

  helpline: `📞 <strong>LPU Official Helplines:</strong><br>• <strong>Induction & Reporting Helpline:</strong> 01824-517170<br>• <strong>Alternative Contact:</strong> +91-1824-517000 / 01824-404404<br>• <strong>OG Student Support Group Phone:</strong> 8264105304`
};

let chatHistory = [];

function initChatbot() {
    const bubbleBtn = document.getElementById('chatbot-bubble-btn');
    const windowPanel = document.getElementById('chatbot-window-panel');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const messagesBody = document.getElementById('chatbot-messages-body');
    const suggestionsChips = document.getElementById('chatbot-suggestions-chips');
    const userInput = document.getElementById('chatbot-user-input');
    const sendBtn = document.getElementById('chatbot-send-btn');
    
    let isChatOpen = false;

    // Toggle Chat Window
    function toggleChat() {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            windowPanel.classList.add('open');
            bubbleBtn.classList.add('active');
            bubbleBtn.classList.remove('pulse-effect');
            const badge = bubbleBtn.querySelector('.chatbot-badge');
            if (badge) badge.remove();
        } else {
            windowPanel.classList.remove('open');
            bubbleBtn.classList.remove('active');
        }
    }

    bubbleBtn.addEventListener('click', toggleChat);
    closeBtn.addEventListener('click', toggleChat);

    // Append Message helper
    function appendMessage(sender, text, hasBanner = false) {
        const row = document.createElement('div');
        row.className = `chat-bubble-row ${sender === 'user' ? 'user-row' : 'bot-row'}`;
        
        let avatarHtml = '';
        if (sender === 'bot') {
            avatarHtml = `
                <div class="bot-avatar">
                    <i class="fa-solid fa-robot"></i>
                </div>
            `;
        }

        let bannerHtml = '';
        if (hasBanner) {
            bannerHtml = `
                <div class="chatbot-banner-links">
                    <a href="https://chat.whatsapp.com/GTn0Gy3B7yx6Nz0SueAslo" target="_blank" rel="noopener noreferrer" class="chatbot-banner-btn wa">
                        <i class="fa-brands fa-whatsapp"></i> Join WhatsApp Community
                    </a>
                    <a href="https://www.instagram.com/channel/Abb29FGW0tAjvv9F/" target="_blank" rel="noopener noreferrer" class="chatbot-banner-btn ig">
                        <i class="fa-brands fa-instagram"></i> Follow Instagram Channel
                    </a>
                </div>
            `;
        }

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'chat-bubble';
        const textSpan = document.createElement('span');
        if (sender === 'user') {
            textSpan.textContent = text;
        } else {
            textSpan.innerHTML = text;
        }
        bubbleDiv.appendChild(textSpan);
        if (bannerHtml) {
            const bannerContainer = document.createElement('div');
            bannerContainer.innerHTML = bannerHtml;
            bubbleDiv.appendChild(bannerContainer);
        }

        row.innerHTML = avatarHtml;
        row.appendChild(bubbleDiv);
        
        messagesBody.appendChild(row);
        messagesBody.scrollTop = messagesBody.scrollHeight;
    }

    function getOfflineBotText(userText) {
        const lowerText = userText.toLowerCase();
        const matchedSug = CHATBOT_SUGGESTIONS.find(s => s.text.toLowerCase() === lowerText);
        if (matchedSug) {
            return CHATBOT_BOT_RESPONSES[matchedSug.id];
        }

        let matchId = null;
        for (const kw of CHATBOT_KEYWORDS) {
            if (kw.keys.some(k => lowerText.includes(k))) {
                matchId = kw.responseId;
                break;
            }
        }

        if (matchId) {
            return CHATBOT_BOT_RESPONSES[matchId];
        }

        return `🤖 I'm operating in offline backup mode. I can help with:<br>• <strong>Documents</strong> checklist.<br>• <strong>Hostel allocation</strong> steps.<br>• <strong>Unipolis reporting</strong> procedures.`;
    }

    // Bot Response Logic
    function handleBotReply(userText) {
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chat-bubble-row bot-row typing-indicator-row';
        typingIndicator.innerHTML = `
            <div class="bot-avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="chat-bubble typing">
                <span class="dot"></span><span class="dot"></span><span class="dot"></span>
            </div>
        `;
        messagesBody.appendChild(typingIndicator);
        messagesBody.scrollTop = messagesBody.scrollHeight;

        // Keep local history limit of last 6 messages (3 pairs) to conserve tokens
        const historyCopy = chatHistory.map(h => ({ role: h.role, text: h.text })).slice(-6);

        fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText, history: historyCopy })
        })
        .then(res => {
            typingIndicator.remove();
            if (!res.ok) throw new Error(`HTTP error ${res.status}`);
            return res.json();
        })
        .then(payload => {
            let botText = "";
            if (payload.success && payload.data && payload.data.text) {
                botText = payload.data.text;
                // Parse markdown bold and newlines to HTML format
                botText = botText
                    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                    .replace(/\*(.*?)\*/g, '<em>$1</em>')
                    .replace(/\n/g, '<br>');
                
                chatHistory.push({ role: 'user', text: userText });
                chatHistory.push({ role: 'model', text: botText });
            } else {
                botText = getOfflineBotText(userText);
            }
            appendMessage('bot', botText);
        })
        .catch(err => {
            console.warn('Chatbot API error, switching to offline fallback matcher:', err.message);
            typingIndicator.remove();
            const botText = getOfflineBotText(userText);
            appendMessage('bot', botText);
        });
    }

    // Send Message Handler
    function sendMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage('user', text);
        userInput.value = '';
        handleBotReply(text);
    }

    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    // Populate Suggestions
    CHATBOT_SUGGESTIONS.forEach(sug => {
        const chip = document.createElement('button');
        chip.className = 'chatbot-suggestion-chip';
        chip.textContent = sug.label;
        chip.addEventListener('click', () => {
            appendMessage('user', sug.text);
            handleBotReply(sug.text);
        });
        suggestionsChips.appendChild(chip);
    });

    // Initial greeting
    appendMessage('bot', "👋 Welcome to ogeduAI Help! I'm your offline assistant. Join our community for live updates:", true);
}
