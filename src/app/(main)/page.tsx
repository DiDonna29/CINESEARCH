import { getMovies, isApiError } from '@/lib/api';
import type { Movie } from '@/lib/types';
import ContentCard from '@/components/cards/ContentCard';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
// import { useLanguage } from '@/contexts/LanguageProvider'; // Not needed on server component

export const dynamic = 'force-dynamic'; // Ensure fresh data on each request

// For server component, we cannot use useLanguage hook directly.
// We'd need to pass language from params or headers if internationalization is server-rendered.
// For now, text will be default 'en' or as per client-side LanguageProvider for client components.

export default async function HomePage() {
  const moviesData = await getMovies();

  if (isApiError(moviesData)) {
    // Cannot use useLanguage hook here. Hardcode or pass lang.
    return <ErrorDisplay message={moviesData.message} context="loading movies" />;
  }
  
  const movies = moviesData as Movie[];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline text-foreground">
        {/* t('movies') would be 'Movies' */} Movies 
      </h1>
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <ContentCard key={movie.id} item={movie} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No movies found.</p> // Replace with t('noMoviesFound')
      )}
    </div>
  );
}
