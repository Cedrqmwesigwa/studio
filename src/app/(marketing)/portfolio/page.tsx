
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Quote } from 'lucide-react';
import { siteConfig } from '@/config/site';


// Mock data for projects
const allProjects = [
  {
    id: "modern-villa-nairobi", // Location implies old context, should be Kampala for Sterling Contractors
    title: "Modern Villa in Muyenga", // Example Kampala location
    description: "A stunning contemporary villa featuring spacious interiors, smart home technology, and eco-friendly design principles. Completed ahead of schedule and within budget in Kampala.",
    photos: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxtb2Rlcm4lMjB2aWxsYXxlbnwwfHx8fDE3NDk3MzA2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "/project_showcase_images/modern-living-room.png",
        "/project_showcase_images/luxury-bathroom-villa.png"
    ],
    dataAiHints: ["modern villa exterior", "modern living room", "luxury bathroom"],
    clientTestimonial: "Sterling Contractors exceeded our expectations. Their attention to detail and professionalism were outstanding. We love our new home!",
    projectType: "Residential",
    year: 2023,
    location: "Muyenga, Kampala",
  },
  {
    id: "commercial-hub-cbd",
    title: "Nakasero Commercial Hub", // Example Kampala location
    description: "Development of a multi-story commercial complex in the heart of Nakasero, including office spaces, retail outlets, and modern amenities.",
    photos: [
        "/project_showcase_images/office-building-exterior-cbd.png",
        "/project_showcase_images/modern-office-interior-cbd.png"
    ],
    dataAiHints: ["office building exterior", "modern office interior"],
    clientTestimonial: "The team at Sterling Contractors was efficient and highly skilled. They delivered a landmark project for our company.",
    projectType: "Commercial",
    year: 2022,
    location: "Nakasero, Kampala",
  },
  {
    id: "luxury-apartments-kololo", // Example Kampala location
    title: "Kololo Luxury Apartments",
    description: "Construction of high-end residential apartments with premium finishes, rooftop pool, and state-of-the-art security systems in Kololo.",
    photos: [
        "https://images.unsplash.com/photo-1604014237800-1c9102c219da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnR8ZW58MHx8fHwxNzUzNTk2NjU4fDA&ixlib=rb-4.0.3&q=80&w=1080",
        "/project_showcase_images/luxury-apartment-pool-westlands.png"
    ],
    dataAiHints: ["luxury apartment", "luxury apartment pool"],
    projectType: "Residential",
    year: 2024,
    location: "Kololo, Kampala",
  },
  {
    id: "industrial-warehouse-complex-ntinda", // Example Kampala location
    title: "Ntinda Industrial Warehouse",
    description: "Design and construction of a large-scale industrial warehouse complex in Ntinda with optimized logistics flow and heavy-duty infrastructure.",
    photos: ["https://images.unsplash.com/photo-1586528116022-aeda1613c63d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxpbmR1c3RyaWFsJTIwd2FyZWhvdXNlfGVufDB8fHx8MTc0OTczNTA3Nnww&ixlib=rb-4.1.0&q=80&w=1080"],
    dataAiHints: ["large warehouse exterior"],
    projectType: "Industrial",
    year: 2023,
    location: "Ntinda, Kampala",
  },
  {
    id: "boutique-hotel-renovation-entebbe", // Example Ugandan location
    title: "Entebbe Boutique Hotel Renovation",
    description: "Complete renovation and modernization of a boutique hotel in Entebbe, preserving its charm while upgrading facilities and guest experience.",
    photos: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsfGVufDB8fHx8MTc0OTczNTE1Mnww&ixlib=rb-4.1.0&q=80&w=1080",
        "/project_showcase_images/luxury-hotel-room-renovated.png"
    ],
    dataAiHints: ["boutique hotel", "luxury hotel room"],
    projectType: "Commercial",
    year: 2022,
    location: "Entebbe, Uganda"
  }
];

const projectTypes = ["All", ...Array.from(new Set(allProjects.map(p => p.projectType)))];

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  useEffect(() => {
    document.title = `Our Portfolio | ${siteConfig.name}`;
  }, []);

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
          Discover the quality and craftsmanship in our completed projects. Each project showcases our commitment to excellence and client satisfaction in Kampala and across Uganda.
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
              <Card key={project.id} className="flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300 ease-in-out fade-in" style={{animationDelay: `${index * 0.1 + 0.2}s`}}>
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
                    <Link href={`/portfolio`}>View Details (Coming Soon)</Link>
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
       <p className="text-center text-muted-foreground text-sm fade-in" style={{animationDelay: '0.4s'}}>
        Note: Individual project detail pages are under development.
      </p>
    </div>
  );
}

