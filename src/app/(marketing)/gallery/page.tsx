
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';


const initialGalleryImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1600489000022-c2086d79f9d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjBraXRjaGVufGVufDB8fHx8MTc0OTczNDAwMnww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Completed modern kitchen in a Kampala home", dataAiHint: "modern kitchen", category: "Residential" },
  { id: 2, src: "https://images.unsplash.com/photo-1483357962636-e8cc552b1a08?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxvZmZpY2UlMjBidWlsZGluZyUyMGZhY2FkZXxlbnwwfHx8fDE3NDk3MzQwNTV8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Office building facade in Nakasero", dataAiHint: "office building", category: "Commercial" },
  { id: 3, src: "/gallery_images/luxury-bathroom.png", alt: "Luxury bathroom tiling in a Kololo apartment", dataAiHint: "luxury bathroom", category: "Residential" },
  { id: 4, src: "https://images.unsplash.com/photo-1553413077-190dd305871c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxM3x8aW5kdXN0cmlhbCUyMHdhcmVob3VzZSUyMGludGVyaXJ8ZW58MHx8fHwxNzQ5NzMzOTA1fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Industrial warehouse interior in Ntinda", dataAiHint: "warehouse interior", category: "Industrial" },
  { id: 5, src: "/gallery_images/landscaped-garden.png", alt: "Landscaped garden for a villa in Muyenga", dataAiHint: "landscaped garden", category: "Residential" },
  { id: 6, src: "https://images.unsplash.com/photo-1504532686278-1baa5d6358cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNXx8cmV0YWlsJTIwc3RvcmUlMjBsYXlvdXR8ZW58MHx8fHwxNzQ5NzM0MjI5fDA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Retail store layout in Acacia Mall", dataAiHint: "retail store", category: "Commercial" },
  { id: 7, src: "https://images.unsplash.com/photo-1523789248610-bb592e870951?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Y3VzdG9tJTIwc3RhaXJjYXNlfGVufDB8fHx8MTc0OTczNDMwNHww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Custom staircase in a Bugolobi home", dataAiHint: "custom staircase", category: "Residential" },
  { id: 8, src: "https://images.unsplash.com/photo-1495036019936-220b29b930ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxuZXclMjBjb25zdHJ1Y3Rpb24lMjBmb3VuZGF0aW9ufGVufDB8fHx8MTc0OTczNDE4NXww&ixlib=rb-4.1.0&q=80&w=1080", alt: "Building foundation work for a new construction in Kampala", dataAiHint: "building foundation", category: "Construction Process" },
  { id: 9, src: "/gallery_images/roof-installation.png", alt: "Roof installation on a commercial property", dataAiHint: "roof installation", category: "Construction Process" },
  { id: 10, src: "https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aW50ZXJpciUyMGRlc2lnbiUyMGluZHVzcmlhbHxlbnwwfHx8fDE3NDk3MzM5NzF8MA&ixlib=rb-4.1.0&q=80&w=1080", alt: "Manually uploaded showcase image", dataAiHint: "showcase example", category: "Showcase" },
];

// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState(initialGalleryImages);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setGalleryImages(shuffleArray(initialGalleryImages));
  }, []);


  const openModal = (index: number) => setSelectedImageIndex(index);
  const closeModal = () => setSelectedImageIndex(null);

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + galleryImages.length) % galleryImages.length);
    }
  };
  
  const currentImage = selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;

  // Set page title dynamically on client if needed, though metadata API is preferred for SEO
  useEffect(() => {
    document.title = `Image Gallery | ${siteConfig.name}`;
  }, []);


  if (!isClient) {
    // Render a loading state or null on the server to avoid hydration mismatch
    // for the shuffled gallery. The actual shuffle happens client-side.
    return (
        <div className="space-y-12">
            <section className="text-center fade-in">
                <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Image Gallery</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
                A visual showcase of our completed projects, hardware installations, and the quality we deliver in Kampala and Uganda.
                </p>
            </section>
            <div className="text-center text-muted-foreground">Loading gallery...</div>
        </div>
    );
  }

  return (
    <div className="space-y-12">
      <section className="text-center fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Image Gallery</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A visual showcase of our completed projects, hardware installations, and the quality ${siteConfig.name} delivers in Kampala and Uganda.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 fade-in" style={{animationDelay: '0.2s'}}>
        {galleryImages.map((image, index) => (
          <Dialog key={image.id} onOpenChange={(isOpen) => !isOpen && closeModal()}>
            <DialogTrigger asChild onClick={() => openModal(index)}>
              <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-0 aspect-square relative">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={image.dataAiHint}
                    priority={index < 8} // Prioritize loading first 8 images (e.g. two rows in a 4-column layout)
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Expand className="h-8 w-8 text-white" />
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>
             {selectedImageIndex === index && currentImage && (
              <DialogContent className="max-w-3xl p-0 border-0 bg-transparent shadow-none">
                <div className="relative aspect-video">
                   <Image
                    src={currentImage.src}
                    alt={currentImage.alt}
                    fill
                    sizes="90vw"
                    className="object-contain rounded-md"
                    data-ai-hint={currentImage.dataAiHint}
                  />
                </div>
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/75 z-10" onClick={closeModal}>
                  <X className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/75 z-10" onClick={prevImage}>
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/75 z-10" onClick={nextImage}>
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </DialogContent>
            )}
          </Dialog>
        ))}
      </section>
    </div>
  );
}

