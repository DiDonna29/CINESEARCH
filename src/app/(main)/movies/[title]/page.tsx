import { getMovieByTitle, isApiError } from '@/lib/api';
import type { Movie } from '@/lib/types';
import ContentDetailDisplay from '@/components/details/ContentDetailDisplay';
import BackButton from '@/components/shared/BackButton';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import LoadingSpinner from '@/components/shared/LoadingSpinner';

export const dynamic = 'force-dynamic';

interface MovieDetailPageProps {
  params: { title: string };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { title } = params;
  const movieData = await getMovieByTitle(title);

  if (isApiError(movieData)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <ErrorDisplay message={movieData.message} context={`movie "${decodeURIComponent(title)}"`} />
      </div>
    );
  }

  const movie = movieData as Movie | null;

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <ErrorDisplay message={`Movie "${decodeURIComponent(title)}" not found.`} />
      </div>
    );
  }
  
  // Example of how one might provide loading state if data fetching was client-side or took longer
  // if (typeof window !== 'undefined' && !movie) return <LoadingSpinner />;


  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <ContentDetailDisplay item={movie} />
    </div>
  );
}

// Optional: Generate static paths if you have a known list of movies
// export async function generateStaticParams() {
//   const moviesData = await getMovies(); // Fetch first page for popular movies
//   if (isApiError(moviesData) || !Array.isArray(moviesData)) return [];
//   return moviesData.slice(0, 10).map((movie: Movie) => ({ // Limit for build time
//     title: encodeURIComponent(movie.title),
//   }));
// }

export async function generateMetadata({ params }: MovieDetailPageProps) {
  const movie = await getMovieByTitle(params.title);
  if (isApiError(movie) || !movie) {
    return { title: 'Movie Not Found' }
  }
  return {
    title: `${movie.title} | CineSearch`,
    description: movie.description || `Details for ${movie.title}`,
  }
}
