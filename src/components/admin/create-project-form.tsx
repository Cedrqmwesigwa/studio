
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Briefcase, CalendarIcon } from 'lucide-react';
import { db } from '@/firebase/client';
import { collection, addDoc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import type { FirestoreProject } from '@/types';

const projectSchema = z.object({
  projectName: z.string().min(3, { message: "Project name must be at least 3 characters." }).max(100, { message: "Project name too long."}),
  clientId: z.string().min(1, { message: "Client ID is required."}).max(100, { message: "Client ID too long."}), // For now, simple text input
  scope: z.string().min(10, { message: "Scope description must be at least 10 characters." }).max(2000, { message: "Scope description too long."}),
  estimatedCost: z.coerce.number().min(0, { message: "Estimated cost must be a positive number." }),
  startDate: z.date({ required_error: "Start date is required." }),
  expectedEndDate: z.date({ required_error: "Expected end date is required." }),
  status: z.enum(['Planning', 'In Progress', 'On Hold', 'Completed', 'Cancelled'], { required_error: "Please select project status." }),
}).refine(data => data.expectedEndDate >= data.startDate, {
  message: "End date cannot be before start date.",
  path: ["expectedEndDate"],
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export default function CreateProjectForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: "",
      clientId: "",
      scope: "",
      estimatedCost: 0,
      status: 'Planning',
      // startDate and expectedEndDate will be undefined initially, handled by Popover
    },
  });

  async function onSubmit(data: ProjectFormValues) {
    if (!db) {
      toast({ title: "Error", description: "Database service is not available. Cannot create project.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const projectData: Omit<FirestoreProject, 'id' | 'createdAt' | 'updatedAt'> & { startDate: Timestamp, expectedEndDate: Timestamp, createdAt: any, updatedAt: any } = {
        ...data,
        startDate: Timestamp.fromDate(data.startDate),
        expectedEndDate: Timestamp.fromDate(data.expectedEndDate),
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      };

      const projectsColRef = collection(db, 'projects');
      await addDoc(projectsColRef, projectData);
      
      toast({
        title: "Project Created!",
        description: `Project "${data.projectName}" has been successfully added.`,
      });
      router.push('/admin/projects'); // Redirect to projects list
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        title: "Project Creation Failed",
        description: "An error occurred while creating the project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-primary" />
          New Project Details
        </CardTitle>
        <CardDescription>
          All fields are required unless otherwise stated.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="projectName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Nakasero Office Block Renovation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Client ID / Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Client's User ID or Company Name" {...field} />
                  </FormControl>
                  <FormDescription>Currently a text field. Future: select from users.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="scope"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Scope</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Detailed description of the work to be done..." {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="estimatedCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Estimated Cost (UGX)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 50000000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Start Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                                date < new Date(new Date().setHours(0,0,0,0)) // Disable past dates
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="expectedEndDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Expected End Date</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                        <FormControl>
                            <Button
                            variant={"outline"}
                            className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                            )}
                            >
                            {field.value ? (
                                format(field.value, "PPP")
                            ) : (
                                <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                        </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                                date < (form.getValues("startDate") || new Date(new Date().setHours(0,0,0,0)))
                            }
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select initial project status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Planning">Planning</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading || !db} className="w-full md:w-auto">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating Project...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
            {!db && <p className="text-sm text-destructive">Database service unavailable. Cannot create project.</p>}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
