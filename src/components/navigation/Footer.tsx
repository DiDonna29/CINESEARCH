import { useLanguage } from '@/contexts/LanguageProvider';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary/90 text-primary-foreground py-8 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {currentYear} CineSearch. {t('movies')} & {t('tvShows')} discovery platform.
        </p>
        <p className="text-xs mt-2 text-muted-foreground/70">
          Powered by Next.js and Tailwind CSS. Data from RapidAPI.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
