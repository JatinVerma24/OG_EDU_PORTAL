import { CourseId, SemesterNumber } from './course';
import { SubjectChannel } from './channel';

export type SubjectType = 'Core' | 'Elective' | 'Lab' | 'Language' | 'Minor' | 'Aptitude';

export interface Subject {
  id: string;
  courseId: CourseId;
  semester: SemesterNumber;
  code: string;
  name: string;
  credits: number;
  type: SubjectType;
  electiveGroup?: string;
  description: string;
  keywords: string[];
  slug: string;
  channels: SubjectChannel[];
}
