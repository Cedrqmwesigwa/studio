
'use client';

import CreateProjectForm from '@/components/admin/create-project-form';
import { Briefcase } from 'lucide-react';

export default function NewProjectPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <section className="text-center mb-10 fade-in">
        <h1 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl flex items-center justify-center">
            <Briefcase className="mr-3 h-8 w-8 text-primary" />
            Create New Project
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Fill in the details below to add a new project to the system.
        </p>
      </section>
      <div className="fade-in" style={{animationDelay: '0.2s'}}>
        <CreateProjectForm />
      </div>
    </div>
  );
}
