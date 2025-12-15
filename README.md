# WFG Assignment - Frontend

Next.js frontend application for the WFG Assignment project.

## Tech Stack

- **Framework**: Next.js 16.0.10
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Deployment on Vercel

This project is configured for deployment on Vercel:

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository in [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and configure the build settings
4. Add your environment variables in Vercel dashboard
5. Deploy!

The `vercel.json` file is included for custom configuration if needed.

## Environment Variables

Create a `.env.local` file with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## License

MIT
