import { getMovieByTitle, isApiError } from '@/lib/api';
import type { Movie } from '@/lib/types';
import ContentDetailDisplay from '@/components/details/ContentDetailDisplay';
import BackButton from '@/components/shared/BackButton';
import ErrorDisplay from '@/components/shared/ErrorDisplay';

export const dynamic = 'force-dynamic';

interface MovieDetailPageProps {
  params: Promise<{ title: string }>;
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  const { title } = await params;
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

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <ContentDetailDisplay item={movie} />
    </div>
  );
}

export async function generateMetadata({ params }: MovieDetailPageProps) {
  const { title } = await params;
  const movie = await getMovieByTitle(title);
  if (isApiError(movie) || !movie) {
    return { title: 'Movie Not Found' }
  }
  return {
    title: `${movie.title} | CineSearch`,
    description: movie.description || `Details for ${movie.title}`,
  }
}
