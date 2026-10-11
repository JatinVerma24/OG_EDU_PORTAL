'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
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
  Maximize2,
  Bot,
  Briefcase,
  TrendingUp,
  Cpu,
  GraduationCap
} from 'lucide-react';
import {
  MASTER_DRIVE_FOLDER_URL,
  SUBJECT_FOLDERS,
  MIDTERM_RESOURCES_DATA,
  AI_STUDY_TOOLS,
  AI_STUDY_PROMPTS,
  MidtermResourceItem,
  SubjectFolderInfo,
  StudyStream,
  AIStudyPrompt
} from '@/data/midtermResources';

type CategoryFilter = 'all' | 'master-guide' | 'notes' | 'pyq' | 'mcq' | 'book' | 'tutorial';

function MidtermResourcesContent() {
  const searchParams = useSearchParams();
  const initialStreamParam = (searchParams.get('stream') as StudyStream) || 'all';

  const [activeStream, setActiveStream] = useState<StudyStream>(
    ['all', 'btech', 'bba', 'pva', 'ai'].includes(initialStreamParam) ? initialStreamParam : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [masterLinkCopied, setMasterLinkCopied] = useState(false);
  const [previewItem, setPreviewItem] = useState<MidtermResourceItem | null>(null);

  // AI Prompt Interactive Generator State
  const [activePromptId, setActivePromptId] = useState<string>('prompt-1');
  const [promptFormValues, setPromptFormValues] = useState<{ [key: string]: { [field: string]: string } }>({
    'prompt-1': {
      subject: 'Engineering Mathematics (MTH165)',
      exam: 'Mid-Term Exam',
      date: '14 October 2026',
      topic: 'Cauchy-Euler Differential Equations'
    },
    'prompt-2': {
      subject: 'Python Programming (INT108)',
      topic: 'List Comprehensions & Dictionary Methods',
      exam: 'Mid-Term Test'
    },
    'prompt-3': {
      subject: 'Engineering Physics (PHY175)',
      exam: 'Mid-Term MTT',
      date: '15 October 2026',
      allTopics: 'Quantum Wavefunction, Particle in 1D Box, Fiber Optics, Lasers',
      daysLeft: '3',
      hoursPerDay: '5',
      weakTopics: 'Quantum Particle in 1D Box Numericals',
      strongTopics: 'Fiber Optics Acceptance Angle & Numerical Aperture'
    },
    'prompt-4': {
      duration: '90',
      subject: 'Basic Financial Accounting (ACC103)',
      topics: 'Accounting Conventions, Bank Reconciliation Statement (BRS), Depreciation',
      exam: 'University Mid-Term Examination'
    },
    'prompt-5': {
      subject: 'Engineering Graphics (MEC136)',
      topic: 'Projections of Points, Lines & Solids in 1st/3rd Quadrants',
      exam: 'Mid-Term Tomorrow'
    }
  });
  const [copiedPromptId, setCopiedPromptId] = useState<string | null>(null);

  // Sync stream param if URL changes
  useEffect(() => {
    const stream = searchParams.get('stream') as StudyStream;
    if (stream && ['all', 'btech', 'bba', 'pva', 'ai'].includes(stream)) {
      setActiveStream(stream);
      setSelectedSubject('ALL');
    }
  }, [searchParams]);

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

  const shareText = "Bhai First-Year Mid-Term exams ke sabhi subjects (B.Tech, BBA, PVA Verbal Ability) ke verified notes, 11+ PYQs aur AI Study Prompts Google Drive folder yahan mil gaye: https://ogedu-portal.vercel.app/midterm/resources";
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  // Subject metadata themes
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
    },
    ACC103: {
      name: 'Basic Financial Accounting',
      code: 'ACC103 / ACC105',
      color: 'from-emerald-500/20 via-green-500/10 to-transparent border-emerald-500/40 text-emerald-400',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      icon: FileText,
      driveUrl: 'https://drive.google.com/drive/folders/1o8FG4SPxCgt0yQUMT8FETa_U13Em_nFH?usp=sharing',
      desc: 'Accounting conventions, trial balance, ledger posting, bank reconciliation statement (BRS), and depreciation.'
    },
    ECO113: {
      name: 'Microeconomics for Business',
      code: 'ECO113',
      color: 'from-blue-500/20 via-cyan-500/10 to-transparent border-blue-500/40 text-blue-400',
      badgeColor: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
      icon: TrendingUp,
      driveUrl: 'https://drive.google.com/drive/folders/1IkGEt9iuxTo0P0DDHmdw6j7-xxPnWMr1?usp=sharing',
      desc: 'Demand & elasticity, consumer equilibrium, break-even analysis presentations, cost curves & market structures.'
    },
    MGN101: {
      name: 'Principles & Practices of Management',
      code: 'MGN101',
      color: 'from-amber-500/20 via-yellow-500/10 to-transparent border-amber-500/40 text-amber-400',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      icon: Briefcase,
      driveUrl: 'https://drive.google.com/drive/folders/1O10_Sdaefih9ZsEYOXAtIrL3KdcY_tj7?usp=sharing',
      desc: 'Principles of management, planning, leadership styles, communication hierarchy, and conflict management.'
    },
    PVA101: {
      name: 'Professional Verbal Ability & Soft Skills',
      code: 'PEL121 / PVA',
      color: 'from-rose-500/20 via-red-500/10 to-transparent border-rose-500/40 text-rose-400',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      icon: BookOpen,
      driveUrl: 'https://drive.google.com/drive/folders/1XG46qUypReJXV9KX4iZd92fH-jPcznPK?usp=sharing',
      desc: 'Grammar rules, sentence correction, reading comprehension speed tactics, 300 vocab bank, and 120 solved PYQs.'
    },
    AI_TOOLS: {
      name: 'AI Study Supercharger & Prompts',
      code: 'AI-STUDY',
      color: 'from-purple-500/20 via-indigo-500/10 to-transparent border-purple-500/40 text-purple-400',
      badgeColor: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
      icon: Bot,
      driveUrl: 'https://drive.google.com/file/d/1FWbbc1wxgL8VeMxItp4VzU6iNk-fFWM7/view?usp=sharing',
      desc: '14 curated AI tools + 5 high-impact study prompts for ChatGPT/Claude to accelerate prep by 5x.'
    }
  };

  // High-yield essential items pinned across subjects
  const highYieldEssentials: MidtermResourceItem[] = useMemo(() => {
    return [
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1SDU_5nUIuOvKXSBqCl73qsH_bkMb8qDc')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1rc8Sqg-QiBNNGl3ovfNbGxOpRwHp62tx')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1FWbbc1wxgL8VeMxItp4VzU6iNk-fFWM7')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1DQr8yKI_4RaafZTSeoepctxH6KyvjZkG')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1yny-O3VcRvVBEgEB8XBn6tIXGVwyV_ZE')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === 'pva-master-guide-2026')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1s0NEdi8a--A3NpflWoUGIgctt13vGDek')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1_etI0tX1mxprAgwElFWIW7xUCiOJyB_V')!,
      MIDTERM_RESOURCES_DATA.find((x) => x.id === '1hLJM2pflK-gm78nPhuGQI33p8II4-bDZ')!,
    ].filter(Boolean);
  }, []);

  // Filtered items based on stream, subject, category, and search query
  const filteredItems = useMemo(() => {
    return MIDTERM_RESOURCES_DATA.filter((item) => {
      // Stream filter
      if (activeStream !== 'all') {
        if (activeStream === 'btech' && item.stream !== 'btech' && item.subject !== 'GENERAL') return false;
        if (activeStream === 'bba' && item.stream !== 'bba' && item.subject !== 'GENERAL') return false;
        if (activeStream === 'pva' && item.stream !== 'pva' && item.subject !== 'GENERAL') return false;
        if (activeStream === 'ai' && item.stream !== 'ai') return false;
      }

      // Hide raw photographic image scans when browsing 'ALL' without a query to keep UI clean
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
  }, [activeStream, selectedSubject, selectedCategory, searchQuery]);

  // Subject folders visible in current stream
  const visibleSubjectFolders = useMemo(() => {
    return SUBJECT_FOLDERS.filter((f) => {
      if (activeStream === 'all') return true;
      if (activeStream === 'btech') return f.stream === 'btech' || f.subject === 'GENERAL';
      if (activeStream === 'bba') return f.stream === 'bba' || f.subject === 'GENERAL';
      if (activeStream === 'pva') return f.stream === 'pva' || f.subject === 'GENERAL';
      if (activeStream === 'ai') return f.stream === 'ai';
      return true;
    });
  }, [activeStream]);

  // Stream counts
  const streamCounts = useMemo(() => {
    const counts = { all: 0, btech: 0, bba: 0, pva: 0, ai: 0 };
    for (const it of MIDTERM_RESOURCES_DATA) {
      counts.all++;
      if (it.stream === 'btech') counts.btech++;
      if (it.stream === 'bba') counts.bba++;
      if (it.stream === 'pva') counts.pva++;
      if (it.stream === 'ai') counts.ai++;
    }
    return counts;
  }, []);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'master-guide', label: '⭐ Master Guides' },
    { id: 'notes', label: '📘 Notes & Slides' },
    { id: 'pyq', label: '📝 Solved Papers (PYQs)' },
    { id: 'mcq', label: '🎯 MCQ Banks' },
    { id: 'book', label: '📖 Textbooks' },
    { id: 'tutorial', label: '📚 Tutorials' },
  ];

  // Helper to build live prompt text from form values
  const getRenderedPrompt = (prompt: AIStudyPrompt) => {
    const values = promptFormValues[prompt.id] || {};
    let rendered = prompt.template;
    for (const input of prompt.inputs) {
      const val = values[input.key] || input.default;
      rendered = rendered.split(`{${input.key}}`).join(val);
    }
    return rendered;
  };

  const handlePromptInputChange = (promptId: string, field: string, val: string) => {
    setPromptFormValues((prev) => ({
      ...prev,
      [promptId]: {
        ...(prev[promptId] || {}),
        [field]: val
      }
    }));
  };

  const handleCopyRenderedPrompt = (prompt: AIStudyPrompt) => {
    const text = getRenderedPrompt(prompt);
    navigator.clipboard.writeText(text);
    setCopiedPromptId(prompt.id);
    setTimeout(() => setCopiedPromptId(null), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-12">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-500/15 border border-amber-500/40 text-amber-300">
            <span className="animate-pulse">🔥</span>
            <span>First-Year Mid-Term Resources Vault (2026-27)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span className="text-zinc-300">{MIDTERM_RESOURCES_DATA.length} Verified Files</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyMasterLink}
              className="px-3.5 py-1.5 rounded-xl bg-surface-card hover:bg-surface-elevated text-xs font-semibold text-zinc-300 hover:text-white border border-surface-border transition-colors flex items-center gap-1.5"
            >
              {masterLinkCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Master Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Drive Link</span>
                </>
              )}
            </button>

            <a
              href={MASTER_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-xs font-bold text-white shadow-md shadow-rose-500/20 transition-all flex items-center gap-1.5"
            >
              <span>Open in Google Drive</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="max-w-3xl space-y-2">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
            Crack Mid-Terms with{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400">
              Verified Course Materials &amp; AI
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
            Curated by <strong className="text-white">OG Jatin Verma</strong> from official university lecture decks, past 4 years question papers, tutorial sheets, and battle-tested AI study prompts for Claude &amp; ChatGPT.
          </p>
        </div>
      </div>

      {/* ── Stream Selector Tabs ───────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
            Select Your Program
          </span>
          <span className="text-xs text-zinc-500 font-mono">
            Showing: {filteredItems.length} resources
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          <button
            onClick={() => { setActiveStream('all'); setSelectedSubject('ALL'); }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
              activeStream === 'all'
                ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-lg shadow-rose-500/20 border border-amber-400/30'
                : 'bg-surface-card hover:bg-surface-elevated text-zinc-300 hover:text-white border border-surface-border'
            }`}
          >
            <span>🌐 All Streams</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/25 text-white/90 font-mono">
              {streamCounts.all}
            </span>
          </button>

          <button
            onClick={() => { setActiveStream('btech'); setSelectedSubject('ALL'); }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
              activeStream === 'btech'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400'
                : 'bg-surface-card hover:bg-surface-elevated text-zinc-300 hover:text-white border border-surface-border'
            }`}
          >
            <Cpu className="w-4 h-4 text-sky-400" />
            <span>B.Tech 1st Year (CSE/ECE/ME)</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/25 text-white/90 font-mono">
              {streamCounts.btech}
            </span>
          </button>

          <button
            onClick={() => { setActiveStream('bba'); setSelectedSubject('ALL'); }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
              activeStream === 'bba'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30 border border-amber-400'
                : 'bg-surface-card hover:bg-surface-elevated text-zinc-300 hover:text-white border border-surface-border'
            }`}
          >
            <Briefcase className="w-4 h-4 text-amber-300" />
            <span>BBA 1st Year (Commerce &amp; Mgmt)</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/25 text-white/90 font-mono">
              {streamCounts.bba}
            </span>
          </button>

          <button
            onClick={() => { setActiveStream('pva'); setSelectedSubject('ALL'); }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
              activeStream === 'pva'
                ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30 border border-rose-400'
                : 'bg-surface-card hover:bg-surface-elevated text-zinc-300 hover:text-white border border-surface-border'
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-300" />
            <span>PVA &middot; Verbal Ability (PEL121)</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/25 text-white/90 font-mono">
              {streamCounts.pva}
            </span>
          </button>

          <button
            onClick={() => { setActiveStream('ai'); setSelectedSubject('ALL'); }}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
              activeStream === 'ai'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400'
                : 'bg-surface-card hover:bg-surface-elevated text-zinc-300 hover:text-white border border-surface-border'
            }`}
          >
            <Bot className="w-4 h-4 text-purple-300" />
            <span>🤖 AI Study Supercharger</span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-black/25 text-white/90 font-mono">
              {streamCounts.ai}
            </span>
          </button>
        </div>
      </div>

      {/* ── AI STUDY SUPERCHARGER VIEW (When activeStream === 'ai') ────── */}
      {activeStream === 'ai' && (
        <div className="space-y-10 sm:space-y-12">
          {/* AI Banner */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-purple-950/60 via-surface-card to-indigo-950/40 border border-purple-500/40 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/40 flex items-center justify-center font-bold">
                    🤖
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
                    The Complete AI Study Supercharger Suite
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
                  Sourced directly from Jatin Verma&apos;s Google Doc guide: 14 tools to research, code, write &amp; present, plus 5 battle-tested prompts that turn any AI into your private 24/7 exam tutor.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 shrink-0">
                <a
                  href="https://drive.google.com/file/d/1rc8Sqg-QiBNNGl3ovfNbGxOpRwHp62tx/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-purple-600/20"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>14 AI Tools PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <a
                  href="https://drive.google.com/file/d/1FWbbc1wxgL8VeMxItp4VzU6iNk-fFWM7/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-indigo-600/20"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>5 AI Prompts PDF</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* 5 Interactive AI Study Prompts Engine */}
          <div className="p-6 sm:p-8 rounded-2xl bg-surface-card border border-surface-border space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-lg">⚡</span>
                <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                  Interactive AI Study Prompt Generator
                </h3>
              </div>
              <p className="text-xs text-zinc-400">
                Fill in your subject &amp; topic, then copy directly into ChatGPT, Claude, or Google Gemini.
              </p>
            </div>

            {/* Prompt Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {AI_STUDY_PROMPTS.map((prompt) => (
                <button
                  key={prompt.id}
                  onClick={() => setActivePromptId(prompt.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
                    activePromptId === prompt.id
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30 border border-purple-400'
                      : 'bg-surface-base text-zinc-400 hover:text-white border border-surface-border'
                  }`}
                >
                  <span className="w-4 h-4 rounded-full bg-white/20 text-white flex items-center justify-center text-[10px] font-bold">
                    {prompt.number}
                  </span>
                  <span>{prompt.title}</span>
                </button>
              ))}
            </div>

            {/* Active Prompt Interactive Form */}
            {(() => {
              const currentPrompt = AI_STUDY_PROMPTS.find((p) => p.id === activePromptId) || AI_STUDY_PROMPTS[0];
              const renderedText = getRenderedPrompt(currentPrompt);
              const isCopied = copiedPromptId === currentPrompt.id;

              return (
                <div className="space-y-6 pt-2">
                  <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                          {currentPrompt.tagline}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          {currentPrompt.title}
                        </h4>
                      </div>
                      <p className="text-xs text-zinc-300">
                        {currentPrompt.summary}
                      </p>
                      <p className="text-[11px] text-zinc-400">
                        <strong>When to use:</strong> {currentPrompt.useWhen}
                      </p>
                    </div>

                    <button
                      onClick={() => handleCopyRenderedPrompt(currentPrompt)}
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-md shadow-purple-600/25 shrink-0 self-start sm:self-center"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-300" />
                          <span>Copied to Clipboard! ✅</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Personalized Prompt</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Input Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {currentPrompt.inputs.map((input) => (
                      <div key={input.key} className="space-y-1">
                        <label className="text-[11px] font-semibold text-zinc-300 block">
                          {input.label}
                        </label>
                        <input
                          type="text"
                          value={(promptFormValues[currentPrompt.id] && promptFormValues[currentPrompt.id][input.key]) ?? input.default}
                          onChange={(e) => handlePromptInputChange(currentPrompt.id, input.key, e.target.value)}
                          placeholder={input.placeholder}
                          className="w-full px-3 py-2 rounded-lg bg-surface-base border border-surface-border focus:border-purple-500 focus:outline-none text-xs text-white transition-colors"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Rendered Prompt Preview */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                      <span>Live Generated Prompt Preview:</span>
                      <span>Ready to paste in AI</span>
                    </div>
                    <pre className="p-4 rounded-xl bg-surface-base border border-surface-border text-xs font-mono text-zinc-200 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto selection:bg-purple-500/30">
                      {renderedText}
                    </pre>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* 14 Curated AI Tools Directory */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white">
                14 Must-Have AI Tools for University Students
              </h3>
              <p className="text-xs text-zinc-400">
                Categorized by practical study use cases. Click any card to launch the tool.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {AI_STUDY_TOOLS.map((tool) => (
                <a
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-surface-card border border-surface-border hover:border-purple-500/50 hover:bg-surface-elevated transition-all flex flex-col justify-between group shadow-sm"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                        {tool.badge}
                      </span>
                      <span className="text-[11px] text-zinc-500 font-mono">
                        {tool.category}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-1.5">
                        <span>{tool.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </h4>
                      <p className="text-xs text-zinc-300/90 leading-relaxed mt-1">
                        {tool.description}
                      </p>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface-base/80 border border-surface-border/60 text-[11px] text-zinc-400">
                      <strong className="text-zinc-200">Best for:</strong> {tool.bestFor}
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-surface-border/60 flex items-center justify-between text-xs font-semibold text-purple-400">
                    <span>Open {tool.name}</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── SUBJECT WORKSPACE QUICK FILTER BAR (When not in 'ai' stream) ── */}
      {activeStream !== 'ai' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-surface-card/60 border border-surface-border space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
              <Folder className="w-4 h-4 text-amber-400" />
              <span>Filter by Subject Workspace:</span>
            </span>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedSubject('ALL')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubject === 'ALL'
                    ? 'bg-brand-500 text-zinc-950 font-bold shadow-sm'
                    : 'bg-surface-base text-zinc-400 hover:text-white border border-surface-border'
                }`}
              >
                All Subjects ({visibleSubjectFolders.reduce((acc, f) => acc + (f.subject === 'GENERAL' ? 0 : f.itemCount), 0)})
              </button>

              {visibleSubjectFolders.filter((f) => f.subject !== 'GENERAL').map((folder) => {
                const isSelected = selectedSubject === folder.subject;
                return (
                  <button
                    key={folder.subject}
                    onClick={() => setSelectedSubject(folder.subject)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-surface-elevated text-white border border-surface-border-hover shadow-sm'
                        : 'bg-surface-base text-zinc-400 hover:text-white border border-surface-border'
                    }`}
                  >
                    <span>{folder.code}</span>
                    <span className="text-[10px] text-zinc-500 font-mono">({folder.itemCount})</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Subject Folder Details Banner */}
          {selectedSubject !== 'ALL' && subjectThemes[selectedSubject] && (
            <div className={`p-4 rounded-xl bg-gradient-to-r ${subjectThemes[selectedSubject].color} border flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${subjectThemes[selectedSubject].badgeColor}`}>
                    {subjectThemes[selectedSubject].code}
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {subjectThemes[selectedSubject].name}
                  </h3>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed max-w-2xl">
                  {subjectThemes[selectedSubject].desc}
                </p>
              </div>

              <a
                href={subjectThemes[selectedSubject].driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-surface-base/90 hover:bg-surface-elevated text-xs font-semibold text-white border border-surface-border transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-center"
              >
                <span>Open Subject Folder</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          )}
        </div>
      )}

      {/* ── SEARCH & CATEGORY BAR ────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search notes, PYQs, textbooks, formulas, topics (e.g., Cauchy-Euler, Accounting, Lasers)..."
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-surface-card border border-surface-border focus:border-brand-500 focus:outline-none text-xs sm:text-sm text-white placeholder-zinc-500 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Quick Clear */}
          {(searchQuery || selectedSubject !== 'ALL' || selectedCategory !== 'all') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('ALL');
                setSelectedCategory('all');
              }}
              className="px-3 py-2.5 rounded-xl bg-surface-card hover:bg-surface-elevated text-xs font-semibold text-rose-400 border border-surface-border transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 text-xs font-medium scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-surface-elevated text-white border border-surface-border shadow-sm'
                    : 'text-zinc-400 hover:text-white hover:bg-surface-card/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── PINNED HIGH-YIELD ESSENTIALS (Shown when no active search) ── */}
      {!searchQuery && selectedSubject === 'ALL' && selectedCategory === 'all' && activeStream === 'all' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-amber-400 text-lg">⭐</span>
            <h2 className="text-base sm:text-lg font-bold text-white">
              Essential Pinned Handbooks &amp; PYQ Vaults
            </h2>
            <span className="text-xs text-zinc-500 font-mono ml-auto">Topper Recommended</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {highYieldEssentials.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-gradient-to-br from-surface-card to-surface-elevated/70 border border-amber-500/30 hover:border-amber-500/60 transition-all flex flex-col justify-between group shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      {item.badge}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400 uppercase">
                      {item.fileType}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-surface-border/60 flex items-center justify-between text-xs">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="text-zinc-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5 text-amber-400" />
                    <span>In-App Preview</span>
                  </button>

                  <a
                    href={item.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-surface-base hover:bg-surface-elevated text-amber-300 border border-surface-border transition-colors flex items-center gap-1 font-semibold"
                  >
                    <span>Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── RESOURCES GRID ───────────────────────────────────────────── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
            <span>📚</span>
            <span>
              {selectedSubject === 'ALL' ? 'Course Resources' : `${selectedSubject} Resources`}
            </span>
          </h2>
          <span className="text-xs text-zinc-400 font-mono">
            {filteredItems.length} items found
          </span>
        </div>

        {filteredItems.length === 0 ? (
          <div className="p-12 rounded-2xl bg-surface-card/40 border border-surface-border text-center space-y-3">
            <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
            <h3 className="text-base font-bold text-white">No matching resources found</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Try adjusting your search terms or switch stream tabs above.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedSubject('ALL');
                setSelectedCategory('all');
                setActiveStream('all');
              }}
              className="px-4 py-2 rounded-xl bg-brand-500 text-zinc-950 font-bold text-xs"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.map((item) => {
              const isCopied = copiedId === item.id;
              const theme = subjectThemes[item.subject] || subjectThemes.MTH165;
              const Icon = theme.icon || FileText;

              return (
                <div
                  key={item.id}
                  className="p-4 sm:p-5 rounded-2xl bg-surface-card/70 border border-surface-border hover:border-surface-border-hover hover:bg-surface-elevated/70 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${theme.badgeColor}`}>
                        {item.badge}
                      </span>
                      <span className="text-[10px] text-zinc-500 uppercase font-mono">
                        {item.fileType} &middot; {item.stream}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-zinc-400 leading-relaxed mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    </div>

                    <div className="text-[10px] font-mono text-zinc-500 truncate">
                      Subject: {item.subjectName}
                    </div>
                  </div>

                  <div className="pt-3.5 mt-3 border-t border-surface-border/60 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setPreviewItem(item)}
                      className="text-zinc-300 hover:text-white font-semibold flex items-center gap-1 transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-amber-400" />
                      <span>Preview</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleCopyLink(item.driveUrl, item.id)}
                        title="Copy Drive Link"
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-surface-base border border-surface-border transition-colors"
                      >
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <a
                        href={item.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-surface-base hover:bg-surface-elevated text-zinc-200 hover:text-white border border-surface-border transition-colors flex items-center gap-1 font-semibold text-[11px]"
                      >
                        <span>Drive</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── IN-APP PREVIEW MODAL ─────────────────────────────────────── */}
      {previewItem && (
        <div className="fixed inset-0 z-50 p-2 sm:p-4 bg-black/80 backdrop-blur-md flex items-center justify-center animate-fade-in">
          <div className="w-full max-w-4xl max-h-[92vh] sm:max-h-[85vh] bg-surface-card border border-surface-border rounded-2xl flex flex-col overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-3.5 sm:p-4 border-b border-surface-border flex items-center justify-between gap-3 shrink-0 bg-surface-elevated">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {previewItem.badge}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400">
                    {previewItem.subject}
                  </span>
                </div>
                <h3 className="text-xs sm:text-base font-bold text-white truncate mt-0.5">
                  {previewItem.title}
                </h3>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={previewItem.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-400 text-zinc-950 font-bold text-xs transition-colors flex items-center gap-1"
                >
                  <span>Open Full Drive</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                <button
                  onClick={() => setPreviewItem(null)}
                  className="p-1.5 rounded-lg bg-surface-base text-zinc-400 hover:text-white border border-surface-border transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body / Iframe Embed */}
            <div className="flex-1 bg-black relative min-h-[350px] sm:min-h-[500px]">
              <iframe
                src={`https://drive.google.com/file/d/${previewItem.id}/preview`}
                className="w-full h-full border-0 absolute inset-0"
                allow="autoplay"
                title={previewItem.title}
              />
            </div>

            {/* Modal Footer */}
            <div className="p-3 border-t border-surface-border bg-surface-elevated/70 flex items-center justify-between text-xs text-zinc-400 shrink-0">
              <span className="truncate">{previewItem.originalName}</span>
              <button
                onClick={() => handleCopyLink(previewItem.driveUrl, previewItem.id)}
                className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1 shrink-0 ml-2"
              >
                {copiedId === previewItem.id ? 'Copied! ✅' : 'Copy File Link'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── SHARE STRIP ──────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 rounded-2xl bg-brand-950/40 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-white">Help Your Classmates Clear Mid-Terms!</h2>
          <p className="text-xs text-zinc-400">
            Share this verified B.Tech, BBA, PVA &amp; AI study kit with branch WhatsApp and Telegram groups.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyMasterLink}
            className="px-4 py-2 rounded-xl bg-surface-elevated text-zinc-300 hover:text-white text-xs font-semibold border border-surface-border transition-colors"
          >
            {masterLinkCopied ? 'Link Copied! ✅' : 'Copy Link'}
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MidtermResourcesPage() {
  return (
    <React.Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-card border border-surface-border text-sm text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Loading Mid-Term Resources Vault...
          </div>
        </div>
      }
    >
      <MidtermResourcesContent />
    </React.Suspense>
  );
}
