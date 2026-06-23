'use client';

import { useState } from 'react';
import { recommendContent, type RecommendContentInput, type RecommendContentOutput } from '@/ai/flows/recommend-content';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { Wand2, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageProvider';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface RecommendationSectionProps {
  description: string;
  currentItemId: string; // To avoid recommending the item itself
}

const RecommendationSection: React.FC<RecommendationSectionProps> = ({ description, currentItemId }) => {
  const { t } = useLanguage();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const input: RecommendContentInput = { description };
      const output: RecommendContentOutput = await recommendContent(input);
      // Filter out the current item from recommendations if present by title (ID)
      setRecommendations(output.recommendations.filter(rec => rec.toLowerCase() !== currentItemId.toLowerCase()));
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(err instanceof Error ? err.message : t('errorOccurred'));
    }
    setIsLoading(false);
  };

  return (
    <Card className="mt-8 bg-card/50 shadow-lg border-none">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl font-bold font-headline text-foreground">
          <Wand2 className="mr-2 h-6 w-6 text-accent" />
          {t('recommendations')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <LoadingSpinner text={t('loadingRecommendations')} />}
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>{t('errorOccurred')}</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {!isLoading && !error && recommendations.length > 0 && (
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="p-3 bg-secondary/30 rounded-md hover:bg-secondary/50 transition-premium">
                <Link href={`/search?q=${encodeURIComponent(rec)}`} className="text-foreground hover:text-accent font-semibold">
                  {rec}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {!isLoading && !error && recommendations.length === 0 && (
          <p className="text-muted-foreground">{t('noRecommendations')}</p>
        )}
        {!isLoading && (
           <Button onClick={fetchRecommendations} className="mt-4 bg-accent hover:bg-accent/90 text-accent-foreground font-bold rounded-full px-6 transition-premium">
            <Wand2 className="mr-2 h-4 w-4" />
            {t('getRecommendations')}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationSection;