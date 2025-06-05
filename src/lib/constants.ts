
// TEMPORARY: Hardcode API Key to bypass .env requirement.
// Replace 'INVALID_KEY_NEEDS_REPLACEMENT' with your actual RapidAPI key
// if you want the API calls to work. If left as a placeholder, API calls will likely fail (e.g., with a 401 error).
export const API_KEY = 'INVALID_KEY_NEEDS_REPLACEMENT'; 

export const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'movie-database21.p.rapidapi.com';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://movie-database21.p.rapidapi.com';

