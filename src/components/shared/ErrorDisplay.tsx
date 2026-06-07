'use client';

import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageProvider';

interface ErrorDisplayProps {
  message?: string;
  context?: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, context }) => {
  const { t } = useLanguage();
  const displayMessage = message || t('errorOccurred');
  
  return (
    <Card className="border-destructive bg-destructive/10 my-8">
      <CardHeader>
        <CardTitle className="flex items-center text-destructive">
          <AlertTriangle className="mr-2 h-6 w-6" />
          {t('errorOccurred')}{context ? ` ${t('in')} ${context}` : ''}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-destructive/80">{displayMessage}</p>
      </CardContent>
    </Card>
  );
};

export default ErrorDisplay;
