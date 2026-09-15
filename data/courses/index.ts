import { Course, CourseId, SemesterNumber, Subject } from '../../types';
import { BTECH_ALL_SUBJECTS, BTECH_SEMESTER_COUNTS } from './btech';
import { BBA_ALL_SUBJECTS, BBA_SEMESTER_COUNTS } from './bba';

export * from './btech';
export * from './bba';

export const COURSES: Course[] = [
  {
    id: 'btech',
    name: 'B.Tech',
    fullName: 'Bachelor of Technology (Computer Science & Engineering)',
    description: 'Comprehensive curriculum for B.Tech CSE covering foundational computing, algorithms, systems, mathematics, and engineering minors.',
    status: 'active',
    semesters: [
      { number: 1, name: 'Semester 1', description: 'Orientation to Computing, Python, Engineering Mathematics, Graphics & Electronics' },
      { number: 2, name: 'Semester 2', description: 'C Programming, Software Engineering, DBMS, Discrete Mathematics & Communication' },
      { number: 3, name: 'Semester 3', description: 'OOPs (C++), Data Structures & Algorithms, Computer Architecture, Networks & OS' },
      { number: 4, name: 'Semester 4', description: 'Java Programming, DAA, Artificial Intelligence, Aptitude & Engineering Minors' }
    ]
  },
  {
    id: 'bba',
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    description: 'Undergraduate business administration program. Full semester curriculum mapping is currently underway.',
    status: 'coming_soon',
    semesters: [
      { number: 1, name: 'Semester 1', description: 'Curriculum mapping in progress' },
      { number: 2, name: 'Semester 2', description: 'Curriculum mapping in progress' },
      { number: 3, name: 'Semester 3', description: 'Curriculum mapping in progress' },
      { number: 4, name: 'Semester 4', description: 'Curriculum mapping in progress' }
    ]
  }
];

export function getAllSubjects(): Subject[] {
  return [...BTECH_ALL_SUBJECTS, ...BBA_ALL_SUBJECTS];
}

export function getSubjectsByCourse(courseId: CourseId): Subject[] {
  if (courseId === 'btech') return BTECH_ALL_SUBJECTS;
  if (courseId === 'bba') return BBA_ALL_SUBJECTS;
  return [];
}

export function getSubjectsByCourseAndSemester(courseId: CourseId, semester: SemesterNumber): Subject[] {
  const subjects = getSubjectsByCourse(courseId);
  return subjects.filter((s) => s.semester === semester);
}

export function getSubjectByCode(courseId: CourseId, semester: SemesterNumber, code: string): Subject | undefined {
  const normalizedCode = code.trim().toUpperCase();
  return getAllSubjects().find(
    (s) => s.courseId === courseId && s.semester === semester && s.code.toUpperCase() === normalizedCode
  );
}

export function getSubjectByCodeOnly(code: string): Subject | undefined {
  const normalizedCode = code.trim().toUpperCase();
  return getAllSubjects().find((s) => s.code.toUpperCase() === normalizedCode);
}

export function getSemesterCounts(courseId: CourseId): Record<SemesterNumber, number> {
  if (courseId === 'btech') return BTECH_SEMESTER_COUNTS;
  if (courseId === 'bba') return BBA_SEMESTER_COUNTS;
  return { 1: 0, 2: 0, 3: 0, 4: 0 };
}
