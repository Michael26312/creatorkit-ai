'use client';

import { useEffect, useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { BrandVoiceForm } from '@/components/brand-voice/brand-voice-form';
import { BrandVoiceList } from '@/components/brand-voice/brand-voice-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function BrandVoicePage() {
  const [brandProfiles, setBrandProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const res = await fetch('/api/brand-profiles');
        if (res.ok) {
          const data = await res.json();
          setBrandProfiles(data);
        }
      } catch (error) {
        console.error('Failed to fetch brand profiles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  return (
    <div className="flex-1">
      <DashboardHeader title="Brand Voice" />

      <div className="px-4 md:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Brand Voice Profiles</h1>
            <p className="text-gray-600 mt-1">Create and manage your brand's unique voice</p>
          </div>
          {!showForm && (
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              New Profile
            </Button>
          )}
        </div>

        {showForm ? (
          <BrandVoiceForm
            profile={editingProfile}
            onSave={() => {
              setShowForm(false);
              setEditingProfile(null);
              // Refetch profiles
            }}
            onCancel={() => {
              setShowForm(false);
              setEditingProfile(null);
            }}
          />
        ) : (
          <BrandVoiceList
            profiles={brandProfiles}
            isLoading={isLoading}
            onEdit={(profile) => {
              setEditingProfile(profile);
              setShowForm(true);
            }}
          />
        )}
      </div>
    </div>
  );
}
