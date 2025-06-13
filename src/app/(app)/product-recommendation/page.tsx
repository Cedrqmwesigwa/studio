
'use client';

import ProductRecommendationForm from '@/components/ai/product-recommendation-form';
import { Lightbulb } from 'lucide-react'; // Changed icon for consistency

export default function ProductRecommendationPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <section className="text-center mb-10 fade-in">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl flex items-center justify-center">
            <Lightbulb className="mr-3 h-8 w-8 text-primary" />
            AI Product Recommender
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Get personalized product recommendations based on your browsing history and project needs, leveraging Cialdini's principles of persuasion.
        </p>
      </section>
      <div className="fade-in" style={{animationDelay: '0.2s'}}>
        <ProductRecommendationForm />
      </div>
    </div>
  );
}
