import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { searchYoutubeApi } from '../../../../lib/youtube/search';

// Zod validation schema for YouTube search query parameters
const SearchQuerySchema = z.object({
  q: z.string().min(1, 'Search query cannot be empty').max(100, 'Query too long'),
  maxResults: z.coerce.number().min(1).max(10).default(5)
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q');
  const maxResults = searchParams.get('maxResults') || '5';

  const parseResult = SearchQuerySchema.safeParse({ q, maxResults });
  if (!parseResult.success) {
    return NextResponse.json(
      { error: 'Invalid search parameters', details: parseResult.error.format() },
      { status: 400 }
    );
  }

  const { q: validQuery, maxResults: validMaxResults } = parseResult.data;

  try {
    const results = await searchYoutubeApi(validQuery, validMaxResults);
    return NextResponse.json({
      query: validQuery,
      resultsCount: results.length,
      results
    });
  } catch (error) {
    console.error('YouTube Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to execute YouTube search' },
      { status: 500 }
    );
  }
}
