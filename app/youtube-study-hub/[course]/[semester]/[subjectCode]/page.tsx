import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSubjects, getSubjectByCode } from '../../../../../data/courses';
import { CourseId, SemesterNumber } from '../../../../../types';
import { ChannelList } from '../../../../../components/youtube-study-hub/ChannelList';
import { ArrowLeft, ChevronRight, Award, Bookmark, GraduationCap } from 'lucide-react';

interface PageProps {
  params: Promise<{
    course: string;
    semester: string;
    subjectCode: string;
  }>;
}

// Statically generate routes for all subjects across Semesters 1 to 4
export async function generateStaticParams() {
  const subjects = getAllSubjects();
  return subjects.map((sub) => ({
    course: sub.courseId,
    semester: `semester-${sub.semester}`,
    subjectCode: sub.code.toLowerCase()
  }));
}

// Generate dynamic SEO metadata for each individual subject page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { course, semester, subjectCode } = await params;
  const courseId = course.toLowerCase() as CourseId;
  const semNum = parseInt(semester.replace('semester-', ''), 10) as SemesterNumber;
  const subject = getSubjectByCode(courseId, semNum, subjectCode);

  if (!subject) {
    return {
      title: 'Subject Not Found | OGEDU YouTube Study Hub'
    };
  }

  const title = `${subject.code} ${subject.name} YouTube Channels & Lectures | OGEDU Study Hub`;
  const description = `Find top-recommended YouTube channels, playlists, and video tutorials for ${subject.code} - ${subject.name} (${subject.courseId.toUpperCase()} Semester ${subject.semester}). Curated by OGEDU AI.`;

  return {
    title,
    description,
    keywords: [
      `${subject.code} YouTube channel`,
      `${subject.name} YouTube lectures`,
      `${subject.code} playlist`,
      `${subject.code} semester exam prep`,
      ...subject.keywords
    ],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://ogedu-portal.vercel.app/youtube-study-hub/${course}/${semester}/${subjectCode}`
    }
  };
}

export default async function SubjectDetailPage({ params }: PageProps) {
  const { course, semester, subjectCode } = await params;
  const courseId = course.toLowerCase() as CourseId;
  const semNum = parseInt(semester.replace('semester-', ''), 10) as SemesterNumber;
  const subject = getSubjectByCode(courseId, semNum, subjectCode);

  if (!subject) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-surface-base/80 border-b border-surface-border/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/youtube-study-hub" className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>All Subjects</span>
          </Link>

          <Link href="/" className="font-display font-bold text-sm text-zinc-200">
            OGEDU<span className="text-brand-500 font-extrabold ml-0.5">AI</span>
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center flex-wrap gap-1.5 text-xs text-zinc-400 mb-6 font-medium">
          <Link href="/" className="hover:text-zinc-200 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <Link href="/youtube-study-hub" className="hover:text-zinc-200 transition-colors">
            YouTube Study Hub
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <Link href={`/youtube-study-hub?course=${subject.courseId}&sem=${subject.semester}`} className="hover:text-zinc-200 transition-colors uppercase">
            {subject.courseId} Sem {subject.semester}
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-brand-400 font-mono font-bold">{subject.code}</span>
        </nav>

        {/* Subject Detail Header Card */}
        <section className="p-6 sm:p-8 rounded-3xl bg-surface-card border border-surface-border shadow-2xl relative overflow-hidden mb-10">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand-500 via-purple-400 to-red-500" />

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-mono text-sm sm:text-base font-extrabold tracking-wider text-brand-400 bg-brand-500/10 border border-brand-500/20 px-3 py-1 rounded-xl">
              {subject.code}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-surface-elevated text-zinc-300 border border-surface-border flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-brand-400" />
              {subject.courseId === 'btech' ? 'B.Tech' : 'BBA'} &bull; Semester {subject.semester}
            </span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-surface-elevated text-zinc-300 border border-surface-border flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              {subject.credits} Credits
            </span>
            {subject.electiveGroup && (
              <span className="text-xs font-medium text-purple-300 bg-purple-950/40 border border-purple-800/40 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                <Bookmark className="w-3 h-3" />
                {subject.electiveGroup}
              </span>
            )}
          </div>

          <h1 className="font-display font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight mb-3">
            {subject.name}
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-3xl">
            {subject.description}
          </p>

          {/* Keywords */}
          {subject.keywords.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 mt-5 pt-5 border-t border-surface-border/60">
              <span className="text-xs text-zinc-500 mr-1 font-medium">Topics:</span>
              {subject.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-0.5 rounded-md bg-surface-elevated text-zinc-400 border border-surface-border"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </section>

        {/* Channels List & YouTube Search Tools */}
        <section>
          <ChannelList subject={subject} />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-surface-border/60 bg-surface-card/40 py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-zinc-500">
          <p>&copy; {new Date().getFullYear()} OGEDU AI &bull; Official University Study Directory</p>
        </div>
      </footer>
    </div>
  );
}
