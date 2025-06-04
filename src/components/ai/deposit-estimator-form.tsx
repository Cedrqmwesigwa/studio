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
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { estimateDeposit, type EstimateDepositInput, type EstimateDepositOutput } from '@/ai/flows/ai-deposit-estimator';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, BadgeDollarSign, Info, FileText } from 'lucide-react';

const depositEstimatorSchema = z.object({
  projectType: z.string().min(3, { message: "Project type must be at least 3 characters." }),
  projectDetails: z.string().min(20, { message: "Project details must be at least 20 characters." }),
  materialCostEstimate: z.coerce.number().min(0, { message: "Material cost estimate must be a positive number." }),
  laborHoursEstimate: z.coerce.number().min(1, { message: "Labor hours estimate must be at least 1." }),
  projectComplexity: z.enum(['Low', 'Medium', 'High'], { required_error: "Please select project complexity." }),
});

type DepositEstimatorFormValues = z.infer<typeof depositEstimatorSchema>;

export default function DepositEstimatorForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [estimationResult, setEstimationResult] = useState<EstimateDepositOutput | null>(null);

  const form = useForm<DepositEstimatorFormValues>({
    resolver: zodResolver(depositEstimatorSchema),
    defaultValues: {
      projectType: "",
      projectDetails: "",
      materialCostEstimate: 0,
      laborHoursEstimate: 0,
      projectComplexity: undefined,
    },
  });

  async function onSubmit(data: DepositEstimatorFormValues) {
    setIsLoading(true);
    setEstimationResult(null);
    try {
      const inputData: EstimateDepositInput = data;
      const result = await estimateDeposit(inputData);
      setEstimationResult(result);
      toast({
        title: "Estimation Complete!",
        description: "Deposit range has been successfully estimated.",
      });
    } catch (error) {
      console.error("Error estimating deposit:", error);
      toast({
        title: "Estimation Failed",
        description: "An error occurred while estimating the deposit. Please try again.",
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
            <BadgeDollarSign className="mr-2 h-6 w-6 text-primary" />
            AI Deposit Estimator
          </CardTitle>
          <CardDescription>
            Provide project details to get an AI-powered deposit estimation range.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Type</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Bathroom Remodel, New Construction" {...field} />
                    </FormControl>
                    <FormDescription>
                      Specify the type of construction project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="projectDetails"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Details</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe the project scope, requirements, dimensions, desired finishes, etc." {...field} rows={5} />
                    </FormControl>
                     <FormDescription>
                      Be as detailed as possible for a more accurate estimation.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="materialCostEstimate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Material Cost (Ksh)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="50000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="laborHoursEstimate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estimated Labor Hours</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="120" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="projectComplexity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Complexity</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select complexity level" />
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
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Estimating...
                  </>
                ) : (
                  "Estimate Deposit"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {estimationResult && (
        <Card className="mt-8 shadow-lg bg-secondary fade-in">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
               <BadgeDollarSign className="mr-2 h-5 w-5 text-primary" />
              Estimated Deposit Range
            </CardTitle>
            <CardDescription>
              Based on the provided information, here's the AI-powered estimation:
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center p-6 bg-background rounded-md shadow">
              <p className="text-sm text-muted-foreground">Recommended Deposit</p>
              <p className="font-headline text-3xl font-bold text-primary">
                Ksh {estimationResult.depositRange.min.toLocaleString()} - Ksh {estimationResult.depositRange.max.toLocaleString()}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-1">
                <Info className="mr-2 h-4 w-4 text-accent" />
                Reasoning:
              </h4>
              <p className="text-sm text-muted-foreground bg-background p-3 rounded-md">{estimationResult.reasoning}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-1">
                <FileText className="mr-2 h-4 w-4 text-accent" />
                Terms and Conditions:
              </h4>
              <p className="text-xs text-muted-foreground bg-background p-3 rounded-md whitespace-pre-line">{estimationResult.termsAndConditions}</p>
            </div>
          </CardContent>
          <CardFooter>
             <p className="text-xs text-muted-foreground">
                Note: This is an AI-generated estimate. Actual deposit amounts may vary. Please consult with our team for a formal quote.
             </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
