'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { aiProductRecommendation, type AIProductRecommendationInput, type AIProductRecommendationOutput } from '@/ai/flows/ai-product-recommendation';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Sparkles, Lightbulb, CheckSquare } from 'lucide-react';

const productRecommendationSchema = z.object({
  browsingHistory: z.string().min(10, { message: "Browsing history must be at least 10 characters." }).max(2000, { message: "Browsing history is too long."}),
  projectRequirements: z.string().min(10, { message: "Project requirements must be at least 10 characters." }).max(2000, { message: "Project requirements are too long."}),
});

type ProductRecommendationFormValues = z.infer<typeof productRecommendationSchema>;

export default function ProductRecommendationForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState<AIProductRecommendationOutput | null>(null);

  const form = useForm<ProductRecommendationFormValues>({
    resolver: zodResolver(productRecommendationSchema),
    defaultValues: {
      browsingHistory: "",
      projectRequirements: "",
    },
  });

  async function onSubmit(data: ProductRecommendationFormValues) {
    setIsLoading(true);
    setRecommendationResult(null);
    try {
      const inputData: AIProductRecommendationInput = data;
      const result = await aiProductRecommendation(inputData);
      setRecommendationResult(result);
      toast({
        title: "Recommendations Ready!",
        description: "Personalized product recommendations have been generated.",
      });
    } catch (error) {
      console.error("Error getting product recommendations:", error);
      toast({
        title: "Recommendation Failed",
        description: "An error occurred while generating recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Sparkles className="mr-2 h-6 w-6 text-primary" />
            AI Product Advisor
          </CardTitle>
          <CardDescription>
            Tell us about your project and what you've been looking at, and our AI will suggest suitable products using principles of persuasion.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="browsingHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Browsing History / Viewed Products</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Viewed high-gloss tiles, searched for durable countertops, looked at modern faucet designs." {...field} rows={4} />
                    </FormControl>
                    <FormDescription>
                      Describe products or categories you've explored on our site or elsewhere.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Requirements</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Remodeling a small bathroom, need materials for a 10x10ft room, budget is around Ksh 50,000, looking for a minimalist style." {...field} rows={4} />
                    </FormControl>
                     <FormDescription>
                      Detail your project: type, size, style, budget, specific needs.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Finding Products...
                  </>
                ) : (
                  "Get Recommendations"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {recommendationResult && (
        <Card className="mt-8 shadow-lg bg-secondary fade-in">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
               <CheckSquare className="mr-2 h-5 w-5 text-primary" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>
              Here are some product suggestions tailored for you:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-1">
                 Recommended Products:
              </h4>
              <div className="text-sm text-muted-foreground bg-background p-4 rounded-md whitespace-pre-line">{recommendationResult.productRecommendations}</div>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-1">
                <Lightbulb className="mr-2 h-4 w-4 text-accent" />
                Reasoning (Persuasion Principles Applied):
              </h4>
              <div className="text-sm text-muted-foreground bg-background p-4 rounded-md whitespace-pre-line">{recommendationResult.reasoning}</div>
            </div>
          </CardContent>
           <CardFooter>
             <p className="text-xs text-muted-foreground">
                These AI-generated recommendations are a starting point. Feel free to browse our shop or contact us for more options.
             </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
