export interface ContentItem {
  id: string; // Using title as ID for now
  title: string;
  imdbRating?: number;
  year?: string;
  duration?: string;
  description?: string;
  genre?: string[];
  country?: string[];
  stars?: string[];
  imageURL?: string;
  type: 'movie' | 'tvshow';
}

// More specific types if needed, but ContentItem can be base
export interface Movie extends ContentItem {
  type: 'movie';
}

export interface TVShow extends ContentItem {
  type: 'tvshow';
  // TVShow specific fields if any, e.g. seasons, episodes
}

export interface ApiResponseError {
  message: string;
}
