
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Check, Building, Wrench, Users, Truck, Package, HardHat } from "lucide-react";
import type { Metadata } from 'next';
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Our Services | ${siteConfig.name}`,
  description: `Explore comprehensive construction services from ${siteConfig.name} in Kampala, including new construction, renovations, project management, hardware supply, and consultation. All projects come with a 12-month workmanship guarantee.`,
};
export const revalidate = 86400; // Revalidate at most once per day

// Mock data for services
const services = [
  {
    id: "new-construction",
    name: "New Construction",
    description: "From concept to completion, we build robust and beautiful structures tailored to your specifications. We handle all phases of new construction projects for residential, commercial, and industrial clients in Kampala and across Uganda.",
    benefits: ["Turnkey solutions", "High-quality materials", "Adherence to timelines & budget", "Experienced professionals", "Transparent processes"],
    visualUrl: "https://images.unsplash.com/photo-1672390849364-fa3cd700f072?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMXx8bmV3JTIwY29uc3RydWN0aW9ufGVufDB8fHx8MTc0OTgyOTEzM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "construction site building",
    icon: Building,
  },
  {
    id: "renovations",
    name: "Renovations & Remodeling",
    description: "Modernize your space with our expert renovation services. We specialize in kitchen, bathroom, office, and full-home/business remodels, enhancing functionality and aesthetic appeal with a keen eye for detail.",
    benefits: ["Innovative designs", "Space optimization", "Increased property value", "Minimal disruption", "Quality craftsmanship"],
    visualUrl: "/service_visuals/modern-kitchen-renovation.png",
    dataAiHint: "modern kitchen renovation",
    icon: Wrench,
  },
  {
    id: "project-management",
    name: "Project Management",
    description: "Our seasoned project managers ensure your project stays on track, within budget, and meets all quality standards. We coordinate all aspects from planning to execution using efficient, data-informed strategies and clear communication.",
    benefits: ["Budget control & cost efficiency", "Quality assurance", "Risk management", "Effective communication & reporting", "On-time delivery"],
    visualUrl: "/service_visuals/blueprint-project-plan.png",
    dataAiHint: "blueprint project plan",
    icon: Users,
  },
  {
    id: "hardware-supply",
    name: "Hardware & Material Supply",
    description: "Access a wide range of high-quality construction materials and hardware. Leveraging direct industry experience and strong supplier networks, we ensure competitive pricing and reliable delivery for your project needs.",
    benefits: ["Extensive product catalog", "Competitive pricing", "Bulk order discounts", "Reliable & timely delivery", "Quality assurance on materials"],
    visualUrl: "/service_visuals/hardware-tools-materials.png",
    dataAiHint: "hardware tools materials",
    icon: Truck,
  },
  {
    id: "consultation-services",
    name: "Construction Consultation",
    description: "Leverage our expert advice for your project planning. Our consultations are grounded in quantitative analysis, market insights for design, material selection, budgeting, and regulatory compliance in Uganda.",
    benefits: ["Expert industry advice", "Cost-saving strategies", "Feasibility studies", "Compliance & regulatory guidance", "Data-driven insights"],
    visualUrl: "/service_visuals/construction-worker-meeting.png",
    dataAiHint: "construction worker meeting",
    icon: HardHat,
  },
   {
    id: "custom-fabrication",
    name: "Custom Fabrication",
    description: "We provide custom metal and woodwork fabrication services for unique architectural elements, fittings, and fixtures to meet specific project needs with sterling quality and precision.",
    benefits: ["Tailored solutions to specifications", "Precision engineering & craftsmanship", "Durable & high-quality materials", "Unique & aesthetic designs", "Functional integrations"],
    visualUrl: "https://images.unsplash.com/photo-1531053326607-9d349096d887?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxmYWJyaWNhdGlvbnxlbnwwfHx8fDE3NDk3Mzg2MDJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
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
          Comprehensive solutions for all your construction and hardware needs, backed by data-driven efficiency and transparent practices. We are committed to quality, reliability, and customer satisfaction in every project we undertake in Kampala and beyond, and we stand by our work with a 12-month guarantee on workmanship for all completed projects.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={service.id} id={service.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out fade-in group" style={{animationDelay: `${index * 0.1}s`}}>
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
