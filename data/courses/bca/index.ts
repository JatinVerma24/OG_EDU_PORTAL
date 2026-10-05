import { Subject } from '../../../types';
import { BCA_SEMESTER_1_SUBJECTS } from './semester1';
import { BCA_SEMESTER_2_SUBJECTS } from './semester2';

export * from './semester1';
export * from './semester2';

export const BCA_ALL_SUBJECTS: Subject[] = [
  ...BCA_SEMESTER_1_SUBJECTS,
  ...BCA_SEMESTER_2_SUBJECTS
];

export const BCA_SEMESTER_COUNTS = {
  1: BCA_SEMESTER_1_SUBJECTS.length,
  2: BCA_SEMESTER_2_SUBJECTS.length,
  3: 0,
  4: 0
};
