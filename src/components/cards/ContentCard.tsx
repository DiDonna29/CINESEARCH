import Image from 'next/image';
import Link from 'next/link';
import type { ContentItem } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import StarRating from '@/components/shared/StarRating';
import LikeButton from '@/components/shared/LikeButton';
import { Film, Tv, CalendarDays, Clock, Zap } from 'lucide-react';

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const typeMap = {
    movie: { label: 'Movie', icon: <Film size={14} />, path: 'movies' },
    tvshow: { label: 'TV Show', icon: <Tv size={14} />, path: 'tvshows' },
    anime: { label: 'Anime', icon: <Zap size={14} />, path: 'anime' },
  };

  const { label, icon, path } = typeMap[item.type];
  const detailUrl = `/${path}/${encodeURIComponent(item.id)}`;

  return (
    <Card className="flex flex-col overflow-hidden h-full transform transition-all duration-300 hover:shadow-xl hover:scale-105 fade-in">
      <Link href={detailUrl} className="block group">
        <CardHeader className="p-0 relative">
          <div className="aspect-[2/3] w-full relative">
            <Image
              src={item.imageURL || `https://placehold.co/400x600.png?text=${encodeURIComponent(item.title)}`}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
              data-ai-hint={`${item.type} poster`}
            />
            <div className="absolute top-2 right-2">
              <LikeButton item={item} />
            </div>
             <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4">
               <CardTitle className="text-lg font-bold text-white line-clamp-2 group-hover:text-accent transition-colors">
                {item.title}
              </CardTitle>
            </div>
          </div>
        </CardHeader>
      </Link>
      <CardContent className="p-4 flex-grow">
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mb-2">
          {icon}
          <span>{label}</span>
          {item.year && (
            <>
              <span>•</span>
              <CalendarDays size={14} />
              <span>{item.year}</span>
            </>
          )}
        </div>
        
        {item.description && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {item.description}
          </p>
        )}

        {item.genre && item.genre.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {item.genre.slice(0, 3).map((g) => (
              <Badge key={g} variant="secondary" className="text-xs">{g}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <StarRating rating={item.imdbRating} />
      </CardFooter>
    </Card>
  );
};

export default ContentCard;
