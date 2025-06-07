
'use client';

import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Edit3, Loader2, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/client';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
    }
  }, [user]);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'SC'; // Sterling Contractors initials
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const handleSaveProfile = async () => {
    if (!user || !displayName.trim()) {
      toast({ title: "Error", description: "Display name cannot be empty.", variant: "destructive" });
      return;
    }
    if (!db) {
      toast({ title: "Error", description: "Database service is not available. Cannot save profile.", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { displayName: displayName.trim() });
      toast({ title: "Success", description: "Profile updated successfully. Changes may take a moment to reflect everywhere." });
      setIsEditing(false);
      // To reflect changes immediately, you might need to update the user object in AuthContext or re-fetch it.
      if(user) { 
        user.displayName = displayName.trim();
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast({ title: "Error", description: "Could not update profile.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-2">Loading profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center p-8 text-muted-foreground">
         Please sign in to view your profile. If Firebase services are unavailable, profile management will be disabled.
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-2xl mx-auto">
      <section className="text-center fade-in">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">User Profile</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your account information.
        </p>
      </section>

      <Card className="shadow-lg fade-in" style={{animationDelay: '0.2s'}}>
        <CardHeader className="items-center">
          <Avatar className="h-24 w-24 mb-4 border-2 border-primary">
            <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
            <AvatarFallback className="text-3xl">{getInitials(user.displayName)}</AvatarFallback>
          </Avatar>
          <CardTitle className="font-headline text-2xl">{displayName || user.displayName || 'User'}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
          {user.isAdmin && (
            <Badge className="mt-2 bg-accent text-accent-foreground flex items-center">
              <ShieldCheck className="mr-1.5 h-4 w-4" />
              Administrator
            </Badge>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="displayName" className="flex items-center">
              <User className="mr-2 h-4 w-4 text-muted-foreground" /> Display Name
            </Label>
            {isEditing ? (
              <div className="flex gap-2">
                <Input
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="flex-grow"
                  disabled={isSaving || !db}
                />
                <Button onClick={handleSaveProfile} disabled={isSaving || !db || !displayName.trim()}>
                  {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : 'Save'}
                </Button>
                <Button variant="outline" onClick={() => { setIsEditing(false); setDisplayName(user.displayName || ''); }} disabled={isSaving}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-foreground">{displayName || user.displayName || 'Not set'}</p>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)} disabled={!db}>
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            )}
            {!db && <p className="text-xs text-destructive mt-1">Profile editing disabled: Database service unavailable.</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center">
              <Mail className="mr-2 h-4 w-4 text-muted-foreground" /> Email Address
            </Label>
            <Input id="email" value={user.email || 'Not available'} readOnly disabled className="bg-muted/50" />
          </div>
          
          <Separator />
          
          <div>
             <h3 className="font-headline text-lg font-semibold mb-2">Account Settings</h3>
             <p className="text-sm text-muted-foreground">
                Your account is managed through Google Authentication. To change your password or primary email, please manage your Google account settings.
             </p>
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
