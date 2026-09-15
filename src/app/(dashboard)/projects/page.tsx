'use client';

import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { ProjectList } from '@/components/projects/project-list';
import { ProjectFilters } from '@/components/projects/project-filters';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    contentType: 'all',
    sortBy: 'newest',
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex-1">
      <DashboardHeader title="Projects" />

      <div className="px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Projects</h1>
            <p className="text-gray-600 mt-1">Manage and view all your content projects</p>
          </div>
          <Link href="/repurpose">
            <Button className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Project
            </Button>
          </Link>
        </div>

        <ProjectFilters filters={filters} onFiltersChange={setFilters} />
        <ProjectList projects={projects} isLoading={isLoading} />
      </div>
    </div>
  );
}
