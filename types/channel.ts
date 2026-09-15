export type ChannelCategory =
  | 'Programming'
  | 'Mathematics'
  | 'Computer Science'
  | 'Engineering'
  | 'AI / ML'
  | 'Data Science'
  | 'Web Development'
  | 'Communication Skills'
  | 'Aptitude'
  | 'Management & Commerce';

export type TeachingLanguage = 'Hindi' | 'English' | 'Hinglish';

export type DifficultyLevel = 'Beginner Friendly' | 'Intermediate' | 'Comprehensive' | 'Advanced' | 'Exam-Focused';

export interface Channel {
  id: string;
  name: string;
  youtubeHandle?: string;
  channelUrl: string;
  logoUrl?: string;
  description: string;
  language: TeachingLanguage;
  level: DifficultyLevel;
  verified: boolean;
  category: ChannelCategory;
  popularSubjects?: string[];
}

export interface SubjectChannel {
  channelId: string;
  name: string;
  channelUrl: string;
  logoUrl?: string;
  description: string;
  language: TeachingLanguage;
  level: DifficultyLevel;
  recommendationReason: string;
  priority: number; // 1 = highest recommendation
  featuredPlaylistUrl?: string;
  playlistTitle?: string;
}
