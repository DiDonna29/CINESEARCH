import type { Movie, TVShow, Anime } from './types';

// Helper to generate mock data to reach the 100 threshold per category
const generateItems = <T>(baseItems: any[], type: 'movie' | 'tvshow' | 'anime', count: number): T[] => {
  const items: T[] = [];
  for (let i = 0; i < count; i++) {
    const base = baseItems[i % baseItems.length];
    const id = `${type}-${i + 1}`;
    items.push({
      ...base,
      id,
      title: i < baseItems.length ? base.title : `${base.title} ${Math.floor(i / baseItems.length) + 1}`,
      type
    } as T);
  }
  return items;
};

const baseMovies = [
  { title: "Inception", imdbRating: 8.8, year: "2010", duration: "148 min", genre: ["Action", "Sci-Fi"], description: "A thief who steals corporate secrets through the use of dream-sharing technology.", imageURL: "https://picsum.photos/seed/m1/400/600" },
  { title: "The Dark Knight", imdbRating: 9.0, year: "2008", duration: "152 min", genre: ["Action", "Crime"], description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.", imageURL: "https://picsum.photos/seed/m2/400/600" },
  { title: "Interstellar", imdbRating: 8.7, year: "2014", duration: "169 min", genre: ["Adventure", "Drama"], description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", imageURL: "https://picsum.photos/seed/m3/400/600" },
  { title: "Pulp Fiction", imdbRating: 8.9, year: "1994", duration: "154 min", genre: ["Crime", "Drama"], description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence.", imageURL: "https://picsum.photos/seed/m4/400/600" },
  { title: "The Matrix", imdbRating: 8.7, year: "1999", duration: "136 min", genre: ["Action", "Sci-Fi"], description: "A computer hacker learns from mysterious rebels about the true nature of his reality.", imageURL: "https://picsum.photos/seed/m5/400/600" }
];

const baseTVShows = [
  { title: "Breaking Bad", imdbRating: 9.5, year: "2008-2013", duration: "45 min", genre: ["Crime", "Drama"], description: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing methamphetamine.", imageURL: "https://picsum.photos/seed/t1/400/600" },
  { title: "Stranger Things", imdbRating: 8.7, year: "2016-", duration: "50 min", genre: ["Drama", "Fantasy"], description: "When a young boy disappears, his mother, a police chief and his friends must confront terrifying supernatural forces.", imageURL: "https://picsum.photos/seed/t2/400/600" },
  { title: "The Office", imdbRating: 9.0, year: "2005-2013", duration: "22 min", genre: ["Comedy"], description: "A mockumentary on a group of typical office workers.", imageURL: "https://picsum.photos/seed/t3/400/600" },
  { title: "Succession", imdbRating: 8.9, year: "2018-2023", duration: "60 min", genre: ["Drama"], description: "The Logan family is known for controlling the biggest media and entertainment company in the world.", imageURL: "https://picsum.photos/seed/t4/400/600" },
  { title: "The Bear", imdbRating: 8.6, year: "2022-", duration: "30 min", genre: ["Drama", "Comedy"], description: "A young chef from the fine dining world comes home to Chicago to run his family sandwich shop.", imageURL: "https://picsum.photos/seed/t5/400/600" }
];

const baseAnime = [
  { title: "Attack on Titan", imdbRating: 9.1, year: "2013-2023", duration: "24 min", genre: ["Action", "Fantasy"], description: "After his hometown is destroyed and his mother is killed, young Eren Jaeger vows to cleanse the earth of the giant humanoid Titans.", imageURL: "https://picsum.photos/seed/a1/400/600" },
  { title: "Fullmetal Alchemist: Brotherhood", imdbRating: 9.1, year: "2009-2010", duration: "24 min", genre: ["Action", "Adventure"], description: "Two brothers search for a Philosopher's Stone after an attempt to revive their deceased mother goes wrong.", imageURL: "https://picsum.photos/seed/a2/400/600" },
  { title: "Death Note", imdbRating: 9.0, year: "2006-2007", duration: "24 min", genre: ["Mystery", "Thriller"], description: "An intelligent high school student goes on a secret crusade to eliminate criminals from the world.", imageURL: "https://picsum.photos/seed/a3/400/600" },
  { title: "Spirited Away", imdbRating: 8.6, year: "2001", duration: "125 min", genre: ["Animation", "Adventure"], description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits.", imageURL: "https://picsum.photos/seed/a4/400/600" },
  { title: "One Piece", imdbRating: 8.9, year: "1999-", duration: "24 min", genre: ["Action", "Adventure"], description: "Follows the adventures of Monkey D. Luffy and his pirate crew in order to find the greatest treasure.", imageURL: "https://picsum.photos/seed/a5/400/600" }
];

export const mockMovies: Movie[] = generateItems<Movie>(baseMovies, 'movie', 100);
export const mockTVShows: TVShow[] = generateItems<TVShow>(baseTVShows, 'tvshow', 100);
export const mockAnime: Anime[] = generateItems<Anime>(baseAnime, 'anime', 100);

export const allMockData = [...mockMovies, ...mockTVShows, ...mockAnime];
