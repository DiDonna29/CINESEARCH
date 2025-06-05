'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Clapperboard, Search as SearchIcon, UserCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import ThemeToggle from '@/components/shared/ThemeToggle';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import { useLanguage } from '@/contexts/LanguageProvider';

const Navbar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const { t } = useLanguage();

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary/90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 text-white hover:text-accent transition-colors">
              <Clapperboard className="h-8 w-8" />
              <span className="text-2xl font-bold font-headline">CineSearch</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium text-primary-foreground hover:text-accent transition-colors">
              {t('movies')}
            </Link>
            <Link href="/tvshows" className="text-sm font-medium text-primary-foreground hover:text-accent transition-colors">
              {t('tvShows')}
            </Link>
          </div>
          
          <div className="flex flex-1 items-center justify-center px-2 lg:ml-6 lg:justify-end">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">{t('search')}</label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <SearchIcon className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
                </div>
                <Input
                  id="search"
                  name="search"
                  className="block w-full rounded-md border-0 bg-secondary py-1.5 pl-10 pr-3 text-secondary-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                  placeholder={t('searchPlaceholder')}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <LanguageSwitcher />
            <Link href="/profile" passHref>
              <Button variant="ghost" size="icon" aria-label={t('profile')}>
                <UserCircle className="h-6 w-6 text-white" />
              </Button>
            </Link>
          </div>
        </div>
        {/* Mobile Nav Links */}
        <div className="md:hidden flex items-center justify-center space-x-4 py-2 border-t border-primary-foreground/10">
            <Link href="/" className="text-sm font-medium text-primary-foreground hover:text-accent transition-colors">
              {t('movies')}
            </Link>
            <Link href="/tvshows" className="text-sm font-medium text-primary-foreground hover:text-accent transition-colors">
              {t('tvShows')}
            </Link>
          </div>
      </div>
    </nav>
  );
};

export default Navbar;
