'use server';
/**
 * @fileOverview An AI-powered safety briefing generator for construction projects.
 *
 * - generateSafetyBriefing - A function that generates a safety briefing based on project stage and optional photo.
 * - GenerateSafetyBriefingInput - The input type for the generateSafetyBriefing function.
 * - GenerateSafetyBriefingOutput - The return type for the generateSafetyBriefing function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSafetyBriefingInputSchema = z.object({
  projectStage: z.string().min(3).describe('The current stage of the construction project (e.g., Foundation, Roofing, Electrical Installation, Interior Finishing).'),
  sitePhotoDataUri: z
    .string()
    .optional()
    .describe(
      "An optional photo of the current construction site, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  specificConcerns: z.string().optional().describe('Any specific areas of concern or focus for this safety briefing.'),
  countryContext: z.string().default("Uganda").describe("The country where the construction project is located, to provide context for common local hazards or regulations.")
});
export type GenerateSafetyBriefingInput = z.infer<typeof GenerateSafetyBriefingInputSchema>;

const GenerateSafetyBriefingOutputSchema = z.object({
  safetyBriefingTitle: z.string().describe('A concise title for the safety briefing (e.g., "Daily Safety Briefing: Roofing Stage").'),
  keyHazards: z.array(z.string()).describe('A list of key potential hazards relevant to the project stage and photo (if provided).'),
  ppeRequirements: z.array(z.string()).describe('A list of recommended/required Personal Protective Equipment (PPE).'),
  preventiveMeasures: z.array(z.string()).describe('A list of key preventive measures to mitigate the identified hazards.'),
  emergencyProcedures: z.string().describe('A brief outline of emergency procedures, including first aid location and emergency contact information.'),
  photoAnalysisNotes: z.string().optional().describe("Specific observations or hazards noted if a photo was provided and analyzed.")
});
export type GenerateSafetyBriefingOutput = z.infer<typeof GenerateSafetyBriefingOutputSchema>;

export async function generateSafetyBriefing(input: GenerateSafetyBriefingInput): Promise<GenerateSafetyBriefingOutput> {
  return generateSafetyBriefingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSafetyBriefingPrompt',
  input: {schema: GenerateSafetyBriefingInputSchema},
  output: {schema: GenerateSafetyBriefingOutputSchema},
  prompt: `You are an expert Construction Safety Officer. Your task is to generate a practical and concise safety briefing tailored to a specific construction project stage in {{countryContext}}.

Project Stage: {{{projectStage}}}
{{#if specificConcerns}}Specific Concerns: {{{specificConcerns}}}{{/if}}

{{#if sitePhotoDataUri}}
Photo Analysis: Carefully examine the provided site photo for any visible or potential hazards. Incorporate these observations into the 'Key Hazards' and 'Photo Analysis Notes' sections.
Site Photo: {{media url=sitePhotoDataUri}}
{{else}}
(No photo provided for analysis)
{{/if}}

Based on the project stage, any specific concerns, and photo analysis (if applicable), provide the following:
1.  A clear "Safety Briefing Title".
2.  A list of "Key Hazards" (3-5 main hazards).
3.  A list of essential "PPE Requirements".
4.  A list of actionable "Preventive Measures" (corresponding to hazards).
5.  A brief section on "Emergency Procedures" including a placeholder for first aid location and site emergency contact.
6.  If a photo was analyzed, include specific observations in "Photo Analysis Notes". Otherwise, omit this field or state no photo was analyzed.

The briefing should be clear, actionable, and relevant to common construction site practices in {{countryContext}}. Prioritize common and high-risk hazards for the given stage.
Example Emergency Procedure: "First Aid Kit: Located in the site office. Emergency Contact: Site Manager (John Doe - 07XX XXX XXX). In case of serious injury, call emergency services immediately."
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

const generateSafetyBriefingFlow = ai.defineFlow(
  {
    name: 'generateSafetyBriefingFlow',
    inputSchema: GenerateSafetyBriefingInputSchema,
    outputSchema: GenerateSafetyBriefingOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error('AI model did not return the expected output structure for the safety briefing.');
    }
    return output;
  }
);
