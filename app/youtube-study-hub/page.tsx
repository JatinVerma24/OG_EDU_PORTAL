'use client';

import React, { useState, useMemo, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
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
import { getSemesterCounts, getSubjectByCodeOnly } from '../../data/courses';
import { Sparkles, BookOpen, Layers, ArrowLeft, ExternalLink } from 'lucide-react';

function StudyHubContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL state synchronization
  const initialQuery = searchParams.get('q') || '';
  const initialCourse = (searchParams.get('course') as CourseId) || 'btech';
  const initialSemParam = searchParams.get('sem');
  const initialSem: SemesterNumber | 'all' =
    initialSemParam && [1, 2, 3, 4].includes(Number(initialSemParam))
      ? (Number(initialSemParam) as SemesterNumber)
      : 'all';
  const initialType = (searchParams.get('type') as SubjectType | 'all') || 'all';

  const [query, setQuery] = useState<string>(initialQuery);
  const [course, setCourse] = useState<CourseId>(initialCourse);
  const [semester, setSemester] = useState<SemesterNumber | 'all'>(initialSem);
  const [subjectType, setSubjectType] = useState<SubjectType | 'all'>(initialType);
  const [activeModalSubject, setActiveModalSubject] = useState<Subject | null>(null);

  // Sync state to URL without refreshing
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set('q', query.trim());
    if (course !== 'btech') params.set('course', course);
    if (semester !== 'all') params.set('sem', semester.toString());
    if (subjectType !== 'all') params.set('type', subjectType);

    const queryString = params.toString();
    const newUrl = queryString ? `/youtube-study-hub?${queryString}` : '/youtube-study-hub';
    router.replace(newUrl, { scroll: false });
  }, [query, course, semester, subjectType, router]);

  // Check URL hash for modal opening (e.g. #subject=cse101)
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

  // Compute filtered subjects
  const filteredSubjects = useMemo(() => {
    return searchSubjects({
      query,
      courseId: course,
      semester,
      type: subjectType
    });
  }, [query, course, semester, subjectType]);

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

  return (
    <div className="flex flex-col min-h-screen">
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
                YouTube Hub
              </span>
            </div>
          </Link>

          {/* Center Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-medium text-zinc-400">
            <Link href="/" className="hover:text-zinc-100 transition-colors">
              Home
            </Link>
            <Link href="/sih" className="hover:text-brand-300 text-zinc-400 transition-colors">
              🏆 SIH Playbook
            </Link>
            <Link href="/resources" className="hover:text-zinc-100 transition-colors">
              Notes Vault
            </Link>
            <Link href="/senior/dashboard.html" className="hover:text-zinc-100 transition-colors">
              GPA Calculators
            </Link>
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-surface-card hover:bg-surface-elevated border border-surface-border rounded-xl transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to</span> Portal
            </Link>
          </div>
        </div>
      </header>

      {/* ── Main Content Area ────────────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Hero Section */}
        <section className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-red-400 text-xs font-semibold tracking-wide uppercase mb-5 shadow-sm">
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
            Search by course code or subject name and discover verified lectures, playlists, and top educators tailored for your semester.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <SearchBar
              value={query}
              onChange={setQuery}
              totalResults={course === 'bba' ? 0 : filteredSubjects.length}
            />
          </div>
        </section>

        {/* Course & Semester Switchers */}
        <section className="space-y-6 mb-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Course Selector (B.Tech / BBA) */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-start">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider hidden sm:inline">
                Program:
              </span>
              <CourseFilter
                selectedCourse={course}
                onSelectCourse={(newCourse) => {
                  setCourse(newCourse);
                  setSemester('all');
                }}
              />
            </div>

            {/* Quick Status Tag */}
            <div className="text-xs text-zinc-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                Covering <strong className="text-zinc-200">Semesters 1 to 4</strong>
              </span>
            </div>
          </div>

          {/* 4 Large Quick Semester Navigation Tabs */}
          {course === 'btech' && (
            <SemesterTabs
              selectedSemester={semester}
              onSelectSemester={setSemester}
              semesterCounts={semesterCounts}
            />
          )}

          {/* Subject Type Filter Pills */}
          {course === 'btech' && (
            <SemesterFilter
              selectedSemester={semester}
              onSelectSemester={setSemester}
              selectedType={subjectType}
              onSelectType={setSubjectType}
            />
          )}
        </section>

        {/* Results Header */}
        {course === 'btech' && (
          <div className="flex items-center justify-between border-b border-surface-border/60 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <h2 className="font-display font-bold text-base sm:text-lg text-zinc-100">
                {semester === 'all' ? 'All Semester Subjects' : `Semester ${semester} Subjects`}
              </h2>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-surface-card text-brand-400 border border-surface-border">
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
        )}

        {/* Subjects Grid */}
        <SubjectGrid
          subjects={filteredSubjects}
          searchQuery={query}
          isBba={course === 'bba'}
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
      <footer className="mt-20 border-t border-surface-border/60 bg-surface-card/40 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-brand-500 flex items-center justify-center text-zinc-950 font-bold text-[10px]">
              OG
            </div>
            <span>
              &copy; {new Date().getFullYear()} OGEDU AI &bull; Built for University Students
            </span>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/" className="hover:text-zinc-200 transition-colors">
              Home
            </Link>
            <Link href="/sih" className="hover:text-zinc-200 transition-colors">
              SIH 2026 Playbook
            </Link>
            <Link href="/resources" className="hover:text-zinc-200 transition-colors">
              Notes Vault
            </Link>
            <Link href="/disclaimer.html" className="hover:text-zinc-200 transition-colors">
              Disclaimer
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function YouTubeStudyHubPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface-base flex items-center justify-center text-zinc-400">Loading Study Hub...</div>}>
      <StudyHubContent />
    </Suspense>
  );
}
