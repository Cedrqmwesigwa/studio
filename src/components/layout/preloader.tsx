
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/config/site';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1200); 

    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1700); 

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      className={cn(
        "preloader",
        isFadingOut && "opacity-0 pointer-events-none"
      )}
    >
      <div className="preloader-content">
        {siteConfig.logoUrl ? (
          <Image
            src={siteConfig.logoUrl}
            alt={`${siteConfig.name} Loading...`}
            width={80}
            height={80}
            className="animate-pulse"
            priority
            data-ai-hint="company logo"
          />
        ) : (
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        )}
        <p className="mt-4 text-sm text-primary">Loading Sterling Experience...</p>
      </div>
    </div>
  );
}
