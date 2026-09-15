'use client';

import { DashboardHeader } from '@/components/dashboard/header';
import { AccountSettings } from '@/components/settings/account-settings';
import { PreferencesSettings } from '@/components/settings/preferences-settings';
import { SecuritySettings } from '@/components/settings/security-settings';

export default function SettingsPage() {
  return (
    <div className="flex-1">
      <DashboardHeader title="Settings" />

      <div className="px-4 md:px-8 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

        <div className="space-y-8">
          <AccountSettings />
          <PreferencesSettings />
          <SecuritySettings />
        </div>
      </div>
    </div>
  );
}
