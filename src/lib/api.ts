import type { Movie, TVShow, ContentItem, ApiResponseError } from './types';
import { API_BASE_URL, API_HOST, API_KEY } from './constants';

const RAPIDAPI_HEADERS = {
  'x-rapidapi-host': API_HOST,
  'x-rapidapi-key': API_KEY,
};

async function fetchData<T>(endpoint: string): Promise<T | ApiResponseError> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: RAPIDAPI_HEADERS,
    });
    if (!response.ok) {
      console.error(`API Error (${response.status}): ${response.statusText} for endpoint ${endpoint}`);
      try {
        const errorData = await response.json();
        return { message: errorData.message || `An error occurred while fetching data (status ${response.status}).` };
      } catch (e) {
        return { message: `An error occurred while fetching data (status ${response.status}). Unable to parse error response.` };
      }
    }
    const data = await response.json();
    // The API returns an array of items. Assign a pseudo-ID using title.
    // Also, map the response to ensure all items have an 'id' and 'type'.
    if (Array.isArray(data)) {
      return data.map(item => ({ ...item, id: item.title })) as T;
    }
    // For single item fetch (if API supports it), ensure id and type
    if (typeof data === 'object' && data !== null && data.title) {
        return { ...data, id: data.title } as T;
    }
    return data as T;

  } catch (error) {
    console.error('Network or other error in fetchData:', error);
    return { message: error instanceof Error ? error.message : 'An unknown network error occurred.' };
  }
}

export async function getMovies(page: number = 1): Promise<Movie[] | ApiResponseError> {
  const result = await fetchData<Movie[]>(`/list/movies/${page}`);
  if (Array.isArray(result)) {
    return result.map(movie => ({ ...movie, type: 'movie', id: movie.title || String(Math.random()) }));
  }
  return result;
}

export async function getTVShows(page: number = 1): Promise<TVShow[] | ApiResponseError> {
  // Assuming a similar endpoint for TV shows
  const result = await fetchData<TVShow[]>(`/list/tvshows/${page}`);
   if (Array.isArray(result)) {
    return result.map(tvshow => ({ ...tvshow, type: 'tvshow', id: tvshow.title || String(Math.random()) }));
  }
  return result;
}

// For detail pages, we fetch the list and find by title as per current plan
// This is not efficient but works with the provided API structure.
async function getContentByTitle(type: 'movie' | 'tvshow', title: string): Promise<ContentItem | null | ApiResponseError> {
  const decodedTitle = decodeURIComponent(title);
  const fetchFunction = type === 'movie' ? getMovies : getTVShows;
  // Try fetching first few pages. This is a hack due to lack of specific item endpoint.
  // A real app would need a proper ID-based or search-by-title endpoint.
  for (let page = 1; page <= 3; page++) { 
    const itemsOrError = await fetchFunction(page);
    if ('message' in itemsOrError) return itemsOrError; // Error occurred
    
    if (Array.isArray(itemsOrError)) {
      const foundItem = itemsOrError.find(item => item.title === decodedTitle);
      if (foundItem) return foundItem;
    }
  }
  return null; // Not found after checking a few pages
}

export async function getMovieByTitle(title: string): Promise<Movie | null | ApiResponseError> {
  return getContentByTitle('movie', title) as Promise<Movie | null | ApiResponseError>;
}

export async function getTVShowByTitle(title: string): Promise<TVShow | null | ApiResponseError> {
  return getContentByTitle('tvshow', title) as Promise<TVShow | null | ApiResponseError>;
}

export async function searchContent(query: string, type: 'movie' | 'tvshow'): Promise<ContentItem[] | ApiResponseError> {
  // Assuming search endpoints like /search/movie/{query} or /search/tv/{query}
  // For now, this is a placeholder. A real implementation depends on actual API.
  // Example: const result = await fetchData<ContentItem[]>(`/search/${type}?query=${encodeURIComponent(query)}`);
  // Fallback: fetch list and filter client-side (not good for actual search, but placeholder)
  
  const endpoint = type === 'movie' ? `/search/movie/${encodeURIComponent(query)}` : `/search/tv/${encodeURIComponent(query)}`;
  const result = await fetchData<ContentItem[]>(endpoint);

  if (Array.isArray(result)) {
    return result.map(item => ({ ...item, type, id: item.title || String(Math.random()) }));
  }
  // If API returns single object for exact match
  if (typeof result === 'object' && result !== null && !('message' in result) && (result as ContentItem).title) {
    return [{ ...(result as ContentItem), type, id: (result as ContentItem).title || String(Math.random()) }];
  }
  
  // If result is an error object
  if (typeof result === 'object' && result !== null && 'message' in result) {
    return result as ApiResponseError;
  }
  
  // If API returns an empty array or unexpected format for no results
  if(Array.isArray(result) && result.length === 0) return [];
  
  // Default error if search fails or returns unexpected data
  return { message: `Search for ${type} with query "${query}" failed or returned unexpected data.` };
}

// Helper to check if it's an API error
export function isApiError(data: any): data is ApiResponseError {
  return typeof data === 'object' && data !== null && 'message' in data;
}
