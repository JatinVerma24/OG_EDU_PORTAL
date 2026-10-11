'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  Folder,
  FolderArchive,
  ExternalLink,
  Copy,
  Check,
  Search,
  Download,
  BookOpen,
  FileText,
  Layers,
  Calculator,
  Code,
  Atom,
  Leaf,
  Compass,
  Share2,
  Sparkles,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Zap,
  BookMarked,
  Eye,
  ArrowRight,
  FileCode,
  Image as ImageIcon,
  X,
  ChevronRight,
  Flame,
  CheckSquare,
  HelpCircle,
  Maximize2
} from 'lucide-react';
import {
  MASTER_DRIVE_FOLDER_URL,
  SUBJECT_FOLDERS,
  MIDTERM_RESOURCES_DATA,
  MidtermResourceItem,
  SubjectFolderInfo
} from '@/data/midtermResources';

type CategoryFilter = 'all' | 'notes' | 'pyq' | 'mcq' | 'book' | 'tutorial';

export default function MidtermResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [masterLinkCopied, setMasterLinkCopied] = useState(false);
  const [previewItem, setPreviewItem] = useState<MidtermResourceItem | null>(null);

  // Close preview modal on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setPreviewItem(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleCopyMasterLink = () => {
    navigator.clipboard.writeText(MASTER_DRIVE_FOLDER_URL);
    setMasterLinkCopied(true);
    setTimeout(() => setMasterLinkCopied(false), 2500);
  };

  const shareText = "Bhai First-Year Mid-Term exams ke sabhi subjects (Maths, Physics, Python, MEC, CHE110) ke verified notes, 11+ PYQs aur Master Guide Google Drive folder yahan mil gaya: https://ogedu-portal.vercel.app/midterm/resources";
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  // Subject metadata mapping
  const subjectThemes: { [key: string]: { name: string; code: string; color: string; badgeColor: string; icon: any; driveUrl: string; desc: string } } = {
    MTH165: {
      name: 'Engineering Mathematics - I',
      code: 'MTH165 / 166',
      color: 'from-sky-500/20 via-blue-500/10 to-transparent border-sky-500/40 text-sky-400',
      badgeColor: 'bg-sky-500/15 text-sky-300 border-sky-500/30',
      icon: Calculator,
      driveUrl: 'https://drive.google.com/drive/folders/1sjy63cyKYTrI5L1mmpY3Sf4scQiszVHY?usp=sharing',
      desc: 'Calculus, Differential Equations, 6 Tutorial Practice Sheets, Unit 1 & 2 Formula Banks, and Solved Derivations.'
    },
    PHY175: {
      name: 'Engineering Physics',
      code: 'PHY175 / 110',
      color: 'from-violet-500/20 via-purple-500/10 to-transparent border-violet-500/40 text-violet-400',
      badgeColor: 'bg-violet-500/15 text-violet-300 border-violet-500/30',
      icon: Atom,
      driveUrl: 'https://drive.google.com/drive/folders/1etcRwGu82a9rg1XIQLZ7mdvOzuhZFge3?usp=sharing',
      desc: 'H.K. Malik Reference Textbook, Quantum Mechanics Lectures 1–6, Fiber Optics, Laser MCQs, and Past Exam Scans.'
    },
    PYTHON: {
      name: 'Python Programming',
      code: 'INT108',
      color: 'from-amber-500/20 via-yellow-500/10 to-transparent border-amber-500/40 text-amber-400',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      icon: Code,
      driveUrl: 'https://drive.google.com/drive/folders/1JAzYBss2gy1-hm0_0Smiss_B0NOc_erg?usp=sharing',
      desc: 'Curated 220 Questions Midterm Question Bank with full solved code, output prediction tricks, slicing, and dicts.'
    },
    MEC136: {
      name: 'Engineering Graphics & Design',
      code: 'MEC136',
      color: 'from-rose-500/20 via-pink-500/10 to-transparent border-rose-500/40 text-rose-400',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      icon: Compass,
      driveUrl: 'https://drive.google.com/drive/folders/1ng8YdtZz-iORO9H7o6SpB6J3YHuRFrXe?usp=sharing',
      desc: 'Scales, Projections of Points & Lines, Isometric/Orthographic Views, Sectioning PPTs, and 11 Exam Drawing Sheets.'
    },
    CHE110: {
      name: 'Environmental Studies',
      code: 'CHE110',
      color: 'from-emerald-500/20 via-teal-500/10 to-transparent border-emerald-500/40 text-emerald-400',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      icon: Leaf,
      driveUrl: 'https://drive.google.com/drive/folders/1raWrPsTPion2pKs4iIxrpeuPwNgwYrfd?usp=sharing',
      desc: 'Complete Unit-wise theory PDFs (Ecosystems, Pollution, Resources, Laws), Syllabus guide, and 11 Solved PYQ Papers.'
    }
  };

  // High-yield essential items pinned across subjects
  const highYieldEssentials: MidtermResourceItem[] = useMemo(() => {
    return [
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1yny-O3VcRvVBEgEB8XBn6tIXGVwyV_ZE')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1s0NEdi8a--A3NpflWoUGIgctt13vGDek')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1_etI0tX1mxprAgwElFWIW7xUCiOJyB_V')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1hLJM2pflK-gm78nPhuGQI33p8II4-bDZ')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1aoc3kA8VjNh4JIORWZfsjdYGzx5dXmRv')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1PHS5wa76wGzaH8_7_AB_x2T4O9jMWrZs')!,
    ].filter(Boolean);
  }, []);

  // Filtered items
  const filteredItems = useMemo(() => {
    return MIDTERM_RESOURCES_DATA.filter((item) => {
      // Don't show generic image scans as individual cards when browsing All (bundle them instead)
      // Only show scans if user explicitly searches or filters
      if (!searchQuery && selectedSubject === 'ALL' && selectedCategory === 'all' && item.fileType === 'image') {
        return false;
      }

      // Subject filter
      if (selectedSubject !== 'ALL' && item.subject !== selectedSubject) {
        return false;
      }

      // Category filter
      if (selectedCategory !== 'all') {
        if (selectedCategory === 'notes' && !['notes', 'syllabus'].includes(item.category)) return false;
        if (selectedCategory !== 'notes' && item.category !== selectedCategory) return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesDesc = item.description.toLowerCase().includes(q);
        const matchesSubject = item.subjectName.toLowerCase().includes(q);
        const matchesOriginal = item.originalName.toLowerCase().includes(q);
        const matchesBadge = item.badge.toLowerCase().includes(q);
        if (!matchesTitle && !matchesDesc && !matchesSubject && !matchesOriginal && !matchesBadge) {
          return false;
        }
      }

      return true;
    });
  }, [selectedSubject, selectedCategory, searchQuery]);

  // Group items by subject
  const subjectGroups = useMemo(() => {
    const groups: { [key: string]: MidtermResourceItem[] } = {};
    for (const item of filteredItems) {
      if (!groups[item.subject]) {
        groups[item.subject] = [];
      }
      groups[item.subject].push(item);
    }
    return groups;
  }, [filteredItems]);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'notes', label: '📘 Notes & Slides' },
    { id: 'pyq', label: '📝 Solved Papers (PYQs)' },
    { id: 'mcq', label: '🎯 MCQ Banks' },
    { id: 'book', label: '📖 Textbooks' },
    { id: 'tutorial', label: '📚 Tutorials' },
  ];

  const getFileBadge = (item: MidtermResourceItem) => {
    switch (item.fileType) {
      case 'folder':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">📁 Drive Folder</span>;
      case 'image':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">🖼️ Exam Scan</span>;
      case 'ppt':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-500/20 text-orange-300 border border-orange-500/30">📽️ Slides (PPT)</span>;
      case 'doc':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">📄 Word Doc</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">📕 PDF Doc</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-12">
      {/* ── TOP HERO BANNER ────────────────────────────────────────── */}
      <div className="relative rounded-3xl p-6 sm:p-12 overflow-hidden border border-surface-border bg-gradient-to-b from-surface-card via-surface-base to-surface-card/60 shadow-2xl">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-brand-500/15 border border-amber-500/40 text-amber-300 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>First-Year University Midterm Suite 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-zinc-300 font-normal">Official Cloud Vault</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-tight">
            Crack Mid-Terms with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-rose-400 to-brand-400">
              Zero Pressure.
            </span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            Direct high-speed cloud access to 150+ verified lecture notes, standard engineering textbooks, 11+ scanned previous year question papers per subject, and unit-wise MCQ question banks.
          </p>

          {/* Quick Stat Pill Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 pt-2 text-xs text-zinc-400 font-mono">
            <div className="flex items-center gap-1.5 bg-surface-base/80 px-3 py-1.5 rounded-xl border border-surface-border">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>5 Core Subjects</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-base/80 px-3 py-1.5 rounded-xl border border-surface-border">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>150+ Verified Files</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-base/80 px-3 py-1.5 rounded-xl border border-surface-border">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>11+ Scanned PYQs / Subject</span>
            </div>
            <div className="flex items-center gap-1.5 bg-surface-base/80 px-3 py-1.5 rounded-xl border border-surface-border">
              <span className="w-2 h-2 rounded-full bg-violet-400" />
              <span>100% Free &amp; Ad-Free</span>
            </div>
          </div>

          {/* Master CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <a
              href={MASTER_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 via-rose-500 to-brand-600 hover:from-amber-400 hover:to-brand-500 text-white text-sm font-bold shadow-xl shadow-rose-500/20 transition-all flex items-center gap-2 group transform hover:-translate-y-0.5"
            >
              <FolderArchive className="w-4 h-4" />
              <span>Open Google Drive Master Folder</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <button
              onClick={() => setPreviewItem(MIDTERM_RESOURCES_DATA.find((x) => x.id === '1yny-O3VcRvVBEgEB8XBn6tIXGVwyV_ZE') || null)}
              className="px-5 py-3 rounded-2xl bg-surface-card hover:bg-surface-elevated text-zinc-100 hover:text-white border border-surface-border hover:border-zinc-600 text-sm font-semibold transition-all flex items-center gap-2 shadow-sm"
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>Preview Master Survival Guide</span>
            </button>

            <button
              onClick={handleCopyMasterLink}
              className="px-4 py-3 rounded-2xl bg-surface-base/80 hover:bg-surface-elevated text-zinc-400 hover:text-white border border-surface-border text-xs sm:text-sm font-medium transition-all flex items-center gap-2"
              title="Copy link to Google Drive folder"
            >
              {masterLinkCopied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Drive Link</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── HIGH YIELD ESSENTIALS / TOPPER'S PICKS ────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-sm">
              🔥
            </span>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              Topper&apos;s Pinned Essentials
            </h2>
          </div>
          <span className="text-xs text-zinc-400 hidden sm:inline">
            Direct high-yield downloads (Start here)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {highYieldEssentials.map((item) => (
            <div
              key={item.id}
              className="group p-5 rounded-2xl bg-surface-card/90 border border-surface-border hover:border-amber-500/50 hover:shadow-lg hover:shadow-amber-500/5 transition-all flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                    {item.badge}
                  </span>
                  {getFileBadge(item)}
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-surface-border/50 flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono text-zinc-500">
                  {item.subjectName}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleCopyLink(item.driveUrl, item.id)}
                    className="p-1.5 rounded-lg bg-surface-base hover:bg-surface-elevated text-zinc-400 hover:text-white border border-surface-border transition-colors"
                    title="Copy direct link"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => setPreviewItem(item)}
                    className="px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-zinc-950 border border-amber-500/40 text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>Preview</span>
                  </button>

                  <a
                    href={item.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-surface-base hover:bg-surface-elevated text-zinc-400 hover:text-white border border-surface-border transition-colors"
                    title="Open in Google Drive"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SUBJECT SELECTOR TABS (INTERACTIVE HUB) ────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white flex items-center gap-2">
            <span>Subject Workspaces &amp; Resources</span>
          </h2>
          <span className="text-xs text-zinc-400">
            Click any subject to isolate notes &amp; papers
          </span>
        </div>

        {/* Big Interactive Subject Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => {
              setSelectedSubject('ALL');
              setSelectedCategory('all');
            }}
            className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between ${
              selectedSubject === 'ALL'
                ? 'bg-gradient-to-br from-brand-600/30 to-surface-card border-brand-500 ring-1 ring-brand-500/50 shadow-lg shadow-brand-500/10'
                : 'bg-surface-card border-surface-border hover:border-zinc-700 hover:bg-surface-elevated/40'
            }`}
          >
            <div className="w-8 h-8 rounded-xl bg-surface-elevated border border-surface-border flex items-center justify-center text-sm font-bold text-white mb-2">
              🌟
            </div>
            <div>
              <div className="text-xs font-bold text-white">All Subjects</div>
              <div className="text-[10px] text-zinc-400">Complete Vault</div>
            </div>
          </button>

          {Object.entries(subjectThemes).map(([subjKey, theme]) => {
            const Icon = theme.icon;
            const isSelected = selectedSubject === subjKey;
            return (
              <button
                key={subjKey}
                onClick={() => {
                  setSelectedSubject(subjKey);
                  setSelectedCategory('all');
                }}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-surface-card border-brand-500 ring-1 ring-brand-500/50 shadow-lg shadow-brand-500/10'
                    : 'bg-surface-card border-surface-border hover:border-zinc-700 hover:bg-surface-elevated/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-xl bg-surface-base border border-surface-border flex items-center justify-center ${theme.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 font-bold">
                    {theme.code}
                  </span>
                </div>
                <div>
                  <div className={`text-xs font-bold transition-colors ${isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                    {theme.name.split(' ')[0]} {theme.name.split(' ')[1] || ''}
                  </div>
                  <div className="text-[10px] text-zinc-500 line-clamp-1">
                    {subjKey}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SEARCH & FILTER CONTROLS ───────────────────────────────── */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface-card border border-surface-border space-y-3.5 shadow-sm">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search topic (e.g. Cauchy Euler, Line Projections, Laser, HK Malik, Ecosystems, Slicing)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-brand-500 focus:outline-none text-xs sm:text-sm text-white placeholder-zinc-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Active filter count / reset button */}
          {(selectedSubject !== 'ALL' || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSubject('ALL');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-2.5 rounded-xl bg-surface-elevated text-xs font-semibold text-zinc-300 hover:text-white border border-surface-border transition-colors shrink-0 flex items-center justify-center gap-1.5"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs border-t border-surface-border/40 pt-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-sm'
                  : 'bg-surface-base text-zinc-400 hover:text-white border border-surface-border'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT SECTIONS ────────────────────────────────────────── */}
      {filteredItems.length === 0 ? (
        <div className="p-12 rounded-3xl bg-surface-card border border-surface-border text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto text-xl font-bold">
            🔍
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No Matching Resources Found</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try searching with a broader topic name or select &quot;All Subjects&quot;.
            </p>
          </div>
          <button
            onClick={() => {
              setSelectedSubject('ALL');
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500 transition-colors"
          >
            Clear Search
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(subjectGroups).map(([subjKey, itemsInGroup]) => {
            const theme = subjectThemes[subjKey] || {
              name: 'First Year OG Resources Master Drive',
              code: 'ALL',
              color: 'from-amber-500/20 via-orange-500/10 to-transparent border-amber-500/40 text-amber-400',
              badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
              icon: FolderArchive,
              driveUrl: MASTER_DRIVE_FOLDER_URL,
              desc: 'Official master Google Drive repository containing all subject units, PYQs, and revision kits.'
            };
            const Icon = theme.icon;

            // Separate notes vs PYQs vs MCQs for cleaner sub-organization
            const notesAndBooks = itemsInGroup.filter((x) => ['notes', 'book', 'syllabus', 'master-guide'].includes(x.category));
            const pyqs = itemsInGroup.filter((x) => x.category === 'pyq');
            const mcqsAndTutorials = itemsInGroup.filter((x) => ['mcq', 'tutorial'].includes(x.category));

            return (
              <div
                key={subjKey}
                className="rounded-3xl border border-surface-border bg-gradient-to-b from-surface-card/90 to-surface-card/40 p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden"
              >
                {/* Subject Header Banner */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-surface-border/60">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-12 rounded-2xl bg-surface-elevated border border-surface-border flex items-center justify-center shrink-0 text-white shadow-inner">
                      <Icon className="w-6 h-6 text-brand-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-brand-500/15 text-brand-300 border border-brand-500/30">
                          {theme.code}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                          {theme.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-3xl leading-relaxed">
                        {theme.desc}
                      </p>
                    </div>
                  </div>

                  <a
                    href={theme.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-xl bg-surface-elevated hover:bg-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white border border-surface-border transition-colors flex items-center gap-2 shrink-0 group"
                  >
                    <Folder className="w-3.5 h-3.5 text-amber-400" />
                    <span>Open Subject Drive</span>
                    <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>

                {/* Sub-Section 1: Core Notes, Syllabus & Textbooks */}
                {notesAndBooks.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold px-1">
                      <span className="flex items-center gap-1.5 text-white">
                        <BookOpen className="w-3.5 h-3.5 text-brand-400" />
                        <span>Core Lectures, Syllabus &amp; Textbooks ({notesAndBooks.length})</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {notesAndBooks.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl bg-surface-base/80 border border-surface-border hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-sm"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              {getFileBadge(item)}
                              <span className="text-[10px] font-medium text-zinc-500 truncate max-w-[120px]">
                                {item.badge}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="pt-3 mt-3 border-t border-surface-border/40 flex items-center justify-between gap-1.5">
                            <button
                              onClick={() => handleCopyLink(item.driveUrl, item.id)}
                              className="px-2 py-1 rounded-lg bg-surface-card hover:bg-surface-elevated text-zinc-400 hover:text-white text-[11px] font-medium border border-surface-border transition-colors flex items-center gap-1"
                              title="Copy link"
                            >
                              {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                            </button>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setPreviewItem(item)}
                                className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-zinc-800 text-zinc-200 hover:text-white text-[11px] font-semibold border border-surface-border transition-all flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3 text-amber-400" />
                                <span>Preview</span>
                              </button>

                              <a
                                href={item.driveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-brand-600/90 hover:bg-brand-600 text-white text-[11px] font-semibold transition-all flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                <span>Drive</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-Section 2: Question Banks, MCQs & Tutorials */}
                {mcqsAndTutorials.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold px-1">
                      <span className="flex items-center gap-1.5 text-white">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Question Banks, MCQs &amp; Numerical Tutorials ({mcqsAndTutorials.length})</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {mcqsAndTutorials.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl bg-surface-base/80 border border-surface-border hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-sm"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              {getFileBadge(item)}
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-elevated text-amber-300 border border-surface-border">
                                {item.badge}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="pt-3 mt-3 border-t border-surface-border/40 flex items-center justify-between gap-1.5">
                            <button
                              onClick={() => handleCopyLink(item.driveUrl, item.id)}
                              className="px-2 py-1 rounded-lg bg-surface-card hover:bg-surface-elevated text-zinc-400 hover:text-white text-[11px] font-medium border border-surface-border transition-colors flex items-center gap-1"
                              title="Copy link"
                            >
                              {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                            </button>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setPreviewItem(item)}
                                className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-zinc-800 text-zinc-200 hover:text-white text-[11px] font-semibold border border-surface-border transition-all flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3 text-amber-400" />
                                <span>Preview</span>
                              </button>

                              <a
                                href={item.driveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-brand-600/90 hover:bg-brand-600 text-white text-[11px] font-semibold transition-all flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                <span>Drive</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sub-Section 3: Previous Year Exam Papers & Scans (PYQs) */}
                {pyqs.length > 0 && (
                  <div className="space-y-3 pt-2">
                    <div className="flex items-center justify-between text-xs text-zinc-400 font-semibold px-1">
                      <span className="flex items-center gap-1.5 text-white">
                        <FileText className="w-3.5 h-3.5 text-rose-400" />
                        <span>Previous Year Exam Papers &amp; Solved Scans ({pyqs.length})</span>
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                      {pyqs.map((item) => (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl bg-surface-base/80 border border-surface-border hover:border-zinc-700 transition-all flex flex-col justify-between group shadow-sm"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              {getFileBadge(item)}
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-rose-500/15 text-rose-300 border border-rose-500/30">
                                {item.badge}
                              </span>
                            </div>

                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                                {item.title}
                              </h4>
                              <p className="text-[11px] text-zinc-400 mt-1 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                          </div>

                          <div className="pt-3 mt-3 border-t border-surface-border/40 flex items-center justify-between gap-1.5">
                            <button
                              onClick={() => handleCopyLink(item.driveUrl, item.id)}
                              className="px-2 py-1 rounded-lg bg-surface-card hover:bg-surface-elevated text-zinc-400 hover:text-white text-[11px] font-medium border border-surface-border transition-colors flex items-center gap-1"
                              title="Copy link"
                            >
                              {copiedId === item.id ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                              <span>{copiedId === item.id ? 'Copied' : 'Copy'}</span>
                            </button>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setPreviewItem(item)}
                                className="px-2.5 py-1 rounded-lg bg-surface-elevated hover:bg-zinc-800 text-zinc-200 hover:text-white text-[11px] font-semibold border border-surface-border transition-all flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3 text-amber-400" />
                                <span>Preview</span>
                              </button>

                              <a
                                href={item.driveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1 rounded-lg bg-brand-600/90 hover:bg-brand-600 text-white text-[11px] font-semibold transition-all flex items-center gap-1"
                              >
                                <Download className="w-3 h-3" />
                                <span>Drive</span>
                              </a>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── 80/20 MID-TERM SURVIVAL BLUEPRINT ─────────────────────── */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-surface-card via-surface-elevated to-surface-card border border-surface-border space-y-6 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-lg">
            ⚡
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              The 80/20 Mid-Term Preparation Playbook
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400">
              How senior toppers secure 20+/30 marks with minimal effort
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-surface-base/80 border border-surface-border space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Zap className="w-4 h-4" />
              <span>Step 1: Finish Units 1 &amp; 2 First</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              In almost all university midterm papers (MTH165, PHY175, CHE110), <strong>Units 1 and 2 comprise 70% to 75%</strong> of the question paper. Don&apos;t waste time on Unit 3 until Units 1 &amp; 2 are 100% prepared.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-base/80 border border-surface-border space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
              <FileText className="w-4 h-4" />
              <span>Step 2: Solve the 11 PYQs</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              We have attached <strong>11 scanned PYQ papers</strong> for CHE110, MEC136, and PHY175. Over <strong>40% of the derivations and numericals</strong> repeat with identical questions or changed variable values.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-surface-base/80 border border-surface-border space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Code className="w-4 h-4" />
              <span>Step 3: INT108 220 Qs Goldmine</span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              Teachers love asking tricky output questions on Python string slicing and mutable tuple-lists. Solve the <strong>220 Question Bank</strong> included above to avoid unexpected deductions.
            </p>
          </div>
        </div>
      </div>

      {/* ── SHARE STRIP ────────────────────────────────────────────── */}
      <div className="p-6 sm:p-8 rounded-3xl bg-brand-950/40 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-white">Help Your Classmates Clear Mid-Terms!</h2>
          <p className="text-xs sm:text-sm text-zinc-400">
            Send this curated Google Drive link to your section and hostel WhatsApp groups so everyone clears their exams without backlogs.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyMasterLink}
            className="px-4 py-2.5 rounded-xl bg-surface-elevated text-zinc-300 hover:text-white text-xs font-semibold border border-surface-border transition-colors"
          >
            {masterLinkCopied ? 'Link Copied! ✅' : 'Copy Folder Link'}
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-lg shadow-emerald-600/20"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share WhatsApp</span>
          </a>
        </div>
      </div>

      {/* ── IN-PAGE DOCUMENT PREVIEW MODAL ───────────────────────────── */}
      {previewItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setPreviewItem(null)}
        >
          <div
            className="relative w-full max-w-5xl h-[85vh] rounded-3xl bg-surface-card border border-surface-border shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="p-4 sm:p-5 border-b border-surface-border flex items-center justify-between gap-3 bg-surface-elevated/80">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-9 h-9 rounded-xl bg-surface-base border border-surface-border flex items-center justify-center shrink-0">
                  {getFileBadge(previewItem)}
                </div>
                <div className="truncate">
                  <h3 className="text-sm sm:text-base font-bold text-white truncate">
                    {previewItem.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 font-mono">
                    <span>{previewItem.subjectName}</span>
                    <span>&bull;</span>
                    <span className="text-amber-400">{previewItem.badge}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={previewItem.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <span>Open in Drive</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  onClick={() => handleCopyLink(previewItem.driveUrl, previewItem.id)}
                  className="p-2 rounded-xl bg-surface-base hover:bg-surface-elevated text-zinc-300 hover:text-white border border-surface-border transition-colors"
                  title="Copy link"
                >
                  {copiedId === previewItem.id ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-2 rounded-xl bg-surface-base hover:bg-rose-500/20 text-zinc-400 hover:text-rose-400 border border-surface-border transition-colors"
                  title="Close preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: Google Drive Preview Frame */}
            <div className="flex-1 bg-surface-base relative">
              <iframe
                src={`https://drive.google.com/file/d/${previewItem.id}/preview`}
                className="w-full h-full border-0"
                allow="autoplay"
                title={previewItem.title}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
