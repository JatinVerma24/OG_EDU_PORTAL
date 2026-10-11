'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { CourseId, SemesterNumber, SubjectType, Subject } from '../../types';
import {
  SearchBar,
  CourseFilter,
  SemesterFilter,
  SemesterTabs,
  SubjectGrid,
  SubjectModal,
  ChannelDiscovery,
  YoutubeIcon
} from '../../components/youtube-study-hub';
import { searchSubjects } from '../../lib/search/subjects';
import { getSemesterCounts, getSubjectByCodeOnly, getAllSubjects } from '../../data/courses';
import { Sparkles, ArrowLeft, Search, GraduationCap } from 'lucide-react';

const QUICK_SEARCH_CHIPS = [
  { code: 'CAP1008', name: 'C Programming', course: 'bca' as CourseId },
  { code: 'MTH136', name: 'Discrete Structures', course: 'bca' as CourseId },
  { code: 'CAP1007', name: 'FIT', course: 'bca' as CourseId },
  { code: 'CAB103', name: 'AI & ML', course: 'bca' as CourseId },
  { code: 'CAB104', name: 'Data Engg', course: 'bca' as CourseId },
  { code: 'PEL100', name: 'Communication', course: 'bca' as CourseId },
  { code: 'CHE110', name: 'EVS', course: 'bca' as CourseId },
  { code: 'ACC205', name: 'Cost Accounting', course: 'bba' as CourseId },
  { code: 'MKT201', name: 'Marketing', course: 'bba' as CourseId },
  { code: 'MGN206', name: 'Research Method', course: 'bba' as CourseId },
  { code: 'MGN253', name: 'Human Values', course: 'bba' as CourseId }
];

