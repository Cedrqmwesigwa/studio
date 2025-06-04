
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarDays, UserCircle, MessageCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

// Mock data - in a real app, this would come from a database
const blogPosts = [
  {
    id: "1",
    slug: "top-5-construction-trends-2024",
    title: "Top 5 Construction Trends to Watch in 2024",
    content: `
      <p>The construction industry is constantly evolving, and 2024 is no exception. Here are five key trends that are shaping the future of building and design:</p>
      <br/>
      <h3 class="font-headline text-xl font-semibold mt-4 mb-2">1. Sustainable and Green Building Materials</h3>
      <p>There's a growing emphasis on eco-friendly construction. This includes the use of recycled materials, sustainably sourced timber, and innovative products like low-carbon concrete and mycelium bricks. These materials not inly reduce environmental impact but often offer better insulation and longevity.</p>
      <br/>
      <h3 class="font-headline text-xl font-semibold mt-4 mb-2">2. AI and Automation in Project Management</h3>
      <p>Artificial intelligence is revolutionizing how projects are planned, executed, and monitored. AI algorithms can optimize schedules, predict potential delays, manage resources efficiently, and even enhance safety protocols on site through automated monitoring.</p>
      <br/>
      <h3 class="font-headline text-xl font-semibold mt-4 mb-2">3. Modular and Prefabricated Construction</h3>
      <p>Off-site construction methods like modular and prefabrication are gaining traction. Building components in a controlled factory environment improves quality, reduces waste, and significantly speeds up on-site assembly times.</p>
      <br/>
      <h3 class="font-headline text-xl font-semibold mt-4 mb-2">4. Advanced Building Information Modeling (BIM)</h3>
      <p>BIM is becoming more sophisticated, offering 4D (time) and 5D (cost) integrations. This allows for more accurate project visualization, clash detection, and lifecycle management of the built asset.</p>
      <br/>
      <h3 class="font-headline text-xl font-semibold mt-4 mb-2">5. Robotics and Drones</h3>
      <p>Robots are increasingly used for tasks like bricklaying, welding, and demolition. Drones are indispensable for site surveys, progress monitoring, and inspections, improving efficiency and safety.</p>
      <br/>
      <p>Staying ahead of these trends is crucial for success in the modern construction landscape. At Sterling Solutions Hub, we are committed to integrating these innovations into our projects to deliver superior results for our clients.</p>
    `,
    imageUrl: "https://storage.googleapis.com/project-ai-prototyper.appspot.com/blog_images/construction-site-modern.png",
    dataAiHint: "construction site modern",
    author: "Jane Doe",
    authorTitle: "Lead Architect",
    authorImage: "https://storage.googleapis.com/project-ai-prototyper.appspot.com/author_images/professional-woman-portrait.png",
    dataAiAuthorHint: "professional woman portrait",
    publishDate: "2024-07-15",
    category: "Industry News",
    tags: ["Trends", "Innovation", "Sustainability", "AI", "Modular Construction"],
  },
   {
    id: "2",
    slug: "choosing-right-materials-project",
    title: "Choosing the Right Materials for Your Project",
    content: `
      <p>Selecting the appropriate materials is one of the most critical decisions in any construction project. The right choices can impact durability, cost, aesthetics, and environmental footprint. Here's a guide to help you navigate this complex process:</p>
      <br/>
      <h3 class="font-headline text-xl font-semibold mt-4 mb-2">1. Define Your Project Requirements</h3>
      <p>Understand the specific needs of your project. Consider factors like structural integrity, climate, desired lifespan, maintenance requirements, and local building codes.</p>
      <br/>
      <h3 class="font-headline text-xl font-semibold mt-4 mb-2">2. Balance Cost and Quality</h3>
      <p>While budget is always a concern, opting for the cheapest materials can lead to higher maintenance costs and shorter lifespans. Aim for the best quality your budget allows. Consider lifecycle costs, not just initial purchase price.</p>
      <br/>
      <h3 class="font-headline text-xl font-semibold mt-4 mb-2">3. Consider Sustainability</h3>
      <p>Eco-friendly materials are increasingly important. Look for options that are renewable, recycled, locally sourced, or have low embodied energy. Certifications like FSC for wood can be helpful indicators.</p>
      <br/>
      <h3 class="font-headline text-xl font-semibold mt-4 mb-2">4. Aesthetics and Design</h3>
      <p>Materials significantly contribute to the overall look and feel of a project. Ensure your choices align with your design vision and complement each other.</p>
      <br/>
      <h3 class="font-headline text-xl font-semibold mt-4 mb-2">5. Durability and Maintenance</h3>
      <p>Choose materials that can withstand the local climate and expected wear and tear. Also, factor in the long-term maintenance requirements and costs associated with each material.</p>
      <br/>
      <p>Consulting with professionals like architects and engineers can provide valuable insights and help you make informed decisions. At Sterling Solutions Hub, we offer material consultation as part of our services.</p>
    `,
    imageUrl: "https://storage.googleapis.com/project-ai-prototyper.appspot.com/blog_images/various-building-materials.png",
    dataAiHint: "various building materials",
    author: "John Smith",
    authorTitle: "Materials Expert",
    authorImage: "https://storage.googleapis.com/project-ai-prototyper.appspot.com/author_images/professional-man-portrait.png",
    dataAiAuthorHint: "professional man portrait",
    publishDate: "2024-06-28",
    category: "Guides",
    tags: ["Materials", "Construction", "DIY", "Budgeting", "Sustainability"],
  },
  {
    id: "3",
    slug: "sterling-solutions-community-project",
    title: "Sterling Solutions Completes Community Center Build",
    content: `
      <p>We are thrilled to announce the successful completion and handover of the new Mwangaza Community Center. This project has been a labor of love for the entire Sterling Solutions Hub team, and we are incredibly proud to contribute to a space that will serve the community for years to come.</p>
      <br/>
      <p>The Mwangaza Community Center features a multi-purpose hall, a library, a small clinic, and outdoor recreational areas. It was designed with sustainability in mind, incorporating rainwater harvesting systems and solar panels.</p>
      <br/>
      <p>This project was a collaborative effort, and we extend our heartfelt thanks to our partners, suppliers, and the local community members who supported us throughout the construction process. We believe in building not just structures, but also stronger communities.</p>
      <br/>
      <p>The center is now open and already hosting various community programs. We look forward to seeing it become a vibrant hub of activity and learning.</p>
    `,
    imageUrl: "https://storage.googleapis.com/project-ai-prototyper.appspot.com/blog_images/community-center-opening.png",
    dataAiHint: "community center opening",
    author: "Sterling Team",
    authorTitle: "Sterling Solutions Hub",
    authorImage: "", // No specific author image, use fallback - could be company logo
    dataAiAuthorHint: "company logo",
    publishDate: "2024-05-10",
    category: "Project Updates",
    tags: ["Community", "CSR", "Completed Projects", "Nairobi"],
  }
];

// This is a placeholder for fetching data. In a real app, you'd fetch this by slug.
async function getPostData(slug: string) {
  return blogPosts.find(post => post.slug === slug);
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
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
            priority
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

    