
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
import Link from "next/link";

// SVG for WhatsApp icon as lucide-react doesn't have one directly
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    height="1em"
    width="1em"
    {...props}
  >
    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.38 1.25 4.85L2 22l5.25-1.38c1.47.79 3.1 1.25 4.85 1.25 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m.01 1.66c4.56 0 8.26 3.7 8.26 8.26 0 4.56-3.7 8.26-8.26 8.26-1.59 0-3.1-.45-4.42-1.25l-.3-.18-3.3 1.38 1.38-3.22-.2-.32c-.8-1.32-1.25-2.83-1.25-4.42 0-4.56 3.7-8.26 8.26-8.26m0 0" />
    <path d="M17.52 14.02c-.22-.11-.76-.38-1.06-.5-.3-.12-.52-.17-.73.17-.22.34-.8.95-.98 1.14-.18.2-.36.22-.66.11-.3-.11-1.25-.46-2.38-1.47-1.13-1.02-1.6-1.82-1.88-2.54-.28-.72.17-1.08.43-1.43.26-.34.42-.51.61-.81.2-.3.3-.51.17-.73s-.73-1.76-1-2.4-.55-.55-.73-.55c-.18 0-.38-.06-.57-.06s-.52.06-.78.34c-.26.28-.98.95-1.25 1.82-.28.87-.39 1.59-.39 2.38 0 .78.11 1.59.39 2.38.28.78.98 1.59 1.25 1.82.28.28.98.95 1.25 1.82.28.78.39 1.59.39 2.38 0 .78-.11 1.59-.39 2.38a5.395 5.395 0 01-2.28 3.18c-.2.11-.4.17-.6.17h-.11c-.22 0-.7-.11-1.01-.57-.3-.45-.98-1.47-1.25-2.28-.28-.82-.39-1.59-.39-2.38s.11-1.59.39-2.38c.27-.87.98-1.59 1.25-1.82.27-.28.98-.95 1.25-1.82.27-.87.39-1.59.39-2.38a6.79 6.79 0 011.25-4.42c.79-1.47 1.25-3.1 1.25-4.85S17.5 2 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.38 1.25 4.85L2 22l5.25-1.38c1.47.79 3.1 1.25 4.85 1.25 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm4.23 11.03c-.11.17-.22.3-.36.42-.15.11-.3.2-.45.22-.15.06-.3.06-.45.06h-.11c-.18 0-.38-.06-.57-.06h-.11c-.18 0-.38-.06-.57-.06h-.11c-.18 0-.38-.06-.57-.06h-.11c-.18 0-.38-.06-.57-.06l-.11.06c-.18 0-.38-.06-.57-.06h-.11c-.18 0-.38-.06-.57-.06h-.11a.573.573 0 01-.57-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57l-.06-.11c0-.18.06-.38.06-.57V9.9c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57V8.95c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57V7.98c0-.18.06-.38.06-.57v-.11c0-.18.06-.38.06-.57l.06-.11c.18-.3.52-.52.88-.66.36-.15.73-.22 1.11-.22.38 0 .76.07 1.11.22.36.15.66.36.88.66.22.3.36.66.36 1.06 0 .4-.15.76-.36 1.06-.22.3-.52.52-.88.66a2.498 2.498 0 01-2.22 0c-.36-.15-.66-.36-.88-.66-.22-.3-.36-.66-.36-1.06s.15-.76.36-1.06c.22-.3.52-.52.88-.66.36-.15.73-.22 1.11-.22.38 0 .76.07 1.11.22.36.15.66.36.88.66.22.3.36.66.36 1.06 0 .4-.15.76-.36 1.06-.22.3-.52.52-.88.66a2.45 2.45 0 01-1.11.22c-.38 0-.76-.07-1.11-.22a2.45 2.45 0 01-1.11-.22 2.45 2.45 0 01-1.11-.22 2.498 2.498 0 01-2.22 0c-.36-.15-.66-.36-.88-.66-.22-.3-.36-.66-.36-1.06 0-.4.15-.76.36-1.06.22-.3.52-.52.88-.66.36-.15.73-.22 1.11-.22.38 0 .76.07 1.11.22.36.15.66.36.88.66.22.3.36.66.36 1.06v.57c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57l.06.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57v.11c0 .18-.06.38-.06.57zm-1.22-3.3c.22-.11.52-.26.73-.41.22-.15.33-.3.33-.45s-.11-.3-.33-.45c-.22-.15-.52-.26-.73-.41s-.42-.26-.66-.26c-.22 0-.45.06-.66.26-.22.15-.33.3-.33.45s.11.3.33.45c.22.15.52.26.73.41.22.15.45.26.66.26.22 0 .45-.11.66-.26z" />
  </svg>
);


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

  function onSubmit(data: ContactFormValues) {
    console.log("Form data (would be sent to server if not using mailto):", data); 
    toast({
      title: "Form Data Logged", 
      description: "If this were a server submission, your data would be processed.",
    });
  }

  const googleMapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(siteConfig.support.address)}&hl=en&z=16&output=embed`;

  return (
    <div className="space-y-16">
      <section className="text-center fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Get in Touch</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          We're here to help with your construction and hardware needs in Kampala. Reach out to us through any of the channels below or use the contact form.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start fade-in" style={{ animationDelay: '0.2s' }}>
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start">
              <Phone className="h-6 w-6 mr-4 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Phone</h3>
                <a href={`tel:${siteConfig.support.rawPhone}`} className="text-primary hover:underline">{siteConfig.support.phone}</a>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 mr-4 mt-1 text-primary flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <a href={`mailto:${siteConfig.support.email}`} className="text-primary hover:underline">{siteConfig.support.email}</a>
              </div>
            </div>
            {siteConfig.support.whatsappLink && (
              <div className="flex items-start">
                <WhatsAppIcon className="h-6 w-6 mr-4 mt-1 text-primary flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-foreground">WhatsApp</h3>
                  <a href={siteConfig.support.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    Chat with us on WhatsApp
                  </a>
                </div>
              </div>
            )}
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
                <Button variant="link" className="p-0 h-auto text-primary hover:underline" disabled>
                  Chat with us (Coming Soon)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
                        <Input placeholder="e.g., Jane Namukasa" {...field} />
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
                        <Input type="tel" placeholder={siteConfig.support.phone} {...field} />
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
                        <Input placeholder="e.g., Project Inquiry, Quote Request" {...field} />
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
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href={`mailto:${siteConfig.support.email}?subject=${encodeURIComponent(form.getValues('subject') || 'Website Inquiry')}&body=${encodeURIComponent('Name: ' + form.getValues('name') + '\nEmail: ' + form.getValues('email') + (form.getValues('phone') ? '\nPhone: ' + form.getValues('phone') : '') + '\n\nMessage:\n' + form.getValues('message'))}`}>
                    Send Message via Email
                  </a>
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </section>

      <section className="fade-in" style={{ animationDelay: '0.4s' }}>
        <h2 className="font-headline text-2xl font-semibold text-center mb-6">Find Us On The Map</h2>
        <div className="aspect-video bg-muted rounded-lg shadow-md overflow-hidden">
          <iframe
            src={googleMapsEmbedUrl}
            width="100%"
            height="100%"
            style={{border:0}}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={`${siteConfig.name} Location`}
          ></iframe>
        </div>
      </section>
    </div>
  );
}

