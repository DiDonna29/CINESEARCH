import { getMovies, isApiError } from '@/lib/api';
import type { Movie, PaginatedResponse } from '@/lib/types';
import ContentCard from '@/components/cards/ContentCard';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface HomePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const limit = 10;

  const moviesData = await getMovies(page, limit);

  if (isApiError(moviesData)) {
    return <ErrorDisplay message={moviesData.message} context="loading movies" />;
  }
  
  const { data: movies, totalPages, currentPage } = moviesData as PaginatedResponse<Movie>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline text-foreground">
          Movies
        </h1>
      </div>

      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <ContentCard key={movie.id} item={movie} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No movies found.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 py-8">
          <Link href={`/?page=${currentPage - 1}`} className={currentPage <= 1 ? "pointer-events-none" : ""}>
            <Button variant="outline" disabled={currentPage <= 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          </Link>
          
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <Link href={`/?page=${currentPage + 1}`} className={currentPage >= totalPages ? "pointer-events-none" : ""}>
            <Button variant="outline" disabled={currentPage >= totalPages}>
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
