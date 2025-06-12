
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth-context';
import { db } from '@/firebase/client';
import { collection, query, onSnapshot, orderBy, where } from 'firebase/firestore';
import type { FirestoreProject } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Briefcase, AlertTriangle, PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';


export default function AdminProjectsPage() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<FirestoreProject[]>([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      setLoadingProjects(false);
      setProjects([]);
      setError("Access denied. You must be an admin to view this page.");
      return;
    }
    if (!db) {
      setLoadingProjects(false);
      setError("Database service is not available.");
      return;
    }

    setLoadingProjects(true);
    setError(null);
    const projectsColRef = collection(db, 'projects');
    // Later, you might filter by project manager, status, etc.
    // For now, admin sees all projects.
    const q = query(projectsColRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedProjects = snapshot.docs.map(docSnap => ({
        id: docSnap.id,
        ...docSnap.data(),
      } as FirestoreProject));
      setProjects(fetchedProjects);
      setLoadingProjects(false);
    }, (err) => {
      console.error("Error fetching projects: ", err);
      setError("Could not fetch projects. " + err.message);
      setLoadingProjects(false);
    });

    return () => unsubscribe();
  }, [user]);

  if (loadingProjects) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-15rem)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-3 text-muted-foreground">Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-8">
        <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-destructive mb-2">Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button asChild className="mt-6">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="fade-in flex justify-between items-center">
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl flex items-center">
            <Briefcase className="mr-3 h-8 w-8 text-primary" />
            All Projects (Admin View)
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Overview of all construction projects.
          </p>
        </div>
        <Button asChild disabled>
          <Link href="/admin/projects/new">
            <PlusCircle className="mr-2 h-5 w-5" /> Create New Project (Coming Soon)
          </Link>
        </Button>
      </section>

      <Card className="shadow-lg fade-in" style={{ animationDelay: '0.2s' }}>
        <CardHeader>
          <CardTitle>Project List</CardTitle>
          <CardDescription>
            {projects.length > 0 ? `Showing ${projects.length} projects.` : "No projects found."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              There are no projects to display yet.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project Name</TableHead>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>Est. Cost (UGX)</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {projects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium">{project.projectName}</TableCell>
                    <TableCell className="text-xs">{project.clientId}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={project.status === 'Completed' ? 'default' : project.status === 'In Progress' ? 'secondary' : 'outline'}
                        className={project.status === 'Completed' ? 'bg-green-600 hover:bg-green-700' : project.status === 'Planning' ? 'bg-blue-500 hover:bg-blue-600' : ''}
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {project.startDate && project.startDate.seconds 
                        ? format(new Date(project.startDate.seconds * 1000), 'PP') 
                        : 'N/A'}
                    </TableCell>
                    <TableCell>{project.estimatedCost.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" disabled>
                        View Details (Soon)
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
        {projects.length > 0 && (
             <CardFooter className="text-xs text-muted-foreground">
                Detailed project views and management actions will be available soon.
             </CardFooter>
        )}
      </Card>
    </div>
  );
}
