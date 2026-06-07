'use client';

import { Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageProvider';

interface LoadingSpinnerProps {
  text?: string;
  size?: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text, size = 48 }) => {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col items-center justify-center space-y-2 py-8">
      <Loader2 className="h-12 w-12 animate-spin text-primary" style={{ width: size, height: size }} />
      {text && <p className="text-muted-foreground">{text}</p>}
      {!text && <p className="text-muted-foreground">{t('loading')}</p>}
    </div>
  );
};

export default LoadingSpinner;
