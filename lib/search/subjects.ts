import { Subject, CourseId, SemesterNumber, SubjectType } from '../../types';
import { getAllSubjects, getSubjectsByCourse } from '../../data/courses';

export interface SubjectFilterOptions {
  query?: string;
  courseId?: CourseId;
  semester?: SemesterNumber | 'all';
  type?: SubjectType | 'all';
}

/**
 * Normalizes string for fast fuzzy-matching:
 * trims, removes extra whitespace, lowercases, removes non-alphanumerics
 */
function normalize(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/**
 * Filter and search subjects based on multi-field query and filters
 */
export function searchSubjects(options: SubjectFilterOptions = {}): Subject[] {
  const { query = '', courseId = 'btech', semester = 'all', type = 'all' } = options;

  let subjects = getSubjectsByCourse(courseId);

  // 1. Filter by Semester
  if (semester !== 'all' && semester !== undefined) {
    subjects = subjects.filter((s) => s.semester === Number(semester));
  }

  // 2. Filter by Subject Type
  if (type !== 'all' && type !== undefined) {
    subjects = subjects.filter((s) => s.type === type);
  }

  // 3. Search Query Filter
  const trimmedQuery = query.trim().toLowerCase();
  if (!trimmedQuery) {
    return subjects;
  }

  const queryNormalized = normalize(trimmedQuery);
  const queryTokens = trimmedQuery.split(/\s+/).filter(Boolean);

  return subjects.filter((subject) => {
    const codeLower = subject.code.toLowerCase();
    const codeNormalized = normalize(subject.code);
    const nameLower = subject.name.toLowerCase();
    const nameNormalized = normalize(subject.name);
    const descLower = subject.description.toLowerCase();
    const groupLower = (subject.electiveGroup || '').toLowerCase();

    // Check exact or partial code match
    if (codeLower.includes(trimmedQuery) || codeNormalized.includes(queryNormalized)) {
      return true;
    }

    // Check exact or partial name match
    if (nameLower.includes(trimmedQuery) || nameNormalized.includes(queryNormalized)) {
      return true;
    }

    // Check elective group match
    if (groupLower.includes(trimmedQuery)) {
      return true;
    }

    // Check keywords
    const matchesKeyword = subject.keywords.some((kw) => {
      const kwLower = kw.toLowerCase();
      return kwLower.includes(trimmedQuery) || normalize(kw).includes(queryNormalized);
    });
    if (matchesKeyword) return true;

    // Multi-token match: every token matches code, name, description, or keyword
    const allTokensMatch = queryTokens.every((token) => {
      return (
        codeLower.includes(token) ||
        nameLower.includes(token) ||
        descLower.includes(token) ||
        subject.keywords.some((kw) => kw.toLowerCase().includes(token))
      );
    });

    return allTokensMatch;
  });
}
