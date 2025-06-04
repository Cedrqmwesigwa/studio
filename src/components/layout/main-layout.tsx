import type { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex-grow container max-w-screen-2xl py-8">
        {children}
      </main>
      <Footer />
    </>
  );
}
