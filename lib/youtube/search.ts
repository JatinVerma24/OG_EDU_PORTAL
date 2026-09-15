/**
 * YouTube search URL and API query helpers
 */

export function getYoutubeSearchUrl(code: string, name: string): string {
  const query = `${code} ${name}`.trim();
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function getYoutubePlaylistSearchUrl(code: string, name: string): string {
  const query = `${code} ${name} playlist`.trim();
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export function getYoutubeQuerySearchUrl(rawQuery: string): string {
  const query = rawQuery.trim();
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

export interface YoutubeSearchResult {
  id: string;
  title: string;
  channelTitle: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
}

/**
 * Server-side YouTube Data API v3 search with caching and fallback
 */
export async function searchYoutubeApi(query: string, maxResults = 5): Promise<YoutubeSearchResult[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) {
    return [];
  }

  try {
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('q', query);
    url.searchParams.set('type', 'video');
    url.searchParams.set('maxResults', maxResults.toString());
    url.searchParams.set('key', apiKey);

    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      console.warn(`YouTube API returned status ${res.status}`);
      return [];
    }

    const data = await res.json();
    if (!data.items || !Array.isArray(data.items)) {
      return [];
    }

    return data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails?.high?.url || item.snippet.thumbnails?.default?.url,
      videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`
    }));
  } catch (error) {
    console.error('Failed to query YouTube API:', error);
    return [];
  }
}
