'use client';

import { ProtectedRoute } from '@/components/auth/protected-route';
import { UsageStats } from '@/components/dashboard/usage-stats';
import { ProjectsList } from '@/components/dashboard/projects-list';

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <UsageStats />
          <ProjectsList />
        </div>
      </div>
    </ProtectedRoute>
  );
}
