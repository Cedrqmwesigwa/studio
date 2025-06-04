'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';

// Mock data for projects
const allProjects = [
  {
    id: "modern-villa-nairobi",
    title: "Modern Villa in Karen",
    description: "A stunning contemporary villa featuring spacious interiors, smart home technology, and eco-friendly design principles. Completed ahead of schedule and within budget.",
    photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    dataAiHints: ["modern villa exterior", "modern living room", "luxury bathroom"],
    clientTestimonial: "Sterling Solutions Hub exceeded our expectations. Their attention to detail and professionalism were outstanding. We love our new home!",
    projectType: "Residential",
    year: 2023,
    location: "Nairobi, Kenya",
  },
  {
    id: "commercial-hub-cbd",
    title: "CBD Commercial Hub",
    description: "Development of a multi-story commercial complex in the heart of the CBD, including office spaces, retail outlets, and modern amenities.",
    photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    dataAiHints: ["office building exterior", "modern office interior"],
    clientTestimonial: "The team at Sterling Solutions was efficient and highly skilled. They delivered a landmark project for our company.",
    projectType: "Commercial",
    year: 2022,
    location: "Nairobi CBD",
  },
  {
    id: "luxury-apartments-westlands",
    title: "Westlands Luxury Apartments",
    description: "Construction of high-end residential apartments with premium finishes, rooftop pool, and state-of-the-art security systems.",
    photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    dataAiHints: ["apartment building design", "luxury apartment pool"],
    projectType: "Residential",
    year: 2024,
    location: "Westlands, Nairobi",
  },
  {
    id: "industrial-warehouse-complex",
    title: "Industrial Warehouse Complex",
    description: "Design and construction of a large-scale industrial warehouse complex with optimized logistics flow and heavy-duty infrastructure.",
    photos: ["https://placehold.co/600x400.png"],
    dataAiHints: ["large warehouse exterior"],
    projectType: "Industrial",
    year: 2023,
    location: "Industrial Area, Nairobi",
  },
  {
    id: "boutique-hotel-renovation",
    title: "Boutique Hotel Renovation",
    description: "Complete renovation and modernization of a boutique hotel, preserving its historical charm while upgrading facilities and guest experience.",
    photos: ["https://placehold.co/600x400.png", "https://placehold.co/600x400.png"],
    dataAiHints: ["hotel lobby design", "luxury hotel room"],
    projectType: "Commercial",
    year: 2022,
    location: "Mombasa, Kenya"
  }
];

const projectTypes = ["All", ...Array.from(new Set(allProjects.map(p => p.projectType)))];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return allProjects;
    }
    return allProjects.filter(project => project.projectType === activeFilter);
  }, [activeFilter]);

  return (
    <div className="space-y-12">
      <section className="text-center fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Our Portfolio</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Discover the quality and craftsmanship in our completed projects. Each project showcases our commitment to excellence and client satisfaction.
        </p>
      </section>

      <Tabs value={activeFilter} onValueChange={setActiveFilter} className="w-full fade-in" style={{animationDelay: '0.2s'}}>
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:max-w-xl lg:mx-auto">
          {projectTypes.map((type) => (
            <TabsTrigger key={type} value={type}>{type}</TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value={activeFilter} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card key={project.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out fade-in" style={{animationDelay: `${index * 0.1 + 0.2}s`}}>
                <div className="aspect-video overflow-hidden">
                  <Image
                    src={project.photos[0]}
                    alt={project.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    data-ai-hint={project.dataAiHints[0]}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>{project.location}</span>
                    <Badge variant="secondary">{project.projectType}</Badge>
                  </div>
                  <CardDescription className="mt-2 h-20 overflow-y-auto text-sm">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  {project.clientTestimonial && (
                    <div className="p-4 bg-secondary rounded-md mb-4">
                      <Quote className="h-5 w-5 text-accent mb-1" />
                      <p className="text-sm italic text-foreground">"{project.clientTestimonial}"</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    {/* Placeholder link, ideally to a dynamic project page /portfolio/[id] */}
                    <Link href={`/portfolio`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {filteredProjects.length === 0 && (
              <p className="col-span-full text-center text-muted-foreground">No projects found for this category.</p>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
