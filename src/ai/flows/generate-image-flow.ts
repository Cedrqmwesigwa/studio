
'use server';
/**
 * @fileOverview A Genkit flow to generate images using AI.
 *
 * - generateImage - A function that takes a text prompt and returns a generated image as a data URI.
 * - GenerateImageInput - The input type for the generateImage function.
 * - GenerateImageOutput - The return type for the generateImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateImageInputSchema = z.object({
  prompt: z.string().describe('A textual prompt to guide the image generation.'),
});
export type GenerateImageInput = z.infer<typeof GenerateImageInputSchema>;

const GenerateImageOutputSchema = z.object({
  imageDataUri: z
    .string()
    .describe(
      "The generated image as a data URI. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateImageOutput = z.infer<typeof GenerateImageOutputSchema>;

export async function generateImage(input: GenerateImageInput): Promise<GenerateImageOutput> {
  return generateImageFlow(input);
}

const generateImageFlow = ai.defineFlow(
  {
    name: 'generateImageFlow',
    inputSchema: GenerateImageInputSchema,
    outputSchema: GenerateImageOutputSchema,
  },
  async (input) => {
    const {mediaArr} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-exp',
      prompt: input.prompt,
      config: {
        responseModalities: ['IMAGE'], // Per Gemini docs, for only image, TEXT is not strictly needed here.
                                         // If issues arise, can add TEXT back: ['TEXT', 'IMAGE']
      },
    });
    
    const media = mediaArr?.[0];

    if (!media?.url) {
      // Attempt to provide more insight from the response if available
      const outputText = mediaArr?.map(m => m.text).join(' ') || 'No additional text output from model.';
      console.error('Image generation failed or returned no media URL. Model output:', outputText);
      throw new Error(`Image generation failed. Model may have refused the prompt or an error occurred. Details: ${outputText}`);
    }
    
    return { imageDataUri: media.url };
  }
);
