import ImageTaggingForm from '@/components/ai/image-tagging-form';

export default function ImageTaggingPage() {
  return (
    <div className="max-w-2xl mx-auto">
       <section className="text-center mb-10 fade-in">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Automated Image Tagging</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Upload your project photos and let our AI automatically generate descriptive tags. This helps in organizing and searching your visual assets efficiently.
        </p>
      </section>
      <ImageTaggingForm />
    </div>
  );
}
