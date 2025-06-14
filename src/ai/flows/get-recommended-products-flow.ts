
'use server';
/**
 * @fileOverview A Genkit flow to fetch recommended products.
 *
 * - getRecommendedProducts - A function that returns a list of recommended products.
 * - RecommendedProductsOutput - The return type for the getRecommendedProducts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RecommendedProductItemSchema = z.object({
  id: z.string().describe('The unique identifier of the product.'),
  name: z.string().describe('The display name of the product.'),
});
export type RecommendedProductItem = z.infer<typeof RecommendedProductItemSchema>;

const GetRecommendedProductsOutputSchema = z.object({
  recommendations: z.array(RecommendedProductItemSchema).describe('A list of recommended products.'),
});
export type GetRecommendedProductsOutput = z.infer<typeof GetRecommendedProductsOutputSchema>;

// This is the hardcoded list, mimicking the previous static data.
// In the future, this data would come from a database or an ML model.
const hardcodedRecommendations: RecommendedProductItem[] = [
  { id: "prod_cem_001", name: "Cement (50kg Bag)" },
  { id: "prod_reinf_001", name: "Reinforcement Steel (Y-grade)" },
  { id: "prod_paint_003", name: "Weather Guard Paint (Outdoor, 20L)" },
  { id: "prod_roof_004", name: "Ironsheets (Galvanized)" },
];

export async function getRecommendedProducts(): Promise<GetRecommendedProductsOutput> {
  return getRecommendedProductsFlow();
}

const getRecommendedProductsFlow = ai.defineFlow(
  {
    name: 'getRecommendedProductsFlow',
    inputSchema: z.undefined(), // No input for now
    outputSchema: GetRecommendedProductsOutputSchema,
  },
  async () => {
    // In a real scenario, this is where you'd query a database,
    // call an ML model, or implement other logic to get dynamic recommendations.
    // For now, we return the hardcoded list.
    return {
      recommendations: hardcodedRecommendations,
    };
  }
);
