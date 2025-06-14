
import { config } from 'dotenv';
config();

// Commenting out archived flows to prevent them from being bundled
import '@/ai/flows/ai-product-recommendation.ts'; // Restored
// import '@/ai/flows/ai-deposit-estimator.ts';
// import '@/ai/flows/automated-image-tagging.ts';
import '@/ai/flows/generate-image-flow.ts'; // Keeping this as it wasn't specified for removal
// import '@/ai/flows/ai-safety-briefing-generator.ts';
// import '@/ai/flows/ai-dynamic-pricing-flow.ts';
import '@/ai/flows/get-recommended-products-flow.ts'; // Added new flow
