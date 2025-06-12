
'use server';
/**
 * @fileOverview An AI-powered dynamic pricing tool for construction projects.
 *
 * - calculateDynamicPrice - A function that calculates a dynamic price based on various factors.
 * - DynamicPricingInput - The input type for the calculateDynamicPrice function.
 * - DynamicPricingOutput - The return type for the calculateDynamicPricing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

export const DynamicPricingInputSchema = z.object({
  baseCost: z.coerce.number().min(1, { message: "Base cost must be greater than 0." }).describe('The initial base cost of the project or service before dynamic adjustments.'),
  customerSegment: z.enum(['New Client', 'Repeat Client', 'VIP Client']).describe('The segment the customer belongs to.'),
  projectLocationTier: z.enum(['Prime Location', 'Standard Location', 'Remote Location']).describe('The tier of the project location, affecting logistical costs and perceived value.'),
  projectComplexity: z.enum(['Low', 'Medium', 'High']).describe('The complexity level of the project.'),
  marketDemand: z.enum(['Low', 'Normal', 'High']).describe('Current market demand for similar services.'),
  urgency: z.enum(['Standard Timeline', 'Rush Request']).describe('The urgency of the project request.')
});
export type DynamicPricingInput = z.infer<typeof DynamicPricingInputSchema>;

export const DynamicPricingOutputSchema = z.object({
  calculatedPrice: z.number().describe('The dynamically calculated price after considering all factors.'),
  adjustmentsBreakdown: z.array(z.object({
    factor: z.string().describe('The factor that led to an adjustment.'),
    description: z.string().describe('How this factor influenced the price.'),
    adjustmentAmount: z.number().describe('The monetary value of the adjustment (positive or negative).'),
  })).describe('A breakdown of adjustments made to the base price.'),
  summary: z.string().describe('A brief summary of the pricing decision.')
});
export type DynamicPricingOutput = z.infer<typeof DynamicPricingOutputSchema>;

export async function calculateDynamicPrice(input: DynamicPricingInput): Promise<DynamicPricingOutput> {
  return dynamicPricingFlow(input);
}

const pricingPrompt = ai.definePrompt({
  name: 'dynamicPricingPrompt',
  input: {schema: DynamicPricingInputSchema},
  output: {schema: DynamicPricingOutputSchema},
  prompt: `You are a sophisticated pricing engine for a construction company called Sterling Contractors.
Your goal is to calculate a dynamic price based on a base cost and several influencing factors.
Provide a final calculated price and a breakdown of how each factor influenced the price from the base cost.

Base Cost: {{{baseCost}}} UGX

Factors to consider:
1.  Customer Segment: {{{customerSegment}}}
    -   New Client: Standard pricing.
    -   Repeat Client: Apply a small discount (e.g., 2-5%) to foster loyalty.
    -   VIP Client: Apply a significant discount (e.g., 5-10%) or offer a premium service add-on at no extra perceived cost which might slightly increase the calculated price but provide more value.
2.  Project Location Tier: {{{projectLocationTier}}}
    -   Prime Location: May justify a slight premium (e.g., 5-10%) due to higher operational costs or perceived value.
    -   Standard Location: No specific adjustment.
    -   Remote Location: May incur additional logistical costs (e.g., 5-15% increase).
3.  Project Complexity: {{{projectComplexity}}}
    -   Low: Standard pricing.
    -   Medium: May require a moderate increase (e.g., 10-20%) due to specialized skills or longer duration.
    -   High: Warrants a significant increase (e.g., 20-40%) due to risk, specialized resources, and extended management.
4.  Market Demand: {{{marketDemand}}}
    -   Low: Consider a slight discount (e.g., 0-5%) to secure the project.
    -   Normal: Standard pricing.
    -   High: May justify a premium (e.g., 5-15%) due to high demand.
5.  Urgency: {{{urgency}}}
    -   Standard Timeline: No specific adjustment.
    -   Rush Request: Apply a premium (e.g., 10-25%) for expedited service and resource reallocation.

Calculation Instructions:
Start with the baseCost. For each factor, determine an appropriate percentage adjustment (or a fixed amount if more suitable for a factor like VIP premium service).
Clearly list each adjustment, its reason, and its monetary impact on the price.
Sum all adjustments with the base cost to arrive at the 'calculatedPrice'.
Provide a 'summary' of the overall pricing strategy for this quote.

Example Adjustment item:
{ factor: "Customer Segment (Repeat Client)", description: "Applied 3% loyalty discount.", adjustmentAmount: -3000 }

Output the result in the specified JSON format.
`,
  config: {
    safetySettings: [
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  },
});

const dynamicPricingFlow = ai.defineFlow(
  {
    name: 'dynamicPricingFlow',
    inputSchema: DynamicPricingInputSchema,
    outputSchema: DynamicPricingOutputSchema,
  },
  async (input) => {
    const {output} = await pricingPrompt(input);
    if (!output) {
      throw new Error('AI model did not return the expected output structure for dynamic pricing.');
    }
    return output;
  }
);
