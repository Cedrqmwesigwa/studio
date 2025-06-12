
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebase/client';
import { useAuth } from '@/contexts/auth-context';
import Link from 'next/link';
import { LogOut, User, LayoutDashboard, Hammer, Bot, ImagePlay, CreditCard, ShieldCheck as SafetyIcon, Briefcase, Send, TrendingUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function UserNav() {
  const { user } = useAuth(); // useAuth now includes isAdmin directly
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({ title: "Signed out successfully!" });
    } catch (error) {
      console.error("Error signing out: ", error);
      toast({ title: "Sign out failed", description: "Could not sign out. Please try again.", variant: "destructive" });
    }
  };

  if (!user) {
    return null;
  }

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'SC'; // Sterling Contractors initials
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
            <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
          {user.isAdmin && (
            <DropdownMenuItem asChild>
              <Link href="/admin/projects">
                <Briefcase className="mr-2 h-4 w-4" />
                <span>Admin Projects</span>
              </Link>
            </DropdownMenuItem>
          )}
           <DropdownMenuItem asChild>
            <Link href="/book-project">
              <Send className="mr-2 h-4 w-4" />
              <span>Book Project</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/deposit-estimator">
              <Hammer className="mr-2 h-4 w-4" />
              <span>Deposit Estimator</span>
            </Link>
          </DropdownMenuItem>
           <DropdownMenuItem asChild>
            <Link href="/product-recommendation">
              <Bot className="mr-2 h-4 w-4" />
              <span>Product AI</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/image-tagging">
              <ImagePlay className="mr-2 h-4 w-4" />
              <span>Image Tagger</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/safety-briefing">
              <SafetyIcon className="mr-2 h-4 w-4" />
              <span>Safety Briefing AI</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dynamic-pricing">
              <TrendingUp className="mr-2 h-4 w-4" />
              <span>Dynamic Pricing</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/deposits">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Make Deposit</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
