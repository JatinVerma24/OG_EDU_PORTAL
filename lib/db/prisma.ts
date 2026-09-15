/**
 * Database Layer Architecture & Prisma Client Configuration
 * 
 * Schema Entity Relationships:
 * Course 1:N Semester 1:N Subject 1:N SubjectChannel N:1 Channel
 * 
 * In this version, curriculum data is loaded from typed JSON/TS in data/courses/.
 * This file prepares the client and schema definitions for future database migration.
 */

export interface DbCourse {
  id: string;
  name: string;
  fullName: string;
  description?: string;
  status: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DbSemester {
  id: string;
  courseId: string;
  number: number;
  name: string;
  description?: string;
}

export interface DbSubject {
  id: string;
  courseId: string;
  semesterId: string;
  code: string;
  name: string;
  credits: number;
  type: string;
  electiveGroup?: string;
  description: string;
  keywords: string[];
  slug: string;
}

export interface DbChannel {
  id: string;
  name: string;
  youtubeChannelId?: string;
  channelUrl: string;
  logoUrl?: string;
  description: string;
  language: string;
  level: string;
  verified: boolean;
  category: string;
}

export interface DbSubjectChannel {
  id: string;
  subjectId: string;
  channelId: string;
  recommendationReason: string;
  priority: number;
  featuredPlaylistUrl?: string;
}

// In-memory / Mock DB client for JSON-backed data access
export const db = {
  course: {
    findMany: async () => [],
    findUnique: async () => null
  },
  subject: {
    findMany: async () => [],
    findUnique: async () => null
  },
  channel: {
    findMany: async () => [],
    findUnique: async () => null
  }
};

export default db;
