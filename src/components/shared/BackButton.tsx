'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageProvider';

const BackButton = () => {
  const router = useRouter();
  const { t } = useLanguage();

  return (
    <Button variant="outline" onClick={() => router.back()} className="mb-6">
      <ArrowLeft className="mr-2 h-4 w-4" /> {t('goBack')}
    </Button>
  );
};

export default BackButton;
