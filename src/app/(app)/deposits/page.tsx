
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page is a placeholder to resolve a route conflict.
// Version: ConflictFix_Oct26_Reapply
// The primary /deposits page is located in the (marketing) group.
// Authenticated users accessing this path will be redirected to the marketing /deposits page.
export default function AuthenticatedDepositsRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/deposits'); // Redirect to the marketing page
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground">Redirecting to deposits information...</p>
    </div>
  );
}
