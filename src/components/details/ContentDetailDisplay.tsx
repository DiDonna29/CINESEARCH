'use client';

import Image from 'next/image';
import type { ContentItem } from '@/lib/types';
import StarRating from '@/components/shared/StarRating';
import LikeButton from '@/components/shared/LikeButton';
import RecommendationSection from '@/components/ai/RecommendationSection';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useLanguage } from '@/contexts/LanguageProvider';
import { CalendarDays, Clock, Users, Globe as GlobeIcon, Tv, Film, Info } from 'lucide-react';

interface ContentDetailDisplayProps {
  item: ContentItem;
}

const ContentDetailDisplay: React.FC<ContentDetailDisplayProps> = ({ item }) => {
  const { t } = useLanguage();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const descriptionWords = item.description?.split(' ').length || 0;
  const shortDescriptionLength = 50; // Number of words for short description

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const currentDescription = item.description 
    ? (showFullDescription || descriptionWords <= shortDescriptionLength 
        ? item.description 
        : item.description.split(' ').slice(0, shortDescriptionLength).join(' ') + '...')
    : t('noDescription');

  return (
    <div className="space-y-8 fade-in">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-1">
          <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src={item.imageURL || `https://placehold.co/600x900.png?text=${encodeURIComponent(item.title)}`}
              alt={item.title}
              layout="fill"
              objectFit="cover"
              priority
              data-ai-hint={`${item.type} poster large`}
            />
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
            <h1 className="text-4xl font-bold font-headline text-foreground mb-2 sm:mb-0">{item.title}</h1>
            <div className="flex-shrink-0 mt-2 sm:mt-0">
              <LikeButton item={item} className="w-10 h-10 [&_svg]:w-6 [&_svg]:h-6" />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground">
            <div className="flex items-center">
              {item.type === 'movie' ? <Film className="mr-1.5 h-4 w-4" /> : <Tv className="mr-1.5 h-4 w-4" />}
              <span>{item.type === 'movie' ? t('movies') : t('tvShows')}</span>
            </div>
            {item.year && (
              <div className="flex items-center">
                <CalendarDays className="mr-1.5 h-4 w-4" />
                <span>{item.year}</span>
              </div>
            )}
            {item.duration && (
              <div className="flex items-center">
                <Clock className="mr-1.5 h-4 w-4" />
                <span>{item.duration}</span>
              </div>
            )}
          </div>

          {item.imdbRating !== undefined && <StarRating rating={item.imdbRating} size={24} />}
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-xl font-semibold text-foreground hover:no-underline">
                <div className="flex items-center">
                   <Info className="mr-2 h-5 w-5"/> {t('description')}
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-foreground/80 leading-relaxed">
                <p>{currentDescription}</p>
                {item.description && descriptionWords > shortDescriptionLength && (
                  <Button variant="link" onClick={toggleDescription} className="px-0 text-accent">
                    {showFullDescription ? t('showLess') : t('showMore')}
                  </Button>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {item.genre && item.genre.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center"><Tag className="mr-2 h-5 w-5"/>{t('genre')}</h2>
              <div className="flex flex-wrap gap-2">
                {item.genre.map(g => <Badge key={g} variant="default">{g}</Badge>)}
              </div>
            </div>
          )}

          {item.stars && item.stars.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center"><Users className="mr-2 h-5 w-5"/>{t('actors')}</h2>
              <p className="text-foreground/80">{item.stars.slice(0, 5).join(', ')}{item.stars.length > 5 ? '...' : ''}</p>
            </div>
          )}

          {item.country && item.country.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2 flex items-center"><GlobeIcon className="mr-2 h-5 w-5"/>{t('country')}</h2>
              <p className="text-foreground/80">{item.country.join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      {item.description && <RecommendationSection description={item.description} currentItemId={item.id} />}
    </div>
  );
};
// Need to add useState to this client component
ContentDetailDisplay.displayName = 'ContentDetailDisplay'; // For ESLint
import { useState } from 'react'; // Add this line
export default ContentDetailDisplay;

