
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Users, TrendingUp, Eye } from 'lucide-react';
import { siteConfig } from '@/config/site';

export const revalidate = 3600; // Revalidate at most once per hour

// Updated mock data for services to include images
const featuredServices = [
  { 
    name: "New Construction", 
    description: "Building your vision from the ground up with precision and quality.", 
    imageUrl: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxuZXclMjBjb25zdHJ1Y3Rpb24lMjB1Z2FuZGF8ZW58MHx8fHwxNzQ5NzMwNDQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "new home construction site",
    href: "/services#new-construction" 
  },
  { 
    name: "Renovations", 
    description: "Transforming spaces with modern designs and expert craftsmanship.", 
    imageUrl: "https://images.unsplash.com/photo-1604159848821-104723525eb4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxyZW5vdmF0aW9uJTIwaG91c2V8ZW58MHx8fHwxNzQ5NzMwNTMzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "kitchen renovation modern",
    href: "/services#renovations" 
  },
  { 
    name: "Project Management", 
    description: "Expert oversight for seamless execution and timely delivery.", 
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwcm9qZWN0JTIwbWFuYWdlbWVudCUyMGNvbnN0cnVjdGlvbnxlbnwwfHx8fDE3NDk3MzA1OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "construction blueprint planning",
    href: "/services#project-management" 
  },
];

const whyChooseUsItems = [
  { title: "Sterling Quality", description: "Exacting standards and high-quality materials in every detail, reflecting our name.", icon: CheckCircle },
  { title: "Efficient & Timely", description: "Data-driven project management ensures on-schedule delivery, because your time is valuable.", icon: TrendingUp },
  { title: "Transparent Operations", description: "Clear communication, upfront pricing, and transparent use of funds to build lasting trust.", icon: Eye },
  { title: "Experienced & Analytical", description: "Leveraging years of industry experience and quantitative expertise for your project's success.", icon: Users },
];

const featuredProjects = [
  { title: "Modern Villa", image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtb2Rlcm4lMjB2aWxsYXxlbnwwfHx8fDE3NDk3MzA2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080", dataAiHint: "modern villa", type: "Residential", href: "/portfolio" },
  { title: "Commercial Complex", image: "/project_showcase_images/commercial-building.png", dataAiHint: "commercial building", type: "Commercial", href: "/portfolio" },
  { title: "Luxury Apartment", image: "/project_showcase_images/luxury-apartment.png", dataAiHint: "luxury apartment", type: "Residential", href: "/portfolio" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center text-center fade-in group">
        <Image
          src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwdWdhbmRhJTIwYmx1cnJlZHxlbnwwfHx8fDE3NDk3MzA0MDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Modern construction site"
          fill
          priority={true}
          sizes="100vw"
          className="object-cover z-0 brightness-50 group-hover:brightness-75 transition-filter duration-500 ease-in-out"
          data-ai-hint="modern construction panoramic"
        />
        <div className="relative z-10 p-6 md:p-8 bg-black/50 rounded-lg shadow-xl backdrop-blur-sm max-w-4xl mx-auto">
          <h1 className="font-headline text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Building Excellence, Delivering Quality
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-100">
            {siteConfig.description}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/portfolio">View Our Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/contact">Get a Quote</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Services Section */}
      <section className="container px-4 md:px-6">
        <div className="text-center mb-12 fade-in">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Our Core Services</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Comprehensive solutions tailored to your project requirements, backed by data-driven efficiency and transparent practices.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service, index) => (
            <Card 
              key={service.name} 
              className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group fade-in"
              style={{animationDelay: `${index * 0.1 + 0.2}s`}}
            >
              <div className="aspect-video relative">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={service.dataAiHint}
                  priority={index < 3} 
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button variant="link" asChild className="text-primary">
                  <Link href={service.href}>Learn More &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-12 md:py-20 bg-secondary rounded-lg">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12 fade-in" style={{animationDelay: '0.2s'}}>
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Why {siteConfig.name}?</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
             Experience the difference with our commitment to quality, transparency, data-driven efficiency, and client satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseUsItems.map((item, index) => (
              <div 
                key={item.title} 
                className="flex flex-col items-center text-center p-4 bg-background rounded-lg shadow-md hover:shadow-lg transition-shadow fade-in"
                style={{animationDelay: `${index * 0.1 + 0.3}s`}}
              >
                <item.icon className="h-10 w-10 text-accent mb-4" />
                <h3 className="font-headline text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="container px-4 md:px-6">
        <div className="text-center mb-12 fade-in" style={{animationDelay: '0.2s'}}>
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            A glimpse into our portfolio of successful constructions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => (
            <Card 
              key={project.title} 
              className="overflow-hidden group hover:shadow-xl transition-shadow duration-300 fade-in"
              style={{animationDelay: `${index * 0.1 + 0.3}s`}}
            >
              <div className="aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={project.dataAiHint}
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-lg">{project.title}</CardTitle>
                <CardDescription>{project.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <Link href={project.href}>View Project Details</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12 fade-in" style={{animationDelay: '0.4s'}}>
          <Button asChild size="lg" variant="default">
            <Link href="/portfolio">Explore All Projects</Link>
          </Button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 bg-primary text-primary-foreground rounded-lg shadow-lg fade-in" style={{animationDelay: '0.2s'}}>
        <div className="container px-4 md:px-6 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Next Project?</h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-blue-100">
            Let's discuss how {siteConfig.name} can bring your vision to life.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href={siteConfig.support.email ? `mailto:${siteConfig.support.email}` : "/contact"}>Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
