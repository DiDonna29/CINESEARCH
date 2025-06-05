import { searchContent, isApiError } from '@/lib/api';
import type { ContentItem } from '@/lib/types';
import ContentCard from '@/components/cards/ContentCard';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface SearchPageProps {
  searchParams: { q?: string };
}

export const dynamic = 'force-dynamic';

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';

  if (!query) {
    return (
      <div className="text-center py-10">
        <h1 className="text-2xl font-semibold text-foreground mb-4">
          {/* t('searchPlaceholder') */} Please enter a search term.
        </h1>
      </div>
    );
  }

  const moviesPromise = searchContent(query, 'movie');
  const tvShowsPromise = searchContent(query, 'tvshow');

  const [moviesData, tvShowsData] = await Promise.all([moviesPromise, tvShowsPromise]);

  const movies = !isApiError(moviesData) ? (moviesData as ContentItem[]) : [];
  const tvShows = !isApiError(tvShowsData) ? (tvShowsData as ContentItem[]) : [];
  
  const movieError = isApiError(moviesData) ? moviesData.message : null;
  const tvShowError = isApiError(tvShowsData) ? tvShowsData.message : null;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline text-foreground">
        {/* t('searchResultsFor') */} Search Results for: <span className="text-accent">{decodeURIComponent(query)}</span>
      </h1>

      {movieError && <ErrorDisplay message={movieError} context={`searching movies for "${decodeURIComponent(query)}"`} />}
      {tvShowError && <ErrorDisplay message={tvShowError} context={`searching TV shows for "${decodeURIComponent(query)}"`} />}
      
      {(movies.length === 0 && tvShows.length === 0 && !movieError && !tvShowError) && (
        <p className="text-muted-foreground text-center py-10 text-xl">
            {/* t('noResultsFound') */} No results found for "{decodeURIComponent(query)}".
        </p>
      )}

      <Tabs defaultValue="movies" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="movies" disabled={movies.length === 0 && !movieError}>
            {/* t('movies') */} Movies ({movies.length})
          </TabsTrigger>
          <TabsTrigger value="tvshows" disabled={tvShows.length === 0 && !tvShowError}>
            {/* t('tvShows') */} TV Shows ({tvShows.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="movies">
          {movies.length > 0 && !movieError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
              {movies.map((item) => (
                <ContentCard key={`${item.id}-movie`} item={item} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="tvshows">
           {tvShows.length > 0 && !tvShowError && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
              {tvShows.map((item) => (
                <ContentCard key={`${item.id}-tvshow`} item={item} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  return {
    title: query ? `Search: ${decodeURIComponent(query)} | CineSearch` : 'Search | CineSearch',
  }
}
