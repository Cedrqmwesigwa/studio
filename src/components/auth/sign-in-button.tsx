'use client';

import { signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '@/firebase/client';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function SignInButton() {
  const { toast } = useToast();

  const handleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleAuthProvider);
      toast({ title: "Signed in successfully!" });
    } catch (error) {
      console.error("Error signing in with Google: ", error);
      toast({ title: "Sign in failed", description: "Could not sign in with Google. Please try again.", variant: "destructive" });
    }
  };

  return (
    <Button onClick={handleSignIn} variant="outline">
      <LogIn className="mr-2 h-4 w-4" />
      Sign In with Google
    </Button>
  );
}
