
import type { Movie, TVShow, ContentItem, ApiResponseError } from './types';
import { API_BASE_URL, API_HOST, API_KEY } from './constants';

const RAPIDAPI_HEADERS = {
  'x-rapidapi-host': API_HOST,
  'x-rapidapi-key': API_KEY,
};

async function fetchData<T>(endpoint: string): Promise<T | ApiResponseError> {
  try {
    // Early check if API_KEY is missing or is the placeholder
    if (!API_KEY || API_KEY === 'PASTE_YOUR_KEY_HERE_OR_USE_A_PLACEHOLDER') {
      const keyMissingMessage = 'API Key is missing or is a placeholder. Please set your actual NEXT_PUBLIC_RAPIDAPI_KEY in your .env file (and restart the server) or update it directly in src/lib/constants.ts if using the temporary hardcoded method.';
      console.error(keyMissingMessage + ` Attempted to call endpoint: ${endpoint}`);
      return { message: keyMissingMessage };
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'GET',
      headers: RAPIDAPI_HEADERS,
    });

    if (!response.ok) {
      let userFriendlyMessage: string;
      let detailedConsoleMessage: string;

      if (response.status === 401) {
        detailedConsoleMessage = `API Error (401): Unauthorized. Endpoint: ${endpoint}. This usually means the API key (NEXT_PUBLIC_RAPIDAPI_KEY) is invalid, missing permissions, or not provided correctly in the request headers.`;
        userFriendlyMessage = `Authorization failed (Error 401). Please check if the API key is correctly configured. If you are the developer, ensure your API Key (e.g. in .env or src/lib/constants.ts) is valid and the server was restarted if using .env.`;
      } else if (response.status === 429) {
        detailedConsoleMessage = `API Error (429): Too Many Requests. Endpoint: ${endpoint}. You have exceeded the API rate limit.`;
        userFriendlyMessage = `Too many requests to the API (Error 429). You might be on a free plan with limited calls. Please wait a while before trying again, or check your API plan limits on RapidAPI.`;
      } else {
        detailedConsoleMessage = `API Error (${response.status}): ${response.statusText} for endpoint ${endpoint}`;
        userFriendlyMessage = `An error occurred while fetching data (status ${response.status}). Please try again later.`;
      }
      
      console.error(detailedConsoleMessage); // Log detailed message for developers

      try {
        // Attempt to parse a more specific error message from the API response body
        const errorData = await response.json();
        if (errorData && errorData.message) {
           if (response.status === 401) {
              // Prepend guidance for 401 if API provides a specific message
              userFriendlyMessage = `Authorization failed: ${errorData.message}. Please verify your API key configuration.`;
           } else if (response.status === 429 && errorData.message) {
              userFriendlyMessage = `Too many requests: ${errorData.message}. Please wait or check your API plan.`;
           } else {
              userFriendlyMessage = errorData.message; // Use API's error message
           }
        }
      } catch (e) {
        // Parsing error, stick with the previously constructed userFriendlyMessage
        console.warn(`Could not parse JSON from error response for endpoint ${endpoint}:`, e);
      }
      return { message: userFriendlyMessage };
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
    const networkErrorMessage = error instanceof Error ? error.message : 'An unknown network error occurred.';
    return { message: `Network error: ${networkErrorMessage}. Please check your internet connection and the API endpoint configuration.` };
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
