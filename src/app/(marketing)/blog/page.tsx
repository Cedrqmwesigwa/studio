
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarDays, UserCircle } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/config/site';
// Import all blog posts from the single source of truth
import { blogPosts as allBlogPostsData } from '@/lib/blog-data'; 

export const metadata: Metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: `Stay updated with the latest news, insights, construction tips, and project updates from ${siteConfig.name} in Kampala, Uganda.`,
};

export const revalidate = 86400; // Revalidate at most once per day


export default function BlogPage() {
  // Ensure allBlogPostsData is an array; provide an empty array if not.
  const postsToProcess = Array.isArray(allBlogPostsData) ? allBlogPostsData : [];

  // Sort posts by date, newest first
  const sortedBlogPosts = [...postsToProcess].sort((a, b) => {
    // Add checks for valid dates if necessary
    const dateA = new Date(a.publishDate).getTime();
    const dateB = new Date(b.publishDate).getTime();
    // If dates are invalid, keep original order or handle as error
    if (isNaN(dateA) || isNaN(dateB)) {
        console.warn(`Invalid date found in blog posts: ${a.title} or ${b.title}`);
        return 0; 
    }
    return dateB - dateA;
  });

  return (
    <div className="space-y-12">
      <section className="text-center fade-in">
        <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">Our Blog</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Stay updated with the latest news, insights, and project updates from ${siteConfig.name}.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 fade-in" style={{animationDelay: '0.2s'}}>
        {sortedBlogPosts.map((post, index) => {
          // Ensure post is not null/undefined and has necessary properties
          if (!post || !post.id || !post.slug || !post.title || !post.imageUrl || !post.publishDate || !post.author) {
            console.warn("Skipping rendering of incomplete blog post:", post);
            return null; // Skip rendering this post if essential data is missing
          }
          const tags = Array.isArray(post.tags) ? post.tags : []; // Ensure tags is an array

          return (
            <Card key={post.id} className="flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out fade-in" style={{animationDelay: `${index * 0.1 + 0.2}s`}}>
              <Link href={`/blog/${post.slug}`} className="block aspect-video overflow-hidden group">
                <Image
                  src={post.imageUrl.startsWith('http') ? post.imageUrl : `https://placehold.co/600x400.png?text=${encodeURIComponent(post.title)}`}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  data-ai-hint={post.dataAiHint}
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
                  {tags.map(tag => (
                    <Badge key={tag} variant="outline" className="mr-1 mb-1 text-xs">{tag}</Badge>
                  ))}
                </div>
                <Button asChild variant="link" className="p-0 text-primary">
                  <Link href={`/blog/${post.slug}`}>Read More &rarr;</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
