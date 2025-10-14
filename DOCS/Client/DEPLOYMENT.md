# MediSupply Client Deployment Guide

## Overview
This guide covers the deployment of the MediSupply client application to various hosting platforms, including build optimization, environment configuration, and production considerations.

## Prerequisites

### System Requirements
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher
- **Git**: For version control
- **Build Tools**: Platform-specific requirements

### Required Accounts
- **Hosting Platform**: Vercel, Netlify, AWS, etc.
- **Domain Registrar**: For custom domain (optional)
- **CDN**: For static asset delivery (optional)

## Build Process

### Development Build
```bash
# Navigate to client directory
cd SaaS/client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
# Create production build
npm run build

# Start production server locally
npm start
```

### Build Optimization
```bash
# Analyze bundle size
npm run build -- --analyze

# Generate static export (if needed)
npm run export
```

## Environment Configuration

### Environment Variables
Create environment files for different environments:

#### .env.local (Development)
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3500
NEXT_PUBLIC_PROD=false
NEXT_PUBLIC_USE_TUNNEL=false

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=true
NEXT_PUBLIC_ENABLE_MOCK_DATA=true

# Development Settings
NEXT_PUBLIC_DEV_MODE=true
NEXT_PUBLIC_LOG_LEVEL=debug
```

#### .env.production (Production)
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://api.medisupply.com
NEXT_PUBLIC_PROD=true
NEXT_PUBLIC_USE_TUNNEL=false

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DEBUG=false
NEXT_PUBLIC_ENABLE_MOCK_DATA=false

# Production Settings
NEXT_PUBLIC_DEV_MODE=false
NEXT_PUBLIC_LOG_LEVEL=error

# Analytics
NEXT_PUBLIC_GA_TRACKING_ID=G-XXXXXXXXXX
NEXT_PUBLIC_SENTRY_DSN=https://your-sentry-dsn.ingest.sentry.io/xxxxx

# CDN Configuration
NEXT_PUBLIC_CDN_URL=https://cdn.medisupply.com
```

#### .env.staging (Staging)
```env
# API Configuration
NEXT_PUBLIC_API_URL=https://staging-api.medisupply.com
NEXT_PUBLIC_PROD=false
NEXT_PUBLIC_USE_TUNNEL=false

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_DEBUG=true
NEXT_PUBLIC_ENABLE_MOCK_DATA=false

# Staging Settings
NEXT_PUBLIC_DEV_MODE=false
NEXT_PUBLIC_LOG_LEVEL=warn
```

### Configuration Management
```typescript
// src/Config.js
export const API_BASE_URL = process.env.NEXT_PUBLIC_PROD === 'true'
  ? 'https://api.medisupply.com'
  : process.env.NEXT_PUBLIC_USE_TUNNEL === 'true'
  ? 'https://your-tunnel-url.loca.lt'
  : 'http://localhost:3500';

export const CONFIG = {
  API_URL: API_BASE_URL,
  IS_PRODUCTION: process.env.NEXT_PUBLIC_PROD === 'true',
  IS_DEVELOPMENT: process.env.NEXT_PUBLIC_DEV_MODE === 'true',
  ENABLE_ANALYTICS: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true',
  ENABLE_DEBUG: process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true',
  LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
  GA_TRACKING_ID: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
  SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
  CDN_URL: process.env.NEXT_PUBLIC_CDN_URL,
};
```

## Deployment Platforms

### Vercel (Recommended)

#### Setup
```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

#### Configuration (vercel.json)
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/next"
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ],
  "env": {
    "NEXT_PUBLIC_API_URL": "https://api.medisupply.com",
    "NEXT_PUBLIC_PROD": "true"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "redirects": [
    {
      "source": "/home",
      "destination": "/",
      "permanent": true
    }
  ]
}
```

#### Environment Variables in Vercel Dashboard
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings > Environment Variables
4. Add environment variables for each environment (Production, Preview, Development)

### Netlify

#### Setup
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to Netlify
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### Configuration (netlify.toml)
```toml
[build]
  command = "npm run build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

### AWS Amplify

#### Setup
1. Connect your GitHub repository to AWS Amplify
2. Configure build settings
3. Set environment variables
4. Deploy

#### Configuration (amplify.yml)
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: .next
    files:
      - '**/*'
  cache:
    paths:
      - node_modules/**/*
      - .next/cache/**/*
```

### Docker Deployment

#### Dockerfile
```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

#### Docker Compose
```yaml
version: '3.8'

