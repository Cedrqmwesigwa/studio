
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Tag, Eye } from 'lucide-react';
import { siteConfig } from '@/config/site';

// Updated product list based on the provided image (selection)
const products = [
  {
    id: "prod_cem_001",
    name: "JK Cement (50kg Bag)",
    description: "High-quality cement for general construction purposes.",
    price: 38000,
    category: "Cement",
    imageUrl: "https://placehold.co/600x400.png?text=JK+Cement",
    dataAiHint: "cement bag",
    stock: 120,
    rating: 4.7,
    reviews: 150,
  },
  {
    id: "prod_cem_002",
    name: "Hima Cement (50kg Bag)",
    description: "Reliable cement for strong and durable structures.",
    price: 36000,
    category: "Cement",
    imageUrl: "https://placehold.co/600x400.png?text=Hima+Cement",
    dataAiHint: "cement bag brand",
    stock: 200,
    rating: 4.6,
    reviews: 130,
  },
  {
    id: "prod_reinf_001",
    name: "BRC Mesh (Gauge 10, Roll)",
    description: "Welded steel fabric for concrete reinforcement.",
    price: 120000,
    category: "Reinforcement",
    imageUrl: "https://placehold.co/600x400.png?text=BRC+Mesh",
    dataAiHint: "steel mesh roll",
    stock: 50,
    rating: 4.5,
    reviews: 40,
  },
  {
    id: "prod_fence_001",
    name: "Barbed Wire (Roll)",
    description: "Galvanized barbed wire for security fencing.",
    price: 130000,
    category: "Fencing",
    imageUrl: "https://placehold.co/600x400.png?text=Barbed+Wire",
    dataAiHint: "barbed wire coil",
    stock: 75,
    rating: 4.3,
    reviews: 65,
  },
  {
    id: "prod_reinf_002",
    name: "Binding Wire (Gauge 18, Roll)",
    description: "Annealed steel wire for tying reinforcement bars.",
    price: 170000,
    category: "Reinforcement",
    imageUrl: "https://placehold.co/600x400.png?text=Binding+Wire",
    dataAiHint: "wire coil steel",
    stock: 100,
    rating: 4.4,
    reviews: 80,
  },
  {
    id: "prod_pig_001",
    name: "Black Oxide (1kg)",
    description: "Cement pigment for coloring concrete and mortar black.",
    price: 7000,
    category: "Pigments",
    imageUrl: "https://placehold.co/600x400.png?text=Black+Oxide",
    dataAiHint: "black powder pigment",
    stock: 90,
    rating: 4.2,
    reviews: 30,
  },
  {
    id: "prod_pig_002",
    name: "Blue Oxide (1kg)",
    description: "Cement pigment for coloring concrete and mortar blue.",
    price: 17000,
    category: "Pigments",
    imageUrl: "https://placehold.co/600x400.png?text=Blue+Oxide",
    dataAiHint: "blue powder pigment",
    stock: 60,
    rating: 4.3,
    reviews: 25,
  },
  {
    id: "prod_fast_001",
    name: "Bolt and Nut (M10, Each)",
    description: "Standard M10 steel bolt and nut for various applications.",
    price: 1000,
    category: "Fasteners",
    imageUrl: "https://placehold.co/600x400.png?text=Bolt+Nut",
    dataAiHint: "bolt nut steel",
    stock: 500,
    rating: 4.0,
    reviews: 100,
  },
  {
    id: "prod_fence_002",
    name: "Chain Link Fence (25m Roll)",
    description: "Galvanized chain link fencing material, standard height.",
    price: 180000,
    category: "Fencing",
    imageUrl: "https://placehold.co/600x400.png?text=Chain+Link",
    dataAiHint: "chain link fence",
    stock: 40,
    rating: 4.6,
    reviews: 55,
  },
  {
    id: "prod_hw_001",
    name: "Door Hinges (Steel, Pair)",
    description: "Durable steel door hinges for interior and exterior doors.",
    price: 5000,
    category: "Hardware",
    imageUrl: "https://placehold.co/600x400.png?text=Door+Hinges",
    dataAiHint: "door hinges metal",
    stock: 150,
    rating: 4.5,
    reviews: 70,
  },
  {
    id: "prod_paint_001",
    name: "Sadolin Superdec Paint (20L, White)",
    description: "Premium quality emulsion paint for a smooth finish.",
    price: 200000,
    category: "Paint",
    imageUrl: "https://placehold.co/600x400.png?text=Sadolin+Paint",
    dataAiHint: "paint bucket white",
    stock: 80,
    rating: 4.8,
    reviews: 90,
  },
  {
    id: "prod_tiles_001",
    name: "Ceramic Floor Tiles (60x60cm, Sqm)",
    description: "Cream-colored ceramic floor tiles, price per square meter.",
    price: 45000,
    category: "Tiles",
    imageUrl: "https://placehold.co/600x400.png?text=Ceramic+Tiles",
    dataAiHint: "ceramic floor tiles",
    stock: 300, // Sqm
    rating: 4.6,
    reviews: 120,
  },
  {
    id: "prod_safety_001",
    name: "Safety Helmet (Yellow)",
    description: "Standard construction safety helmet for head protection.",
    price: 25000,
    category: "Safety Equipment",
    imageUrl: "https://placehold.co/600x400.png?text=Safety+Helmet",
    dataAiHint: "safety helmet yellow",
    stock: 200,
    rating: 4.7,
    reviews: 110,
  },
  {
    id: "prod_tools_001",
    name: "Round Shovel (Heavy Duty)",
    description: "Durable round point shovel for digging and excavation.",
    price: 30000,
    category: "Tools",
    imageUrl: "https://placehold.co/600x400.png?text=Shovel",
    dataAiHint: "shovel tool",
    stock: 60,
    rating: 4.4,
    reviews: 50,
  },
  {
    id: "prod_plumb_001",
    name: "PVC Pipe (4 inch, 3m Length)",
    description: "Standard PVC pressure pipe for plumbing applications.",
    price: 15000,
    category: "Plumbing",
    imageUrl: "https://placehold.co/600x400.png?text=PVC+Pipe",
    dataAiHint: "pvc pipe plastic",
    stock: 250,
    rating: 4.3,
    reviews: 75,
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
        Note: Product search, filtering, individual product pages, cart, and checkout functionalities are currently under development. For purchases or inquiries, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>.
      </p>
    </div>
  );
}

