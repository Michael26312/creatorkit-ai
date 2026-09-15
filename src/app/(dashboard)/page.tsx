'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/auth';
import { DashboardHeader } from '@/components/dashboard/header';
import { StatsCard } from '@/components/dashboard/stats-card';
import { RecentProjects } from '@/components/dashboard/recent-projects';
import { QuickLinks } from '@/components/dashboard/quick-links';
import { Zap, FileText, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    generationsUsed: 0,
    projectsCreated: 0,
    monthlyLimit: 30,
  });

  useEffect(() => {
    // Fetch user stats
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/user/stats');
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      }
    };

    fetchStats();
  }, []);

  const usagePercentage = (stats.generationsUsed / stats.monthlyLimit) * 100;

  return (
    <div className="flex-1">
      <DashboardHeader title="Dashboard" />

      <div className="px-4 md:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.firstName || 'Creator'}!
          </h1>
          <p className="text-gray-600">Here's what you've accomplished this month</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={<Zap className="w-6 h-6" />}
            title="Generations Used"
            value={`${stats.generationsUsed}/${stats.monthlyLimit}`}
            subtitle={`${Math.round(usagePercentage)}% of monthly limit`}
            variant="primary"
          />
          <StatsCard
            icon={<FileText className="w-6 h-6" />}
            title="Projects Created"
            value={stats.projectsCreated}
            subtitle="Total content projects"
          />
          <StatsCard
            icon={<TrendingUp className="w-6 h-6" />}
            title="Growth"
            value="30+"
            subtitle="Pieces of content generated"
          />
        </div>

        {/* Quick Links */}
        <QuickLinks />

        {/* Recent Projects */}
        <RecentProjects />
      </div>
    </div>
  );
}
