
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page is designed to resolve a route conflict for authenticated users.
// It redirects users from the authenticated route group's /deposits path
// to the primary /deposits page located in the (marketing) group.
export default function AuthenticatedDepositsRedirect() {
  const router = useRouter();
  useEffect(() => {
    // Immediately replace the current history entry and navigate to the marketing /deposits page.
    // Using replace avoids adding this redirect page to the browser's history stack.
    router.replace('/deposits'); 
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Redirecting to deposits information...</p>
    </div>
  );
}

