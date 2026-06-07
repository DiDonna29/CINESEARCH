import type { Movie, TVShow, ContentItem, ApiResponseError, PaginatedResponse } from './types';
import { mockMovies } from './mock-data'; // Import mock data

export async function getMovies(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Movie> | ApiResponseError> {
  console.log("Using mock data for getMovies. Page:", page, "Limit:", limit);
  
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const total = mockMovies.length;
  const totalPages = Math.ceil(total / limit);
  const items = mockMovies.slice(startIndex, endIndex).map(movie => ({ ...movie, type: 'movie' as 'movie' }));

  return {
    data: items,
    total,
    totalPages,
    currentPage: page
  };
}

export async function getTVShows(page: number = 1): Promise<TVShow[] | ApiResponseError> {
  console.log("Using mock data for getTVShows (returning empty). Page:", page);
  return []; 
}

export async function getMovieByTitle(title: string): Promise<Movie | null | ApiResponseError> {
  const decodedTitle = decodeURIComponent(title);
  console.log(`Using mock data for getMovieByTitle: ${decodedTitle}`);
  const movie = mockMovies.find(m => m.title.toLowerCase() === decodedTitle.toLowerCase());
  if (movie) {
    return { ...movie, type: 'movie' as 'movie' };
  }
  return null;
}

export async function getTVShowByTitle(title: string): Promise<TVShow | null | ApiResponseError> {
  const decodedTitle = decodeURIComponent(title);
  console.log(`Using mock data for getTVShowByTitle (returning null): ${decodedTitle}`);
  return null;
}

export async function searchContent(query: string, type: 'movie' | 'tvshow'): Promise<ContentItem[] | ApiResponseError> {
  const decodedQuery = decodeURIComponent(query).toLowerCase();
  console.log(`Using mock data for searchContent. Query: "${decodedQuery}", Type: ${type}`);

  if (type === 'movie') {
    const results = mockMovies.filter(movie => 
      movie.title.toLowerCase().includes(decodedQuery) || 
      (movie.description && movie.description.toLowerCase().includes(decodedQuery))
    );
    return results.map(movie => ({ ...movie, type: 'movie' as 'movie' }));
  }
  
  if (type === 'tvshow') {
    return [];
  }
  
  return { message: `Search type "${type}" not supported in mock mode or no data available.` };
}

export function isApiError(data: any): data is ApiResponseError {
  return typeof data === 'object' && data !== null && 'message' in data;
}
