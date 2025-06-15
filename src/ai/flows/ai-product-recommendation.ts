
// src/ai/flows/ai-product-recommendation.ts
'use server';

/**
 * @fileOverview AI-powered tool to provide personalized product recommendations based on browsing history and project requirements using Robert Cialdini's principles of persuasion.
 *
 * - aiProductRecommendation - A function that handles the product recommendation process.
 * - AIProductRecommendationInput - The input type for the aiProductRecommendation function.
 * - AIProductRecommendationOutput - The return type for the aiProductRecommendation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIProductRecommendationInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe('The user browsing history, including viewed products and project details.'),
  projectRequirements: z
    .string()
    .describe('The user project requirements, including type of project, materials needed, and budget.'),
});

export type AIProductRecommendationInput = z.infer<typeof AIProductRecommendationInputSchema>;

const AIProductRecommendationOutputSchema = z.object({
  productRecommendations: z
    .string()
    .describe("A string listing specific, actionable product recommendations. For example: 'Based on your interest in roofing and a mid-range budget, consider our Galvanized Iron Sheets (Standard Gauge) and WeatherGuard Exterior Paint. For plumbing, our PVC pipes and fittings are a popular choice.'"),
  reasoning: z
    .string()
    .describe("A string explaining the reasoning behind the recommendations, explicitly stating how Cialdini's principles of persuasion (e.g., Social Proof, Scarcity, Authority) were applied. For example: 'These items are frequently bought together (Social Proof) and are currently part of a limited-time bundle offer (Scarcity). Our experts (Authority) often recommend this combination for similar projects.'"),
});

export type AIProductRecommendationOutput = z.infer<typeof AIProductRecommendationOutputSchema>;

export async function aiProductRecommendation(input: AIProductRecommendationInput): Promise<AIProductRecommendationOutput> {
  return aiProductRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProductRecommendationPrompt',
  input: {schema: AIProductRecommendationInputSchema},
  output: {schema: AIProductRecommendationOutputSchema},
  prompt: `You are an AI product recommendation expert for a construction and hardware supply company. Your goal is to provide personalized product recommendations.
You MUST leverage Robert Cialdini's principles of persuasion (Reciprocity, Scarcity, Authority, Commitment and Consistency, Liking, Social Proof, Unity) in your reasoning.

Input Data:
Browsing History: {{{browsingHistory}}}
Project Requirements: {{{projectRequirements}}}

Based on this input, generate product recommendations.
Your entire response MUST be a JSON object that strictly adheres to the schema defined for AIProductRecommendationOutputSchema.
The 'productRecommendations' field must be a string listing specific products.
The 'reasoning' field must be a string explaining your choices AND how Cialdini's principles were applied.
Do not include any text or explanations outside of this JSON structure.

Example of how to structure the 'reasoning' field:
"Based on your interest in 'X' (Commitment & Consistency), we recommend 'Product A' and 'Product B'. 'Product A' is a bestseller (Social Proof) and often paired with 'Product C' by professionals (Authority). We're also offering a small discount if you purchase today (Reciprocity/Scarcity)."

Output JSON:
{{outputFormat schema="AIProductRecommendationOutputSchema"}}
  `,
});

const aiProductRecommendationFlow = ai.defineFlow(
  {
    name: 'aiProductRecommendationFlow',
    inputSchema: AIProductRecommendationInputSchema,
    outputSchema: AIProductRecommendationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('AI model did not return the expected output structure for product recommendations.');
    }
    return output;
  }
);


    