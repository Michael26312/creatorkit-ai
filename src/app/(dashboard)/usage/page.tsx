'use client';

import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { UsageChart } from '@/components/usage/usage-chart';
import { UsageBreakdown } from '@/components/usage/usage-breakdown';
import { UpgradeCard } from '@/components/usage/upgrade-card';

export default function UsagePage() {
  const [usage, setUsage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsage = async () => {
      try {
        const res = await fetch('/api/user/usage');
        if (res.ok) {
          const data = await res.json();
          setUsage(data);
        }
      } catch (error) {
        console.error('Failed to fetch usage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsage();
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-600"></div>
      </div>
    );
  }

  return (
    <div className="flex-1">
      <DashboardHeader title="Usage & Billing" />

      <div className="px-4 md:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Usage & Billing</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <UsageChart usage={usage} />
            <UsageBreakdown usage={usage} />
          </div>
          <div>
            <UpgradeCard usage={usage} />
          </div>
        </div>
      </div>
    </div>
  );
}
