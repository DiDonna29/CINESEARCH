import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/contexts/ThemeProvider';
import { LanguageProvider } from '@/contexts/LanguageProvider';
import { LikesProvider } from '@/contexts/LikesProvider';
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: 'CineSearch',
  description: 'Discover movies and TV shows',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <LikesProvider>
              {children}
              <Toaster />
            </LikesProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