export default function YouTubeStudyHubPage() {
  const [query, setQuery] = useState<string>('');
  const [course, setCourse] = useState<CourseId>('bca');
  const [semester, setSemester] = useState<SemesterNumber | 'all'>('all');
  const [subjectType, setSubjectType] = useState<SubjectType | 'all'>('all');
  const [activeModalSubject, setActiveModalSubject] = useState<Subject | null>(null);

  // Sync initial state from URL on client mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const q = urlParams.get('q');
      const c = urlParams.get('course') as CourseId;
      const s = urlParams.get('sem');
      const t = urlParams.get('type') as SubjectType;

      if (q) setQuery(q);
      if (c === 'bca' || c === 'bba' || c === 'btech') setCourse(c);
      if (s && [1, 2, 3, 4].includes(Number(s))) setSemester(Number(s) as SemesterNumber);
      if (t && ['Core', 'Elective', 'Lab', 'Language', 'Minor', 'Aptitude', 'all'].includes(t)) {
        setSubjectType(t);
      }
    } catch {
      // Ignore URL parsing errors
    }
  }, []);

  // Sync state to URL without refreshing
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (course !== 'bca') params.set('course', course);
      if (semester !== 'all') params.set('sem', semester.toString());
      if (subjectType !== 'all') params.set('type', subjectType);

      const queryString = params.toString();
      const newUrl = queryString ? `/youtube-study-hub?${queryString}` : '/youtube-study-hub';
      window.history.replaceState(null, '', newUrl);
    } catch {
      // Ignore history errors
    }
  }, [query, course, semester, subjectType]);

  // Check URL hash for modal opening (e.g. #subject=cap1008)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#subject=')) {
        const code = hash.replace('#subject=', '');
        const found = getSubjectByCodeOnly(code);
        if (found) {
          setActiveModalSubject(found);
        }
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Compute semester counts dynamically from dataset
  const semesterCounts = useMemo(() => {
    return getSemesterCounts(course);
  }, [course]);

  // Compute filtered subjects for the current course
  const filteredSubjects = useMemo(() => {
    return searchSubjects({
      query,
      courseId: course,
      semester,
      type: subjectType
    });
  }, [query, course, semester, subjectType]);

  // Check if search query matches a subject in ANOTHER program (cross-course helper)
  const crossCourseMatch = useMemo(() => {
    if (!query.trim() || filteredSubjects.length > 0) return null;
    const trimmed = query.trim().toUpperCase();
    const all = getAllSubjects();
    const match = all.find(
      (s) => s.courseId !== course && (s.code.toUpperCase() === trimmed || s.name.toUpperCase().includes(trimmed))
    );
    return match || null;
  }, [query, filteredSubjects.length, course]);

  const handleResetFilters = () => {
    setQuery('');
    setSemester('all');
    setSubjectType('all');
  };

  const handleOpenSubjectModal = (subject: Subject) => {
    setActiveModalSubject(subject);
    window.location.hash = `subject=${subject.code.toLowerCase()}`;
  };

  const handleCloseSubjectModal = () => {
    setActiveModalSubject(null);
    if (window.location.hash.startsWith('#subject=')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleChipClick = (chip: typeof QUICK_SEARCH_CHIPS[0]) => {
    setCourse(chip.course);
    setSemester('all');
    setQuery(chip.code);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Mid-Term 2026 Urgent Announcement Banner ───────────────────── */}
      <div className="bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 text-white text-xs sm:text-sm py-2.5 px-3 sm:px-4 font-semibold text-center flex items-center justify-center gap-1.5 sm:gap-2 relative z-50 shadow-md">
        <span className="flex h-2 w-2 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
        </span>
        <span className="truncate sm:overflow-visible">
          🔥 <strong>University Mid-Terms 2026:</strong> B.Tech, BBA &amp; PVA Drive Vault, Safe Marks Predictor &amp; AI Prep Kit!
        </span>
        <Link
          href="/midterm"
          className="underline underline-offset-2 hover:text-amber-200 font-bold ml-1 shrink-0 flex items-center gap-0.5"
        >
          <span>Open Hub</span> &rarr;
        </Link>
      </div>

      {/* ── Top Header Navigation ────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-surface-base/80 border-b border-surface-border/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-zinc-950 font-black shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
              <svg className="w-4 h-4 text-zinc-950" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-lg tracking-tight text-white">
                OGEDU<span className="text-brand-500 font-bold ml-0.5">AI</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded">
                Study Hub
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-5 text-xs sm:text-sm font-medium text-zinc-400 shrink-0">
            <Link
              href="/midterm"
              className="text-amber-300 hover:text-amber-200 font-bold flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 whitespace-nowrap"
            >
              🔥 Mid-Term 2026 Hub
            </Link>
            <Link href="/" className="hover:text-zinc-100 transition-colors whitespace-nowrap">
              Home
            </Link>
            <Link href="/midterm/resources" className="hover:text-zinc-100 transition-colors whitespace-nowrap">
              Drive Vault
            </Link>
            <Link href="/midterm/calculator" className="hover:text-zinc-100 transition-colors whitespace-nowrap">
              Marks Predictor
            </Link>
            <Link href="/sih" className="hover:text-brand-300 text-zinc-400 transition-colors whitespace-nowrap">
              🏆 SIH Guide
            </Link>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/midterm"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-zinc-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-md shadow-amber-500/20 transition-all whitespace-nowrap"
            >
              <span>🔥 Mid-Term Hub</span>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold tracking-wide uppercase mb-4 shadow-sm">
            <YoutubeIcon className="w-4 h-4 text-red-500" />
            <span>OGEDU YouTube Study Hub</span>
          </div>

          <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight mb-4">
            Find the right YouTube channel{' '}
            <span className="bg-gradient-to-r from-red-400 via-brand-400 to-purple-400 bg-clip-text text-transparent">
              for every subject.
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
            Search by course code (e.g. <strong className="text-zinc-200">PEL100</strong>, <strong className="text-zinc-200">CAP1008</strong>, <strong className="text-zinc-200">ACC205</strong>, <strong className="text-zinc-200">MTH136</strong>) or subject name for verified university playlists.
          </p>

          {/* Search Bar */}
          <div className="mt-7 max-w-2xl mx-auto">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search code (PEL100, CAP1008, ACC205, MTH136, CAB103)..."
              totalResults={filteredSubjects.length}
            />
          </div>

          {/* Quick-Pick Subject Chips for BCA & BBA */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 max-w-3xl mx-auto">
            <span className="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider mr-1">
              Quick Find:
            </span>
            {QUICK_SEARCH_CHIPS.map((chip) => {
              const isSelected = query.toUpperCase() === chip.code;
              return (
                <button
                  key={chip.code}
                  type="button"
                  onClick={() => handleChipClick(chip)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg font-mono font-medium transition-all ${
                    isSelected
                      ? 'bg-brand-500 text-zinc-950 font-bold shadow-md shadow-brand-500/20'
                      : 'bg-surface-card hover:bg-surface-elevated text-zinc-400 hover:text-zinc-200 border border-surface-border'
                  }`}
                >
                  <span className="text-brand-400 font-bold mr-1">{chip.code}</span>
                  <span className="text-[10px] text-zinc-400 font-sans">{chip.name}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── Mid-Term 2026 Super Banner ─────────────────────────────────── */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 via-surface-card to-purple-950/30 border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-amber-500/10">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-rose-500/20 shrink-0">
              🔥
            </div>
            <div className="space-y-0.5 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                <span className="text-sm sm:text-base font-bold text-white">
                  University Mid-Term Exams 2026 Toolkit
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Updated with B.Tech, BBA, PVA &amp; AI Tools
                </span>
              </div>
              <p className="text-xs text-zinc-300">
                Access 245+ verified lecture notes, 11+ solved PYQs per subject, safe passing score predictor, and Jatin Verma&apos;s 5 AI study prompts.
              </p>
            </div>
          </div>

          <Link
            href="/midterm"
            className="shrink-0 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-rose-500/20"
          >
            <span>Explore Mid-Term Hub</span> &rarr;
          </Link>
        </div>

        {/* Cross-Course Match Banner if user searched a course code from another degree */}
        {crossCourseMatch && (
          <div className="mb-6 p-4 rounded-2xl bg-brand-500/10 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5 text-zinc-200">
              <Sparkles className="w-4 h-4 text-brand-400 flex-shrink-0" />
              <span>
                Found <strong className="text-brand-300 font-bold">{crossCourseMatch.code} ({crossCourseMatch.name})</strong> under{' '}
                <strong className="text-white uppercase">{crossCourseMatch.courseId}</strong> curriculum!
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setCourse(crossCourseMatch.courseId);
                setSemester('all');
                setQuery(crossCourseMatch.code);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-zinc-950 font-bold transition-all whitespace-nowrap"
            >
              Switch to {crossCourseMatch.courseId.toUpperCase()} & View
            </button>
          </div>
        )}

        {/* Course & Semester Switchers */}
        <section className="space-y-6 mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Course Selector (BCA / BBA / B.Tech) */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider hidden sm:inline">
                Program:
              </span>
              <CourseFilter
                selectedCourse={course}
                onSelectCourse={(newCourse) => {
                  if (newCourse !== 'all') {
                    setCourse(newCourse);
                  }
                  setSemester('all');
                }}
              />
            </div>

            {/* Quick Status Tag */}
            <div className="text-xs text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Verified for <strong className="text-zinc-200">1st Year & Ongoing Semesters</strong>
              </span>
            </div>
          </div>

          {/* 4 Large Quick Semester Navigation Tabs */}
          <SemesterTabs
            selectedSemester={semester}
            onSelectSemester={setSemester}
            semesterCounts={semesterCounts}
            courseId={course}
          />

          {/* Subject Type Filter Pills */}
          <SemesterFilter
            selectedSemester={semester}
            onSelectSemester={setSemester}
            selectedType={subjectType}
            onSelectType={setSubjectType}
          />
        </section>

        {/* Results Header */}
        <div className="flex items-center justify-between border-b border-surface-border/60 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <h2 className="font-display font-bold text-base sm:text-lg text-zinc-100 uppercase">
              {course} — {semester === 'all' ? 'All Semester Subjects' : `Semester ${semester} Subjects`}
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-surface-card text-brand-400 border border-surface-border">
              {filteredSubjects.length}
            </span>
          </div>

          {(query || semester !== 'all' || subjectType !== 'all') && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs text-zinc-400 hover:text-brand-300 transition-colors underline"
            >
              Reset all filters
            </button>
          )}
        </div>

        {/* Subjects Grid */}
        <SubjectGrid
          subjects={filteredSubjects}
          searchQuery={query}
          onSelectSubject={handleOpenSubjectModal}
          onResetSearch={handleResetFilters}
        />

        {/* Top Channel Discovery Directory */}
        <ChannelDiscovery />
      </main>

      {/* ── Dedicated Subject Modal ─────────────────────────────────────── */}
      <SubjectModal
        subject={activeModalSubject}
        onClose={handleCloseSubjectModal}
      />

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="mt-20 border-t border-surface-border/60 bg-surface-card/40 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 text-xs text-zinc-400">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-zinc-400">
            <Link href="/" className="hover:text-zinc-200 transition-colors">Home</Link>
            <Link href="/tools/cgpa-calculator" className="hover:text-zinc-200 transition-colors text-brand-400">CGPA Calculator</Link>
            <Link href="/tools/tgpa-calculator" className="hover:text-zinc-200 transition-colors text-brand-400">TGPA Calculator</Link>
            <Link href="/tools/pass-fail-checker" className="hover:text-zinc-200 transition-colors text-brand-400">Pass/Fail Checker</Link>
            <Link href="/tools/attendance-calculator" className="hover:text-zinc-200 transition-colors text-brand-400">Attendance Tool</Link>
            <Link href="/blog" className="hover:text-zinc-200 transition-colors">Academic Guides</Link>
            <Link href="/editorial-policy" className="hover:text-zinc-200 transition-colors">Editorial Policy</Link>
            <Link href="/about" className="hover:text-zinc-200 transition-colors">About Us</Link>
            <Link href="/contact" className="hover:text-zinc-200 transition-colors">Contact</Link>
            <Link href="/privacy-policy" className="hover:text-zinc-200 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-200 transition-colors">Terms</Link>
            <Link href="/disclaimer" className="hover:text-zinc-200 transition-colors">Disclaimer</Link>
            <Link href="/cookie-policy" className="hover:text-zinc-200 transition-colors">Cookie Policy</Link>
          </div>

          <div className="pt-4 border-t border-surface-border/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-brand-500 flex items-center justify-center text-zinc-950 font-bold text-[10px]">
                OG
              </div>
              <span>
                &copy; {new Date().getFullYear()} OGEDU AI &bull; Free Open-Access University Knowledge Base &bull; Designed by Jatin Verma
              </span>
            </div>
            <p className="text-zinc-500 text-[11px] text-center sm:text-right">
              Curated YouTube channels and lecture playlists for BCA, BBA, and B.Tech coursework.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
