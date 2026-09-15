'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/stores/auth';
import { useProjectStore } from '@/lib/stores/projects';
import { Button } from '@/components/ui/button';
import { formatRelativeTime } from '@/lib/utils/dates';
import { Plus, Loader } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Project {
  id: string;
  title: string;
  contentType: string;
  createdAt: string;
  generations?: Array<{ id: string; createdAt: string }>;
}

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        toast.error('Failed to load projects');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-6">No projects yet. Create your first one!</p>
        <Link href="/repurpose">
          <Button className="flex items-center gap-2 mx-auto">
            <Plus className="w-5 h-5" />
            Create Project
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Your Projects</h2>
        <Link href="/repurpose">
          <Button className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Project
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
            <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {project.contentType}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>Created {formatRelativeTime(project.createdAt)}</p>
                {project.generations && project.generations.length > 0 && (
                  <p>{project.generations.length} generation(s)</p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
