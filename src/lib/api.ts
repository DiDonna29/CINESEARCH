import type { ContentItem, ApiResponseError, PaginatedResponse, Movie, TVShow, Anime } from './types';
import { OMDB_API_KEY, OMDB_BASE_URL } from './constants';

const mapOmdbToContentItem = (omdbItem: any, forcedType?: 'movie' | 'tvshow' | 'anime'): ContentItem => {
  const typeMap: Record<string, 'movie' | 'tvshow' | 'anime'> = {
    movie: 'movie',
    series: 'tvshow',
    episode: 'tvshow'
  };

  const type = forcedType || typeMap[omdbItem.Type] || 'movie';
  
  return {
    id: omdbItem.imdbID || 'unknown',
    title: omdbItem.Title || 'Unknown Title',
    year: omdbItem.Year || '',
    imdbRating: omdbItem.imdbRating && omdbItem.imdbRating !== 'N/A' ? parseFloat(omdbItem.imdbRating) : 0,
    duration: omdbItem.Runtime && omdbItem.Runtime !== 'N/A' ? omdbItem.Runtime : '',
    description: omdbItem.Plot && omdbItem.Plot !== 'N/A' ? omdbItem.Plot : '',
    genre: omdbItem.Genre && omdbItem.Genre !== 'N/A' ? omdbItem.Genre.split(', ') : [],
    country: omdbItem.Country && omdbItem.Country !== 'N/A' ? omdbItem.Country.split(', ') : [],
    stars: omdbItem.Actors && omdbItem.Actors !== 'N/A' ? omdbItem.Actors.split(', ') : [],
    imageURL: omdbItem.Poster && omdbItem.Poster !== 'N/A' ? omdbItem.Poster : undefined,
    type
  };
};

async function fetchOmdb(params: Record<string, string>) {
  const url = new URL(OMDB_BASE_URL);
  url.searchParams.set('apikey', OMDB_API_KEY);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  try {
    const response = await fetch(url.toString(), { 
      next: { revalidate: 3600 } // Cache for 1 hour
    });
    
    if (response.status === 401) {
      return { error: 'Invalid API Key' };
    }
    
    if (!response.ok) {
      return { error: `API Error: ${response.status}` };
    }
    
    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: error.message || 'Connection Error' };
  }
}

async function getEnrichedItems(searchItems: any[], forcedType?: 'movie' | 'tvshow' | 'anime'): Promise<ContentItem[]> {
  if (!searchItems || !Array.isArray(searchItems)) return [];
  
  // We limit concurrent requests to avoid 429 errors from OMDb
  const detailPromises = searchItems.slice(0, 10).map(item => 
    fetchOmdb({ i: item.imdbID, plot: 'short' })
  );
  
  const details = await Promise.all(detailPromises);
  return details
    .filter(d => d && d.Response !== 'False' && !d.error)
    .map(d => mapOmdbToContentItem(d, forcedType));
}

export async function getMovies(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Movie> | ApiResponseError> {
  const data = await fetchOmdb({ s: '2024', type: 'movie', page: page.toString() });
  
  if (data.error || data.Response === 'False') return { message: data.error || data.Error || 'No movies found' };

  const totalResults = parseInt(data.totalResults || '0', 10);
  const items = await getEnrichedItems(data.Search, 'movie');

  return {
    data: items as Movie[],
    total: totalResults,
    totalPages: Math.min(Math.ceil(totalResults / 10), 100),
    currentPage: page
  };
}

export async function getTVShows(page: number = 1, limit: number = 10): Promise<PaginatedResponse<TVShow> | ApiResponseError> {
  const data = await fetchOmdb({ s: 'series', type: 'series', page: page.toString() });
  
  if (data.error || data.Response === 'False') return { message: data.error || data.Error || 'No TV shows found' };

  const totalResults = parseInt(data.totalResults || '0', 10);
  const items = await getEnrichedItems(data.Search, 'tvshow');

  return {
    data: items as TVShow[],
    total: totalResults,
    totalPages: Math.min(Math.ceil(totalResults / 10), 100),
    currentPage: page
  };
}

export async function getAnime(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Anime> | ApiResponseError> {
  const data = await fetchOmdb({ s: 'anime', page: page.toString() });
  
  if (data.error || data.Response === 'False') return { message: data.error || data.Error || 'No anime found' };

  const totalResults = parseInt(data.totalResults || '0', 10);
  const items = await getEnrichedItems(data.Search, 'anime');

  return {
    data: items as Anime[],
    total: totalResults,
    totalPages: Math.min(Math.ceil(totalResults / 10), 100),
    currentPage: page
  };
}

export async function getContentByTitle(title: string): Promise<ContentItem | null | ApiResponseError> {
  const data = await fetchOmdb({ i: title, plot: 'full' });
  if (data.error || data.Response === 'False') {
    const dataByTitle = await fetchOmdb({ t: title, plot: 'full' });
    if (dataByTitle.error || dataByTitle.Response === 'False') return { message: dataByTitle.Error || 'Not found' };
    return mapOmdbToContentItem(dataByTitle);
  }
  return mapOmdbToContentItem(data);
}

export const getMovieByTitle = getContentByTitle;
export const getTVShowByTitle = getContentByTitle;
export const getAnimeByTitle = getContentByTitle;

export async function searchContent(query: string, type: 'movie' | 'tvshow' | 'anime'): Promise<ContentItem[] | ApiResponseError> {
  const omdbType = type === 'movie' ? 'movie' : type === 'tvshow' ? 'series' : '';
  const searchParams: any = { s: query };
  if (omdbType) searchParams.type = omdbType;

  const data = await fetchOmdb(searchParams);
  if (data.error || data.Response === 'False') return [];

  return getEnrichedItems(data.Search, type);
}

export function isApiError(data: any): data is ApiResponseError {
  return typeof data === 'object' && data !== null && 'message' in data;
}
