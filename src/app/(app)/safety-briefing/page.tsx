import SafetyBriefingForm from '@/components/ai/safety-briefing-form';
import { ShieldAlert } from 'lucide-react';

export default function SafetyBriefingPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <section className="text-center mb-10 fade-in">
        <div className="flex justify-center items-center mb-3">
         <ShieldAlert className="h-12 w-12 text-primary" />
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">AI Safety Briefing Generator</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Generate tailored safety briefings for your construction projects. Provide the project stage, optionally upload a site photo, and describe any specific concerns to get an AI-generated safety plan.
        </p>
      </section>
      <div className="fade-in" style={{animationDelay: '0.2s'}}>
        <SafetyBriefingForm />
      </div>
    </div>
  );
}
