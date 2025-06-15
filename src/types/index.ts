
export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isAdmin?: boolean;
  coins?: number; 
  engagementScore?: number; 
}

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
  clientId?: string; // Reference to a user/customer ID
  status?: string; // e.g., "Planning", "In Progress", "Completed"
  estimatedCost?: number;
  actualCost?: number;
  startDate?: any; // Firestore Timestamp or Date
  endDate?: any; // Firestore Timestamp or Date
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

// Add a more specific Project document type for Firestore data
export interface FirestoreProject {
  id?: string; // ID will be document ID, but good to have when passing around
  projectName: string;
  clientId: string; // For now, can be a string (name or ID). Later, could be a reference.
  scope: string;
  estimatedCost: number;
  actualCost?: number; // Optional, can be filled later
  startDate: any; // Firebase Timestamp (will be Date in form, converted on save)
  expectedEndDate: any; // Firebase Timestamp (will be Date in form, converted on save)
  status: 'Planning' | 'In Progress' | 'On Hold' | 'Completed' | 'Cancelled';
  createdAt: any; // Firebase Timestamp
  updatedAt: any; // Firebase Timestamp
  // You can add more fields like 'address', 'projectManagerId', etc.
}
