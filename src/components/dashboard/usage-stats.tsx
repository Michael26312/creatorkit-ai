'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/stores/auth';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

interface UsageStats {
  plan: string;
  generationsUsed: number;
  monthlyLimit: number;
  remaining: number;
  percentageUsed: number;
}

export function UsageStats() {
  const [stats, setStats] = useState<UsageStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchStats = async () => {
      try {
        const res = await fetch('/api/user/usage');
        if (!res.ok) throw new Error('Failed to fetch usage stats');
        const data = await res.json();
        setStats(data);
      } catch (error) {
        toast.error('Failed to load usage stats');
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader className="w-8 h-8 text-brand-600 animate-spin" />
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const planColors: Record<string, string> = {
    free: 'bg-gray-100 text-gray-900',
    creator: 'bg-blue-100 text-blue-900',
    pro: 'bg-purple-100 text-purple-900',
    agency: 'bg-green-100 text-green-900',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome to CreatorKit AI</h2>
          <p className="text-gray-600 mt-1">Your account usage and plan information</p>
        </div>
        <div className={`px-4 py-2 rounded-full font-semibold text-sm ${planColors[stats.plan] || planColors.free}`}>
          {stats.plan.charAt(0).toUpperCase() + stats.plan.slice(1)} Plan
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Generations Used</p>
          <p className="text-3xl font-bold text-gray-900">
            {stats.generationsUsed} / {stats.monthlyLimit}
          </p>
          <p className="text-xs text-gray-500 mt-2">{stats.percentageUsed}% of monthly limit</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Remaining This Month</p>
          <p className="text-3xl font-bold text-brand-600">{stats.remaining}</p>
          <p className="text-xs text-gray-500 mt-2">Resets on the 1st</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-sm text-gray-600 mb-2">Progress</p>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-brand-600 h-2 rounded-full transition-all"
              style={{ width: `${Math.min(stats.percentageUsed, 100)}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">Storage usage</p>
        </div>
      </div>
    </div>
  );
}
