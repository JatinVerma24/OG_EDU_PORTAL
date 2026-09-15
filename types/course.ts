export type CourseId = 'btech' | 'bba';

export type SemesterNumber = 1 | 2 | 3 | 4;

export interface SemesterInfo {
  number: SemesterNumber;
  name: string;
  description: string;
}

export interface Course {
  id: CourseId;
  name: string;
  fullName: string;
  description: string;
  status: 'active' | 'coming_soon';
  semesters: SemesterInfo[];
}
