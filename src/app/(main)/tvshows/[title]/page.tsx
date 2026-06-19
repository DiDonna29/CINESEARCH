import { getTVShowByTitle, isApiError } from '@/lib/api';
import type { TVShow } from '@/lib/types';
import ContentDetailDisplay from '@/components/details/ContentDetailDisplay';
import BackButton from '@/components/shared/BackButton';
import ErrorDisplay from '@/components/shared/ErrorDisplay';

export const dynamic = 'force-dynamic';

interface TVShowDetailPageProps {
  params: Promise<{ title: string }>;
}

export default async function TVShowDetailPage({ params }: TVShowDetailPageProps) {
  const { title } = await params;
  const tvShowData = await getTVShowByTitle(title);

  if (isApiError(tvShowData)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <ErrorDisplay message={tvShowData.message} context={`TV show "${decodeURIComponent(title)}"`} />
      </div>
    );
  }
  
  const tvShow = tvShowData as TVShow | null;

  if (!tvShow) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <ErrorDisplay message={`TV Show "${decodeURIComponent(title)}" not found.`} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <ContentDetailDisplay item={tvShow} />
    </div>
  );
}

export async function generateMetadata({ params }: TVShowDetailPageProps) {
  const { title } = await params;
  const tvShow = await getTVShowByTitle(title);
  if (isApiError(tvShow) || !tvShow) {
    return { title: 'TV Show Not Found' }
  }
  return {
    title: `${tvShow.title} | CineSearch`,
    description: tvShow.description || `Details for ${tvShow.title}`,
  }
}
