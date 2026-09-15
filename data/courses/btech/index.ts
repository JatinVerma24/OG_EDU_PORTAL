import { Subject } from '../../../types';
import { BTECH_SEMESTER_1_SUBJECTS } from './semester1';
import { BTECH_SEMESTER_2_SUBJECTS } from './semester2';
import { BTECH_SEMESTER_3_SUBJECTS } from './semester3';
import { BTECH_SEMESTER_4_SUBJECTS } from './semester4';

export * from './semester1';
export * from './semester2';
export * from './semester3';
export * from './semester4';

export const BTECH_ALL_SUBJECTS: Subject[] = [
  ...BTECH_SEMESTER_1_SUBJECTS,
  ...BTECH_SEMESTER_2_SUBJECTS,
  ...BTECH_SEMESTER_3_SUBJECTS,
  ...BTECH_SEMESTER_4_SUBJECTS
];

export const BTECH_SEMESTER_COUNTS = {
  1: BTECH_SEMESTER_1_SUBJECTS.length,
  2: BTECH_SEMESTER_2_SUBJECTS.length,
  3: BTECH_SEMESTER_3_SUBJECTS.length,
  4: BTECH_SEMESTER_4_SUBJECTS.length
};
