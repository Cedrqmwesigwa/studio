'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { tagImage, type TagImageInput, type TagImageOutput } from '@/ai/flows/automated-image-tagging';
import { useState, ChangeEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Tags, UploadCloud, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image'; // next/image for preview
import { Badge } from '@/components/ui/badge';

export default function ImageTaggingForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [taggingResult, setTaggingResult] = useState<TagImageOutput | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit, as per Genkit Gemini default
        toast({
          title: "File too large",
          description: "Please select an image smaller than 4MB.",
          variant: "destructive",
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        event.target.value = ''; // Reset file input
        return;
      }
      setSelectedFile(file);
      setTaggingResult(null); // Clear previous results

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit() {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select an image file to tag.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setTaggingResult(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onload = async (e) => {
        const photoDataUri = e.target?.result as string;
        if (!photoDataUri) {
            throw new Error("Could not read file data.");
        }
        const inputData: TagImageInput = { photoDataUri };
        const result = await tagImage(inputData);
        setTaggingResult(result);
        toast({
          title: "Image Tagged!",
          description: "AI-generated tags have been applied.",
        });
         setIsLoading(false);
      };
      reader.onerror = (error) => {
        throw error;
      }
    } catch (error) {
      console.error("Error tagging image:", error);
      toast({
        title: "Tagging Failed",
        description: "An error occurred while tagging the image. Please ensure it's a valid image format (JPEG, PNG, WEBP) and try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-8">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-2xl flex items-center">
            <Tags className="mr-2 h-6 w-6 text-primary" />
            AI Image Tagger
          </CardTitle>
          <CardDescription>
            Upload a project photo and let our AI automatically generate relevant tags for easy searching and categorization.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="imageFile" className="mb-2 block text-sm font-medium">Upload Project Photo</Label>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="imageFile" className="flex flex-col items-center justify-center w-full h-64 border-2 border-border border-dashed rounded-lg cursor-pointer bg-secondary hover:bg-muted transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">PNG, JPG, GIF, WEBP up to 4MB</p>
                    </div>
                    <Input id="imageFile" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/gif, image/webp" />
                </label>
            </div>
          </div>

          {previewUrl && (
            <div className="mt-4">
              <h4 className="font-semibold mb-2 text-foreground flex items-center"><ImageIcon className="mr-2 h-5 w-5 text-accent"/>Image Preview:</h4>
              <div className="relative w-full max-w-md h-64 border border-border rounded-md overflow-hidden mx-auto">
                <Image src={previewUrl} alt="Selected preview" layout="fill" objectFit="contain" />
              </div>
            </div>
          )}

          <Button onClick={handleSubmit} disabled={isLoading || !selectedFile} className="w-full md:w-auto">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Tagging Image...
              </>
            ) : (
              "Generate Tags"
            )}
          </Button>
        </CardContent>
      </Card>

      {taggingResult && taggingResult.tags.length > 0 && (
        <Card className="mt-8 shadow-lg bg-secondary fade-in">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center">
               <Tags className="mr-2 h-5 w-5 text-primary" />
              Generated Tags
            </CardTitle>
             <CardDescription>
              Here are the AI-generated tags for your image:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {taggingResult.tags.map((tag, index) => (
                <Badge key={index} variant="default" className="text-sm bg-primary hover:bg-primary/90">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
           <CardFooter>
             <p className="text-xs text-muted-foreground">
                These tags can be used to categorize and search for your project photos.
             </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
