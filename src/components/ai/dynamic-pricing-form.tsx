
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { calculateDynamicPrice, DynamicPricingInputSchema, type DynamicPricingInput, type DynamicPricingOutput } from '@/ai/flows/ai-dynamic-pricing-flow';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, TrendingUp, Tags, BarChart3, ListChecks } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type DynamicPricingFormValues = z.infer<typeof DynamicPricingInputSchema>;

export default function DynamicPricingForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [pricingResult, setPricingResult] = useState<DynamicPricingOutput | null>(null);

  const form = useForm<DynamicPricingFormValues>({
    resolver: zodResolver(DynamicPricingInputSchema),
    defaultValues: {
      baseCost: 0,
      customerSegment: undefined,
      projectLocationTier: undefined,
      projectComplexity: undefined,
      marketDemand: 'Normal',
      urgency: 'Standard Timeline',
    },
  });

  async function onSubmit(data: DynamicPricingFormValues) {
    setIsLoading(true);
    setPricingResult(null);
    try {
      const result = await calculateDynamicPrice(data);
      setPricingResult(result);
      toast({
        title: "Pricing Calculated!",
        description: "Dynamic price has been generated.",
      });
    } catch (error) {
      console.error("Error calculating dynamic price:", error);
      let message = "An error occurred. Please try again.";
      if (error instanceof Error) {
        message = error.message;
      }
      toast({
        title: "Pricing Failed",
        description: message,
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
            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
            Dynamic Pricing Calculator
          </CardTitle>
          <CardDescription>
            Input project and customer factors to generate a dynamic price estimate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="baseCost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Base Project Cost (UGX)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 1000000" {...field} />
                    </FormControl>
                    <FormDescription>
                      The starting cost before dynamic adjustments.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="customerSegment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Segment</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select customer segment" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="New Client">New Client</SelectItem>
                          <SelectItem value="Repeat Client">Repeat Client</SelectItem>
                          <SelectItem value="VIP Client">VIP Client</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="projectLocationTier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Location Tier</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location tier" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Prime Location">Prime Location</SelectItem>
                          <SelectItem value="Standard Location">Standard Location</SelectItem>
                          <SelectItem value="Remote Location">Remote Location</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                 <FormField
                  control={form.control}
                  name="projectComplexity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Complexity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select complexity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                 <FormField
                  control={form.control}
                  name="marketDemand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Market Demand</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select market demand" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Low">Low</SelectItem>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="High">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
               <FormField
                  control={form.control}
                  name="urgency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Urgency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select project urgency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Standard Timeline">Standard Timeline</SelectItem>
                          <SelectItem value="Rush Request">Rush Request</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Calculating Price...
                  </>
                ) : (
                  "Calculate Dynamic Price"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {pricingResult && (
        <Card className="mt-8 shadow-lg bg-secondary/70 fade-in">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
               <Tags className="mr-2 h-5 w-5 text-primary" />
              Dynamic Pricing Result
            </CardTitle>
            <CardDescription>
              Based on the provided factors, here's the AI-generated price estimation:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center p-6 bg-background rounded-lg shadow">
              <p className="text-sm text-muted-foreground">Estimated Dynamic Price</p>
              <p className="font-headline text-4xl font-bold text-primary">
                UGX {pricingResult.calculatedPrice.toLocaleString()}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-2 text-lg">
                <ListChecks className="mr-2 h-5 w-5 text-accent" />
                Pricing Adjustments:
              </h4>
              <div className="space-y-3">
                {pricingResult.adjustmentsBreakdown.map((adj, index) => (
                  <div key={index} className="p-3 bg-background rounded-md shadow-sm text-sm">
                    <p className="font-semibold text-foreground">{adj.factor}</p>
                    <p className="text-muted-foreground italic">"{adj.description}"</p>
                    <p className={`font-medium ${adj.adjustmentAmount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Adjustment: UGX {adj.adjustmentAmount.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />

            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-2 text-lg">
                <BarChart3 className="mr-2 h-5 w-5 text-accent" />
                Summary:
              </h4>
              <p className="text-sm text-muted-foreground bg-background p-4 rounded-md shadow-sm whitespace-pre-line">{pricingResult.summary}</p>
            </div>
          </CardContent>
           <CardFooter>
             <p className="text-xs text-muted-foreground">
                Disclaimer: This is an AI-generated estimate. Actual project costs and final quotes may vary. This tool is for preliminary estimation purposes.
             </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
