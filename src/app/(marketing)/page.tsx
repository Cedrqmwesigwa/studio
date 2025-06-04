import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Building, Users, Wrench } from 'lucide-react';
import { siteConfig } from '@/config/site';

// Mock data for services and portfolio items
const featuredServices = [
  { name: "New Construction", description: "Building your vision from the ground up.", icon: Building, href: "/services#new-construction" },
  { name: "Renovations", description: "Transforming spaces with modern designs.", icon: Wrench, href: "/services#renovations" },
  { name: "Project Management", description: "Expert oversight for seamless execution.", icon: Users, href: "/services#project-management" },
];

const featuredProjects = [
  { title: "Modern Villa", image: "https://placehold.co/600x400.png", dataAiHint: "modern villa", type: "Residential", href: "/portfolio/modern-villa" },
  { title: "Commercial Complex", image: "https://placehold.co/600x400.png", dataAiHint: "commercial building", type: "Commercial", href: "/portfolio/commercial-complex" },
  { title: "Luxury Apartment", image: "https://placehold.co/600x400.png", dataAiHint: "luxury apartment", type: "Residential", href: "/portfolio/luxury-apartment" },
];

export default function HomePage() {
  return (
    <div className="flex flex-col items-center space-y-16 md:space-y-24">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-40 bg-gradient-to-br from-primary to-blue-700 rounded-lg shadow-xl fade-in">
        <div className="container px-4 md:px-6 text-center text-primary-foreground">
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Building Excellence, Delivering Quality
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-blue-100">
            Sterling Solutions Hub is your trusted partner for all construction and hardware needs. We bring expertise, reliability, and innovation to every project.
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
      <section className="container px-4 md:px-6 fade-in" style={{animationDelay: '0.2s'}}>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Our Core Services</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            Comprehensive solutions tailored to your project requirements.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredServices.map((service) => (
            <Card key={service.name} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="items-center">
                <service.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle className="font-headline text-xl">{service.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">{service.description}</p>
                <Button variant="link" asChild className="mt-4 text-primary">
                  <Link href={service.href}>Learn More &rarr;</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full py-12 md:py-20 bg-secondary rounded-lg fade-in" style={{animationDelay: '0.4s'}}>
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Why Sterling Solutions?</h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
              Experience the difference with our commitment to quality and client satisfaction.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Quality Craftsmanship", description: "Exacting standards in every detail." },
              { title: "Reliable Timelines", description: "Projects delivered on schedule, every time." },
              { title: "Transparent Pricing", description: "Clear, upfront costs with no surprises." },
              { title: "Expert Team", description: "Skilled professionals dedicated to your success." },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center p-4">
                <CheckCircle className="h-10 w-10 text-accent mb-3" />
                <h3 className="font-headline text-lg font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="container px-4 md:px-6 fade-in" style={{animationDelay: '0.6s'}}>
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Featured Projects</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-muted-foreground">
            A glimpse into our portfolio of successful constructions.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Card key={project.title} className="overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={project.dataAiHint}
                />
              </div>
              <CardHeader>
                <CardTitle className="font-headline text-lg">{project.title}</CardTitle>
                <CardDescription>{project.type}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" asChild className="w-full">
                  <Link href={project.href}>View Project</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" variant="default">
            <Link href="/portfolio">Explore All Projects</Link>
          </Button>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="w-full py-16 bg-primary text-primary-foreground rounded-lg shadow-lg fade-in" style={{animationDelay: '0.8s'}}>
        <div className="container px-4 md:px-6 text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">Ready to Start Your Next Project?</h2>
          <p className="mt-4 max-w-xl mx-auto text-lg text-blue-100">
            Let's discuss how Sterling Solutions Hub can bring your vision to life.
          </p>
          <Button asChild size="lg" className="mt-8 bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href={siteConfig.support.email ? `mailto:${siteConfig.support.email}` : "/contact"}>Contact Us Today</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
