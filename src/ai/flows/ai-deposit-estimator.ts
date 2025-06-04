'use server';

/**
 * @fileOverview An AI-powered deposit estimator for construction projects.
 *
 * - estimateDeposit - A function that estimates the deposit amount based on project details.
 * - EstimateDepositInput - The input type for the estimateDeposit function.
 * - EstimateDepositOutput - The return type for the estimateDeposit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EstimateDepositInputSchema = z.object({
  projectType: z.string().describe('The type of project (e.g., bathroom remodel, new construction).'),
  projectDetails: z.string().describe('Detailed description of the project requirements and scope.'),
  materialCostEstimate: z.number().describe('Estimated cost of materials for the project.'),
  laborHoursEstimate: z.number().describe('Estimated number of labor hours required for the project.'),
  projectComplexity: z.enum(['Low', 'Medium', 'High']).describe('The complexity level of the project.'),
});
export type EstimateDepositInput = z.infer<typeof EstimateDepositInputSchema>;

const EstimateDepositOutputSchema = z.object({
  depositRange: z
    .object({
      min: z.number().describe('The minimum recommended deposit amount.'),
      max: z.number().describe('The maximum recommended deposit amount.'),
    })
    .describe('A range of recommended deposit amounts.'),
  reasoning: z.string().describe('Explanation of how the deposit range was determined.'),
  termsAndConditions: z.string().describe('Terms and conditions for the deposit payment.'),
});

export type EstimateDepositOutput = z.infer<typeof EstimateDepositOutputSchema>;

export async function estimateDeposit(input: EstimateDepositInput): Promise<EstimateDepositOutput> {
  return estimateDepositFlow(input);
}

const prompt = ai.definePrompt({
  name: 'estimateDepositPrompt',
  input: {schema: EstimateDepositInputSchema},
  output: {schema: EstimateDepositOutputSchema},
  prompt: `You are an AI assistant that helps construction companies estimate deposit amounts for projects.

  Based on the project details provided, suggest a deposit range (minimum and maximum amount) that would be appropriate for the client to pay upfront.
  Consider material costs, labor hours, and project complexity when determining the deposit range.

  Also, provide a brief explanation of your reasoning for the suggested deposit range.
  Include standard terms and conditions applicable for deposit payments.

  Project Type: {{{projectType}}}
  Project Details: {{{projectDetails}}}
  Material Cost Estimate: {{{materialCostEstimate}}}
  Labor Hours Estimate: {{{laborHoursEstimate}}}
  Project Complexity: {{{projectComplexity}}}
  \nOutput in JSON:
  {{outputFormat schema="EstimateDepositOutputSchema"}}\n`,
});

const estimateDepositFlow = ai.defineFlow(
  {
    name: 'estimateDepositFlow',
    inputSchema: EstimateDepositInputSchema,
    outputSchema: EstimateDepositOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
