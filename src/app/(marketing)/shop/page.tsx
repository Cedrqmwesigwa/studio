
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Tag, Eye } from 'lucide-react';
import { siteConfig } from '@/config/site';

// Mock data for products with UGX pricing and new categories
const products = [
  {
    id: "prod_cem_001",
    name: "Bamburi/Tororo Cement (50kg Bag)",
    description: "High-strength Portland cement suitable for all types of construction work.",
    price: 35000, 
    category: "Cement",
    imageUrl: "https://images.unsplash.com/photo-1583947215259-56f8919aa25a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjZW1lbnQlMjBiYWd8ZW58MHx8fHwxNzUzNzMxOTMyfDA&ixlib=rb-4.0.3&q=80&w=1080",
    dataAiHint: "cement bag",
    stock: 150,
    rating: 4.8,
    reviews: 180,
  },
  {
    id: "prod_rf_001",
    name: "Corrugated Iron Sheets (Gauge 30, 3m)",
    description: "Standard corrugated iron sheets for roofing. Durable and weather-resistant. Price per sheet.",
    price: 45000, 
    category: "Roofing",
    imageUrl: "https://images.unsplash.com/photo-1620756143957-039539391661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpcm9uJTIwc2hlZXRzJTIwc3RhY2t8ZW58MHx8fHwxNzUzNzMyMDA0fDA&ixlib=rb-4.0.3&q=80&w=1080",
    dataAiHint: "iron sheets stack",
    stock: 300,
    rating: 4.4,
    reviews: 95,
  },
  {
    id: "prod_rf_002",
    name: "Clay Roof Tiles (Roman Profile, per Sqm)",
    description: "Classic Roman profile clay roof tiles offering durability and aesthetic appeal. Price per square meter.",
    price: 70000,
    category: "Roofing",
    imageUrl: "https://images.unsplash.com/photo-1589949431411-9832017b667f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjbGF5JTIwcm9vZmkzJTIwdGlsZXN8ZW58MHx8fHwxNzUzNzMyMDQ2fDA&ixlib=rb-4.0.3&q=80&w=1080",
    dataAiHint: "clay roof tiles",
    stock: 100, // sqm
    rating: 4.7,
    reviews: 60,
  },
  {
    id: "prod_pt_001",
    name: "Premium Emulsion Paint (White, 20L)",
    description: "High-quality emulsion paint for interior and exterior walls. Excellent coverage and smooth finish.",
    price: 180000, 
    category: "Paint",
    imageUrl: "https://images.unsplash.com/photo-1576830039239-fb4313f59725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYWludCUyMGJ1Y2tldCUyMHdoaXRlfGVufDB8fHx8MTc1MzczMjA5MXww&ixlib=rb-4.0.3&q=80&w=1080",
    dataAiHint: "paint bucket white",
    stock: 60,
    rating: 4.7,
    reviews: 110,
  },
  {
    id: "prod_pt_002",
    name: "Weatherguard Exterior Paint (Various Colors, 20L)",
    description: "Durable Weatherguard paint for exteriors, providing protection against harsh weather. Multiple colors available.",
    price: 220000,
    category: "Paint",
    imageUrl: "https://images.unsplash.com/photo-1601600310730-eb1a8ddf0424?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYWludCUyMGJ1Y2tldHMlMjBjb2xvcmZ1bHxlbnwwfHx8fDE3NTM3MzIxMjB8MA&ixlib=rb-4.0.3&q=80&w=1080",
    dataAiHint: "paint buckets colorful",
    stock: 40,
    rating: 4.6,
    reviews: 75,
  },
  {
    id: "prod_tl_001",
    name: "Ceramic Floor Tiles (60x60cm, Cream, per Sqm)",
    description: "Durable and elegant cream-colored ceramic floor tiles. Ideal for residential and light commercial use. Price per square meter.",
    price: 55000, 
    category: "Tiles",
    imageUrl: "https://images.unsplash.com/photo-1599819043334-3cb21610ac73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjZXJhbWljJTIwZmxvb3IlMjB0aWxlc3xlbnwwfHx8fDE3NTM3MzIxNTJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
    dataAiHint: "ceramic floor tiles",
    stock: 250, // sqm
    rating: 4.5,
    reviews: 85,
  },
  {
    id: "prod_tl_002",
    name: "Porcelain Wall Tiles (30x60cm, Grey, per Sqm)",
    description: "Modern grey porcelain tiles, perfect for bathroom and kitchen walls. Price per square meter.",
    price: 65000,
    category: "Tiles",
    imageUrl: "https://images.unsplash.com/photo-1603975122492-c0848733721b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwb3JjZWxhaW4lMjB3YWxsJTIwdGlsZXN8ZW58MHx8fHwxNzUzNzMyMTg4fDA&ixlib=rb-4.0.3&q=80&w=1080",
    dataAiHint: "porcelain wall tiles",
    stock: 180, // sqm
    rating: 4.6,
    reviews: 70,
  },
  {
    id: "prod_sc_001",
    name: "Steel Security Door (Standard Size, With Frame)",
    description: "Heavy-duty steel security door with reinforced frame and multi-point locking system.",
    price: 750000,
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1556912173-35feb6c9baae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzdGVlbCUyMHNlY3VyaXR5JTIwZG9vcnxlbnwwfHx8fDE3NTM3MzIyMTN8MA&ixlib=rb-4.0.3&q=80&w=1080",
    dataAiHint: "steel security door",
    stock: 20,
    rating: 4.8,
    reviews: 50,
  },
  {
    id: "prod_sc_002",
    name: "CCTV Dome Camera (Outdoor, Night Vision)",
    description: "Weatherproof outdoor dome CCTV camera with infrared night vision and HD recording.",
    price: 150000,
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1588354392047-a259c391640f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjY3R2JTIwZG9tZSUyMGNhbWVyYXxlbnwwfHx8fDE3NTM3MzIyNDB8MA&ixlib=rb-4.0.3&q=80&w=1080",
    dataAiHint: "cctv dome camera",
    stock: 35,
    rating: 4.3,
    reviews: 40,
  },
  {
    id: "prod_sc_003",
    name: "Safety Helmet (Yellow/White)",
    description: "Hard hat for construction site safety. Meets industry standards. Available in yellow and white.",
    price: 25000, 
    category: "Security", // PPE can be grouped under security/safety
    imageUrl: "https://images.unsplash.com/photo-1581092916369-6f33eb1382ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzYWZldHklMjBoZWxtZXR8ZW58MHx8fHwxNzUzNzMyMjcwfDA&ixlib=rb-4.0.3&q=80&w=1080",
    dataAiHint: "safety helmet",
    stock: 120,
    rating: 4.2,
    reviews: 90,
  }
];

export default function ShopPage() {
  return (
    <div className="space-y-12">
      <section className="text-center fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Hardware & Materials Shop</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our selection of high-quality construction hardware, tools, and materials. All prices in Ugandan Shillings (UGX).
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
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                data-ai-hint={product.dataAiHint}
                priority={index < 4} 
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
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xl font-semibold text-primary flex items-center">
                  <Tag className="h-5 w-5 mr-1.5 text-accent" />
                  UGX {product.price.toLocaleString()}
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
                 <Link href="/services#hardware-supply">Quality & Benefits</Link>
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

