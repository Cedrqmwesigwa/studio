
'use client';

import { useAuth } from '@/contexts/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/client';
import { Badge } from '@/components/ui/badge';

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || '');
    }
  }, [user]);

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'SS';
    const names = name.split(' ');
    if (names.length === 1) return names[0].substring(0, 2).toUpperCase();
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  };

  const handleSaveProfile = async () => {
    if (!user || !displayName.trim()) {
      toast({ title: "Error", description: "Display name cannot be empty.", variant: "destructive" });
      return;
    }
    setIsSaving(true);
    try {
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, { displayName: displayName.trim() });
      // Note: This updates Firestore. To update Firebase Auth profile, use updateProfile from 'firebase/auth'.
      // For simplicity, we're only updating Firestore here. Refreshing context will show changes.
      toast({ title: "Success", description: "Profile updated successfully. Changes may take a moment to reflect everywhere." });
      setIsEditing(false);
      // Potentially re-fetch user from context or trigger context update
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast({ title: "Error", description: "Could not update profile.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading profile...</div>;
  }

  if (!user) {
    return <div className="text-center p-8">Please sign in to view your profile.</div>;
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
          <CardTitle className="font-headline text-2xl">{user.displayName}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
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
                />
                <Button onClick={handleSaveProfile} disabled={isSaving}>
                  {isSaving ? 'Saving...' : 'Save'}
                </Button>
                <Button variant="outline" onClick={() => { setIsEditing(false); setDisplayName(user.displayName || ''); }}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-foreground">{displayName || 'Not set'}</p>
                <Button variant="ghost" size="icon" onClick={() => setIsEditing(true)}>
                  <Edit3 className="h-4 w-4" />
                </Button>
              </div>
            )}
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
             {user.isAdmin && (
                <Badge className="mt-4 bg-accent text-accent-foreground">Administrator Account</Badge>
             )}
          </div>
          
        </CardContent>
      </Card>
    </div>
  );
}
