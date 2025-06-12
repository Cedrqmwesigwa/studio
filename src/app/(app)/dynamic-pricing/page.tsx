
import DynamicPricingForm from '@/components/ai/dynamic-pricing-form';
import { TrendingUp } from 'lucide-react';

export default function DynamicPricingPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <section className="text-center mb-10 fade-in">
        <div className="flex justify-center items-center mb-3">
         <TrendingUp className="h-12 w-12 text-primary" />
        </div>
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Dynamic Pricing Tool</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Utilize our AI-powered tool to generate dynamic price estimates for projects based on customer data, project specifics, and market conditions.
        </p>
      </section>
      <div className="fade-in" style={{animationDelay: '0.2s'}}>
        <DynamicPricingForm />
      </div>
    </div>
  );
}
