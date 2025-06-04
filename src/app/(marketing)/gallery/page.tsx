'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft, ArrowRight, Expand, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Mock data for gallery images
const galleryImages = [
  { id: 1, src: "https://placehold.co/800x600.png", alt: "Completed modern kitchen", dataAiHint: "modern kitchen", category: "Residential" },
  { id: 2, src: "https://placehold.co/800x600.png", alt: "Office building facade", dataAiHint: "office building", category: "Commercial" },
  { id: 3, src: "https://placehold.co/800x600.png", alt: "Luxury bathroom tiling", dataAiHint: "luxury bathroom", category: "Residential" },
  { id: 4, src: "https://placehold.co/800x600.png", alt: "Industrial warehouse interior", dataAiHint: "warehouse interior", category: "Industrial" },
  { id: 5, src: "https://placehold.co/800x600.png", alt: "Landscaped garden for villa", dataAiHint: "landscaped garden", category: "Residential" },
  { id: 6, src: "https://placehold.co/800x600.png", alt: "Retail store layout", dataAiHint: "retail store", category: "Commercial" },
  { id: 7, src: "https://placehold.co/800x600.png", alt: "Custom staircase", dataAiHint: "custom staircase", category: "Residential" },
  { id: 8, src: "https://placehold.co/800x600.png", alt: "Building foundation work", dataAiHint: "building foundation", category: "Construction Process" },
  { id: 9, src: "https://placehold.co/800x600.png", alt: "Roof installation", dataAiHint: "roof installation", category: "Construction Process" },
];

export default function GalleryPage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

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

  return (
    <div className="space-y-12">
      <section className="text-center fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Image Gallery</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          A visual showcase of our completed projects, hardware installations, and the quality we deliver.
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
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/75" onClick={closeModal}>
                  <X className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/75" onClick={prevImage}>
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-black/50 hover:bg-black/75" onClick={nextImage}>
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
