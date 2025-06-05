
import type { Movie, TVShow, ContentItem, ApiResponseError } from './types';
// We are no longer using these for fetching, but keep them if you want to switch back
// import { API_BASE_URL, API_HOST, API_KEY } from './constants'; 
import { mockMovies } from './mock-data'; // Import mock data

// const RAPIDAPI_HEADERS = {
//   'x-rapidapi-host': API_HOST,
//   'x-rapidapi-key': API_KEY,
// };

// This function is no longer used for actual fetching if using mock data
// async function fetchData<T>(endpoint: string): Promise<T | ApiResponseError> {
//   try {
//     if (!API_KEY || API_KEY === 'INVALID_KEY_NEEDS_REPLACEMENT') {
//       const keyMissingMessage = 'API Key is missing or is a placeholder. Please set your actual NEXT_PUBLIC_RAPIDAPI_KEY in your .env file (and restart the server) or update it directly in src/lib/constants.ts if using the temporary hardcoded method.';
//       console.error(keyMissingMessage + ` Attempted to call endpoint: ${endpoint}`);
//       return { message: keyMissingMessage };
//     }

//     const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//       method: 'GET',
//       headers: RAPIDAPI_HEADERS,
//     });

//     if (!response.ok) {
//       let userFriendlyMessage: string;
//       let detailedConsoleMessage: string;

//       if (response.status === 401) {
//         detailedConsoleMessage = `API Error (401): Unauthorized. Endpoint: ${endpoint}. This usually means the API key (NEXT_PUBLIC_RAPIDAPI_KEY) is invalid, not subscribed to the API plan, or not provided correctly in the request headers.`;
//         userFriendlyMessage = `Authorization failed (Error 401). Please check if the API key is correctly configured and you are subscribed to a plan for this API on RapidAPI. If you are the developer, ensure your API Key (e.g. in .env or src/lib/constants.ts) is valid and the server was restarted if using .env.`;
//       } else if (response.status === 429) {
//         detailedConsoleMessage = `API Rate Limit Exceeded (Error 429). Endpoint: ${endpoint}. You have made too many requests. Check your RapidAPI plan or wait before trying again (RapidAPI status text: ${response.statusText}).`;
//         userFriendlyMessage = `API Rate Limit Exceeded (Error 429). You've made too many requests, often due to free plan limits. Please wait a while before trying again, or check your API plan limits on RapidAPI.`;
//       } else {
//         detailedConsoleMessage = `API Error (${response.status}): ${response.statusText} for endpoint ${endpoint}.`;
//         userFriendlyMessage = `An error occurred while fetching data (status ${response.status}). Please try again later.`;
//       }
      
//       console.error(detailedConsoleMessage); 

//       try {
//         const errorData = await response.json();
//         if (errorData && errorData.message) {
//            if (response.status === 401) {
//               userFriendlyMessage = `Authorization failed: ${errorData.message}. Please verify your API key configuration and subscription.`;
//            } else if (response.status === 429 && errorData.message) {
//               userFriendlyMessage = `API Rate Limit Exceeded: ${errorData.message}. Please wait or check your API plan.`;
//            } else {
//               userFriendlyMessage = errorData.message;
//            }
//         }
//       } catch (e) {
//         console.warn(`Could not parse JSON from error response for endpoint ${endpoint}:`, e);
//       }
//       return { message: userFriendlyMessage };
//     }

//     const data = await response.json();
//     if (Array.isArray(data)) {
//       return data.map(item => ({ ...item, id: item.title })) as T;
//     }
//     if (typeof data === 'object' && data !== null && data.title) {
//         return { ...data, id: data.title } as T;
//     }
//     return data as T;

//   } catch (error) {
//     console.error('Network or other error in fetchData:', error);
//     const networkErrorMessage = error instanceof Error ? error.message : 'An unknown network error occurred.';
//     return { message: `Network error: ${networkErrorMessage}. Please check your internet connection and the API endpoint configuration.` };
//   }
// }

export async function getMovies(page: number = 1): Promise<Movie[] | ApiResponseError> {
  // Simulate pagination if needed, or just return all mock movies
  // For simplicity, returning all mock movies regardless of page for now
  console.log("Using mock data for getMovies. Page:", page);
  // Ensure all items have 'type' and 'id'. The mock data should already have this.
  return mockMovies.map(movie => ({ ...movie, type: 'movie' as 'movie' }));
}

export async function getTVShows(page: number = 1): Promise<TVShow[] | ApiResponseError> {
  console.log("Using mock data for getTVShows (returning empty). Page:", page);
  // No mock TV show data provided, so return empty array or an error/message
  return []; 
  // Or: return { message: "TV Show data is not available in mock mode." };
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
  // No mock TV show data, so always return null or an error
  return null;
  // Or: return { message: `TV Show "${decodedTitle}" not found in mock data.` };
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
    // No mock TV show data
    return [];
  }
  
  return { message: `Search type "${type}" not supported in mock mode or no data available.` };
}

export function isApiError(data: any): data is ApiResponseError {
  return typeof data === 'object' && data !== null && 'message' in data;
}

    