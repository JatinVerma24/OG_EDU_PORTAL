import { Subject } from '../../../types';
import { BBA_SEMESTER_1_SUBJECTS } from './semester1';
import { BBA_SEMESTER_2_SUBJECTS } from './semester2';
import { BBA_SEMESTER_3_SUBJECTS } from './semester3';
import { BBA_SEMESTER_4_SUBJECTS } from './semester4';

export * from './semester1';
export * from './semester2';
export * from './semester3';
export * from './semester4';

export const BBA_ALL_SUBJECTS: Subject[] = [
  ...BBA_SEMESTER_1_SUBJECTS,
  ...BBA_SEMESTER_2_SUBJECTS,
  ...BBA_SEMESTER_3_SUBJECTS,
  ...BBA_SEMESTER_4_SUBJECTS
];

export const BBA_SEMESTER_COUNTS = {
  1: BBA_SEMESTER_1_SUBJECTS.length,
  2: BBA_SEMESTER_2_SUBJECTS.length,
  3: BBA_SEMESTER_3_SUBJECTS.length,
  4: BBA_SEMESTER_4_SUBJECTS.length
};
