import { getAnimeByTitle, isApiError } from '@/lib/api';
import type { Anime } from '@/lib/types';
import ContentDetailDisplay from '@/components/details/ContentDetailDisplay';
import BackButton from '@/components/shared/BackButton';
import ErrorDisplay from '@/components/shared/ErrorDisplay';

export const dynamic = 'force-dynamic';

interface AnimeDetailPageProps {
  params: Promise<{ title: string }>;
}

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const { title } = await params;
  const animeData = await getAnimeByTitle(title);

  if (isApiError(animeData)) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <ErrorDisplay message={animeData.message} context={`anime "${decodeURIComponent(title)}"`} />
      </div>
    );
  }

  const anime = animeData as Anime | null;

  if (!anime) {
    return (
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        <ErrorDisplay message={`Anime "${decodeURIComponent(title)}" not found.`} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />
      <ContentDetailDisplay item={anime} />
    </div>
  );
}

export async function generateMetadata({ params }: AnimeDetailPageProps) {
  const { title } = await params;
  const anime = await getAnimeByTitle(title);
  if (isApiError(anime) || !anime) {
    return { title: 'Anime Not Found' }
  }
  return {
    title: `${anime.title} | CineSearch`,
    description: anime.description || `Details for ${anime.title}`,
  }
}
