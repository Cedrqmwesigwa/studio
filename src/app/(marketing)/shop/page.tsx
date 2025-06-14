
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Tag, Eye, FileImage, Lightbulb, Sparkles, Loader2 } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useMemo, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription as FormDesc, // Renamed to avoid conflict with CardDescription
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { aiProductRecommendation, type AIProductRecommendationInput, type AIProductRecommendationOutput } from '@/ai/flows/ai-product-recommendation';
import { cn } from '@/lib/utils';

const recommendationFormSchema = z.object({
  browsingHistory: z.string().min(10, { message: "Please describe some browsing history or viewed items (min 10 characters)." }).max(1000),
  projectRequirements: z.string().min(10, { message: "Please describe your project requirements (min 10 characters)." }).max(1000),
});

type RecommendationFormValues = z.infer<typeof recommendationFormSchema>;

const products = [
  {
    id: "prod_adh_001",
    name: "Adhesive",
    description: "General purpose construction adhesive.",
    price: 18000,
    category: "Adhesives & Sealants",
    imageUrl: "https://images.unsplash.com/photo-1598961121493-0fcb8f6cbfd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxhZGhlc2l2ZSUyMHR1YmV8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "adhesive tube",
    stock: 150,
    rating: 4.4,
    reviews: 60,
  },
  {
    id: "prod_reinf_004",
    name: "BRC Mesh",
    description: "Welded steel fabric for concrete reinforcement.",
    price: 350000,
    category: "Reinforcement",
    imageUrl: "https://images.unsplash.com/photo-1595972424993-0cf6b1273a68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c3RlZWwlMjBtZXNoJTIwcm9sbHxlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "steel mesh roll",
    stock: 30,
    rating: 4.6,
    reviews: 45,
  },
  {
    id: "prod_painttool_001",
    name: "Baby Roller",
    description: "Small paint roller for detailed work.",
    price: 5000,
    category: "Painting Tools",
    imageUrl: "https://images.unsplash.com/photo-1626724814900-61c0ef9385a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxwYWludCUyMHJvbGxlciUyMHNtYWxsfGVufDB8fHx8MTc0OTkxNjYwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "paint roller small",
    stock: 200,
    rating: 4.3,
    reviews: 90,
  },
  {
    id: "prod_fence_003",
    name: "Barbed Wire",
    description: "Galvanized barbed wire for security fencing.",
    price: 145000,
    category: "Fencing",
    imageUrl: "https://images.unsplash.com/photo-1656795102168-b32f79b2d1ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxiYXJiZWQlMjB3aXJlJTIwY29pbHxlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "barbed wire coil",
    stock: 60,
    rating: 4.5,
    reviews: 70,
  },
  {
    id: "prod_plumb_003",
    name: "Bend (Pipe Fitting)",
    description: "Pipe bend for plumbing and drainage systems.",
    price: 6000,
    category: "Plumbing & Drainage",
    imageUrl: "https://images.unsplash.com/photo-1560883123-04646fef95df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwaXBlJTIwZml0dGluZyUyMGJlbmR8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "pipe fitting bend",
    stock: 250,
    rating: 4.2,
    reviews: 50,
  },
  {
    id: "prod_roof_002",
    name: "Bull Nose Sheets",
    description: "Curved roofing sheets for aesthetic finishes.",
    price: 39000,
    category: "Roofing & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1738495475890-bc3d45cf4cdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxidWxsbm9zZSUyMHJvb2ZpbmclMjBzaGVldHxlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "bullnose roofing sheet",
    stock: 100,
    rating: 4.6,
    reviews: 30,
  },
  {
    id: "prod_board_001",
    name: "Ceiling Board",
    description: "Standard ceiling boards for interior finishing.",
    price: 30000,
    category: "Boards & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1739173967901-fe10b11e99a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjZWlsaW5nJTIwcGFuZWx8ZW58MHx8fHwxNzQ5OTE2NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "ceiling panel",
    stock: 300,
    rating: 4.4,
    reviews: 80,
  },
  {
    id: "prod_fast_002",
    name: "Ceiling Nails (1kg)",
    description: "Specialized nails for fixing ceiling boards.",
    price: 12000,
    category: "Fasteners",
    imageUrl: "https://images.unsplash.com/photo-1669236392160-74bba8ac32cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxuYWlscyUyMGJveHxlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "nails box",
    stock: 180,
    rating: 4.3,
    reviews: 65,
  },
  {
    id: "prod_cem_001",
    name: "Cement (50kg Bag)",
    description: "General purpose Portland cement.",
    price: 32000,
    category: "Cement",
    imageUrl: "https://images.unsplash.com/photo-1728026462560-91b60aac93b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjZW1lbnQlMjBiYWd8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "cement bag",
    stock: 500,
    rating: 4.7,
    reviews: 250,
    isFeatured: true,
  },
  {
    id: "prod_fence_004",
    name: "Chain Link Fence",
    description: "Galvanized chain link fencing material.",
    price: 180000,
    category: "Fencing",
    imageUrl: "https://images.unsplash.com/photo-1722540552533-26e80bbc85ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjaGFpbiUyMGxpbmslMjBmZW5jZSUyMHJvbGx8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "chain link fence roll",
    stock: 40,
    rating: 4.6,
    reviews: 55,
  },
  {
    id: "prod_gutter_001",
    name: "Clips (Gutters)",
    description: "Fixing clips for gutter installation.",
    price: 2500,
    category: "Plumbing & Drainage",
    imageUrl: "https://images.unsplash.com/photo-1547306720-44f7c7c03836?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxndXR0ZXIlMjBjbGlwfGVufDB8fHx8MTc0OTkxNjYwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "gutter clip",
    stock: 400,
    rating: 4.1,
    reviews: 30,
  },
  {
    id: "prod_fast_003",
    name: "Concrete Nails (1kg)",
    description: "Hardened steel nails for concrete applications.",
    price: 5000,
    category: "Fasteners",
    imageUrl: "https://images.unsplash.com/photo-1660299517028-3bb9e48c716d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjb25jcmV0ZSUyMG5haWxzfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "concrete nails",
    stock: 300,
    rating: 4.5,
    reviews: 110,
  },
  {
    id: "prod_fittings_001",
    name: "Connector (Facial Board)",
    description: "Connectors for joining facial boards.",
    price: 12000,
    category: "Roofing & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1536369212193-d7af891df5c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8Ym9hcmQlMjBjb25uZWN0b3J8ZW58MHx8fHwxNzQ5OTE2NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "board connector",
    stock: 150,
    rating: 4.3,
    reviews: 20,
  },
  {
    id: "prod_gutter_002",
    name: "Connectors (Gutters)",
    description: "Connectors for joining gutter sections.",
    price: 8000,
    category: "Plumbing & Drainage",
    imageUrl: "https://images.unsplash.com/photo-1648657070400-2b3c1cd1ac39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxndXR0ZXIlMjBjb25uZWN0b3J8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "gutter connector",
    stock: 200,
    rating: 4.2,
    reviews: 25,
  },
  {
    id: "prod_fittings_002",
    name: "Corners (Facial Board)",
    description: "Corner pieces for facial board installations.",
    price: 22000,
    category: "Roofing & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1672957387463-abde9e76314b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxib2FyZCUyMGNvcm5lcnxlbnwwfHx8fDE3NDk5MTY2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "board corner",
    stock: 100,
    rating: 4.4,
    reviews: 15,
  },
  {
    id: "prod_gutter_003",
    name: "Corners (Gutters)",
    description: "Corner pieces for gutter systems.",
    price: 8000,
    category: "Plumbing & Drainage",
    imageUrl: "https://images.unsplash.com/photo-1616488312210-d0298a0d1c25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxndXR0ZXIlMjBjb3JuZXIlMjBwaWVjZXxlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "gutter corner piece",
    stock: 180,
    rating: 4.3,
    reviews: 22,
  },
  {
    id: "prod_fittings_003",
    name: "End Caps (Generic)",
    description: "End caps for various finishing purposes.",
    price: 2500,
    category: "Fittings",
    imageUrl: "https://images.unsplash.com/photo-1698159929647-61fbbe9a8d15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwaXBlJTIwZW5kJTIwY2FwfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "pipe end cap",
    stock: 300,
    rating: 4.0,
    reviews: 18,
  },
  {
    id: "prod_roof_003",
    name: "Endcap (Versatile)",
    description: "Endcap for versatile roofing sheets.",
    price: 10000,
    category: "Roofing & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1669215526577-c25a8f063677?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxyb29maW5nJTIwZW5kY2FwfGVufDB8fHx8MTc0OTkxNjYwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "roofing endcap",
    stock: 120,
    rating: 4.5,
    reviews: 10,
  },
  {
    id: "prod_constmat_001",
    name: "Expanded Metal Lath",
    description: "Metal lath for plastering and reinforcement.",
    price: 35000,
    category: "Construction Materials",
    imageUrl: "https://images.unsplash.com/photo-1707069631653-48bc17c10997?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxleHBhbmRlZCUyMG1ldGFsJTIwc2hlZXR8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "expanded metal sheet",
    stock: 80,
    rating: 4.4,
    reviews: 25,
  },
  {
    id: "prod_board_002",
    name: "Facial Board",
    description: "Boards for facial and soffit applications.",
    price: 66000,
    category: "Boards & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1617358619438-c6ffb0a44ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb25zdHJ1Y3Rpb24lMjBib2FyZHxlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "construction board",
    stock: 90,
    rating: 4.5,
    reviews: 20,
  },
  {
    id: "prod_tiles_001",
    name: "Floor Tiles (Sqm)",
    description: "Standard ceramic floor tiles, price per square meter.",
    price: 25000,
    category: "Tiles",
    imageUrl: "https://images.unsplash.com/photo-1661479340204-cf420dc7fbbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjZXJhbWljJTIwZmxvb3IlMjB0aWxlc3xlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "ceramic floor tiles",
    stock: 500,
    rating: 4.6,
    reviews: 120,
  },
  {
    id: "prod_finish_001",
    name: "Grout (1kg)",
    description: "Tile grout for filling gaps between tiles.",
    price: 15000,
    category: "Tiling Accessories",
    imageUrl: "https://images.unsplash.com/photo-1651761483492-7d2e26dd3455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxncm91dCUyMHBvd2RlciUyMGJhZ3xlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "grout powder bag",
    stock: 100,
    rating: 4.3,
    reviews: 40,
  },
  {
    id: "prod_gutter_004",
    name: "Gutters (Per Length)",
    description: "Rainwater gutters for roofing systems.",
    price: 28000,
    category: "Plumbing & Drainage",
    imageUrl: "https://images.unsplash.com/photo-1610630027760-95bdaf7bf0cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxyYWluJTIwZ3V0dGVyJTIwc2VjdGlvbnxlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "rain gutter section",
    stock: 150,
    rating: 4.5,
    reviews: 35,
  },
  {
    id: "prod_solar_001",
    name: "Inverter Hybrid",
    description: "Hybrid solar inverter for power systems.",
    price: 1490000,
    category: "Solar & Electrical",
    imageUrl: "https://images.unsplash.com/photo-1668097613572-40b7c11c8727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzb2xhciUyMGludmVydGVyfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "solar inverter",
    stock: 10,
    rating: 4.8,
    reviews: 15,
  },
  {
    id: "prod_roof_004",
    name: "Ironsheets (Galvanized)",
    description: "Standard galvanized iron roofing sheets.",
    price: 34000,
    category: "Roofing & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1733578234132-f40198e27f8b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxtZXRhbCUyMHJvb2ZpbmclMjBzaGVldHxlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "metal roofing sheet",
    stock: 400,
    rating: 4.4,
    reviews: 90,
  },
  {
    id: "prod_roof_005",
    name: "Ironsheets (Prepainted)",
    description: "Prepainted iron roofing sheets, various colors.",
    price: 40900,
    category: "Roofing & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1714722676101-2f5014690055?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjb2xvcmVkJTIwcm9vZmluZyUyMHNoZWV0fGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "colored roofing sheet",
    stock: 300,
    rating: 4.6,
    reviews: 70,
  },
  {
    id: "prod_solar_002",
    name: "Lithium Battery",
    description: "High-capacity lithium battery for solar systems.",
    price: 990000,
    category: "Solar & Electrical",
    imageUrl: "https://images.unsplash.com/photo-1605191737662-98ba90cb953e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzb2xhciUyMGJhdHRlcnl8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "solar battery",
    stock: 15,
    rating: 4.7,
    reviews: 20,
  },
  {
    id: "prod_board_003",
    name: "Marine Board",
    description: "Water-resistant marine plywood board.",
    price: 1, // Placeholder price
    category: "Boards & Timber",
    imageUrl: "https://images.unsplash.com/photo-1687398209712-de4252610814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8cGx5d29vZCUyMHNoZWV0fGVufDB8fHx8MTc0OTkxNjYwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "plywood sheet",
    stock: 50,
    rating: 4.5,
    reviews: 10,
  },
  {
    id: "prod_toolacc_001",
    name: "Masking Tape",
    description: "Painter's masking tape for clean edges.",
    price: 2000,
    category: "Painting Accessories",
    imageUrl: "https://images.unsplash.com/photo-1707934517789-bfba682a5c31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxtYXNraW5nJTIwdGFwZSUyMHJvbGx8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "masking tape roll",
    stock: 500,
    rating: 4.2,
    reviews: 150,
  },
  {
    id: "prod_elec_002",
    name: "Outlet (Electrical)",
    description: "Electrical wall outlet/socket.",
    price: 1, // Placeholder price
    category: "Solar & Electrical",
    imageUrl: "https://images.unsplash.com/photo-1667568169653-cfe0fee209c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHx3YWxsJTIwc29ja2V0fGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "wall socket",
    stock: 200,
    rating: 4.3,
    reviews: 40,
  },
  {
    id: "prod_finish_002",
    name: "Paste (Texture)",
    description: "Textured wall paste for decorative finishes.",
    price: 180000,
    category: "Paints & Finishes",
    imageUrl: "https://images.unsplash.com/photo-1563481878783-432cd6cdab60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxwYWludCUyMHBhc3RlJTIwYnVja2V0fGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "paint paste bucket",
    stock: 30,
    rating: 4.6,
    reviews: 25,
  },
  {
    id: "prod_plumb_004",
    name: "Pipe Clips",
    description: "Clips for securing pipes to walls or surfaces.",
    price: 2000,
    category: "Plumbing & Drainage",
    imageUrl: "https://images.unsplash.com/photo-1710429498920-e63ffe6f258c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxwaXBlJTIwc3VwcG9ydCUyMGNsaXB8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "pipe support clip",
    stock: 600,
    rating: 4.1,
    reviews: 70,
  },
  {
    id: "prod_plumb_005",
    name: "Pipes (PVC/Metal, Per Length)",
    description: "Various types of pipes for plumbing or construction.",
    price: 23000,
    category: "Plumbing & Drainage",
    imageUrl: "https://images.unsplash.com/photo-1665302477865-1c82561d0d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwdmMlMjBwaXBlcyUyMHN0YWNrfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "pvc pipes stack",
    stock: 400,
    rating: 4.4,
    reviews: 60,
  },
  {
    id: "prod_roof_006",
    name: "Plain Sheets (Galvanized)",
    description: "Flat galvanized plain sheets for various uses.",
    price: 110000,
    category: "Roofing & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1718725622477-297fcc090874?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8ZmxhdCUyMG1ldGFsJTIwc2hlZXR8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "flat metal sheet",
    stock: 70,
    rating: 4.3,
    reviews: 30,
  },
  {
    id: "prod_fence_005",
    name: "Plain Wire (Roll)",
    description: "Galvanized plain wire for fencing or general use.",
    price: 8000, // Price seems low for a roll, might be per kg or smaller roll.
    category: "Fencing",
    imageUrl: "https://images.unsplash.com/photo-1696150874769-ea4f30453c2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHx3aXJlJTIwY29pbCUyMHBsYWlufGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "wire coil plain",
    stock: 200,
    rating: 4.2,
    reviews: 40,
  },
  {
    id: "prod_fence_006",
    name: "Razor Wire (Roll)",
    description: "Concertina razor wire for high-security fencing.",
    price: 35000,
    category: "Fencing",
    imageUrl: "https://images.unsplash.com/photo-1739289043191-201357661bb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxyYXpvciUyMHdpcmUlMjBjb2lsfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "razor wire coil",
    stock: 50,
    rating: 4.7,
    reviews: 20,
  },
  {
    id: "prod_reinf_001",
    name: "Reinforcement Steel (Y-grade, Per Length)",
    description: "High tensile deformed steel bars for structural reinforcement.",
    price: 45000,
    category: "Reinforcement",
    imageUrl: "https://images.unsplash.com/photo-1728394504490-d7b457880f7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzdGVlbCUyMHJlYmFyfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "steel rebar",
    stock: 300,
    rating: 4.7,
    reviews: 90,
    isFeatured: true,
  },
  {
    id: "prod_roof_007",
    name: "Ridges (Standard)",
    description: "Standard roofing ridges for apex covering.",
    price: 16500,
    category: "Roofing & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1505975064594-c71d5454823e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxyb29mJTIwcmlkZ2UlMjBjYXB8ZW58MHx8fHwxNzQ5OTE2NjA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "roof ridge cap",
    stock: 200,
    rating: 4.4,
    reviews: 40,
  },
  {
    id: "prod_roof_008",
    name: "Ridges (Versatile)",
    description: "Versatile roofing ridges for specific sheet profiles.",
    price: 29000,
    category: "Roofing & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1663192166842-4bfdfb3cebed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzcGVjaWFsJTIwcm9vZiUyMHJpZGdlfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "special roof ridge",
    stock: 100,
    rating: 4.5,
    reviews: 15,
  },
  {
    id: "prod_painttool_002",
    name: "Roller Brush",
    description: "Standard paint roller brush.",
    price: 10000,
    category: "Painting Tools",
    imageUrl: "https://images.unsplash.com/photo-1655260708815-630452ee45d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwYWludCUyMHJvbGxlciUyMGxhcmdlfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "paint roller large",
    stock: 150,
    rating: 4.4,
    reviews: 100,
  },
  {
    id: "prod_fast_001",
    name: "Roofing Nails (1kg)",
    description: "Galvanized twisted shank roofing nails.",
    price: 8000,
    category: "Fasteners",
    imageUrl: "https://images.unsplash.com/photo-1653887618896-eaa032cefeef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxyb29maW5nJTIwbmFpbHN8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "roofing nails",
    stock: 200,
    rating: 4.5,
    reviews: 100,
  },
  {
    id: "prod_fast_004",
    name: "Rubber Washers (Pack)",
    description: "Rubber washers for roofing nails.",
    price: 7000,
    category: "Fasteners",
    imageUrl: "https://images.unsplash.com/photo-1520840441912-92aa343661cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxydWJiZXIlMjB3YXNoZXJzJTIwcGFja3xlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "rubber washers pack",
    stock: 300,
    rating: 4.2,
    reviews: 80,
  },
  {
    id: "prod_toolacc_002",
    name: "Sand Paper (Sheet)",
    description: "Abrasive sandpaper for smoothing surfaces.",
    price: 2500,
    category: "Tools & Accessories",
    imageUrl: "https://images.unsplash.com/photo-1706271952285-01b5e3fc2d78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzYW5kcGFwZXIlMjBzaGVldHxlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "sandpaper sheet",
    stock: 1000,
    rating: 4.3,
    reviews: 120,
  },
  {
    id: "prod_tools_004",
    name: "Scraper",
    description: "Paint scraper for surface preparation.",
    price: 5000,
    category: "Tools",
    imageUrl: "https://images.unsplash.com/photo-1677064730827-d8bbf7d1ceed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxwYWludCUyMHNjcmFwZXIlMjB0b29sfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "paint scraper tool",
    stock: 100,
    rating: 4.1,
    reviews: 60,
  },
  {
    id: "prod_fast_005",
    name: "Self Tapping Screws (Box)",
    description: "Self-tapping screws for metal applications.",
    price: 69000,
    category: "Fasteners",
    imageUrl: "https://images.unsplash.com/photo-1616367157213-d7ee3548263d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxzY3Jld3MlMjBib3h8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "screws box",
    stock: 80,
    rating: 4.6,
    reviews: 30,
  },
  {
    id: "prod_outdoor_001",
    name: "Shade Net (Roll)",
    description: "Shade netting for agricultural or construction use.",
    price: 279000,
    category: "Outdoor & Garden",
    imageUrl: "https://images.unsplash.com/photo-1667225290902-afe87092acf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxzaGFkZSUyMG5ldCUyMHJvbGx8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "shade net roll",
    stock: 20,
    rating: 4.5,
    reviews: 10,
  },
  {
    id: "prod_paint_001",
    name: "Silk Vinyl Paint (Indoor, 20L)",
    description: "Premium silk vinyl emulsion paint for interiors.",
    price: 350000,
    category: "Paints & Finishes",
    imageUrl: "https://images.unsplash.com/photo-1563481878783-432cd6cdab60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxwYWludCUyMGJ1Y2tldCUyMGxhcmdlfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "paint bucket large",
    stock: 40,
    rating: 4.8,
    reviews: 30,
  },
  {
    id: "prod_solar_003",
    name: "Solar Controller",
    description: "Charge controller for solar panel systems.",
    price: 1, // Placeholder price
    category: "Solar & Electrical",
    imageUrl: "https://images.unsplash.com/photo-1662601304484-53426e5fa4ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzb2xhciUyMGNoYXJnZSUyMGNvbnRyb2xsZXJ8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "solar charge controller",
    stock: 25,
    rating: 4.6,
    reviews: 12,
  },
  {
    id: "prod_solar_004",
    name: "Solar Panels (Per Unit)",
    description: "Photovoltaic solar panels for energy generation.",
    price: 490000,
    category: "Solar & Electrical",
    imageUrl: "https://images.unsplash.com/photo-1509389928833-fe62aef36deb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzb2xhciUyMHBhbmVsfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "solar panel",
    stock: 30,
    rating: 4.7,
    reviews: 25,
  },
  {
    id: "prod_solar_005",
    name: "Solar Pump",
    description: "Solar-powered water pump.",
    price: 590000,
    category: "Solar & Electrical",
    imageUrl: "https://images.unsplash.com/photo-1714233039800-3cfa2542e330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxzb2xhciUyMHdhdGVyJTIwcHVtcHxlbnwwfHx8fDE3NDk5MTY2MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "solar water pump",
    stock: 8,
    rating: 4.5,
    reviews: 8,
  },
  {
    id: "prod_tileacc_002",
    name: "Spacers (Tile Spacers, Pack)",
    description: "Plastic spacers for uniform tile gaps.",
    price: 5000,
    category: "Tiling Accessories",
    imageUrl: "https://images.unsplash.com/photo-1570883886759-27e180c69e22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx0aWxlJTIwc3BhY2VycyUyMHBhY2t8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "tile spacers pack",
    stock: 500,
    rating: 4.3,
    reviews: 70,
  },
  {
    id: "prod_constmat_002",
    name: "Strips (Wooden/Metal)",
    description: "Strips for various construction applications.",
    price: 9000,
    category: "Construction Materials",
    imageUrl: "https://images.unsplash.com/photo-1686500339793-446d77752da6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHx3b29kZW4lMjBzdHJpcHN8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "wooden strips",
    stock: 200,
    rating: 4.2,
    reviews: 30,
  },
  {
    id: "prod_fast_006",
    name: "U-Nails (1kg)",
    description: "U-shaped nails for fixing wire or mesh.",
    price: 1, // Placeholder price, seems too low
    category: "Fasteners",
    imageUrl: "https://images.unsplash.com/photo-1634235421078-668046cc3bf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx1JTIwbmFpbHMlMjBwYWNrfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "u nails pack",
    stock: 100,
    rating: 4.0,
    reviews: 20,
  },
  {
    id: "prod_paint_002",
    name: "Undercoat Paint (20L)",
    description: "Primer or undercoat paint for surface preparation.",
    price: 60000,
    category: "Paints & Finishes",
    imageUrl: "https://images.unsplash.com/photo-1597857306105-b23e08328d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxwYWludCUyMGJ1Y2tldCUyMHByaW1lcnxlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "paint bucket primer",
    stock: 70,
    rating: 4.4,
    reviews: 50,
  },
  {
    id: "prod_roof_009",
    name: "Valley Sheets",
    description: "Roofing sheets for valley sections of a roof.",
    price: 21000,
    category: "Roofing & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1731241420331-2d2109b4b784?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxyb29mJTIwdmFsbGV5JTIwZmxhc2hpbmd8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "roof valley flashing",
    stock: 90,
    rating: 4.3,
    reviews: 10,
  },
  {
    id: "prod_roof_010",
    name: "Versatile Sheets",
    description: "Multi-purpose versatile roofing sheets.",
    price: 69000,
    category: "Roofing & Sheeting",
    imageUrl: "https://images.unsplash.com/photo-1553169507-38833977274b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzcGVjaWFsJTIwcm9vZmluZyUyMHNoZWV0fGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "special roofing sheet",
    stock: 60,
    rating: 4.6,
    reviews: 20,
  },
  {
    id: "prod_tiles_002",
    name: "Wall Tiles (Sqm)",
    description: "Ceramic wall tiles, price per square meter.",
    price: 45000,
    category: "Tiles",
    imageUrl: "https://images.unsplash.com/photo-1695191388218-f6259600223f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjZXJhbWljJTIwd2FsbCUyMHRpbGVzfGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "ceramic wall tiles",
    stock: 400,
    rating: 4.5,
    reviews: 100,
  },
  {
    id: "prod_paint_003",
    name: "Weather Guard Paint (Outdoor, 20L)",
    description: "Durable exterior paint for weather protection.",
    price: 384000,
    category: "Paints & Finishes",
    imageUrl: "https://images.unsplash.com/photo-1662040135464-f25ffd6492ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxleHRlcmlvciUyMHBhaW50JTIwYnVja2V0fGVufDB8fHx8MTc0OTkxNjYwNXww&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "exterior paint bucket",
    stock: 35,
    rating: 4.9,
    reviews: 40,
    isFeatured: true,
  },
  {
    id: "prod_tools_003",
    name: "Wheelbarrow",
    description: "Construction grade wheelbarrow for transporting materials.",
    price: 145000,
    category: "Tools",
    imageUrl: "https://images.unsplash.com/photo-1579255971754-8c6b1385a2b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx3aGVlbGJhcnJvdyUyMGNvbnN0cnVjdGlvbnxlbnwwfHx8fDE3NDk5MTY2MDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "wheelbarrow construction",
    stock: 30,
    rating: 4.7,
    reviews: 45,
  },
  {
    id: "prod_fast_007",
    name: "Wire Nails (1kg)",
    description: "Common wire nails for general construction.",
    price: 5000,
    category: "Fasteners",
    imageUrl: "https://images.unsplash.com/photo-1747961959189-497e523c5c52?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxuYWlscyUyMGNvbW1vbiUyMHBhY2t8ZW58MHx8fHwxNzQ5OTE2NjA1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "nails common pack",
    stock: 1000,
    rating: 4.2,
    reviews: 200,
  },
];