services:
  client:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=http://api:3500
    depends_on:
      - api
    restart: unless-stopped

  api:
    build:
      context: ../API
      dockerfile: Dockerfile
    ports:
      - "3500:3500"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/MEDISupply
    depends_on:
      - mongo
    restart: unless-stopped

  mongo:
    image: mongo:5.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=secure_password
    volumes:
      - mongo_data:/data/db
    restart: unless-stopped

volumes:
  mongo_data:
```

## Build Optimization

### Next.js Configuration (next.config.ts)
```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable static optimization
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: ['cdn.medisupply.com', 'localhost'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression
  compress: true,
  
  // Bundle analyzer
  webpack: (config, { isServer }) => {
    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    
    return config
  },
  
  // Experimental features
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Redirects
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },
  
  // Rewrites
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
```

### Bundle Analysis
```bash
# Install bundle analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.ts
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer(nextConfig)

# Run analysis
ANALYZE=true npm run build
```

## Performance Optimization

### Code Splitting
```typescript
// Dynamic imports for code splitting
import dynamic from 'next/dynamic'

// Lazy load components
const MedicineDetail = dynamic(() => import('@/Components/MedicineDetail'), {
  loading: () => <LoadingPage />,
  ssr: false
})

const AdminPanel = dynamic(() => import('@/Components/AdminPanel'), {
  loading: () => <LoadingPage />,
  ssr: false
})
```

### Image Optimization
```tsx
import Image from 'next/image'

// Optimized image component
<Image
  src="/medicine-image.jpg"
  alt="Medicine"
  width={300}
  height={200}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
  priority={true}
/>
```

### Caching Strategy
```typescript
// Service Worker for caching
// public/sw.js
const CACHE_NAME = 'medisupply-v1'
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  )
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  )
})
```

## Monitoring and Analytics

### Google Analytics
```typescript
// pages/_app.tsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as ga from '../lib/ga'

function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return <Component {...pageProps} />
}

export default MyApp
```

### Sentry Error Tracking
```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
})

// pages/_app.tsx
import * as Sentry from '@sentry/nextjs'

function MyApp({ Component, pageProps }) {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorPage />}>
      <Component {...pageProps} />
    </Sentry.ErrorBoundary>
  )
}
```

## Security Considerations

### Content Security Policy
```typescript
// next.config.ts
async headers() {
  return [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: `
            default-src 'self';
            script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: https:;
            font-src 'self';
            connect-src 'self' https://api.medisupply.com;
            frame-ancestors 'none';
          `.replace(/\s{2,}/g, ' ').trim()
        }
      ]
    }
  ]
}
```

### HTTPS Enforcement
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Force HTTPS in production
  if (process.env.NODE_ENV === 'production' && !request.headers.get('x-forwarded-proto')?.includes('https')) {
    return NextResponse.redirect(
      `https://${request.headers.get('host')}${request.nextUrl.pathname}`,
      301
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}
```

## CI/CD Pipeline

### GitHub Actions
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### Environment-Specific Deployments
```yaml
# .github/workflows/deploy-staging.yml
name: Deploy to Staging

on:
  push:
    branches: [ develop ]

jobs:
  deploy-staging:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--target staging'
```

## Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear npm cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Environment Variables
```bash
# Check environment variables
echo $NEXT_PUBLIC_API_URL

# Verify build-time variables
npm run build -- --debug
```

#### Performance Issues
```bash
# Analyze bundle size
npm run build -- --analyze

# Check Core Web Vitals
npm run lighthouse
```

### Debug Mode
```typescript
// Enable debug mode
const DEBUG = process.env.NEXT_PUBLIC_ENABLE_DEBUG === 'true'

if (DEBUG) {
  console.log('Debug mode enabled')
  console.log('API URL:', process.env.NEXT_PUBLIC_API_URL)
  console.log('Environment:', process.env.NODE_ENV)
}
```

## Post-Deployment Checklist

### Performance
- [ ] Core Web Vitals are green
- [ ] Bundle size is optimized
- [ ] Images are compressed
- [ ] CDN is configured

### Security
- [ ] HTTPS is enforced
- [ ] Security headers are set
- [ ] CSP is configured
- [ ] Dependencies are updated

### Functionality
- [ ] All pages load correctly
- [ ] API calls work
- [ ] Authentication works
- [ ] Forms submit properly

### Monitoring
- [ ] Analytics is tracking
- [ ] Error tracking is active
- [ ] Performance monitoring is set up
- [ ] Uptime monitoring is configured

This comprehensive deployment guide ensures a smooth and secure deployment process for the MediSupply client application across various hosting platforms. 