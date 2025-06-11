
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { siteConfig } from '@/config/site';


const initialGalleryImages = [
  { id: 1, src: "/gallery_images/modern-kitchen.png", alt: "Completed modern kitchen in a Kampala home", dataAiHint: "modern kitchen", category: "Residential" },
  { id: 2, src: "/gallery_images/office-building.png", alt: "Office building facade in Nakasero", dataAiHint: "office building", category: "Commercial" },
  { id: 3, src: "/gallery_images/luxury-bathroom.png", alt: "Luxury bathroom tiling in a Kololo apartment", dataAiHint: "luxury bathroom", category: "Residential" },
  { id: 4, src: "/gallery_images/warehouse-interior.png", alt: "Industrial warehouse interior in Ntinda", dataAiHint: "warehouse interior", category: "Industrial" },
  { id: 5, src: "/gallery_images/landscaped-garden.png", alt: "Landscaped garden for a villa in Muyenga", dataAiHint: "landscaped garden", category: "Residential" },
  { id: 6, src: "/gallery_images/retail-store.png", alt: "Retail store layout in Acacia Mall", dataAiHint: "retail store", category: "Commercial" },
  { id: 7, src: "/gallery_images/custom-staircase.png", alt: "Custom staircase in a Bugolobi home", dataAiHint: "custom staircase", category: "Residential" },
  { id: 8, src: "/gallery_images/building-foundation.png", alt: "Building foundation work for a new construction in Kampala", dataAiHint: "building foundation", category: "Construction Process" },
  { id: 9, src: "/gallery_images/roof-installation.png", alt: "Roof installation on a commercial property", dataAiHint: "roof installation", category: "Construction Process" },
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
          A visual showcase of our completed projects, hardware installations, and the quality {siteConfig.name} delivers in Kampala and Uganda.
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
