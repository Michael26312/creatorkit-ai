# CreatorKit AI

## AI-Powered Content Repurposing Platform for Creators

Turn 1 idea into 30 pieces of content in seconds.

### Features

- **Content Repurposing**: Generate 30 pieces of content from one source (transcripts, articles, ideas)
- **Social Media Content**: TikTok/Reels scripts, Instagram captions, Facebook posts, X posts, LinkedIn content
- **Video Content**: Viral hooks, video titles, short-video titles, CTAs, thumbnails, descriptions, chapters
- **SEO Content**: Keywords, titles, meta descriptions, outlines, full blog articles
- **Growth Tools**: Hashtag generator, content ideas, 30-day calendar, audience insights
- **Brand Voice**: Create and apply consistent brand profiles
- **Project Management**: Save, organize, regenerate individual outputs
- **Mobile-First**: Optimized for Android and all mobile devices
- **SEO Architecture**: Standalone tools and landing pages for organic traffic
- **Admin Dashboard**: Analytics, configuration, user management

### Technology Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth
- **AI**: OpenAI GPT-4 Turbo
- **Hosting**: Vercel (recommended)

### Quick Start

1. Clone the repository
2. Copy `.env.example` to `.env.local` and fill in your credentials
3. Install dependencies: `npm install`
4. Set up database: `npm run db:push`
5. Seed admin data: `npm run db:seed`
6. Run development server: `npm run dev`
7. Visit `http://localhost:3000`

### Project Structure

```
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── (auth)/       # Authentication pages
│   │   ├── (dashboard)/  # Dashboard and tools
│   │   ├── (public)/     # Public pages (SEO, tools)
│   │   ├── api/          # API routes
│   │   └── admin/        # Admin dashboard
│   ├── components/       # Reusable React components
│   ├── lib/              # Utilities and helpers
│   ├── services/         # Business logic
│   ├── hooks/            # Custom React hooks
│   ├── types/            # TypeScript types
│   └── styles/           # Global styles
├── prisma/               # Database schema
├── public/               # Static assets
└── docs/                 # Documentation
```

### Environment Variables

See `.env.example` for all required variables.

Key variables:
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: OpenAI API key (keep secret!)
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key

### API Keys & Security

⚠️ **IMPORTANT**: Never expose API keys in client-side code.

All AI requests must go through server-side API routes. Client code cannot directly access:
- `OPENAI_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- Any other secret credentials

### Database Setup

```bash
# Push schema to database
npm run db:push

# Open Prisma Studio (GUI)
npm run db:studio

# Seed initial admin data
npm run db:seed
```

### Pricing Configuration

Pricing is configurable from the admin dashboard. See `src/lib/pricing.ts` for tier definitions.

### Free Plan Limits

- 5 content projects per month
- Limited AI generations
- Basic features only

### Paid Plans

- **Creator**: $9/month - For individual creators
- **Pro**: $19/month - For serious creators and marketers
- **Agency**: $49/month - For agencies and businesses

### Mobile Optimization

The application is fully responsive and optimized for:
- iPhone (360px - 430px)
- Android (390px - 412px)
- Tablets (768px)
- Desktop (1024px+)

### Performance

Core Web Vitals targets:
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1

### SEO Pages

The app includes SEO landing pages for:
- AI content generators
- Social media tools
- Video content tools
- SEO tools
- Creator-specific tools

Each page includes structured data, meta tags, and organic CTAs.

### Admin Dashboard

Access at `/admin` with admin credentials.

Features:
- User analytics
- Revenue metrics (MRR, ARR)
- AI usage tracking
- Configuration panel
- Feature management

### Analytics

Prepared for integration with:
- Google Analytics 4
- Google Search Console
- Conversion tracking
- Subscription events

### Contributing

See CONTRIBUTING.md for guidelines.

### License

MIT License - see LICENSE for details.

### Support

For issues and feature requests, please open a GitHub issue.
