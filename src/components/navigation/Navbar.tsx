'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, type FormEvent } from 'react';
import { Clapperboard, Search as SearchIcon, UserCircle, Film, Tv, Zap } from 'lucide-react';
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

  const navLinks = [
    { href: '/', label: t('movies'), icon: <Film className="h-4 w-4" /> },
    { href: '/tvshows', label: t('tvShows'), icon: <Tv className="h-4 w-4" /> },
    { href: '/anime', label: t('anime'), icon: <Zap className="h-4 w-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 glass-morphism">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0 group">
            <div className="bg-accent p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300">
              <Clapperboard className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter hidden sm:inline-block">CINESEARCH</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                className="flex items-center gap-2 text-sm font-semibold hover:text-accent transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>
          
          <div className="flex-1 flex items-center justify-end gap-4">
            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[280px] group">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" />
              <Input
                className="w-full bg-secondary/50 border-none pl-10 h-10 rounded-full focus-visible:ring-2 focus-visible:ring-accent/50 transition-all"
                placeholder={t('searchPlaceholder')}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <ThemeToggle />
              <LanguageSwitcher />
              <Link href="/profile">
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent/10 hover:text-accent">
                  <UserCircle className="h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;