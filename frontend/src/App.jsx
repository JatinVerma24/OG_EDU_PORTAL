import React, { useState, useEffect, useRef } from 'react';
import DisclaimerModal from './components/DisclaimerModal';
import OnArrivalSteps from './components/OnArrivalSteps';
import InductionHighlights from './components/InductionHighlights';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// Normalization helper to make searches punctuation and space agnostic
const normalizeForSearch = (str) => {
  if (!str) return '';
  return str.toLowerCase().replace(/[.\-\s()]/g, '');
};

// Alias maps for search expansion
const SEARCH_ALIASES = {
  'cse': ['computerscience', 'computersc', 'cse'],
  'ece': ['electronics', 'ece', 'semiconductor'],
  'me': ['mechanical', 'me'],
  'ce': ['civil', 'ce'],
  'ee': ['electrical', 'ee'],
  'ae': ['automobile', 'ae'],
  'btech': ['btech', 'b.tech', 'b tech'],
  'mtech': ['mtech', 'm.tech', 'm tech'],
  'bca': ['computerapplications', 'bca'],
  'mca': ['computerapplications', 'mca'],
  'mba': ['businessadministration', 'mba'],
  'bba': ['businessadministration', 'bba'],
  'bsc': ['science', 'bsc'],
  'msc': ['science', 'msc'],
  'diploma': ['diploma']
};

const TARGET_DATE = new Date('2026-07-27T09:00:00'); // Tentative induction start

const getChecklistItems = (faculty) => {
  const baseItems = [
    { id: 'docs_original', text: "Carry Original Certificates (10th/12th Marksheets, Migration, Character cert, etc.)" },
    { id: 'docs_photocopy', text: "Keep 2 sets of Photocopies and 4 Passport-size Photos ready" },
    { id: 'adm_letter', text: "Carry printed Admission Letter & note down UMS password" },
    { id: 'biometrics', text: "Complete Biometric Registration at campus counters" },
    { id: 'id_card', text: "Get physical LPU Student ID Card printed" },
    { id: 'hostel_alloc', text: "Check in with hostel warden & collect room keys (if staying on campus)" }
  ];

  if (faculty === 'LFTS') {
    return [
      ...baseItems,
      { id: 'lfts_github', text: "Set up GitHub account and IDE (VS Code/PyCharm) on your laptop" },
      { id: 'lfts_prep', text: "Check UMS for Coding Diagnostic / Math Prep online tests" }
    ];
  } else if (faculty === 'LFBA') {
    return [
      ...baseItems,
      { id: 'lfba_elevator', text: "Draft a 1-minute elevator pitch for icebreaking/orientation" },
      { id: 'lfba_software', text: "Download Microsoft Excel / spreadsheet tools on your laptop" }
    ];
  } else if (faculty === 'LFAMS') {
    return [
      ...baseItems,
      { id: 'lfams_coat', text: "Procure a clean laboratory white coat and closed-toe shoes" },
      { id: 'lfams_safety', text: "Register for the Mandatory Laboratory Safety briefing on UMS" }
    ];
  }
  return baseItems;
};

