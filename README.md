# Website Project

A modern web application built with React, TypeScript, Vite, and Supabase.

## Features

- User authentication (signup/login)
- Protected routes and payment gating
- Stripe payment integration
- Quote request system
- Responsive design with Tailwind CSS
- Database management with Supabase

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v7
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **Icons**: Lucide React

## Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Supabase account
- Stripe account (for payment features)

## Local Development Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory by copying `.env.example`:

```bash
cp .env.example .env
```

Then fill in your actual values:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_WEB3FORMS_ACCESS_KEY=your_web3forms_access_key
```

**Where to Find These Values:**

- **Supabase URL & Key**: Go to your Supabase project dashboard → Settings → API
- **Web3Forms Key**: Sign up at web3forms.com to get your access key

### 4. Set Up Supabase Database

The database migrations are located in `supabase/migrations/`. To apply them:

1. Install Supabase CLI (optional, for advanced users)
2. Or manually run the migration SQL files in your Supabase SQL Editor

**Database Tables:**
- `quote_requests`: Stores customer quote submissions
- `stripe_customers`: Links users to Stripe customer IDs
- `user_payment_access`: Tracks user payment status and access levels

### 5. Configure Supabase Edge Functions

Deploy the edge functions from `supabase/functions/`:

- `send-quote-email`: Handles quote request notifications
- `stripe-checkout`: Creates Stripe checkout sessions
- `stripe-webhook`: Handles Stripe webhook events

### 6. Run Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
├── src/
│   ├── components/       # Reusable React components
│   │   ├── auth/        # Authentication components
│   │   ├── stripe/      # Stripe payment components
│   │   └── ui/          # UI component library
│   ├── pages/           # Page components (routes)
│   ├── lib/             # Utility functions and configurations
│   │   ├── auth.ts      # Authentication helpers
│   │   ├── stripe.ts    # Stripe integration
│   │   └── supabase.ts  # Supabase client
│   ├── App.tsx          # Main app component
│   └── main.tsx         # App entry point
├── supabase/
│   ├── functions/       # Supabase Edge Functions
│   └── migrations/      # Database migrations
├── public/              # Static assets
└── package.json         # Project dependencies
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "Import Project"
4. Select your GitHub repository
5. Configure environment variables (same as `.env`)
6. Click "Deploy"

Vercel will automatically detect Vite configuration and deploy your site.

### Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables
7. Click "Deploy site"

### Environment Variables for Production

Make sure to add all environment variables from your `.env` file to your deployment platform:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_WEB3FORMS_ACCESS_KEY`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

## Testing the Production Build

```bash
npm run preview
```

This serves the production build locally for testing before deployment.

## Key Features Setup

### Authentication

- Users can sign up with email/password
- Login system with session management
- Protected routes that require authentication
- Account management page

### Payment Integration

- Stripe checkout for subscriptions
- Payment status tracking
- Payment-gated content access
- Webhook handling for payment events

### Quote System

- Contact form for quote requests
- Email notifications via Web3Forms
- Quote data stored in Supabase

## Troubleshooting

### Build Errors

If you encounter build errors, try:

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Environment Variables Not Working

- Ensure all variables start with `VITE_` prefix
- Restart the dev server after changing `.env`
- Verify variables are set in deployment platform

### Supabase Connection Issues

- Check that your Supabase URL and key are correct
- Verify your Supabase project is active
- Check Row Level Security (RLS) policies on tables

## Support

For questions or issues:
1. Check the deployment platform documentation
2. Review Supabase logs for database issues
3. Check browser console for frontend errors
4. Contact the development team

## License

Private project - all rights reserved
