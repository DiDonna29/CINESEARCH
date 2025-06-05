import { getTVShows, isApiError } from '@/lib/api';
import type { TVShow } from '@/lib/types';
import ContentCard from '@/components/cards/ContentCard';
import ErrorDisplay from '@/components/shared/ErrorDisplay';

export const dynamic = 'force-dynamic';

export default async function TVShowsPage() {
  const tvShowsData = await getTVShows();

  if (isApiError(tvShowsData)) {
    return <ErrorDisplay message={tvShowsData.message} context="loading TV shows" />;
  }

  const tvShows = tvShowsData as TVShow[];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-headline text-foreground">
        TV Shows {/* Replace with t('tvShows') */}
      </h1>
      {tvShows.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {tvShows.map((tvShow) => (
            <ContentCard key={tvShow.id} item={tvShow} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No TV shows found.</p> // Replace with t('noTVShowsFound')
      )}
    </div>
  );
}
