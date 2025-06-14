
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp, Loader2, AlertTriangle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getRecommendedProducts, type GetRecommendedProductsOutput, type RecommendedProductItem } from '@/ai/flows/get-recommended-products-flow';

export default function RecommendedProducts() {
  const [recommendations, setRecommendations] = useState<RecommendedProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setIsLoading(true);
        setError(null);
        const result: GetRecommendedProductsOutput = await getRecommendedProducts();
        setRecommendations(result.recommendations || []);
      } catch (err: any) {
        console.error("Failed to fetch recommendations:", err);
        setError(err.message || "Could not load recommendations.");
        setRecommendations([]);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRecommendations();
  }, []);

  if (isLoading) {
    return (
      <aside className="my-8">
        <Card className="shadow-lg bg-secondary/20 border-primary/30">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center text-primary">
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              Loading Recommendations...
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Fetching popular items for you...</p>
          </CardContent>
        </Card>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="my-8">
        <Card className="shadow-lg bg-destructive/10 border-destructive/30">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center text-destructive">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Error Loading Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive/80">{error}</p>
            <p className="text-xs text-muted-foreground mt-2">Please try again later.</p>
          </CardContent>
        </Card>
      </aside>
    );
  }

  if (!recommendations.length && !isLoading) {
    // Optionally, don't render anything if there are no recommendations and no error.
    // Or show a "No recommendations available" message.
    return null; 
  }

  return (
    <aside className="my-8">
      <Card className="shadow-lg bg-secondary/20 border-primary/30">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center text-primary">
            <ThumbsUp className="mr-2 h-5 w-5" />
            Popular Items You Might Like
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
            {recommendations.map((item) => (
              <li key={item.id}>
                <Link href={`/shop#${item.id}`} className="text-sm text-primary hover:underline hover:text-accent transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
            {/* This message can be updated once ML is integrated */}
            Curated list of popular products. Personalized recommendations coming soon!
          </p>
        </CardContent>
      </Card>
    </aside>
  );
}
