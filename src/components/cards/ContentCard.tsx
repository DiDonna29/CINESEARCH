'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ContentItem } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/shared/StarRating';
import LikeButton from '@/components/shared/LikeButton';
import { Film, Tv, CalendarDays, Zap } from 'lucide-react';

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const [imgSrc, setImgSrc] = useState(item.imageURL || '');
  const [isError, setIsError] = useState(false);

  const typeMap = {
    movie: { label: 'Movie', icon: <Film size={14} />, path: 'movies' },
    tvshow: { label: 'TV Show', icon: <Tv size={14} />, path: 'tvshows' },
    anime: { label: 'Anime', icon: <Zap size={14} />, path: 'anime' },
  };

  const { label, icon, path } = typeMap[item.type];
  const detailUrl = `/${path}/${encodeURIComponent(item.id)}`;

  const fallbackImage = `https://placehold.co/400x600.png?text=${encodeURIComponent(item.title)}`;

  return (
    <Card className="flex flex-col overflow-hidden h-full transform transition-all duration-300 hover:shadow-xl hover:scale-105 fade-in border-muted bg-card">
      <Link href={detailUrl} className="block group">
        <CardHeader className="p-0 relative">
          <div className="aspect-[2/3] w-full relative bg-muted">
            <Image
              src={isError || !imgSrc ? fallbackImage : imgSrc}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              onError={() => setIsError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 20vw"
            />
            <div className="absolute top-2 right-2 z-10">
              <LikeButton item={item} />
            </div>
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
               <CardTitle className="text-lg font-bold text-white line-clamp-1 group-hover:text-accent transition-colors">
                {item.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow space-y-2">
        <div className="flex items-center space-x-2 text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
          {icon}
          <span>{label}</span>
          {item.year && (
            <>
              <span>•</span>
              <CalendarDays size={12} />
              <span>{item.year}</span>
            </>
          )}
        </div>
        
        {item.description && (
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        )}

        {item.genre && item.genre.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {item.genre.slice(0, 2).map((g) => (
              <Badge key={g} variant="secondary" className="text-[10px] px-1.5 py-0 h-4">{g}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <StarRating rating={item.imdbRating} size={14} />
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
