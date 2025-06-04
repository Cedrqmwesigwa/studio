export interface Project {
  id: string;
  title: string;
  description: string;
  photos: string[]; // URLs
  dataAiHints: string[];
  clientTestimonial?: string;
  projectType: string; // e.g., "Residential", "Commercial"
  year?: number;
  location?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  benefits: string[];
  visualUrl?: string; // URL
  dataAiHint?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string;
  content: string; // Markdown or HTML
  author: string;
  authorTitle?: string;
  authorImage?: string;
  dataAiAuthorHint?: string;
  publishDate: string; // ISO string
  category?: string;
  tags: string[];
  imageUrl: string;
  dataAiHint?: string;
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: any; // Firestore Timestamp or Date
}
