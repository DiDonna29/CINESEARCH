import { searchContent, isApiError } from '@/lib/api';
import type { ContentItem } from '@/lib/types';
import ContentCard from '@/components/cards/ContentCard';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q: query } = await searchParams;

  if (!query) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold text-foreground mb-4">
          Please enter a search term.
        </h1>
      </div>
    );
  }

  const moviesPromise = searchContent(query, 'movie');
  const tvShowsPromise = searchContent(query, 'tvshow');
  const animePromise = searchContent(query, 'anime');

  const [moviesData, tvShowsData, animeData] = await Promise.all([
    moviesPromise, 
    tvShowsPromise,
    animePromise
  ]);

  const movies = !isApiError(moviesData) ? (moviesData as ContentItem[]) : [];
  const tvShows = !isApiError(tvShowsData) ? (tvShowsData as ContentItem[]) : [];
  const anime = !isApiError(animeData) ? (animeData as ContentItem[]) : [];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline text-foreground">
        Search Results for: <span className="text-accent">{decodeURIComponent(query)}</span>
      </h1>

      <Tabs defaultValue="movies" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="movies">Movies ({movies.length})</TabsTrigger>
          <TabsTrigger value="tvshows">TV Shows ({tvShows.length})</TabsTrigger>
          <TabsTrigger value="anime">Anime ({anime.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="movies">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            {movies.map((item) => <ContentCard key={item.id} item={item} />)}
          </div>
          {movies.length === 0 && <p className="text-center py-10 text-muted-foreground">No movies found.</p>}
        </TabsContent>
        <TabsContent value="tvshows">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            {tvShows.map((item) => <ContentCard key={item.id} item={item} />)}
          </div>
          {tvShows.length === 0 && <p className="text-center py-10 text-muted-foreground">No TV shows found.</p>}
        </TabsContent>
        <TabsContent value="anime">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            {anime.map((item) => <ContentCard key={item.id} item={item} />)}
          </div>
          {anime.length === 0 && <p className="text-center py-10 text-muted-foreground">No anime found.</p>}
        </TabsContent>
      </Tabs>
    </div>
  );
}
