
const apiKeyFromEnv = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
console.log('DEBUG: Value of process.env.NEXT_PUBLIC_RAPIDAPI_KEY in constants.ts:', apiKeyFromEnv);

export const API_HOST = process.env.NEXT_PUBLIC_RAPIDAPI_HOST || 'movie-database21.p.rapidapi.com';
export const API_KEY = apiKeyFromEnv || '';
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://movie-database21.p.rapidapi.com';
