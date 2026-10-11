'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Folder,
  FolderArchive,
  ExternalLink,
  Copy,
  Check,
  Search,
  Filter,
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
  Image as ImageIcon
} from 'lucide-react';
import {
  MASTER_DRIVE_FOLDER_URL,
  SUBJECT_FOLDERS,
  MIDTERM_RESOURCES_DATA,
  MidtermResourceItem,
  SubjectFolderInfo
} from '@/data/midtermResources';

type CategoryFilter = 'all' | 'master-guide' | 'notes' | 'pyq' | 'mcq' | 'book' | 'tutorial';

export default function MidtermResourcesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [masterLinkCopied, setMasterLinkCopied] = useState(false);

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

  const shareText = "Bhai First Year Mid-Term ke saare subject notes, PYQs, MCQs aur Master Guide Google Drive folder mil gaya! Yahan se download karle: https://ogedu-portal.vercel.app/midterm/resources";
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  // Filter items
  const filteredItems = useMemo(() => {
    return MIDTERM_RESOURCES_DATA.filter((item) => {
      // Subject filter
      if (selectedSubject !== 'ALL') {
        if (selectedSubject === 'GENERAL' && item.subject !== 'GENERAL') return false;
        if (selectedSubject !== 'GENERAL' && item.subject !== selectedSubject) return false;
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

  // Group filtered items by subject for clean section rendering
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
    { id: 'all', label: 'All Resources' },
    { id: 'master-guide', label: '⭐ Master Guide' },
    { id: 'notes', label: '📘 Notes & PPTs' },
    { id: 'pyq', label: '📝 Solved PYQs' },
    { id: 'mcq', label: '🎯 MCQ Banks' },
    { id: 'book', label: '📖 Textbooks' },
    { id: 'tutorial', label: '📚 Tutorials' },
  ];

  const getSubjectMeta = (code: string) => {
    return SUBJECT_FOLDERS.find((s) => s.subject === code) || SUBJECT_FOLDERS[0];
  };

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'folder':
        return <Folder className="w-4 h-4 text-amber-400" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-emerald-400" />;
      case 'ppt':
        return <BookMarked className="w-4 h-4 text-orange-400" />;
      case 'doc':
        return <FileCode className="w-4 h-4 text-blue-400" />;
      default:
        return <FileText className="w-4 h-4 text-rose-400" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-violet-500/15 border border-amber-500/30 text-amber-300">
          <FolderArchive className="w-4 h-4 text-amber-400" />
          <span>Verified University Google Drive Vault</span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span>150+ Resources</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
          First-Year Mid-Term{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-rose-400 to-brand-400">
            Resources &amp; PYQ Vault
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl mx-auto">
          Direct cloud access to curated lecture notes, 11+ scanned previous year question papers per subject, 220-question MCQ banks, and the official Master Survival Guide.
        </p>

        {/* Master Folder Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <a
            href={MASTER_DRIVE_FOLDER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-white text-sm font-semibold shadow-lg shadow-rose-500/25 transition-all flex items-center gap-2 group"
          >
            <FolderArchive className="w-4 h-4" />
            <span>Open Complete Google Drive</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          <a
            href="https://drive.google.com/file/d/1yny-O3VcRvVBEgEB8XBn6tIXGVwyV_ZE/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-violet-600/90 hover:bg-violet-600 text-white text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-violet-600/20"
          >
            <Download className="w-4 h-4" />
            <span>Master Exam Guide PDF</span>
          </a>

          <button
            onClick={handleCopyMasterLink}
            className="px-4 py-2.5 rounded-xl bg-surface-card border border-surface-border hover:border-zinc-600 text-zinc-300 hover:text-white text-sm font-medium transition-all flex items-center gap-2"
          >
            {masterLinkCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Drive Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Folder Link</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Featured Master Guide Banner */}
      <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-r from-amber-950/40 via-surface-card to-rose-950/30 border border-amber-500/30 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-xl shadow-amber-500/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 flex items-center justify-center shrink-0 text-xl font-bold">
            ⭐
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-base sm:text-lg font-bold text-white">
                OG Jatin Midterm Master Guide (V2)
              </span>
              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Essential Reading
              </span>
            </div>
            <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-3xl">
              Complete first-year university strategy guide: syllabus weightage breakdown, last-minute prioritization tactics, and numerical question patterns directly from seniors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://drive.google.com/file/d/1yny-O3VcRvVBEgEB8XBn6tIXGVwyV_ZE/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-amber-500/20"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Read Master Guide</span>
          </a>
        </div>
      </div>

      {/* Subject Section Navigation Bar (Sections) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg sm:text-xl font-bold font-display text-white flex items-center gap-2">
            <span>Browse By Subject Sections</span>
          </h2>
          <span className="text-xs text-zinc-400">
            {SUBJECT_FOLDERS.length - 1} Subjects Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SUBJECT_FOLDERS.filter((s) => s.subject !== 'GENERAL').map((folder) => {
            const isSelected = selectedSubject === folder.subject;
            return (
              <div
                key={folder.subject}
                className={`p-5 rounded-2xl bg-surface-card border transition-all relative overflow-hidden flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'border-brand-500 ring-1 ring-brand-500/50 bg-surface-card/90 shadow-lg shadow-brand-500/10'
                    : 'border-surface-border hover:border-surface-border-hover hover:bg-surface-elevated/40'
                }`}
                onClick={() => setSelectedSubject(folder.subject)}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-surface-elevated text-brand-300 border border-surface-border">
                      {folder.code}
                    </span>
                    <a
                      href={folder.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="p-1.5 rounded-lg bg-surface-base/80 hover:bg-surface-elevated text-zinc-400 hover:text-white transition-colors border border-surface-border"
                      title="Open subject folder in Google Drive"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {folder.name}
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                      {folder.description}
                    </p>
                  </div>
                </div>

                <div className="pt-4 mt-3 border-t border-surface-border/50 flex items-center justify-between text-xs">
                  <span className="text-zinc-500 font-mono">
                    {folder.itemCount} files &amp; sets
                  </span>
                  <span className={`font-semibold flex items-center gap-1 ${isSelected ? 'text-brand-400' : 'text-zinc-400'}`}>
                    {isSelected ? 'Currently Viewing' : 'View Section'} <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-5 rounded-2xl bg-surface-card border border-surface-border space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder="Search topic, unit, formula, MCQ, or question paper..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-base border border-surface-border focus:border-brand-500 focus:outline-none text-xs sm:text-sm text-white placeholder-zinc-500 transition-colors"
            />
          </div>

          {/* Reset button if filtered */}
          {(selectedSubject !== 'ALL' || selectedCategory !== 'all' || searchQuery) && (
            <button
              onClick={() => {
                setSelectedSubject('ALL');
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="px-3.5 py-2.5 rounded-xl bg-surface-elevated text-xs font-semibold text-zinc-300 hover:text-white border border-surface-border transition-colors shrink-0"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Subject Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <button
            onClick={() => setSelectedSubject('ALL')}
            className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
              selectedSubject === 'ALL'
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-surface-base text-zinc-400 hover:text-white border border-surface-border'
            }`}
          >
            All Subjects ({MIDTERM_RESOURCES_DATA.length})
          </button>
          {SUBJECT_FOLDERS.filter((s) => s.subject !== 'GENERAL').map((s) => (
            <button
              key={s.subject}
              onClick={() => setSelectedSubject(s.subject)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all ${
                selectedSubject === s.subject
                  ? 'bg-brand-600 text-white shadow-sm'
                  : 'bg-surface-base text-zinc-400 hover:text-white border border-surface-border'
              }`}
            >
              {s.code} ({s.itemCount})
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-t border-surface-border/40 pt-3 scrollbar-none text-xs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as CategoryFilter)}
              className={`px-3 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-surface-elevated text-white border border-surface-border-hover shadow-sm'
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-zinc-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredItems.length}</strong> resources
          {selectedSubject !== 'ALL' && ` in ${selectedSubject}`}
          {selectedCategory !== 'all' && ` (${selectedCategory})`}
        </span>
        <a
          href={MASTER_DRIVE_FOLDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-400 hover:text-brand-300 font-semibold flex items-center gap-1 transition-colors"
        >
          <span>Open in Google Drive</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Resource Sections & Cards */}
      {filteredItems.length === 0 ? (
        <div className="p-12 rounded-2xl bg-surface-card border border-surface-border text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
          <h3 className="text-base font-bold text-white">No Resources Found</h3>
          <p className="text-xs text-zinc-400 max-w-sm mx-auto">
            Try adjusting your search query or selecting a different subject or category.
          </p>
          <button
            onClick={() => {
              setSelectedSubject('ALL');
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-brand-600 text-white text-xs font-semibold hover:bg-brand-500 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          {Object.entries(subjectGroups).map(([subjectCode, itemsInGroup]) => {
            const meta = getSubjectMeta(subjectCode);
            return (
              <div key={subjectCode} className="space-y-5">
                {/* Section Header */}
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-card/60 border border-surface-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-500/15 text-brand-300 border border-brand-500/30">
                        {meta.code}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {meta.name}
                      </h3>
                    </div>
                    <p className="text-xs text-zinc-400">
                      {meta.description}
                    </p>
                  </div>

                  <a
                    href={meta.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-surface-elevated hover:bg-zinc-800 text-xs font-semibold text-zinc-200 hover:text-white border border-surface-border transition-colors flex items-center gap-1.5 shrink-0"
                  >
                    <Folder className="w-3.5 h-3.5 text-amber-400" />
                    <span>Open Section Folder</span>
                    <ArrowUpRight className="w-3 h-3 text-zinc-400" />
                  </a>
                </div>

                {/* Grid of Resource Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {itemsInGroup.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-5 rounded-xl bg-surface-card border border-surface-border hover:border-surface-border-hover transition-all flex flex-col justify-between group shadow-sm"
                    >
                      <div className="space-y-2.5">
                        {/* Card Top Strip */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-lg bg-surface-base border border-surface-border flex items-center justify-center shrink-0">
                              {getFileIcon(item.fileType)}
                            </div>
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                              {item.fileType}
                            </span>
                          </div>

                          <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-surface-elevated text-amber-300 border border-surface-border">
                            {item.badge}
                          </span>
                        </div>

                        {/* Title & Desc */}
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                            {item.title}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-4 mt-3 border-t border-surface-border/50 flex items-center justify-between gap-2">
                        <button
                          onClick={() => handleCopyLink(item.driveUrl, item.id)}
                          className="px-2.5 py-1 rounded-lg bg-surface-base hover:bg-surface-elevated text-zinc-400 hover:text-white text-[11px] font-medium border border-surface-border transition-colors flex items-center gap-1"
                          title="Copy file direct link"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>

                        <a
                          href={item.driveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1 rounded-lg bg-brand-600/90 hover:bg-brand-600 text-white text-[11px] font-semibold transition-all flex items-center gap-1 shadow-sm"
                        >
                          <span>Preview / Open</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 80/20 Mid-Term Survival Strategy Guide */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-surface-card/90 to-surface-elevated/70 border border-surface-border space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-bold text-lg">
            ⚡
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-white">
              How to Prepare with These Resources
            </h2>
            <p className="text-xs text-zinc-400">
              Exam preparation playbook tested across hundreds of university seniors
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-surface-base/60 border border-surface-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
              <Zap className="w-4 h-4" />
              1. Master Units 1 &amp; 2 First
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              In MTH165, PHY175, and CHE110, Units 1 and 2 make up over <strong>70% of the midterm exam</strong>. Do not touch Unit 3 until your foundation on the first two units is rock solid.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-base/60 border border-surface-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-400">
              <FileText className="w-4 h-4" />
              2. Solve Past Year Papers (PYQs)
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              We have attached <strong>11 scanned PYQ papers</strong> for CHE110 and MEC136. Over <strong>40-50%</strong> of the drawing and numerical questions repeat verbatim with changed values.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-base/60 border border-surface-border space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <Code className="w-4 h-4" />
              3. Python 220 Question Bank
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed">
              For INT108 Python, practice the <strong>220 Question Bank</strong> included above. It covers tricky slicing, mutable vs immutable traps, and output prediction that teachers put in question papers.
            </p>
          </div>
        </div>
      </div>

      {/* Share Strip */}
      <div className="p-6 rounded-2xl bg-brand-950/40 border border-brand-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h2 className="text-base font-bold text-white">Share These Resources With Your Batchmates!</h2>
          <p className="text-xs text-zinc-400">
            Send this curated Google Drive link to your section and hostel WhatsApp groups so everyone clears their exams without backlogs.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleCopyMasterLink}
            className="px-4 py-2 rounded-xl bg-surface-elevated text-zinc-300 hover:text-white text-xs font-semibold border border-surface-border transition-colors"
          >
            {masterLinkCopied ? 'Link Copied! ✅' : 'Copy Folder Link'}
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
