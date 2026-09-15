import { Channel, ChannelCategory } from '../../types';
import { CHANNELS_DIRECTORY } from '../../data/channels/directory';

export function getAllChannels(): Channel[] {
  return CHANNELS_DIRECTORY;
}

export function getChannelById(id: string): Channel | undefined {
  return CHANNELS_DIRECTORY.find((c) => c.id === id);
}

export function getChannelsByCategory(category: ChannelCategory): Channel[] {
  return CHANNELS_DIRECTORY.filter((c) => c.category === category);
}

export const CHANNEL_CATEGORIES: ChannelCategory[] = [
  'Programming',
  'Mathematics',
  'Computer Science',
  'Engineering',
  'AI / ML',
  'Data Science',
  'Web Development',
  'Communication Skills',
  'Aptitude'
];
