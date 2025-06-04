'use client';

import Link from 'next/link';
import Image from 'next/image';
import { siteConfig, type NavItem } from '@/config/site';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { SignInButton } from '@/components/auth/sign-in-button';
import { UserNav } from '@/components/auth/user-nav';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function Header() {
  const { user, loading } = useAuth();
  const pathname = usePathname();

  const navItemsToDisplay = siteConfig.mainNav.filter(item => 
    !item.authRequired || (item.authRequired && user)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          {siteConfig.logoUrl ? (
            <Image src={siteConfig.logoUrl} alt={siteConfig.name} width={32} height={32} className="h-8 w-auto" priority />
          ) : (
            <span className="font-headline text-xl font-bold text-primary">{siteConfig.name.charAt(0)}</span> 
          )}
          <span className="font-headline text-xl font-bold text-primary hidden sm:inline-block">{siteConfig.name}</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItemsToDisplay.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-foreground/60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          {!loading && (user ? <UserNav /> : <SignInButton />)}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-background">
              <nav className="flex flex-col space-y-4 mt-8">
                {navItemsToDisplay.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                     className={cn(
                      "text-lg transition-colors hover:text-primary",
                      pathname === item.href ? "text-primary font-semibold" : "text-foreground/80"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
