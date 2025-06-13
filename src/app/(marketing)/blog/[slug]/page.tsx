
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, UserCircle, MessageCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import type { Metadata, ResolvingMetadata } from 'next';
import { siteConfig } from '@/config/site';
import { blogPosts } from '@/lib/blog-data'; // Import from centralized location

export const revalidate = 3600; // Revalidate at most once per hour

async function getPostData(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post = await getPostData(params.slug);

  if (!post) {
    return {
      title: `Post Not Found | ${siteConfig.name}`,
      description: "The blog post you are looking for does not exist.",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];
  const fullImageUrl = post.imageUrl.startsWith('/') ? `${siteConfig.url}${post.imageUrl}` : post.imageUrl;


  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.excerpt || 'Read this insightful blog post from Sterling Contractors.',
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      images: [
        {
          url: fullImageUrl,
          width: 1200, 
          height: 630,
          alt: post.title,
        },
        ...previousImages,
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [fullImageUrl],
    },
  };
}


export default async function BlogPostPage({ params }: { params: { slug:string } }) {
  const post = await getPostData(params.slug);

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="font-headline text-3xl font-bold">Post not found</h1>
        <p className="text-muted-foreground mt-4">The blog post you're looking for doesn't exist or has been moved.</p>
        <Button asChild className="mt-6">
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 fade-in">
      <header className="mb-8">
        {post.category && <Badge variant="default" className="mb-2 bg-accent text-accent-foreground hover:bg-accent/90">{post.category}</Badge>}
        <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
          {post.title}
        </h1>
        <div className="mt-4 flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarDays className="h-4 w-4 mr-1.5" />
            {new Date(post.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
          <div className="flex items-center">
            <UserCircle className="h-4 w-4 mr-1.5" />
            {post.author}
          </div>
        </div>
      </header>

      {post.imageUrl && (
        <div className="mb-8 aspect-[16/9] relative overflow-hidden rounded-lg shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            priority // Main blog post image should be prioritized
            sizes="(max-width: 896px) 100vw, 896px" // Max width of 4xl container
            className="object-cover"
            data-ai-hint={post.dataAiHint}
          />
        </div>
      )}

      <div
        className="prose prose-lg dark:prose-invert max-w-none text-foreground prose-headings:font-headline prose-headings:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-strong:text-foreground"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      <div className="mt-8">
        {post.tags.map(tag => (
          <Badge key={tag} variant="outline" className="mr-2 mb-2 text-sm">{tag}</Badge>
        ))}
      </div>

      <Separator className="my-12" />

      <section className="flex items-start space-x-4 p-4 bg-secondary rounded-lg">
        <Avatar className="h-16 w-16">
          {post.authorImage ? <AvatarImage src={post.authorImage} alt={post.author} data-ai-hint={post.dataAiAuthorHint} /> : null}
          <AvatarFallback>{post.author.substring(0,2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-xs text-muted-foreground">Written by</p>
          <h4 className="font-headline text-lg font-semibold text-foreground">{post.author}</h4>
          <p className="text-sm text-muted-foreground">{post.authorTitle}</p>
        </div>
      </section>

      <Separator className="my-12" />

      {/* Comment Section Placeholder */}
      <section>
        <h2 className="font-headline text-2xl font-semibold mb-6 flex items-center">
          <MessageCircle className="h-6 w-6 mr-2 text-primary" /> Comments (0)
        </h2>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-lg">Leave a Comment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea placeholder="Write your comment here..." rows={4} />
            <Button disabled>Submit Comment (Feature Coming Soon)</Button>
            <p className="text-xs text-muted-foreground">Commenting system is under development.</p>
          </CardContent>
        </Card>
      </section>
    </article>
  );
}

// Required for Next.js dynamic routes with generateStaticParams
export async function generateStaticParams() {
  return blogPosts.map(post => ({
    slug: post.slug,
  }));
}

    

    
