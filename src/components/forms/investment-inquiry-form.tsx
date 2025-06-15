
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Send, DollarSign } from 'lucide-react';
import { useAuth } from '@/contexts/auth-context';
import { siteConfig } from '@/config/site'; // Import siteConfig for email
import { format } from 'date-fns'; // Import format if using dates in email body

const investmentInquirySchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid Ugandan phone number (e.g., 07XXXXXXXX or +2567XXXXXXXX)." }).regex(/^(?:\+256|0)\d{9}$/, { message: "Invalid phone number format."}),
  investmentAmount: z.string().min(3, { message: "Please specify an investment amount or range (e.g., 50M UGX, 100M-200M UGX)." }),
  investmentHorizon: z.enum(['Short-term (1-3 years)', 'Medium-term (3-5 years)', 'Long-term (5+ years)', 'Flexible'], {
    required_error: "Please select an investment horizon."
  }),
  message: z.string().max(1000, {message: "Message is too long."}).optional(),
  agreedToTerms: z.boolean().refine(val => val === true, {
    message: "You must acknowledge the disclaimer before submitting."
  })
});

type InvestmentInquiryFormValues = z.infer<typeof investmentInquirySchema>;

export default function InvestmentInquiryForm() {
  const { toast } = useToast();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSubject, setEmailSubject] = useState("New Investment Inquiry");
  const [emailBody, setEmailBody] = useState("");

  const form = useForm<InvestmentInquiryFormValues>({
    resolver: zodResolver(investmentInquirySchema),
    defaultValues: {
      fullName: user?.displayName || "",
      email: user?.email || "",
      phone: "",
      investmentAmount: "",
      investmentHorizon: undefined,
      message: "",
      agreedToTerms: false,
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        ...form.getValues(),
        fullName: user.displayName || form.getValues('fullName') || "",
        email: user.email || form.getValues('email') || "",
      });
    }
  }, [user, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const subject = `Investment Inquiry: ${values.investmentAmount || 'General Interest'} - ${values.fullName || 'New Inquiry'}`;
      setEmailSubject(subject);

      const body = `
Investment Inquiry Details:
--------------------------------
Full Name: ${values.fullName || 'N/A'}
Email: ${values.email || 'N/A'}
Phone: ${values.phone || 'N/A'}

Prospective Investment Amount (UGX): ${values.investmentAmount || 'N/A'}
Investment Horizon: ${values.investmentHorizon || 'N/A'}
Agreed to Terms: ${values.agreedToTerms ? 'Yes' : 'No'}

Additional Information/Message:
${values.message || 'N/A'}
--------------------------------
Please follow up with this potential investor.
      `.trim();
      setEmailBody(body);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(data: InvestmentInquiryFormValues) {
    setIsLoading(true); // Simulate loading for immediate feedback
    // Logic moved to mailtoHref generation and button onClick
    setTimeout(() => {
        toast({
          title: "Inquiry Prepared!",
          description: "Your investment inquiry details are ready. Please click the 'Submit Inquiry via Email' button to send it to us.",
        });
        setIsLoading(false);
        // Optionally reset form here if desired after "preparation"
        // form.reset({ 
        //   fullName: user?.displayName || "", email: user?.email || "", 
        //   phone: "", investmentAmount: "", investmentHorizon: undefined, 
        //   message: "", agreedToTerms: false 
        // });
    }, 500);
  }
  
  const mailtoHref = `mailto:${siteConfig.support.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <Card className="shadow-lg border-primary/50">
      <CardHeader>
        <CardTitle className="font-headline text-xl flex items-center">
          <DollarSign className="mr-2 h-6 w-6 text-primary" />
          Investment Inquiry Form
        </CardTitle>
        <CardDescription>
          Provide your details and investment interests. All fields marked with * are required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                        <Input placeholder="e.g., Mary Musoke" {...field} />
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
                    <FormLabel>Email Address *</FormLabel>
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
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+256 7XX XXX XXX" {...field} />
                  </FormControl>
                   <FormDescription>Ugandan format preferred.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="investmentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prospective Investment Amount (UGX) *</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 50,000,000 or 100M - 200M" {...field} />
                  </FormControl>
                  <FormDescription>Indicate your potential investment capacity or range.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="investmentHorizon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Investment Horizon *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="How long do you plan to invest?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Short-term (1-3 years)">Short-term (1-3 years)</SelectItem>
                      <SelectItem value="Medium-term (3-5 years)">Medium-term (3-5 years)</SelectItem>
                      <SelectItem value="Long-term (5+ years)">Long-term (5+ years)</SelectItem>
                      <SelectItem value="Flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Information (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Any specific interests, questions, or preferences? (e.g., interested in residential projects, prefer fixed returns, etc.)" {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="agreedToTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-background">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Acknowledgement *
                    </FormLabel>
                    <FormDescription>
                      I acknowledge that this form is an expression of interest and not a formal investment. I have read and understood the disclaimer on the "Invest With Us" page.
                    </FormDescription>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            
            <Button asChild className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" size="lg" disabled={isLoading || !form.formState.isValid}>
              <a href={form.formState.isValid ? mailtoHref : undefined} onClick={(e) => {
                if (!form.formState.isValid) {
                    e.preventDefault();
                    form.trigger(); 
                    toast({title: "Incomplete Form", description: "Please fill all required fields before submitting.", variant: "destructive"});
                } else {
                    toast({title: "Opening Email Client...", description: "Please send the prepared email to submit your inquiry."});
                     // Reset form after successfully preparing mailto link
                    form.reset({ 
                      fullName: user?.displayName || "", email: user?.email || "", 
                      phone: "", investmentAmount: "", investmentHorizon: undefined, 
                      message: "", agreedToTerms: false 
                    });
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
            {!form.formState.isValid && <p className="text-sm text-destructive text-center mt-2">Please complete all required fields above.</p>}
            <p className="text-xs text-muted-foreground text-center mt-2">
                Clicking "Submit Inquiry via Email" will open your default email application with a pre-filled message. Please review and send it to us.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

    