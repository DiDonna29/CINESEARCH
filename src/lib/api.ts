import type { Movie, TVShow, Anime, ContentItem, ApiResponseError, PaginatedResponse } from './types';
import { mockMovies, mockTVShows, mockAnime, allMockData } from './mock-data';

const getPaginatedItems = <T>(items: T[], page: number, limit: number): PaginatedResponse<T> => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const total = items.length;
  const totalPages = Math.ceil(total / limit);
  const data = items.slice(startIndex, endIndex);

  return {
    data,
    total,
    totalPages,
    currentPage: page
  };
};

export async function getMovies(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Movie> | ApiResponseError> {
  return getPaginatedItems(mockMovies, page, limit);
}

export async function getTVShows(page: number = 1, limit: number = 10): Promise<PaginatedResponse<TVShow> | ApiResponseError> {
  return getPaginatedItems(mockTVShows, page, limit);
}

export async function getAnime(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Anime> | ApiResponseError> {
  return getPaginatedItems(mockAnime, page, limit);
}

export async function getContentByTitle(title: string): Promise<ContentItem | null | ApiResponseError> {
  const decodedId = decodeURIComponent(title);
  const item = allMockData.find(m => m.id === decodedId || m.title.toLowerCase() === decodedId.toLowerCase());
  return item || null;
}

// Keep legacy named functions for compatibility
export const getMovieByTitle = getContentByTitle;
export const getTVShowByTitle = getContentByTitle;
export const getAnimeByTitle = getContentByTitle;

export async function searchContent(query: string, type: 'movie' | 'tvshow' | 'anime'): Promise<ContentItem[] | ApiResponseError> {
  const decodedQuery = decodeURIComponent(query).toLowerCase();
  const source = type === 'movie' ? mockMovies : type === 'tvshow' ? mockTVShows : mockAnime;
  
  return source.filter(item => 
    item.title.toLowerCase().includes(decodedQuery) || 
    (item.description && item.description.toLowerCase().includes(decodedQuery))
  );
}

export function isApiError(data: any): data is ApiResponseError {
  return typeof data === 'object' && data !== null && 'message' in data;
}
