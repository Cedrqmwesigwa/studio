
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/firebase/client';
import { collection, addDoc, query, onSnapshot, orderBy, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import type { TodoItem } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash2, Loader2, ListChecks, Briefcase } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

export default function DashboardPage() {
  const { user } = useAuth(); // user object now contains isAdmin directly
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [loadingTodos, setLoadingTodos] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      setLoadingTodos(false);
      setTodos([]); // Clear todos if no user
      return;
    }
    if (!db) {
      toast({ title: "Database Error", description: "Database service is not available. To-do list cannot be loaded.", variant: "destructive" });
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
    if (!user || newTodo.trim() === '') return;
    if (!db) {
      toast({ title: "Error", description: "Database service is not available. Cannot add item.", variant: "destructive" });
      return;
    }
    try {
      const todosColRef = collection(db, 'users', user.uid, 'todos');
      await addDoc(todosColRef, {
        text: newTodo.trim(),
        completed: false,
        createdAt: serverTimestamp(),
      });
      setNewTodo('');
      toast({ title: "Success", description: "To-do item added." });
    } catch (error) {
      console.error("Error adding todo: ", error);
      toast({ title: "Error", description: "Could not add to-do item.", variant: "destructive" });
    }
  };

  const handleToggleTodo = async (id: string, completed: boolean) => {
    if (!user) return;
     if (!db) {
      toast({ title: "Error", description: "Database service is not available. Cannot update item.", variant: "destructive" });
      return;
    }
    try {
      const todoDocRef = doc(db, 'users', user.uid, 'todos', id);
      await updateDoc(todoDocRef, { completed: !completed });
      toast({ title: "Success", description: `To-do item ${!completed ? 'marked as complete' : 'marked as incomplete'}.` });
    } catch (error) {
      console.error("Error toggling todo: ", error);
      toast({ title: "Error", description: "Could not update to-do item.", variant: "destructive" });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!user) return;
    if (!db) {
      toast({ title: "Error", description: "Database service is not available. Cannot delete item.", variant: "destructive" });
      return;
    }
    try {
      const todoDocRef = doc(db, 'users', user.uid, 'todos', id);
      await deleteDoc(todoDocRef);
      toast({ title: "Success", description: "To-do item deleted." });
    } catch (error) {
      console.error("Error deleting todo: ", error);
      toast({ title: "Error", description: "Could not delete to-do item.", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-8">
      <section className="fade-in">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          Welcome to your Dashboard, {user?.displayName?.split(' ')[0] || 'User'}!
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Manage your projects, track progress, and access exclusive tools.
        </p>
      </section>

      {user?.isAdmin && (
        <Card className="shadow-lg fade-in bg-primary/10 border-primary" style={{animationDelay: '0.1s'}}>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center text-primary">
              <Briefcase className="mr-2 h-6 w-6" />
              Admin Area
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
