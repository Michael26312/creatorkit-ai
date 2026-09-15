export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'annual';
  features: string[];
  limits: {
    monthlyGenerations: number;
    projectsCreated: number;
    maxBrandProfiles: number;
  };
  targetAudience: string;
  highlighted?: boolean;
}

// Pricing configuration - can be overridden from admin dashboard
export const DEFAULT_PRICING: PricingTier[] = [
  {
    id: 'free',
    name: 'Free',
    description: 'Perfect for trying out',
    price: 0,
    currency: 'USD',
    interval: 'monthly',
    features: [
      '5 content projects/month',
      'Limited AI generations',
      'Basic content repurposing',
      'Basic hooks & captions',
      'Community support',
    ],
    limits: {
      monthlyGenerations: 5,
      projectsCreated: 5,
      maxBrandProfiles: 1,
    },
    targetAudience: 'Individuals getting started',
  },
  {
    id: 'creator',
    name: 'Creator',
    description: 'For individual creators',
    price: 9,
    currency: 'USD',
    interval: 'monthly',
    features: [
      '50 generations/month',
      'Full content repurposing',
      'Content calendars',
      'SEO tools included',
      'Advanced hooks & captions',
      'Saved projects',
      'Export features',
      'Email support',
    ],
    limits: {
      monthlyGenerations: 50,
      projectsCreated: 100,
      maxBrandProfiles: 3,
    },
    targetAudience: 'Individual creators & influencers',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'For serious creators and marketers',
    price: 19,
    currency: 'USD',
    interval: 'monthly',
    features: [
      '200 generations/month',
      'Advanced AI generation',
      'Brand voice profiles',
      'Unlimited saved projects',
      'Advanced SEO tools',
      'Content variations',
      'Priority generation',
      'Priority support',
    ],
    limits: {
      monthlyGenerations: 200,
      projectsCreated: 500,
      maxBrandProfiles: 10,
    },
    targetAudience: 'Marketers & content agencies',
    highlighted: true,
  },
  {
    id: 'agency',
    name: 'Agency',
    description: 'For agencies and businesses',
    price: 49,
    currency: 'USD',
    interval: 'monthly',
    features: [
      'Unlimited generations',
      'Multiple brands/workspaces',
      'Team members & roles',
      'Client projects',
      'Advanced brand voice',
      'Higher usage limits',
      'Agency dashboard',
      'Client-ready exports',
      'Dedicated support',
    ],
    limits: {
      monthlyGenerations: 1000,
      projectsCreated: 5000,
      maxBrandProfiles: 50,
    },
    targetAudience: 'Agencies and large teams',
  },
];

export function getPricingTier(planId: string): PricingTier | undefined {
  return DEFAULT_PRICING.find((t) => t.id === planId);
}

export function getGenerationLimit(planId: string): number {
  const tier = getPricingTier(planId);
  return tier?.limits.monthlyGenerations || 5;
}
