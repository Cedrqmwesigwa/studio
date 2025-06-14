import type { ReactNode } from 'react';
import Header from './header';
import Footer from './footer';
import RecommendedProducts from './recommended-products'; // Import the new component

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <>
      <Header />
      <main className="flex-grow container py-8">
        {children}
      </main>
      <div className="container"> {/* Container for RecommendedProducts */}
        <RecommendedProducts />
      </div>
      <Footer />
    </>
  );
}
