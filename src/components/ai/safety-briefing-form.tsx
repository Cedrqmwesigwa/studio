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
import { useToast } from '@/hooks/use-toast';
import { generateSafetyBriefing, type GenerateSafetyBriefingInput, type GenerateSafetyBriefingOutput } from '@/ai/flows/ai-safety-briefing-generator';
import { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ShieldAlert, UploadCloud, Image as ImageIcon, AlertTriangle, ListChecks, ClipboardCheck, ShieldQuestion } from 'lucide-react';
import NextImage from 'next/image';
import { Badge } from '@/components/ui/badge';

const safetyBriefingSchema = z.object({
  projectStage: z.string().min(3, { message: "Project stage must be at least 3 characters." }).max(100, { message: "Project stage too long."}),
  sitePhotoDataUri: z.string().optional(), // Will be populated by file handler
  specificConcerns: z.string().max(1000, { message: "Specific concerns too long." }).optional(),
  countryContext: z.string().min(2, { message: "Country context required."}).default("Uganda"),
});

type SafetyBriefingFormValues = z.infer<typeof safetyBriefingSchema>;

export default function SafetyBriefingForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [briefingResult, setBriefingResult] = useState<GenerateSafetyBriefingOutput | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<SafetyBriefingFormValues>({
    resolver: zodResolver(safetyBriefingSchema),
    defaultValues: {
      projectStage: "",
      specificConcerns: "",
      countryContext: "Uganda",
    },
  });

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit for Genkit Gemini default
        toast({
          title: "File too large",
          description: "Please select an image smaller than 4MB.",
          variant: "destructive",
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        form.setValue('sitePhotoDataUri', undefined);
        event.target.value = ''; 
        return;
      }
      setSelectedFile(file);
      setBriefingResult(null); 

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setPreviewUrl(dataUri);
        form.setValue('sitePhotoDataUri', dataUri);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      form.setValue('sitePhotoDataUri', undefined);
    }
  };

  async function onSubmit(data: SafetyBriefingFormValues) {
    setIsLoading(true);
    setBriefingResult(null);
    try {
      const inputData: GenerateSafetyBriefingInput = {
        projectStage: data.projectStage,
        specificConcerns: data.specificConcerns,
        sitePhotoDataUri: data.sitePhotoDataUri,
        countryContext: data.countryContext,
      };
      const result = await generateSafetyBriefing(inputData);
      setBriefingResult(result);
      toast({
        title: "Safety Briefing Generated!",
        description: "AI-powered safety briefing is ready.",
      });
    } catch (error) {
      console.error("Error generating safety briefing:", error);
      let description = "An error occurred. Please try again.";
      if (error instanceof Error && error.message) {
        description += ` Details: ${error.message}`;
      }
      toast({
        title: "Generation Failed",
        description: description,
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
            <ShieldQuestion className="mr-2 h-7 w-7 text-primary" />
            Generate Safety Briefing
          </CardTitle>
          <CardDescription>
            Input project details to receive an AI-generated safety briefing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="projectStage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Stage</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Foundation Work, Roofing, Electrical Wiring" {...field} />
                    </FormControl>
                    <FormDescription>
                      Current phase of the construction project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div>
                <FormLabel htmlFor="sitePhoto">Site Photo (Optional)</FormLabel>
                 <div className="flex items-center justify-center w-full mt-1">
                    <label htmlFor="sitePhoto" className="flex flex-col items-center justify-center w-full h-56 border-2 border-border border-dashed rounded-lg cursor-pointer bg-secondary/50 hover:bg-muted transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag & drop</p>
                            <p className="text-xs text-muted-foreground">PNG, JPG, WEBP (MAX. 4MB)</p>
                        </div>
                        <Input id="sitePhoto" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
                    </label>
                </div>
                {previewUrl && (
                    <div className="mt-4">
                    <h4 className="font-semibold mb-2 text-foreground flex items-center"><ImageIcon className="mr-2 h-5 w-5 text-accent"/>Photo Preview:</h4>
                    <div className="relative w-full max-w-sm h-56 border border-border rounded-md overflow-hidden mx-auto">
                        <NextImage src={previewUrl} alt="Site photo preview" layout="fill" objectFit="contain" />
                    </div>
                    </div>
                )}
                 <FormDescription className="mt-1">
                    Optionally upload a photo of the current site conditions.
                </FormDescription>
              </div>

              <FormField
                control={form.control}
                name="specificConcerns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Concerns (Optional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Working near power lines, recent heavy rains, new team members on site." {...field} rows={3} />
                    </FormControl>
                    <FormDescription>
                      Highlight any particular safety concerns for this briefing.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="countryContext"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country for Context</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Uganda" {...field} />
                    </FormControl>
                    <FormDescription>
                      Helps tailor advice to local conditions/regulations.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full md:w-auto">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Briefing...
                  </>
                ) : (
                  "Generate Briefing"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {briefingResult && (
        <Card className="mt-8 shadow-lg bg-secondary/70 fade-in">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
               <ClipboardCheck className="mr-2 h-6 w-6 text-primary" />
              {briefingResult.safetyBriefingTitle}
            </CardTitle>
            <CardDescription>
              AI-generated safety points for your project.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {briefingResult.photoAnalysisNotes && (
                 <div>
                  <h4 className="font-semibold text-foreground flex items-center mb-2">
                    <ImageIcon className="mr-2 h-5 w-5 text-accent" />
                    Photo Analysis Notes:
                  </h4>
                  <p className="text-sm text-muted-foreground bg-background p-3 rounded-md whitespace-pre-line">{briefingResult.photoAnalysisNotes}</p>
                </div>
            )}
            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-2">
                <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                Key Hazards:
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm text-muted-foreground bg-background p-3 rounded-md">
                {briefingResult.keyHazards.map((hazard, index) => <li key={index}>{hazard}</li>)}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-2">
                <ShieldAlert className="mr-2 h-5 w-5 text-primary" />
                PPE Requirements:
              </h4>
              <div className="flex flex-wrap gap-2 bg-background p-3 rounded-md">
                {briefingResult.ppeRequirements.map((ppe, index) => (
                  <Badge key={index} variant="default" className="text-sm">{ppe}</Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-2">
                <ListChecks className="mr-2 h-5 w-5 text-accent" />
                Preventive Measures:
              </h4>
              <ul className="list-disc list-inside space-y-1 pl-4 text-sm text-muted-foreground bg-background p-3 rounded-md">
                {briefingResult.preventiveMeasures.map((measure, index) => <li key={index}>{measure}</li>)}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground flex items-center mb-2">
                <ShieldQuestion className="mr-2 h-5 w-5" />
                Emergency Procedures:
              </h4>
              <p className="text-sm text-muted-foreground bg-background p-3 rounded-md whitespace-pre-line">{briefingResult.emergencyProcedures}</p>
            </div>
          </CardContent>
           <CardFooter>
             <p className="text-xs text-muted-foreground">
                Disclaimer: This AI-generated briefing is for informational purposes only and should be reviewed by a qualified safety professional. It does not replace site-specific risk assessments or regulatory compliance.
             </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
