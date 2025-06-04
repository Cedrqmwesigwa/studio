'use client';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { siteConfig } from "@/config/site";
import { Phone, Mail, MapPin, Clock, MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().optional(),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  // Placeholder onSubmit function
  function onSubmit(data: ContactFormValues) {
    console.log(data); // In a real app, you'd send this data to a backend
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    form.reset();
  }

  return (
    <div className="space-y-16">
      <section className="text-center fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Get in Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We're here to help with your construction and hardware needs. Reach out to us through any of the channels below or use the contact form.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start fade-in" style={{ animationDelay: '0.2s' }}>
        {/* Contact Information Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start">
              <Phone className="h-6 w-6 mr-4 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Phone</h3>
                <a href={`tel:${siteConfig.support.phone}`} className="text-primary hover:underline">{siteConfig.support.phone}</a>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 mr-4 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <a href={`mailto:${siteConfig.support.email}`} className="text-primary hover:underline">{siteConfig.support.email}</a>
              </div>
            </div>
            <div className="flex items-start">
              <MapPin className="h-6 w-6 mr-4 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Address</h3>
                <p className="text-muted-foreground">{siteConfig.support.address}</p>
              </div>
            </div>
            <div className="flex items-start">
              <Clock className="h-6 w-6 mr-4 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Operating Hours</h3>
                <p className="text-muted-foreground">{siteConfig.support.operatingHours}</p>
              </div>
            </div>
             <div className="flex items-start">
              <MessageSquare className="h-6 w-6 mr-4 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Live Chat</h3>
                <Button variant="link" className="p-0 h-auto text-primary hover:underline">
                  Chat with us (Coming Soon)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
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
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (Optional)</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="+254 700 000 000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Project Inquiry" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Tell us about your project or question..." {...field} rows={5} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90">Send Message</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>

      {/* Map Section Placeholder - In a real app, embed a map here */}
      <section className="fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="font-headline text-2xl font-semibold text-center mb-6">Find Us On The Map</h2>
        <div className="aspect-video bg-muted rounded-lg flex items-center justify-center shadow-md">
          <p className="text-muted-foreground">Embedded Map (e.g., Google Maps) will be displayed here.</p>
          {/* Example: <iframe src="google_maps_embed_url" width="100%" height="100%" style={{border:0}} allowfullscreen="" loading="lazy"></iframe> */}
        </div>
      </section>
    </div>
  );
}
