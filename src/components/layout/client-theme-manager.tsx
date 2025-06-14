'use client';

import { useEffect } from 'react';

export default function ClientThemeManager() {
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = () => {
      if (mediaQuery.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    // The inline script in layout.tsx handles the very initial theme setting before hydration.
    // This listener ensures the theme updates if the system preference changes while the app is open.
    mediaQuery.addEventListener('change', handleChange);
    
    // Call handleChange once on mount in case the inline script was missed or for consistency,
    // though the inline script should be the primary mechanism for initial FOUC prevention.
    // If the class is already set correctly by the inline script, this won't cause a flicker.
    handleChange();


    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return null; // This component does not render anything visible
}
