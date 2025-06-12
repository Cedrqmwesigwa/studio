
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
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Send, CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { siteConfig } from '@/config/site';
import { useAuth } from '@/contexts/auth-context';


const projectBookingSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  projectType: z.enum(['Residential', 'Commercial', 'Renovation', 'Industrial', 'Consultation', 'Other'], { required_error: "Please select a project type." }),
  projectDescription: z.string().min(20, { message: "Project description must be at least 20 characters." }).max(3000, {message: "Description too long."}),
  estimatedBudget: z.string().optional(), // Keep as string to allow UGX, or ranges
  desiredStartDate: z.date().optional(),
});

type ProjectBookingFormValues = z.infer<typeof projectBookingSchema>;

export default function ProjectBookingForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false); // Though mailto is instant, good for future backend
  const [emailSubject, setEmailSubject] = useState("New Project Booking Inquiry");
  const [emailBody, setEmailBody] = useState("");


  const form = useForm<ProjectBookingFormValues>({
    resolver: zodResolver(projectBookingSchema),
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      phone: "",
      projectType: undefined,
      projectDescription: "",
      estimatedBudget: "",
      desiredStartDate: undefined,
    },
  });

 useEffect(() => {
    if (user) {
      form.reset({
        name: user.displayName || "",
        email: user.email || "",
        phone: form.getValues('phone') || "", // Keep existing phone if already typed
        projectType: form.getValues('projectType'),
        projectDescription: form.getValues('projectDescription'),
        estimatedBudget: form.getValues('estimatedBudget'),
        desiredStartDate: form.getValues('desiredStartDate'),
      });
    }
  }, [user, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const subject = `New Project Booking: ${values.projectType || 'General Inquiry'} - ${values.name || 'New Client'}`;
      setEmailSubject(subject);

      const body = `
Project Booking Details:
--------------------------------
Client Name: ${values.name || 'N/A'}
Email: ${values.email || 'N/A'}
Phone: ${values.phone || 'N/A'}

Project Type: ${values.projectType || 'N/A'}
Desired Start Date: ${values.desiredStartDate ? format(values.desiredStartDate, 'PPP') : 'Not specified'}
Estimated Budget: ${values.estimatedBudget || 'Not specified'}

Project Description:
${values.projectDescription || 'N/A'}
--------------------------------
Please follow up with this client.
      `.trim();
      setEmailBody(body);
    });
    return () => subscription.unsubscribe();
  }, [form]);


  function onSubmit(data: ProjectBookingFormValues) {
    setIsLoading(true); // Simulate loading for immediate feedback
    // For mailto, the "submission" happens when the user clicks the link/button.
    // We've already prepared emailSubject and emailBody via the useEffect hook.

    // Simulate a short delay then "complete"
    setTimeout(() => {
        toast({
        title: "Inquiry Prepared!",
        description: "Your project details are ready. Please click the 'Submit Inquiry via Email' button to send it to us.",
        });
        setIsLoading(false);
    }, 500);
  }

  const mailtoHref = `mailto:${siteConfig.support.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <Send className="mr-2 h-5 w-5 text-primary" />
          Project Details Form
        </CardTitle>
        <CardDescription>
          The more information you provide, the better we can assist you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+256 7XX XXX XXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the type of project" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Residential">Residential Construction</SelectItem>
                      <SelectItem value="Commercial">Commercial Construction</SelectItem>
                      <SelectItem value="Renovation">Renovation / Remodeling</SelectItem>
                      <SelectItem value="Industrial">Industrial Project</SelectItem>
                      <SelectItem value="Consultation">Consultation Services</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about your project: scope, size, specific needs, ideas, location, etc." {...field} rows={6} />
                  </FormControl>
                  <FormDescription>
                    Please provide as much detail as possible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="estimatedBudget"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Estimated Budget (Optional)</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., 50,000,000 UGX or 'Flexible'" {...field} />
                    </FormControl>
                    <FormDescription>Helps us tailor recommendations.</FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="desiredStartDate"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                    <FormLabel>Desired Start Date (Optional)</FormLabel>
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
                                date < new Date(new Date().setHours(0,0,0,0))
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
            
            <Button type="submit" className="hidden">Validate Form</Button> 
            {/* Hidden button to trigger validation if needed, primary action is mailto */}
            
            <Button asChild className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" size="lg" disabled={isLoading || !form.formState.isValid}>
              <a href={form.formState.isValid ? mailtoHref : undefined} onClick={(e) => {
                if (!form.formState.isValid) {
                    e.preventDefault();
                    form.trigger(); // Manually trigger validation before allowing mailto
                    toast({title: "Incomplete Form", description: "Please fill all required fields before submitting.", variant: "destructive"});
                } else {
                    toast({title: "Opening Email Client...", description: "Please send the prepared email to submit your inquiry."});
                }
              }}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Preparing...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" /> Submit Inquiry via Email
                  </>
                )}
              </a>
            </Button>
            {!form.formState.isValid && <p className="text-sm text-destructive text-center">Please complete all required fields above.</p>}
            <p className="text-xs text-muted-foreground text-center">
                After clicking, your email application will open with a pre-filled message. Please review and send it. We'll get back to you soon!
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    