import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Check, Building, Wrench, Users, Truck, Package, HardHat } from "lucide-react";

// Mock data for services
const services = [
  {
    id: "new-construction",
    name: "New Construction",
    description: "From concept to completion, we build robust and beautiful structures tailored to your specifications. We handle all phases of new construction projects for residential, commercial, and industrial clients.",
    benefits: ["Turnkey solutions", "High-quality materials", "Adherence to timelines", "Experienced professionals"],
    visualUrl: "https://placehold.co/600x400.png",
    dataAiHint: "construction site building",
    icon: Building,
  },
  {
    id: "renovations",
    name: "Renovations & Remodeling",
    description: "Modernize your space with our expert renovation services. We specialize in kitchen, bathroom, and full-home remodels, enhancing functionality and aesthetic appeal.",
    benefits: ["Innovative designs", "Space optimization", "Increased property value", "Minimal disruption"],
    visualUrl: "https://placehold.co/600x400.png",
    dataAiHint: "modern kitchen renovation",
    icon: Wrench,
  },
  {
    id: "project-management",
    name: "Project Management",
    description: "Our seasoned project managers ensure your project stays on track, within budget, and meets all quality standards. We coordinate all aspects from planning to execution.",
    benefits: ["Budget control", "Quality assurance", "Risk management", "Effective communication"],
    visualUrl: "https://placehold.co/600x400.png",
    dataAiHint: "blueprint project plan",
    icon: Users,
  },
  {
    id: "hardware-supply",
    name: "Hardware & Material Supply",
    description: "Access a wide range of high-quality construction materials and hardware through our e-commerce platform or direct orders. Competitive pricing and reliable delivery.",
    benefits: ["Extensive product catalog", "Competitive pricing", "Bulk order discounts", "Fast delivery"],
    visualUrl: "https://placehold.co/600x400.png",
    dataAiHint: "hardware tools materials",
    icon: Truck,
  },
  {
    id: "consultation-services",
    name: "Construction Consultation",
    description: "Leverage our expertise for your project planning. We offer consultation on design, material selection, budgeting, and regulatory compliance.",
    benefits: ["Expert advice", "Cost-saving strategies", "Feasibility studies", "Compliance guidance"],
    visualUrl: "https://placehold.co/600x400.png",
    dataAiHint: "construction worker meeting",
    icon: HardHat,
  },
   {
    id: "custom-fabrication",
    name: "Custom Fabrication",
    description: "We provide custom metal and woodwork fabrication services for unique architectural elements, fittings, and fixtures to meet specific project needs.",
    benefits: ["Tailored solutions", "Precision engineering", "Durable materials", "Unique designs"],
    visualUrl: "https://placehold.co/600x400.png",
    dataAiHint: "metal welding workshop",
    icon: Package,
  },
];

export default function ServicesPage() {
  return (
    <div className="space-y-12">
      <section className="text-center fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Our Services</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Comprehensive solutions for all your construction and hardware needs. We are committed to quality, reliability, and customer satisfaction.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={service.id} id={service.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out fade-in" style={{animationDelay: `${index * 0.1}s`}}>
            {service.visualUrl && (
              <div className="aspect-video overflow-hidden">
                <Image
                  src={service.visualUrl}
                  alt={service.name}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={service.dataAiHint}
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-center mb-2">
                <service.icon className="h-8 w-8 text-primary mr-3" />
                <CardTitle className="font-headline text-2xl">{service.name}</CardTitle>
              </div>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-between">
              <div>
                <h4 className="font-semibold mb-2 text-foreground">Key Benefits:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {service.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center">
                      <Check className="h-4 w-4 mr-2 text-accent flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <Button asChild className="mt-6 w-full bg-primary hover:bg-primary/90">
                <Link href="/contact">Request Quote</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
