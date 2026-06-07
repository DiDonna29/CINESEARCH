export interface ContentItem {
  id: string;
  title: string;
  imdbRating?: number;
  year?: string;
  duration?: string;
  description?: string;
  genre?: string[];
  country?: string[];
  stars?: string[];
  imageURL?: string;
  type: 'movie' | 'tvshow' | 'anime';
}

export interface Movie extends ContentItem {
  type: 'movie';
}

export interface TVShow extends ContentItem {
  type: 'tvshow';
}

export interface Anime extends ContentItem {
  type: 'anime';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  totalPages: number;
  currentPage: number;
}

export interface ApiResponseError {
  message: string;
}
