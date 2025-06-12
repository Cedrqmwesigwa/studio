
'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/'); // Redirect to home if not authenticated at all
      } else if (!isAdmin) {
        router.push('/dashboard'); // Redirect to dashboard if not an admin
      }
    }
  }, [user, loading, isAdmin, router]);

  if (loading || !user || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] text-center p-4">
        {loading || !user ? (
            <>
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Verifying access...</p>
            </>
        ) : (
            <>
                <ShieldAlert className="h-12 w-12 text-destructive mb-4" />
                <h1 className="text-2xl font-semibold text-destructive">Access Denied</h1>
                <p className="text-muted-foreground mt-2">You do not have permission to view this page. Redirecting...</p>
            </>
        )}
      </div>
    );
  }

  // User is an admin, render the children
  return <div className="flex-grow">{children}</div>;
}
