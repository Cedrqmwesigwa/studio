
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
    // Start fading out after a short delay
    const fadeOutTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 1200); // Time before fade-out starts (e.g., 1.2 seconds)

    // Remove from DOM after fade-out is complete
    const removeTimer = setTimeout(() => {
      setIsVisible(false);
    }, 1700); // Total time visible including fade-out (e.g., 1.2s + 0.5s fade = 1.7s)

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
        isFadingOut && "opacity-0 pointer-events-none" // CSS will transition opacity
      )}
    >
      <div className="preloader-content">
        {siteConfig.logoAsset ? (
          <Image
            src={siteConfig.logoAsset}
            alt={`${siteConfig.name} Loading...`}
            width={80} // Adjust size as needed
            height={80} // Adjust size as needed
            className="animate-pulse" // Tailwind's pulse animation
            priority // Ensure logo loads quickly
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
