import { getAnime, isApiError } from '@/lib/api';
import type { Anime, PaginatedResponse } from '@/lib/types';
import ContentCard from '@/components/cards/ContentCard';
import ErrorDisplay from '@/components/shared/ErrorDisplay';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

interface AnimePageProps {
  searchParams: Promise<{ page?: string }>;
}

export default async function AnimePage({ searchParams }: AnimePageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1', 10);
  const limit = 10;

  const animeData = await getAnime(page, limit);

  if (isApiError(animeData)) {
    return <ErrorDisplay message={animeData.message} context="loading anime" />;
  }
  
  const { data: animes, totalPages, currentPage } = animeData as PaginatedResponse<Anime>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline text-foreground">
          Anime
        </h1>
      </div>

      {animes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {animes.map((anime) => (
            <ContentCard key={anime.id} item={anime} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No anime found.</p>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-4 py-8">
          <Link href={`/anime?page=${currentPage - 1}`} className={currentPage <= 1 ? "pointer-events-none" : ""}>
            <Button variant="outline" disabled={currentPage <= 1}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          </Link>
          
          <span className="text-sm font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <Link href={`/anime?page=${currentPage + 1}`} className={currentPage >= totalPages ? "pointer-events-none" : ""}>
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
