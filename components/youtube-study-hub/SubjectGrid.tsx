'use client';

import React from 'react';
import { Subject } from '../../types';
import { SubjectCard } from './SubjectCard';
import { EmptyState } from './EmptyState';

interface SubjectGridProps {
  subjects: Subject[];
  searchQuery?: string;
  isBba?: boolean;
  onSelectSubject?: (subject: Subject) => void;
  onResetSearch?: () => void;
}

export const SubjectGrid: React.FC<SubjectGridProps> = ({
  subjects,
  searchQuery = '',
  isBba = false,
  onSelectSubject,
  onResetSearch
}) => {
  if (isBba) {
    return <EmptyState type="bba-coming-soon" />;
  }

  if (subjects.length === 0) {
    return (
      <EmptyState
        type="no-subjects-found"
        query={searchQuery}
        onReset={onResetSearch}
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 w-full">
      {subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          onSelect={onSelectSubject}
        />
      ))}
    </div>
  );
};
