
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/firebase/client';
import { collection, addDoc, query, onSnapshot, orderBy, doc, updateDoc, deleteDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import type { TodoItem, UserProfile } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Plus, Trash2, Loader2, ListChecks, Briefcase, Award, Coins, TrendingUp as TrendingUpIcon, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const { user, updateUserInContext } = useAuth();
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(user); // Local state for immediate UI updates
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loadingTodos, setLoadingTodos] = useState(true);
  const [timeSpentOnPage, setTimeSpentOnPage] = useState(0);
  const [isClaimingCoins, setIsClaimingCoins] = useState(false);
  const [canClaimDaily, setCanClaimDaily] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setCurrentUserProfile(user); // Sync with AuthContext on user change
    if (user && db) {
      const checkClaimStatus = async () => {
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const userData = userSnap.data();
          const lastClaim = userData.lastLoginClaim?.toDate();
          if (!lastClaim) {
            setCanClaimDaily(true);
            return;
          }
          const today = new Date();
          // Check if last claim was before today (ignoring time)
          if (lastClaim.getFullYear() < today.getFullYear() ||
              lastClaim.getMonth() < today.getMonth() ||
              lastClaim.getDate() < today.getDate()) {
            setCanClaimDaily(true);
          } else {
            setCanClaimDaily(false);
          }
        } else {
          setCanClaimDaily(true); // New user, can claim
        }
      };
      checkClaimStatus();
    }
  }, [user]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpentOnPage(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!user) {
      setLoadingTodos(false);
      setTodos([]);
      return;
    }
    if (!db) {
      toast({ title: "Database Error", description: "Database service is not available.", variant: "destructive" });
      setLoadingTodos(false);
      setTodos([]); 
      return;
    }

    setLoadingTodos(true);
    const todosColRef = collection(db, 'users', user.uid, 'todos');
    const q = query(todosColRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userTodos = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      } as TodoItem));
      setTodos(userTodos);
      setLoadingTodos(false);
    }, (error) => {
      console.error("Error fetching todos: ", error);
      toast({ title: "Error", description: "Could not fetch to-do items.", variant: "destructive" });
      setLoadingTodos(false);
    });

    return () => unsubscribe();
  }, [user, toast]);

  const handleAddTodo = async () => {
    if (!user || newTodo.trim() === '' || !db) return;
    try {
      await addDoc(collection(db, 'users', user.uid, 'todos'), {
        text: newTodo.trim(), completed: false, createdAt: serverTimestamp(),
      });
      setNewTodo('');
      toast({ title: "Success", description: "To-do item added." });
    } catch (error) {
      toast({ title: "Error", description: "Could not add to-do item.", variant: "destructive" });
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    if (!user || !db) return;
    try {
      await updateDoc(doc(db, 'users', user.uid, 'todos', id), { completed: !completed });
      toast({ title: "Success", description: `Item ${!completed ? 'completed' : 'incomplete'}.` });
    } catch (error) {
      toast({ title: "Error", description: "Could not update item.", variant: "destructive" });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!user || !db) return;
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'todos', id));
      toast({ title: "Success", description: "Item deleted." });
    } catch (error) {
      toast({ title: "Error", description: "Could not delete item.", variant: "destructive" });
    }
  };

  const handleClaimDailyCoins = async () => {
    if (!currentUserProfile || !db) {
      toast({ title: "Error", description: "User data not found or database unavailable.", variant: "destructive" });
      return;
    }
    setIsClaimingCoins(true);
    try {
      const userRef = doc(db, 'users', currentUserProfile.uid);
      const dailyCoinReward = 10;
      const dailyScoreReward = 5;
      const newCoins = (currentUserProfile.coins || 0) + dailyCoinReward;
      const newScore = (currentUserProfile.engagementScore || 0) + dailyScoreReward;

      await updateDoc(userRef, {
        coins: newCoins,
        engagementScore: newScore,
        lastLoginClaim: serverTimestamp() 
      });

      const updatedProfile = { ...currentUserProfile, coins: newCoins, engagementScore: newScore };
      setCurrentUserProfile(updatedProfile); // Update local state for immediate UI feedback
      updateUserInContext({ coins: newCoins, engagementScore: newScore }); // Update AuthContext
      setCanClaimDaily(false); // Disable button after claiming

      toast({ title: "Daily Bonus Claimed!", description: `You received ${dailyCoinReward} coins and ${dailyScoreReward} score points!`, });
    } catch (error) {
      console.error("Error claiming daily coins:", error);
      toast({ title: "Claim Failed", description: "Could not claim daily bonus. Please try again.", variant: "destructive" });
    } finally {
      setIsClaimingCoins(false);
    }
  };
  
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  };

  const engagementScoreGoal = 1000; // Example goal
  const scoreProgress = currentUserProfile?.engagementScore ? (currentUserProfile.engagementScore / engagementScoreGoal) * 100 : 0;


  return (
    <div className="space-y-8">
      <section className="fade-in">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome, {currentUserProfile?.displayName?.split(' ')[0] || 'User'}!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your Sterling Contractors dashboard.
        </p>
      </section>

      {/* Engagement & Rewards Section */}
      <Card className="shadow-lg fade-in bg-gradient-to-br from-primary/10 via-background to-accent/10 border-primary/20" style={{animationDelay: '0.05s'}}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center text-primary">
            <Award className="mr-2 h-6 w-6" />
            Your Engagement Hub
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">
            <div className="p-4 bg-background/50 rounded-lg shadow-sm">
              <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground mb-1">
                <Coins className="mr-1.5 h-4 w-4" /> Sterling Coins
              </div>
              <p className="text-2xl font-bold text-accent">{currentUserProfile?.coins || 0}</p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg shadow-sm">
              <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground mb-1">
                <TrendingUpIcon className="mr-1.5 h-4 w-4" /> Engagement Score
              </div>
              <p className="text-2xl font-bold text-primary">{currentUserProfile?.engagementScore || 0}</p>
            </div>
             <div className="p-4 bg-background/50 rounded-lg shadow-sm">
              <div className="flex items-center justify-center md:justify-start text-sm text-muted-foreground mb-1">
                <Clock className="mr-1.5 h-4 w-4" /> Time This Session
              </div>
              <p className="text-2xl font-bold text-secondary">{formatTime(timeSpentOnPage)}</p>
            </div>
          </div>
           <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>Progress to Next Reward Tier</span>
                <span>{Math.min(currentUserProfile?.engagementScore || 0, engagementScoreGoal)} / {engagementScoreGoal} pts</span>
            </div>
            <Progress value={scoreProgress} className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-accent [&>div]:to-primary" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <Button 
              onClick={handleClaimDailyCoins} 
              disabled={isClaimingCoins || !canClaimDaily || !db}
              className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {isClaimingCoins ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Award className="mr-2 h-4 w-4" />}
              {canClaimDaily ? "Claim Daily Login Bonus" : "Daily Bonus Claimed"}
            </Button>
            <Button variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/rewards">
                <Coins className="mr-2 h-4 w-4" /> View Rewards
              </Link>
            </Button>
          </div>
          {!db && <p className="text-xs text-destructive mt-1">Engagement features disabled: Database service unavailable.</p>}
        </CardContent>
         <CardFooter>
            <p className="text-xs text-muted-foreground">Keep engaging to earn more coins and unlock exciting rewards!</p>
        </CardFooter>
      </Card>


      {currentUserProfile?.isAdmin && (
        <Card className="shadow-lg fade-in bg-primary/10 border-primary" style={{animationDelay: '0.1s'}}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center text-primary">
              <Briefcase className="mr-2 h-6 w-6" /> Admin Area
            </CardTitle>
            <CardDescription className="text-primary/80">
              Access administrative tools and project overviews.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/admin/projects">Manage Projects</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <Card className="shadow-lg fade-in" style={{animationDelay: '0.2s'}}>
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <ListChecks className="mr-2 h-6 w-6 text-primary" />
            Project To-Do List / Shopping List
          </CardTitle>
          <CardDescription>
            Keep track of tasks and materials needed for your projects.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2 mb-6">
            <Input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              placeholder="Add a new task or item..."
              onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
              className="flex-grow"
              disabled={!db}
            />
            <Button onClick={handleAddTodo} disabled={newTodo.trim() === '' || !db}>
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>

          {loadingTodos ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">Loading tasks...</p>
            </div>
          ) : !db && user ? ( 
             <p className="text-center text-destructive py-4">Database service is unavailable. To-do list cannot be loaded or modified.</p>
          ) : todos.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">No tasks yet. Add one above!</p>
          ) : (
            <ul className="space-y-3 max-h-96 overflow-y-auto pr-2">
              {todos.map(todo => (
                <li
                  key={todo.id}
                  className="flex items-center justify-between p-3 bg-secondary/50 rounded-md hover:bg-secondary transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox
                      id={`todo-${todo.id}`}
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleTodo(todo.id, todo.completed)}
                      aria-label={todo.completed ? "Mark as incomplete" : "Mark as complete"}
                      disabled={!db}
                    />
                    <label
                      htmlFor={`todo-${todo.id}`}
                      className={`text-sm ${todo.completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}
                    >
                      {todo.text}
                    </label>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteTodo(todo.id)}
                    aria-label="Delete task"
                    className="text-muted-foreground hover:text-destructive"
                    disabled={!db}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="fade-in" style={{animationDelay: '0.4s'}}>
            <CardHeader>
                <CardTitle className="font-headline text-xl">My Projects</CardTitle>
                <CardDescription>Overview of your ongoing and completed projects.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Project tracking features coming soon.</p>
            </CardContent>
        </Card>
        <Card className="fade-in" style={{animationDelay: '0.6s'}}>
            <CardHeader>
                <CardTitle className="font-headline text-xl">Recent Activity</CardTitle>
                <CardDescription>Updates and notifications related to your account.</CardDescription>
            </Header>
            <CardContent>
                <p className="text-muted-foreground">Activity feed coming soon.</p>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
