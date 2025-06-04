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
    .describe('A list of personalized product recommendations based on the user browsing history and project requirements, leveraging principles of persuasion.'),
  reasoning: z
    .string()
    .describe('The reasoning behind the product recommendations, including how the principles of persuasion were applied.'),
});

export type AIProductRecommendationOutput = z.infer<typeof AIProductRecommendationOutputSchema>;

export async function aiProductRecommendation(input: AIProductRecommendationInput): Promise<AIProductRecommendationOutput> {
  return aiProductRecommendationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProductRecommendationPrompt',
  input: {schema: AIProductRecommendationInputSchema},
  output: {schema: AIProductRecommendationOutputSchema},
  prompt: `You are an AI product recommendation expert, specializing in recommending hardware and materials based on user browsing history and project requirements, leveraging Robert Cialdini's principles of persuasion.

  Consider the user's browsing history and project requirements to provide personalized product recommendations.
  Explain the reasoning behind each recommendation, explicitly stating which principle of persuasion is being applied (e.g., Reciprocity, Scarcity, Authority, Commitment and Consistency, Liking, Social Proof, and Unity).

  Browsing History: {{{browsingHistory}}}
  Project Requirements: {{{projectRequirements}}}
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
    return output!;
  }
);
