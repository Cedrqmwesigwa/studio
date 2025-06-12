
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: `Stay updated with the latest news, insights, construction tips, and project updates from ${siteConfig.name} in Kampala, Uganda.`,
};

export const revalidate = 3600; // Revalidate at most once per hour

// Mock data for blog posts - Ensure excerpts are updated or generated if not present
const blogPosts = [
  {
    id: "1",
    slug: "top-5-construction-trends-2024",
    title: "Top 5 Construction Trends to Watch in 2024",
    excerpt: "Explore the leading innovations like sustainable materials, AI in project management, modular construction, advanced BIM, and robotics shaping the future of the building industry.",
    imageUrl: "https://images.unsplash.com/photo-1521708266372-b3547456cc2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjb25zdHJ1Y3Rpb24lMjB0cmVuZHN8ZW58MHx8fHwxNzQ5NzMzMjUyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "construction site future",
    author: "Jane Doe, Lead Architect",
    publishDate: "2024-07-15",
    category: "Industry News",
    tags: ["Trends", "Innovation", "Sustainability"],
  },
  {
    id: "2",
    slug: "choosing-right-materials-project",
    title: "Choosing the Right Materials for Your Project",
    excerpt: "A guide to selecting materials that balance cost, quality, sustainability, aesthetics, and durability for your construction project.",
    imageUrl: "https://images.unsplash.com/photo-1518709414768-a88981a4515d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoYXJkd2FyZSUyMGNvbnN0cnVjdGlvbnxlbnwwfHx8fDE3NDk3MzkzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    dataAiHint: "building materials samples",
    author: "John Smith, Materials Expert",
    publishDate: "2024-06-28",
    category: "Guides",
    tags: ["Materials", "Construction", "DIY"],
  },
  {
    id: "3",
    slug: "sterling-solutions-community-project", // Slug implies old name
    title: "Sterling Contractors Completes Community Center Build", // Title updated
    excerpt: "Sterling Contractors proudly announces the completion of the Mwangaza Community Center, a sustainable project featuring a multi-purpose hall, library, clinic, and recreational areas.", // Excerpt updated
    imageUrl: "/blog_images/community-center-building-thumb.png",
    dataAiHint: "community center building",
    author: "Sterling Team",
    publishDate: "2024-05-10",
    category: "Project Updates",
    tags: ["Community", "CSR", "Completed Projects"],
  },
];

export default function BlogPage() {
  return (
    <div className="space-y-12">
      <section className="text-center fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Our Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Stay updated with the latest news, insights, and project updates from {siteConfig.name}.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in" style={{animationDelay: '0.2s'}}>
        {blogPosts.map((post, index) => (
          <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out fade-in" style={{animationDelay: `${index * 0.1 + 0.2}s`}}>
            <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden group">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={600}
                height={400}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                dataAiHint={post.dataAiHint}
              />
            </Link>
            <CardHeader>
              {post.category && <Badge variant="secondary" className="mb-2 w-fit">{post.category}</Badge>}
              <CardTitle className="font-headline text-xl">
                <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                  {post.title}
                </Link>
              </CardTitle>
              <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                <div className="flex items-center">
                  <CalendarDays className="h-3.5 w-3.5 mr-1" />
                  {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="flex items-center">
                  <UserCircle className="h-3.5 w-3.5 mr-1" />
                  {post.author}
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <CardDescription>{post.excerpt}</CardDescription>
            </CardContent>
            <CardFooter className="flex-col items-start">
               <div className="mb-3">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="mr-1 mb-1 text-xs">{tag}</Badge>
                ))}
              </div>
              <Button asChild variant="link" className="p-0 text-primary">
                <Link href={`/blog/${post.slug}`}>Read More &rarr;</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </section>
    </div>
  );
}