export default function App() {
  // Application State
  const [programmes, setProgrammes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [disciplineFilter, setDisciplineFilter] = useState('All');
  const [eligibilityFilter, setEligibilityFilter] = useState('All');
  const [facultyFilter, setFacultyFilter] = useState('All');

  // Pinned & Checklist State
  const [pinnedProg, setPinnedProg] = useState(null);
  const [studentId, setStudentId] = useState(localStorage.getItem('student_id') || '');
  const [checklist, setChecklist] = useState({});
  const [isSyncing, setIsSyncing] = useState(false);

  // UI States
  const [showDisclaimer, setShowDisclaimer] = useState(!localStorage.getItem('disclaimer_accepted'));
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  const [toast, setToast] = useState(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // FAQ Active Accordion Item State
  const [activeFaqIdx, setActiveFaqIdx] = useState(null);

  // Refs
  const myPlanRef = useRef(null);

  // Theme Sync Effect
  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.remove('light-theme');
    }
  }, [theme]);

  // Security Route Guard: Enforce Firebase Auth and Batch ID verification
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        localStorage.setItem('auth_redirect', '/fresher/');
        window.location.href = '/senior/auth.html';
        return;
      }
      
      const savedId = localStorage.getItem('student_id') || '';
      const allowed = ['126', '261', '260', '262', '263'];
      const isAllowed = allowed.some(code => savedId.includes(code));
      if (!isAllowed) {
        window.location.href = '/';
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch Programmes from MERN backend
  useEffect(() => {
    const fetchProgrammes = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/programmes');
        if (!res.ok) throw new Error('Failed to fetch programmes data');
        const data = await res.json();
        setProgrammes(data);

        // Restore Pinned Programme from localStorage if it exists
        const savedCode = localStorage.getItem('pinned_programme_code');
        if (savedCode) {
          const match = data.find(p => p.programmeCode === savedCode);
          if (match) {
            setPinnedProg(match);
          }
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProgrammes();
  }, []);

  // Fetch Checklist for studentId on mount / change
  useEffect(() => {
    if (!studentId.trim()) return;

    const fetchChecklist = async () => {
      try {
        const res = await fetch(`/api/checklists/${studentId.trim().toUpperCase()}`);
        if (res.ok) {
          const data = await res.json();
          setChecklist(data.checklist || {});
        }
      } catch (err) {
        console.error('Failed to restore checklist from database:', err);
      }
    };

    fetchChecklist();
  }, [studentId]);

  // Save checklist state to localStorage when it changes
  useEffect(() => {
    if (pinnedProg) {
      localStorage.setItem('local_checklist_' + pinnedProg.programmeCode, JSON.stringify(checklist));
    }
  }, [checklist, pinnedProg]);

  // Load local checklist when a programme is pinned
  useEffect(() => {
    if (pinnedProg) {
      const savedLocal = localStorage.getItem('local_checklist_' + pinnedProg.programmeCode);
      if (savedLocal) {
        try {
          setChecklist(JSON.parse(savedLocal));
        } catch {
          setChecklist({});
        }
      } else {
        setChecklist({});
      }
    }
  }, [pinnedProg]);

  // Countdown Interval
  useEffect(() => {
    const timer = setInterval(() => {
      const diff = +TARGET_DATE - +new Date();
      if (diff <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        clearInterval(timer);
      } else {
        setCountdown({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Show Toast Toast Notification helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Disclaimer acknowledgment
  const handleDisclaimerAccept = () => {
    localStorage.setItem('disclaimer_accepted', 'true');
    setShowDisclaimer(false);
    showToast('Welcome to the Induction Helper Portal!');
  };

  // Theme Toggle
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Pin / Unpin Programme
  const handlePinProgramme = (prog) => {
    if (pinnedProg?.programmeCode === prog.programmeCode) {
      setPinnedProg(null);
      localStorage.removeItem('pinned_programme_code');
      setChecklist({});
      showToast('Programme unpinned from dashboard', 'info');
    } else {
      setPinnedProg(prog);
      localStorage.setItem('pinned_programme_code', prog.programmeCode);
      showToast(`Pinned ${prog.programmeName}! Scroll up to view your plan.`);
      setTimeout(() => {
        myPlanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  };

  // Checklist Item Toggle Action
  const handleToggleChecklist = async (itemId) => {
    const updated = {
      ...checklist,
      [itemId]: !checklist[itemId]
    };
    setChecklist(updated);

    // Auto-sync to Express database if studentId is configured
    if (studentId.trim()) {
      try {
        await fetch(`/api/checklists/${studentId.trim().toUpperCase()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ checklist: updated })
        });
      } catch (err) {
        console.error('Failed to sync checklist changes with MERN database:', err);
      }
    }
  };

  // Cloud Sync
  const handleSyncCloud = async () => {
    if (!studentId.trim()) {
      showToast('Please enter a Registration/Student ID first!', 'error');
      return;
    }

    setIsSyncing(true);
    localStorage.setItem('student_id', studentId.trim().toUpperCase());
    try {
      // 1. Get database checklist
      const getRes = await fetch(`/api/checklists/${studentId.trim().toUpperCase()}`);
      let dbChecklist = {};
      if (getRes.ok) {
        const getData = await getRes.json();
        dbChecklist = getData.checklist || {};
      }

      // Merge local checklist and DB checklist (local takes precedence if toggle is true)
      const merged = { ...dbChecklist, ...checklist };
      setChecklist(merged);

      // 2. Save merged back
      const postRes = await fetch(`/api/checklists/${studentId.trim().toUpperCase()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checklist: merged })
      });

      if (postRes.ok) {
        showToast('Checklist successfully synced with server!');
      } else {
        throw new Error('Sync response not OK');
      }
    } catch (err) {
      console.error(err);
      showToast('Sync failed. Using local storage mode.', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  // Reset Sync / Clear studentId
  const handleClearSync = () => {
    setStudentId('');
    localStorage.removeItem('student_id');
    setChecklist({});
    showToast('Cleared sync session', 'info');
  };

  // Search Logic with Multi-word Term Expansion and String Normalization
  const filteredProgrammes = programmes.filter(prog => {
    // 1. Faculty Filter
    if (facultyFilter !== 'All' && prog.faculty !== facultyFilter) return false;
    
    // 2. Discipline Filter
    if (disciplineFilter !== 'All' && prog.discipline !== disciplineFilter) return false;

    // 3. Eligibility Filter
    if (eligibilityFilter !== 'All' && prog.eligibility !== eligibilityFilter) return false;

    // 4. Query Matching
    if (!searchQuery.trim()) return true;

    const normQuery = normalizeForSearch(searchQuery);

    const normName = normalizeForSearch(prog.programmeName);
    const normCode = normalizeForSearch(prog.programmeCode);
    const normDiscipline = normalizeForSearch(prog.discipline);
    const normFaculty = normalizeForSearch(prog.faculty);
    const normEligibility = normalizeForSearch(prog.eligibility);

    // Immediate match if the whole normalized query is contained in name/code/discipline
    if (normName.includes(normQuery) || 
        normCode.includes(normQuery) || 
        normDiscipline.includes(normQuery)) {
      return true;
    }

    // Split-term check for multi-word queries with alias expansion
    const terms = searchQuery.toLowerCase().split(/\s+/).filter(Boolean);

    return terms.every(term => {
      const normTerm = normalizeForSearch(term);
      const aliases = SEARCH_ALIASES[normTerm] || SEARCH_ALIASES[term] || [term];

      return aliases.some(alias => {
        const normAlias = normalizeForSearch(alias);
        return normName.includes(normAlias) || 
               normCode.includes(normAlias) || 
               normDiscipline.includes(normAlias) || 
               normFaculty.includes(normAlias) ||
               normEligibility.includes(normAlias);
      });
    });
  });

  // Unique Lists for Dropdowns
  const uniqueDisciplines = ['All', ...new Set(programmes.map(p => p.discipline).filter(Boolean))].sort();
  const uniqueEligibilities = ['All', ...new Set(programmes.map(p => p.eligibility).filter(Boolean))].sort();
  const uniqueFaculties = ['All', ...new Set(programmes.map(p => p.faculty).filter(Boolean))].sort();

  // Active checklist items calculation
  const currentChecklistItems = getChecklistItems(pinnedProg?.faculty);
  const completedCount = currentChecklistItems.filter(item => checklist[item.id]).length;
  const progressPercent = currentChecklistItems.length ? Math.round((completedCount / currentChecklistItems.length) * 100) : 0;

  // Toggle FAQ Accordion
  const toggleFaq = (idx) => {
    setActiveFaqIdx(prev => prev === idx ? null : idx);
  };

  return (
    <>
      {/* Background glowing blurred circles */}
      <div className="bg-blur-circle bg-blur-1"></div>
      <div className="bg-blur-circle bg-blur-2"></div>
      <div className="bg-blur-circle bg-blur-3"></div>

      {/* Top Warning Banner */}
      <div className="disclaimer-top-banner">
        <i className="fa-solid fa-triangle-exclamation"></i>
        <span>these Dates are tentative. Always cross-verify on official LPU Website.</span>
      </div>

      {/* Disclaimer Warning Overlay Modal */}
      {showDisclaimer && <DisclaimerModal onAccept={handleDisclaimerAccept} />}

      {/* App Header */}
      <header className="app-header">
        <div className="container header-container">
          <div className="logo-area">
            <div className="logo-icon">
              <span className="logo-letter">L</span>
              <span className="logo-letter orange">P</span>
              <span className="logo-letter">U</span>
            </div>
            <div className="logo-text">
              Induction Hub <span className="year-badge">2026</span>
            </div>
          </div>
          <div className="header-actions">
            <a 
              href="https://docs.google.com/document/d/16MHkIyiyxC-E4wzH0gfK7qePIg82DkQIFyK0kQpXB4w/edit?tab=t.0" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="header-cta-link guide-cta"
              title="Read LPU Full Guide"
            >
              <i className="fa-solid fa-book-open"></i> <span className="hide-mobile">Full Guide</span>
            </a>
            <a 
              href="https://chat.whatsapp.com/ENyQCJb6mpl6HnwksU6Q1T?s=sw&p=i&ilr=1&amv=1" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="header-cta-link wa-cta"
              title="Join WhatsApp Group"
            >
              <i className="fa-brands fa-whatsapp"></i> <span className="hide-mobile">WhatsApp Fresher Group</span>
            </a>
            <div className="og-badge-wrapper">
              <div className="og-badge">
                <i className="fa-solid fa-crown"></i> Created by OG Jatin Verma
              </div>
            </div>
            <button 
              className="theme-toggle-btn" 
              onClick={toggleTheme} 
              aria-label="Toggle theme mode"
              title="Toggle Dark/Light theme"
            >
              <i className={theme === 'dark' ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
            </button>
            <button
              className="theme-toggle-btn"
              onClick={() => auth.signOut()}
              title="Sign Out of OGEDU"
              style={{ marginLeft: '8px' }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
            </button>
          </div>
        </div>
      </header>

      <main className="container" style={{ position: 'relative', zIndex: 5 }}>
        
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="welcome-tag animate-pulse">
              <i className="fa-solid fa-graduation-cap"></i> Class of 2026-30
            </div>
            <h1>Your Ultimate LPU Induction Navigator</h1>
            <p className="hero-subtitle">
              Search your course dates, check on-campus reporting schedules, learn vital university terms, and sync your pre-induction checklist across your devices.
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="countdown-card glass-panel">
            <div className="countdown-title">Induction Countdown</div>
            <div className="countdown-grid">
              <div className="countdown-item">
                <span className="countdown-val">{String(countdown.days).padStart(2, '0')}</span>
                <span className="countdown-label">Days</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-val">{String(countdown.hours).padStart(2, '0')}</span>
                <span className="countdown-label">Hrs</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-val">{String(countdown.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">Mins</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-val">{String(countdown.seconds).padStart(2, '0')}</span>
                <span className="countdown-label">Secs</span>
              </div>
            </div>
            <div className="countdown-note">
              <i className="fa-solid fa-calendar-check text-orange"></i> Scheduled to kick off: July 27, 2026 (Tentative)
            </div>
          </div>
        </section>

        {/* On Arrival Steps Roadmap */}
        <OnArrivalSteps />

        {/* OG Family Resources & Guides */}
        <section className="og-resources-section glass-panel">
          <div className="og-resources-header">
            <h3><i className="fa-solid fa-crown text-yellow"></i> Welcome to the OG Family</h3>
            <span className="og-support-badge">Official Resources</span>
          </div>
          <div className="og-resources-body">
            <div className="og-warning-box">
              <i className="fa-solid fa-triangle-exclamation"></i>
              <span><strong>Must Follow:</strong> Please follow the page & send proof of admission (with your name visible, such as virtual ID card, LPUNEST form with photo) to get access.</span>
            </div>
            <p className="og-welcome-text">As promised, here’s the complete LPU Fresher Guide + group links ⬇️</p>
            <div className="og-links-grid">
              <a href="https://docs.google.com/document/d/16MHkIyiyxC-E4wzH0gfK7qePIg82DkQIFyK0kQpXB4w/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="og-link-btn guide">
                <i className="fa-solid fa-book-open"></i> LPU Full Guide
              </a>
              <a href="https://chat.whatsapp.com/ENyQCJb6mpl6HnwksU6Q1T?s=sw&p=i&ilr=1&amv=1" target="_blank" rel="noopener noreferrer" className="og-link-btn wa">
                <i className="fa-brands fa-whatsapp"></i> WhatsApp Fresher Group
              </a>
              <a href="https://ig.me/j/AbbeGHgFiJAngiaM/" target="_blank" rel="noopener noreferrer" className="og-link-btn ig">
                <i className="fa-brands fa-instagram"></i> Girls Group (Only)
              </a>
            </div>
          </div>
          <div className="og-resources-footer">
            <span><i className="fa-solid fa-circle-question"></i> Any doubts? Contact: <strong>8264105304</strong></span>
            <div className="og-social-icons">
              <a href="https://www.instagram.com/ogjatinverma/" target="_blank" rel="noopener noreferrer" title="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="https://www.youtube.com/@OGJATINVERMA" target="_blank" rel="noopener noreferrer" title="YouTube"><i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>
        </section>

        {/* Pinned Programme Dashboard ("My Plan") */}
        <section 
          ref={myPlanRef} 
          className={`my-plan-section ${pinnedProg ? '' : 'hidden'}`}
        >
          <div className="section-header">
            <h2>
              <i className="fa-solid fa-circle-check text-green"></i> My Personal Plan
            </h2>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => handlePinProgramme(pinnedProg)}
            >
              <i className="fa-solid fa-circle-xmark"></i> Clear Plan
            </button>
          </div>

          {pinnedProg && (
            <div className="pinned-dashboard-grid">
              {/* Pinned Info */}
              <div className="pinned-info-card glass-panel">
                <div>
                  <span className={`faculty-tag ${pinnedProg.faculty?.toLowerCase()}`}>
                    {pinnedProg.faculty}
                  </span>
                  <h3 id="pinned-title">{pinnedProg.programmeName}</h3>
                  <div className="pinned-meta">
                    <span>
                      <i className="fa-solid fa-qrcode"></i> Code: <strong>{pinnedProg.programmeCode}</strong>
                    </span>
                    <span>
                      <i className="fa-solid fa-clock"></i> Duration: <strong>{pinnedProg.duration}</strong>
                    </span>
                    <span>
                      <i className="fa-solid fa-user-graduate"></i> Eligibility: <strong>{pinnedProg.eligibility}</strong>
                    </span>
                  </div>

                  <div className="pinned-timeline">
                    <div className="timeline-step">
                      <div className="step-num">1</div>
                      <div className="step-content">
                        <h4>On-Campus Reporting</h4>
                        <div className="date-val" style={{ whiteSpace: 'pre-line' }}>{pinnedProg.reportingDate}</div>
                        <span className="step-desc">Go to the campus with originals and photocopies</span>
                      </div>
                    </div>
                    
                    <div className="timeline-step">
                      <div className="step-num">2</div>
                      <div className="step-content">
                        <h4>Induction Schedule</h4>
                        <div className="date-val" style={{ whiteSpace: 'pre-line' }}>{pinnedProg.inductionSchedule}</div>
                        <span className="step-desc">Workshops, briefings, and group activities</span>
                      </div>
                    </div>

                    <div className="timeline-step">
                      <div className="step-num">3</div>
                      <div className="step-content">
                        <h4>Classes Commencement</h4>
                        <div className="date-val" style={{ whiteSpace: 'pre-line' }}>{pinnedProg.classesStart}</div>
                        <span className="step-desc">Regular academic syllabus classes start</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pinned-actions">
                  <div style={{ flexGrow: 1 }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                      Sync Across Devices
                    </label>
                    <div className="sync-id-wrapper">
                      <input
                        type="text"
                        className="sync-id-input"
                        placeholder="CANDIDATE ID (e.g. 12604321)"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                      />
                      <button 
                        className="btn btn-primary btn-sm"
                        onClick={handleSyncCloud}
                        disabled={isSyncing}
                      >
                        {isSyncing ? (
                          <i className="fa-solid fa-spinner fa-spin"></i>
                        ) : (
                          <>
                            <i className="fa-solid fa-cloud-arrow-up"></i> Sync
                          </>
                        )}
                      </button>
                      {localStorage.getItem('student_id') && (
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '8px' }}
                          title="Log Out Sync Session"
                          onClick={handleClearSync}
                        >
                          <i className="fa-solid fa-right-from-bracket"></i>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Checklist Progress */}
              <div className="pinned-checklist-card glass-panel">
                <div className="checklist-header">
                  <h3>Reporting Checklist</h3>
                  <span className="progress-badge">{progressPercent}% Done</span>
                </div>
                <p className="checklist-sub">
                  Required procedures & tasks customized for your school orientation:
                </p>

                <ul className="checklist-items">
                  {currentChecklistItems.map(item => (
                    <li 
                      key={item.id} 
                      className="checklist-item"
                      onClick={() => handleToggleChecklist(item.id)}
                    >
                      <input
                        type="checkbox"
                        checked={!!checklist[item.id]}
                        onChange={() => {}} // Controlled via li click
                      />
                      <span className="checklist-item-text">{item.text}</span>
                    </li>
                  ))}
                </ul>

                <div className="checklist-footer">
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {completedCount} of {currentChecklistItems.length} items checked
                  </span>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Schedule, Filters and Programmes Search */}
        <section className="schedule-section">
          <div className="section-title-wrapper">
            <h2>
              <i className="fa-solid fa-magnifying-glass text-orange"></i> Search Programme Induction Dates
            </h2>
            <p>Type keywords like "btech cse" or code like "P132" to fetch instant scheduling timelines</p>
          </div>

          <div className="filter-controls glass-panel">
            <div className="search-box-wrapper">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>
              <input
                id="search-input"
                type="text"
                placeholder="Search by programme name (e.g. BTech CSE), course code (P132), discipline..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                className={`clear-search-btn ${searchQuery ? '' : 'hidden'}`}
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
              >
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </div>

            <div className="filters-grid">
              <div className="filter-group">
                <label htmlFor="discipline-select">Discipline</label>
                <select 
                  id="discipline-select"
                  value={disciplineFilter}
                  onChange={(e) => setDisciplineFilter(e.target.value)}
                >
                  {uniqueDisciplines.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="eligibility-select">Eligibility</label>
                <select 
                  id="eligibility-select"
                  value={eligibilityFilter}
                  onChange={(e) => setEligibilityFilter(e.target.value)}
                >
                  {uniqueEligibilities.map(el => (
                    <option key={el} value={el}>{el}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label htmlFor="faculty-select">Faculty / School</label>
                <select 
                  id="faculty-select"
                  value={facultyFilter}
                  onChange={(e) => setFacultyFilter(e.target.value)}
                >
                  {uniqueFaculties.map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="filter-footer">
              <span className="results-count">
                Found <strong>{filteredProgrammes.length}</strong> programmes
              </span>
              {(searchQuery || disciplineFilter !== 'All' || eligibilityFilter !== 'All' || facultyFilter !== 'All') && (
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSearchQuery('');
                    setDisciplineFilter('All');
                    setEligibilityFilter('All');
                    setFacultyFilter('All');
                  }}
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="results-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="skeleton-card">
                  <div>
                    <div className="skeleton-badge"></div>
                    <div className="skeleton-title"></div>
                    <div className="skeleton-subtitle"></div>
                    <div className="skeleton-row"></div>
                    <div className="skeleton-row"></div>
                    <div className="skeleton-row"></div>
                  </div>
                  <div className="skeleton-footer">
                    <div className="skeleton-text-sm"></div>
                    <div className="skeleton-btn"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="empty-state glass-panel">
              <i className="fa-solid fa-triangle-exclamation empty-icon" style={{ color: 'red' }}></i>
              <h3>Connection Failed</h3>
              <p>{error}. Ensure the MERN server is running locally on port 5000.</p>
            </div>
          ) : filteredProgrammes.length === 0 ? (
            <div className="empty-state glass-panel">
              <i className="fa-solid fa-circle-info empty-icon"></i>
              <h3>No Programmes Match</h3>
              <p>We couldn't find any induction schedule matching your search settings.</p>
              <button 
                className="btn btn-primary btn-sm"
                onClick={() => {
                  setSearchQuery('');
                  setDisciplineFilter('All');
                  setEligibilityFilter('All');
                  setFacultyFilter('All');
                }}
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="results-grid">
              {filteredProgrammes.map(prog => {
                const isPinned = pinnedProg?.programmeCode === prog.programmeCode;
                return (
                  <div key={prog.programmeCode} className="programme-card glass-panel">
                    <div>
                      <div className="card-header-area">
                        <div className="card-badge-row">
                          <span className={`faculty-badge ${prog.faculty?.toLowerCase()}`}>
                            {prog.faculty}
                          </span>
                          <span className="faculty-badge" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                            {prog.discipline}
                          </span>
                        </div>
                        <button 
                          className={`pin-btn ${isPinned ? 'pinned' : ''}`}
                          onClick={() => handlePinProgramme(prog)}
                          title={isPinned ? "Unpin programme from Dashboard" : "Pin programme to Dashboard"}
                          aria-label="Pin programme"
                        >
                          <i className={isPinned ? "fa-solid fa-bookmark" : "fa-regular fa-bookmark"}></i>
                        </button>
                      </div>

                      <h3 className="programme-name-title">{prog.programmeName}</h3>
                      <span className="programme-code-txt">Code: {prog.programmeCode}</span>

                      <div className="card-dates-list">
                        <div className="date-row">
                          <span className="date-label">On-Campus Reporting</span>
                          <span className="date-text" style={{ whiteSpace: 'pre-line' }}>{prog.reportingDate}</span>
                        </div>
                        
                        <div className="date-row">
                          <span className="date-label">Induction Schedule</span>
                          <span className="date-text" style={{ whiteSpace: 'pre-line' }}>{prog.inductionSchedule}</span>
                        </div>

                        <div className="date-row">
                          <span className="date-label">Classes Start</span>
                          <span className="date-text" style={{ whiteSpace: 'pre-line' }}>{prog.classesStart}</span>
                        </div>
                      </div>
                    </div>

                    <div className="card-footer-actions">
                      <span className="duration-info">
                        <i className="fa-solid fa-hourglass-half"></i> {prog.duration}
                      </span>
                      <button 
                        className={`btn btn-sm ${isPinned ? 'btn-secondary' : 'btn-primary'}`}
                        onClick={() => handlePinProgramme(prog)}
                      >
                        {isPinned ? (
                          <>
                            <i className="fa-solid fa-check"></i> Active Plan
                          </>
                        ) : (
                          <>
                            <i className="fa-solid fa-thumbtack"></i> Track Dates
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Highlights Section */}
        <InductionHighlights />

        {/* LPU Glossary Guide */}
        <section className="campus-guide-section">
          <div className="section-title-wrapper" style={{ textAlign: 'center' }}>
            <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-book-open text-orange"></i> Essential LPU Glossary
            </h2>
            <p>Demystifying the unique terms and codes you will hear daily on campus</p>
          </div>

          <div className="glossary-grid">
            <div className="glossary-card glass-panel" style={{ '--accent': 'var(--primary)' } }>
              <div className="glossary-header">
                <h3>UMS</h3>
                <span className="fac-tag" style={{ background: 'var(--primary-glow)', color: 'var(--primary)' }}>Academic Portal</span>
              </div>
              <p>
                <strong>University Management System</strong>: The central web portal for LPU students. It is where you register classes, check marks/grades, view timetable, apply for leaves, download admit cards, pay fees, and access course materials.
              </p>
              <ul className="fac-details">
                <li><i className="fa-solid fa-circle-dot"></i> Available at: <a href="https://ums.lpu.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>ums.lpu.in</a></li>
                <li><i className="fa-solid fa-circle-dot"></i> Credentials: Reg No. and Password sent via SMS.</li>
              </ul>
            </div>

            <div className="glossary-card glass-panel" style={{ '--accent': 'var(--lfts-color)' } }>
              <div className="glossary-header">
                <h3>Unipolis</h3>
                <span className="fac-tag lfts-bg">Student Hub</span>
              </div>
              <p>
                <strong>Baldev Raj Mittal Unipolis</strong>: A massive open-air amphitheater with a giant canopy structure at the heart of the LPU campus. It hosts orientation functions, cultural events, music gigs, student stalls, and is the primary hangout zone.
              </p>
              <ul className="fac-details">
                <li><i className="fa-solid fa-circle-dot"></i> Location: Center of the campus (opposite block 34/30).</li>
                <li><i className="fa-solid fa-circle-dot"></i> Hosts LPU events and national celebrity visits.</li>
              </ul>
            </div>

            <div className="glossary-card glass-panel" style={{ '--accent': 'var(--lfams-color)' } }>
              <div className="glossary-header">
                <h3>DSW</h3>
                <span className="fac-tag lfams-bg">Services</span>
              </div>
              <p>
                <strong>Division of Student Welfare</strong>: The administrative department dedicated to students' extracurricular life. Located at Block 13, it manages sports clubs, student organizations, cultural groups, and issues hostel passes.
              </p>
              <ul className="fac-details">
                <li><i className="fa-solid fa-circle-dot"></i> Location: Block 13 (Uni-Mall area).</li>
                <li><i className="fa-solid fa-circle-dot"></i> Head here to join Music, Dance, Coding, or NGO clubs.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="faq-section">
          <div className="section-title-wrapper" style={{ textAlign: 'center' }}>
            <h2 style={{ display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <i className="fa-solid fa-circle-question text-orange"></i> Frequently Asked Questions
            </h2>
            <p>Quick answers to common queries freshmen have about physical induction</p>
          </div>

          <div className="faq-accordion">
            
            <div className={`faq-item glass-panel ${activeFaqIdx === 0 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(0)}>
                <span>Is this the official LPU Freshmen portal?</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className="faq-answer">
                <p>
                  <strong>No.</strong> This is an UNOFFICIAL informational guide built to make the reporting schedules and dates much easier to search. The official portal is at <a href="https://www.lpu.in" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>lpu.in</a> and UMS. All official dates are subject to change by LPU, so please double check UMS regularly.
                </p>
              </div>
            </div>

            <div className={`faq-item glass-panel ${activeFaqIdx === 1 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(1)}>
                <span>What documents should I bring for document verification?</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className="faq-answer">
                <p>You must bring original copies along with 2 sets of photocopies of:</p>
                <ul>
                  <li>Class 10th and 12th passing marksheets and certificates.</li>
                  <li>Graduation marksheet (if applying for PG programmes).</li>
                  <li>Character Certificate from last school/college.</li>
                  <li>Migration Certificate & Transfer Certificate.</li>
                  <li>LPU Admission Letter and Fee Receipts.</li>
                  <li>4 passport-sized photographs.</li>
                </ul>
              </div>
            </div>

            <div className={`faq-item glass-panel ${activeFaqIdx === 2 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(2)}>
                <span>What do LFTS, LFBA, and LFAMS stand for?</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className="faq-answer">
                <p>These are faculty/school classifications for organizing reporting schedules:</p>
                <ul>
                  <li><strong>LFTS:</strong> Lovely Faculty of Technology and Sciences (includes Engineering, Computer Science, IT, BCA, Physics, Chemistry, etc.)</li>
                  <li><strong>LFBA:</strong> Lovely Faculty of Business and Arts (includes MBA, BBA, Commerce, Architecture, Design, Fashion, Humanities, etc.)</li>
                  <li><strong>LFAMS:</strong> Lovely Faculty of Applied Medical Sciences (includes Pharmacy, Physiotherapy, Biotechnology, Medical Lab Tech, Agriculture, etc.)</li>
                </ul>
              </div>
            </div>

            <div className={`faq-item glass-panel ${activeFaqIdx === 3 ? 'active' : ''}`}>
              <button className="faq-question" onClick={() => toggleFaq(3)}>
                <span>What should I do if my schedule shows Group G1, G2, etc.?</span>
                <i className="fa-solid fa-chevron-down"></i>
              </button>
              <div className="faq-answer">
                <p>
                  For large programmes like B.Tech. CSE, students are split into Groups (G1, G2, G3, G4) based on registration numbers to prevent campus crowding. Check your UMS dashboard or LPU email. It will specify which group you belong to. Follow the specific reporting and classes-commencement dates for your assigned group.
                </p>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* App Footer */}
      <footer className="app-footer">
        <div className="container footer-content">
          <div className="og-jatin-footer">
            <span className="jatin-brand">Created with passion by <span className="jatin-highlight">OG Jatin Verma</span></span>
          </div>
          <p className="disclaimer">
            Disclaimer: This is an unofficial helper website designed for freshman student onboarding reference. The developers are not liable for scheduling shifts, cancellations, or inaccuracies. Please cross-reference all dates and instructions on the official Lovely Professional University website (<a href="https://www.lpu.in" target="_blank" rel="noopener noreferrer">lpu.in</a>) and UMS portal.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
            &copy; {new Date().getFullYear()} LPU Freshman Induction Hub. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Toast Notification Container */}
      <div className={`toast ${toast ? '' : 'hidden'}`}>
        <div className="toast-icon">
          <i className={toast?.type === 'error' ? "fa-solid fa-triangle-exclamation" : "fa-solid fa-circle-check"}></i>
        </div>
        <div id="toast-message">{toast?.message}</div>
      </div>
    </>
  );
}
