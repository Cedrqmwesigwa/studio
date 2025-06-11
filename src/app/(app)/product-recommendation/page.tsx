
import ProductRecommendationForm from '@/components/ai/product-recommendation-form';

export default function ProductRecommendationPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <section className="text-center mb-10 fade-in">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">AI Product Advisor</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Get personalized hardware and material recommendations for your project, powered by AI.
        </p>
      </section>
      <div className="fade-in" style={{animationDelay: '0.2s'}}>
        <ProductRecommendationForm />
      </div>
    </div>
  );
}
