'use client';

import ContentCard from '@/components/cards/ContentCard';
import { useLikes } from '@/contexts/LikesProvider';
import { useLanguage } from '@/contexts/LanguageProvider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart } from 'lucide-react';

export default function ProfilePage() {
  const { likedItems } = useLikes();
  const { t } = useLanguage();

  const likedMovies = likedItems.filter(item => item.type === 'movie');
  const likedTVShows = likedItems.filter(item => item.type === 'tvshow');

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-3">
        <Heart className="h-8 w-8 text-accent" />
        <h1 className="text-3xl font-bold font-headline text-foreground">{t('likedContent')}</h1>
      </div>

      {likedItems.length === 0 ? (
        <p className="text-muted-foreground text-center py-10 text-xl">{t('noLikedContent')}</p>
      ) : (
        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="movies" disabled={likedMovies.length === 0}>
              {t('movies')} ({likedMovies.length})
            </TabsTrigger>
            <TabsTrigger value="tvshows" disabled={likedTVShows.length === 0}>
              {t('tvShows')} ({likedTVShows.length})
            </TabsTrigger>
          </TabsList>
          <TabsContent value="movies">
            {likedMovies.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                {likedMovies.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-6">{t('noLikedContent')} {t('movies').toLowerCase()}.</p>
            )}
          </TabsContent>
          <TabsContent value="tvshows">
            {likedTVShows.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
                {likedTVShows.map((item) => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>
            ) : (
               <p className="text-muted-foreground text-center py-6">{t('noLikedContent')} {t('tvShows').toLowerCase()}.</p>
            )}
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
