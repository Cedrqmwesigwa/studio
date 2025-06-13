
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
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Sparkles, Lightbulb } from 'lucide-react';
import { aiProductRecommendation, type AIProductRecommendationInput, type AIProductRecommendationOutput } from '@/ai/flows/ai-product-recommendation';

const formSchema = z.object({
  browsingHistory: z.string().min(10, { message: "Please describe some browsing history or viewed items (min 10 characters)." }).max(1000),
  projectRequirements: z.string().min(10, { message: "Please describe your project requirements (min 10 characters)." }).max(1000),
});

type ProductRecommendationFormValues = z.infer<typeof formSchema>;

export default function ProductRecommendationForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState<AIProductRecommendationOutput | null>(null);

  const form = useForm<ProductRecommendationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      browsingHistory: "",
      projectRequirements: "",
    },
  });

  async function onSubmit(data: ProductRecommendationFormValues) {
    setIsLoading(true);
    setRecommendationResult(null);
    try {
      const input: AIProductRecommendationInput = {
        browsingHistory: data.browsingHistory,
        projectRequirements: data.projectRequirements,
      };
      const result = await aiProductRecommendation(input);
      setRecommendationResult(result);
      toast({
        title: "Recommendations Generated!",
        description: "AI has provided product suggestions.",
      });
    } catch (error: any) {
      console.error("Error getting product recommendations:", error);
      toast({
        title: "Recommendation Failed",
        description: error.message || "An error occurred while generating recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-primary" />
            Tell Us About Your Needs
          </CardTitle>
          <CardDescription>
            The more details you provide, the better the AI can assist you.
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
                    <FormLabel>Browsing History / Viewed Items</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Looked at cement bags, iron sheets, and paint rollers..." {...field} rows={3} />
                    </FormControl>
                    <FormDescription>What products or types of items have you been looking at?</FormDescription>
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
                      <Textarea placeholder="e.g., Building a small residential house, need materials for roofing and basic plumbing, budget around 20M UGX." {...field} rows={4} />
                    </FormControl>
                    <FormDescription>Describe your project, materials needed, and any budget constraints.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Get Recommendations
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {recommendationResult && (
        <Card className="mt-8 shadow-lg fade-in">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-primary" />
              AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg">Recommended Products:</h4>
              <p className="text-muted-foreground whitespace-pre-wrap">{recommendationResult.productRecommendations}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Reasoning:</h4>
              <p className="text-muted-foreground whitespace-pre-wrap">{recommendationResult.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
