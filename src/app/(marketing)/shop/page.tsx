
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Tag, Eye } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Hardware & Materials Shop | ${siteConfig.name}`,
  description: `Browse high-quality construction hardware, tools, and materials. Secure online purchasing and deposits coming soon to ${siteConfig.name}.`,
};

export const revalidate = 3600; // Revalidate at most once per hour

// Mock data for products
const products = [
  {
    id: "prod_001",
    name: "Heavy Duty Cement Mixer",
    description: "Reliable and durable cement mixer for large construction projects. 200L capacity.",
    price: 45000.00,
    category: "Machinery",
    imageUrl: "/product_images/cement-mixer.png",
    dataAiHint: "cement mixer",
    stock: 15,
    rating: 4.5,
    reviews: 25,
  },
  {
    id: "prod_002",
    name: "Premium Quality Cement (50kg Bag)",
    description: "High-strength Portland cement suitable for all types of construction work.",
    price: 650.00,
    category: "Materials",
    imageUrl: "/product_images/cement-bag.png",
    dataAiHint: "cement bag",
    stock: 200,
    rating: 4.8,
    reviews: 150,
  },
  {
    id: "prod_003",
    name: "Professional Toolset (52 Pieces)",
    description: "Comprehensive toolset for contractors, including wrenches, screwdrivers, pliers, and more.",
    price: 8500.00,
    category: "Tools",
    imageUrl: "/product_images/tool-set-box.png",
    dataAiHint: "tool set box",
    stock: 30,
    rating: 4.2,
    reviews: 40,
  },
  {
    id: "prod_004",
    name: "Safety Helmet (Yellow)",
    description: "Hard hat for construction site safety. Meets industry standards.",
    price: 800.00,
    category: "Safety Gear",
    imageUrl: "/product_images/safety-helmet.png",
    dataAiHint: "safety helmet",
    stock: 100,
    rating: 4.0,
    reviews: 80,
  },
  {
    id: "prod_005",
    name: "Reinforcement Steel Bars (1 Ton)",
    description: "High-tensile deformed steel bars for concrete reinforcement. Various sizes available.",
    price: 95000.00,
    category: "Materials",
    imageUrl: "/product_images/steel-rebar.png",
    dataAiHint: "steel rebar",
    stock: 50, // tons
    rating: 4.6,
    reviews: 65,
  },
  {
    id: "prod_006",
    name: "Waterproof Tarpaulin (10m x 12m)",
    description: "Heavy-duty waterproof tarpaulin for covering materials and equipment.",
    price: 3200.00,
    category: "Equipment",
    imageUrl: "/product_images/blue-tarpaulin.png",
    dataAiHint: "blue tarpaulin",
    stock: 75,
    rating: 4.3,
    reviews: 33,
  },
  {
    id: "prod_007",
    name: "Corrugated Iron Sheets (Gauge 30, 3m)",
    description: "Standard corrugated iron sheets for roofing. Durable and weather-resistant. Price per sheet.",
    price: 1200.00,
    category: "Roofing",
    imageUrl: "/product_images/iron-sheets-stack.png",
    dataAiHint: "iron sheets stack",
    stock: 500,
    rating: 4.4,
    reviews: 70,
  },
  {
    id: "prod_008",
    name: "PVC Rain Gutters (4m Length)",
    description: "High-quality PVC rain gutters for effective water drainage. Easy to install. Price per length.",
    price: 1800.00,
    category: "Plumbing",
    imageUrl: "/product_images/pvc-gutters.png",
    dataAiHint: "pvc gutters",
    stock: 150,
    rating: 4.2,
    reviews: 45,
  },
  {
    id: "prod_009",
    name: "Premium Emulsion Paint (White, 20L)",
    description: "High-quality emulsion paint for interior and exterior walls. Excellent coverage and smooth finish.",
    price: 7500.00,
    category: "Paint",
    imageUrl: "/product_images/paint-bucket-white.png",
    dataAiHint: "paint bucket white",
    stock: 80,
    rating: 4.7,
    reviews: 90,
  },
  {
    id: "prod_010",
    name: "Twisted Steel Nails (5kg Box)",
    description: "Assorted sizes of twisted steel nails for general construction and woodworking. High grip strength.",
    price: 950.00,
    category: "Fasteners",
    imageUrl: "/product_images/nails-box.png",
    dataAiHint: "nails box",
    stock: 120,
    rating: 4.3,
    reviews: 55,
  }
];

export default function ShopPage() {
  return (
    <div className="space-y-12">
      <section className="text-center fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Hardware & Materials Shop</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our selection of high-quality construction hardware, tools, and materials. 
          Full e-commerce functionality with cart, checkout, and various payment options is under development.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 fade-in" style={{animationDelay: '0.2s'}}>
        {products.map((product, index) => (
          <Card key={product.id} className="flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300 ease-in-out fade-in" style={{animationDelay: `${index * 0.05 + 0.2}s`}}>
            <div className="aspect-[4/3] overflow-hidden relative">
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={product.dataAiHint}
              />
              <Badge variant="secondary" className="absolute top-2 right-2">{product.category}</Badge>
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button variant="outline" size="sm" className="text-white border-white hover:bg-white/20" onClick={() => alert('Product page coming soon!')}>
                  <Eye className="mr-2 h-4 w-4" /> Quick View
                </Button>
              </div>
            </div>
            <CardHeader>
              <CardTitle className="font-headline text-lg h-14 overflow-hidden">
                {product.name}
              </CardTitle>
              {/* Optional: Short description if needed, but keeping it clean for now */}
              {/* <CardDescription className="h-10 overflow-y-auto text-xs">{product.description}</CardDescription> */}
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xl font-semibold text-primary flex items-center">
                  <Tag className="h-5 w-5 mr-1.5 text-accent" />
                  Ksh {product.price.toLocaleString()}
                </p>
                <Badge variant={product.stock > 0 ? "default" : "destructive"} className={product.stock > 0 ? "bg-green-600 hover:bg-green-700" : ""}>
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                </Badge>
              </div>
               <p className="text-xs text-muted-foreground">{product.description}</p>
            </CardContent>
            <CardFooter className="flex-col items-stretch space-y-2">
              <Button className="w-full bg-primary hover:bg-primary/90" disabled={product.stock === 0} onClick={() => alert('Adding to cart functionality coming soon!')}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
               <Button variant="link" asChild className="text-primary p-0 text-sm">
                 <Link href="/shop">Learn More</Link>
               </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
       <p className="text-center text-muted-foreground text-sm fade-in" style={{animationDelay: '0.4s'}}>
        Note: Individual product pages, cart, and checkout functionalities are currently under development. For purchases or inquiries, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
      </p>
    </div>
  );
}

