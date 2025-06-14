
'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ThumbsUp } from 'lucide-react'; // Using ThumbsUp as a placeholder icon

// Example: Manually curated list of product IDs and names
// In a real scenario, these would be fetched dynamically based on ML recommendations
const staticRecommendedItems = [
  { id: "prod_cem_001", name: "Cement (50kg Bag)" },
  { id: "prod_reinf_001", name: "Reinforcement Steel (Y-grade)" },
  { id: "prod_paint_003", name: "Weather Guard Paint (Outdoor, 20L)" },
  { id: "prod_roof_004", name: "Ironsheets (Galvanized)" },
];

export default function RecommendedProducts() {
  // This component currently shows static recommendations.
  // Future enhancement: Fetch dynamic recommendations from a Genkit flow.

  if (!staticRecommendedItems.length) {
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
            {staticRecommendedItems.map((item) => (
              <li key={item.id}>
                <Link href={`/shop#${item.id}`} className="text-sm text-primary hover:underline hover:text-accent transition-colors">
                  {item.name}
                </Link>
                {/* Placeholder for more details like a small image or price in the future */}
              </li>
            ))}
          </ul>
          <p className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border">
            Dynamic, personalized recommendations based on your activity and popular trends are coming soon!
          </p>
        </CardContent>
      </Card>
    </aside>
  );
}