export default function ShopPage() {
  const { toast } = useToast();
  const [isLoadingRecommendations, setIsLoadingRecommendations] = useState(false);
  const [recommendationResult, setRecommendationResult] = useState<AIProductRecommendationOutput | null>(null);

  const recommendationForm = useForm<RecommendationFormValues>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      browsingHistory: "",
      projectRequirements: "",
    },
  });

  async function onRecommendationSubmit(data: RecommendationFormValues) {
    setIsLoadingRecommendations(true);
    setRecommendationResult(null);
    try {
      const input: AIProductRecommendationInput = {
        browsingHistory: data.browsingHistory,
        projectRequirements: data.projectRequirements,
      };
      const result = await aiProductRecommendation(input);
      setRecommendationResult(result);
      toast({
        title: "Recommendations Generated!",
        description: "AI has provided product suggestions based on your input.",
      });
    } catch (error: any) {
      console.error("Error getting product recommendations:", error);
      toast({
        title: "Recommendation Failed",
        description: error.message || "An error occurred while generating recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingRecommendations(false);
    }
  }

  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return uniqueCategories.sort();
  }, []);

  const productsByCategory = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category] = products.filter(p => p.category === category);
      return acc;
    }, {} as Record<string, typeof products>);
  }, [categories]);

  return (
    <div className="space-y-12">
      <section className="text-center fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Hardware & Materials Shop</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Browse our selection of high-quality construction hardware, tools, and materials. All prices in Ugandan Shillings (UGX).
        </p>
      </section>

      <Card className="shadow-lg fade-in bg-primary/5 border-primary/20" style={{animationDelay: '0.1s'}}>
        <CardHeader>
          <CardTitle className="font-headline text-xl flex items-center">
            <Lightbulb className="mr-2 h-6 w-6 text-primary" />
            Need Help? Get AI Product Recommendations!
          </CardTitle>
          <CardDescription className="text-primary/90">
            Tell us about your project and what you've looked at, and our AI will suggest relevant products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...recommendationForm}>
            <form onSubmit={recommendationForm.handleSubmit(onRecommendationSubmit)} className="space-y-6">
              <FormField
                control={recommendationForm.control}
                name="browsingHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Browsing History / Viewed Items</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Looked at cement bags, iron sheets, and paint rollers..." {...field} rows={3} />
                    </FormControl>
                    <FormDesc>What products or types of items have you been looking at?</FormDesc>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={recommendationForm.control}
                name="projectRequirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Requirements</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., Building a small residential house, need materials for roofing and basic plumbing, budget around 20M UGX." {...field} rows={4} />
                    </FormControl>
                    <FormDesc>Describe your project, materials needed, and any budget constraints.</FormDesc>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoadingRecommendations} className="w-full md:w-auto">
                {isLoadingRecommendations ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" /> Get AI Recommendations
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {recommendationResult && (
        <Card className="mt-8 shadow-lg fade-in bg-secondary/10 border-secondary/30">
          <CardHeader>
            <CardTitle className="font-headline text-xl flex items-center text-secondary-foreground">
              <Sparkles className="mr-2 h-5 w-5 text-accent" />
              AI Recommendations For You
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-lg text-foreground">Recommended Products:</h4>
              <p className="text-muted-foreground whitespace-pre-wrap">{recommendationResult.productRecommendations}</p>
            </div>
            <div>
              <h4 className="font-semibold text-lg text-foreground">Reasoning:</h4>
              <p className="text-muted-foreground whitespace-pre-wrap">{recommendationResult.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {categories.map((category, categoryIndex) => (
        <section key={category} className="fade-in" style={{ animationDelay: `${categoryIndex * 0.1 + 0.3}s` }}>
          <h2 className="font-headline text-3xl font-bold tracking-tight mb-6 mt-8 border-b pb-2 border-primary/30 text-primary">
            {category}
          </h2>
          {productsByCategory[category] && productsByCategory[category].length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {productsByCategory[category].map((product, productIndex) => (
                <Card
                  id={product.id} 
                  key={product.id} 
                  className={cn(
                    "flex flex-col overflow-hidden group hover:shadow-xl transition-shadow duration-300 ease-in-out fade-in",
                    (product as any).isFeatured ? "md:col-span-2" : ""
                  )}
                  style={{animationDelay: `${(categoryIndex * 0.1) + (productIndex * 0.05) + 0.4}s`}}
                >
                  <div className="aspect-[4/3] overflow-hidden relative bg-muted">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        data-ai-hint={product.dataAiHint}
                        priority={productIndex < 4 && categoryIndex === 0} 
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <FileImage className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
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
                    <p className="text-xs text-muted-foreground min-h-[3lh]">{product.description}</p>
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
            </div>
          ) : (
            <p className="text-muted-foreground">No products found in this category yet.</p>
          )}
        </section>
      ))}
      
      {categories.length === 0 && (
        <p className="text-center text-muted-foreground py-8 text-lg">
          Our shop is currently being stocked. Please check back soon for products!
        </p>
      )}

      <p className="text-center text-muted-foreground text-sm fade-in" style={{animationDelay: `${categories.length * 0.1 + 0.4}s`}}>
        Note: Product search, filtering, individual product pages, cart, and checkout functionalities are currently under development. For purchases or inquiries, please <Link href="/contact" className="text-primary hover:underline">contact us</Link>. Full e-commerce functionality with cart, checkout, and various payment options is under development.
      </p>
    </div>
  );
}

