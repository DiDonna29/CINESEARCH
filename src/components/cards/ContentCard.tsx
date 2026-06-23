'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ContentItem } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/shared/StarRating';
import LikeButton from '@/components/shared/LikeButton';
import { Film, Tv, CalendarDays, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const [isError, setIsError] = useState(false);

  const typeMap = {
    movie: { label: 'Movie', icon: <Film size={12} />, path: 'movies' },
    tvshow: { label: 'TV Show', icon: <Tv size={12} />, path: 'tvshows' },
    anime: { label: 'Anime', icon: <Zap size={12} />, path: 'anime' },
  };

  const { label, icon, path } = typeMap[item.type];
  const detailUrl = `/${path}/${encodeURIComponent(item.id)}`;
  const fallbackImage = `https://placehold.co/400x600.png?text=${encodeURIComponent(item.title)}`;

  return (
    <Card className="group flex flex-col overflow-hidden h-full bg-card border-none shadow-sm hover:shadow-2xl transition-premium relative">
      <Link href={detailUrl} className="relative aspect-[2/3] w-full overflow-hidden">
        <Image
          src={isError || !item.imageURL ? fallbackImage : item.imageURL}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          onError={() => setIsError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
        />
        {/* Overlay con degradado premium */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Acciones rápidas */}
        <div className="absolute top-3 right-3 z-10 scale-90 group-hover:scale-100 transition-transform duration-300">
          <LikeButton item={item} className="bg-background/20 backdrop-blur-md hover:bg-background/40 text-white border-none rounded-full" />
        </div>

        {/* Info flotante al hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <p className="text-white text-xs font-medium flex items-center gap-2">
            {icon} {label}
          </p>
        </div>
      </Link>

      <CardContent className="p-4 flex-grow space-y-3 bg-card">
        <h3 className="text-sm font-bold leading-tight line-clamp-2 break-safe min-h-[2.5rem] group-hover:text-accent transition-colors duration-300">
          {item.title}
        </h3>
        
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground font-medium">
          {item.year && (
            <span className="flex items-center gap-1">
              <CalendarDays size={12} /> {item.year}
            </span>
          )}
          {item.genre && item.genre.length > 0 && (
            <span className="content-contain max-w-[100px] bg-secondary/50 px-2 py-0.5 rounded-sm">
              {item.genre[0]}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-4 pb-4 pt-0 bg-card">
        <div className="w-full flex items-center justify-between gap-2 overflow-hidden">
          <StarRating rating={item.imdbRating} size={14} />
          {item.imdbRating && item.imdbRating > 0 && (
            <span className="text-[10px] font-bold bg-accent/10 text-accent px-1.5 py-0.5 rounded shrink-0">
              {item.imdbRating.toFixed(1)}
            </span>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContentCard;