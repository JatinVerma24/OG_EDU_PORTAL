import { Course, CourseId, SemesterNumber, Subject } from '../../types';
import { BTECH_ALL_SUBJECTS, BTECH_SEMESTER_COUNTS } from './btech';
import { BBA_ALL_SUBJECTS, BBA_SEMESTER_COUNTS } from './bba';
import { BCA_ALL_SUBJECTS, BCA_SEMESTER_COUNTS } from './bca';

export * from './btech';
export * from './bba';
export * from './bca';

export const COURSES: Course[] = [
  {
    id: 'bca',
    name: 'BCA',
    fullName: 'Bachelor of Computer Applications',
    description: 'Undergraduate computer applications curriculum covering C Programming, FIT, Discrete Structures, AI & ML, Data Engineering, and Communication.',
    status: 'active',
    semesters: [
      { number: 1, name: 'Semester 1', description: 'C Programming, FIT, Discrete Structures, Environmental Studies & Communication' },
      { number: 2, name: 'Semester 2', description: 'Object-Oriented Programming (C++), Data Structures & Algorithm Foundations' },
      { number: 3, name: 'Semester 3', description: 'Web Technologies, DBMS, Operating Systems & Software Engineering' },
      { number: 4, name: 'Semester 4', description: 'Java Programming, Python Data Science, Cloud Computing & Electives' }
    ]
  },
  {
    id: 'bba',
    name: 'BBA',
    fullName: 'Bachelor of Business Administration',
    description: 'Undergraduate business administration program covering management principles, accounting, finance, marketing, law, and analytics.',
    status: 'active',
    semesters: [
      { number: 1, name: 'Semester 1', description: 'Management Principles, Accounting, Microeconomics, Human Values & Math' },
      { number: 2, name: 'Semester 2', description: 'Cost Accounting, Principles of Marketing, Research Methodology & Law' },
      { number: 3, name: 'Semester 3', description: 'Financial Management, Human Resource Management, Operations Research & OB' },
      { number: 4, name: 'Semester 4', description: 'Corporate Strategy, Company Law, Consumer Behaviour, Taxation & MIS' }
    ]
  },
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
  }
];

export function getAllSubjects(): Subject[] {
  return [...BCA_ALL_SUBJECTS, ...BBA_ALL_SUBJECTS, ...BTECH_ALL_SUBJECTS];
}

export function getSubjectsByCourse(courseId: CourseId): Subject[] {
  if (courseId === 'bca') return BCA_ALL_SUBJECTS;
  if (courseId === 'bba') return BBA_ALL_SUBJECTS;
  if (courseId === 'btech') return BTECH_ALL_SUBJECTS;
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
  if (courseId === 'bca') return BCA_SEMESTER_COUNTS;
  if (courseId === 'bba') return BBA_SEMESTER_COUNTS;
  if (courseId === 'btech') return BTECH_SEMESTER_COUNTS;
  return { 1: 0, 2: 0, 3: 0, 4: 0 };
}
