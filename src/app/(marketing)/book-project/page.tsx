
import ProjectBookingForm from '@/components/forms/project-booking-form';
import { siteConfig } from '@/config/site';
import { Send } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Book Your Project | ${siteConfig.name}`,
  description: `Start your construction project with ${siteConfig.name}. Fill out our project booking form to get a personalized consultation and quote.`,
};

export default function BookProjectPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <section className="text-center mb-10 fade-in">
         <div className="flex justify-center items-center mb-3">
            <Send className="h-12 w-12 text-primary" />
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Book Your Project Consultation</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Ready to start building your vision? Fill out the form below with your project details. Our team will review your submission and get back to you promptly to discuss the next steps, provide a consultation, and prepare a formal quotation.
        </p>
      </section>
      <div className="fade-in" style={{animationDelay: '0.2s'}}>
        <ProjectBookingForm />
      </div>
    </div>
  );
}

    