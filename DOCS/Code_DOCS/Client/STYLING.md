# MediSupply Client Styling Documentation

## Overview
The MediSupply client uses Tailwind CSS 4 as its primary styling framework, with a custom design system that ensures consistency across the application. This document outlines the styling architecture, design tokens, and best practices.

## Design System

### Color Palette

#### Primary Colors
```css
:root {
  /* Blue - Primary Brand Color */
  --color-blue-50: #eff6ff;
  --color-blue-100: #dbeafe;
  --color-blue-200: #bfdbfe;
  --color-blue-300: #93c5fd;
  --color-blue-400: #60a5fa;
  --color-blue-500: #3b82f6;
  --color-blue-600: #2563eb;
  --color-blue-700: #1d4ed8;
  --color-blue-800: #1e40af;
  --color-blue-900: #1e3a8a;

  /* Green - Secondary Brand Color */
  --color-green-50: #f0fdf4;
  --color-green-100: #dcfce7;
  --color-green-200: #bbf7d0;
  --color-green-300: #86efac;
  --color-green-400: #4ade80;
  --color-green-500: #22c55e;
  --color-green-600: #16a34a;
  --color-green-700: #15803d;
  --color-green-800: #166534;
  --color-green-900: #14532d;
}
```

#### Secondary Colors
```css
:root {
  /* Orange - Accent Color */
  --color-orange-50: #fff7ed;
  --color-orange-100: #ffedd5;
  --color-orange-200: #fed7aa;
  --color-orange-300: #fdba74;
  --color-orange-400: #fb923c;
  --color-orange-500: #f97316;
  --color-orange-600: #ea580c;
  --color-orange-700: #c2410c;
  --color-orange-800: #9a3412;
  --color-orange-900: #7c2d12;

  /* Purple - Tertiary Color */
  --color-purple-50: #faf5ff;
  --color-purple-100: #f3e8ff;
  --color-purple-200: #e9d5ff;
  --color-purple-300: #d8b4fe;
  --color-purple-400: #c084fc;
  --color-purple-500: #a855f7;
  --color-purple-600: #9333ea;
  --color-purple-700: #7c3aed;
  --color-purple-800: #6b21a8;
  --color-purple-900: #581c87;
}
```

#### Semantic Colors
```css
:root {
  /* Success */
  --color-success: #22c55e;
  --color-success-light: #4ade80;
  --color-success-dark: #16a34a;

  /* Warning */
  --color-warning: #f97316;
  --color-warning-light: #fb923c;
  --color-warning-dark: #ea580c;

  /* Error */
  --color-error: #ef4444;
  --color-error-light: #f87171;
  --color-error-dark: #dc2626;

  /* Info */
  --color-info: #3b82f6;
  --color-info-light: #60a5fa;
  --color-info-dark: #2563eb;
}
```

#### Neutral Colors
```css
:root {
  /* Gray Scale */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;

  /* White and Black */
  --color-white: #ffffff;
  --color-black: #000000;
}
```

### Typography

#### Font Families
```css
:root {
  --font-family-primary: 'Inter', system-ui, -apple-system, sans-serif;
  --font-family-secondary: 'ui-sans-serif', system-ui, sans-serif;
  --font-family-mono: 'ui-monospace', 'SFMono-Regular', monospace;
}
```

#### Font Sizes
```css
:root {
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  --text-6xl: 3.75rem;   /* 60px */
}
```

#### Font Weights
```css
:root {
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
}
```

#### Line Heights
```css
:root {
  --leading-none: 1;
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;
}
```

### Spacing System

#### Base Spacing
```css
:root {
  --space-0: 0px;
  --space-1: 0.25rem;   /* 4px */
  --space-2: 0.5rem;    /* 8px */
  --space-3: 0.75rem;   /* 12px */
  --space-4: 1rem;      /* 16px */
  --space-5: 1.25rem;   /* 20px */
  --space-6: 1.5rem;    /* 24px */
  --space-8: 2rem;      /* 32px */
  --space-10: 2.5rem;   /* 40px */
  --space-12: 3rem;     /* 48px */
  --space-16: 4rem;     /* 64px */
  --space-20: 5rem;     /* 80px */
  --space-24: 6rem;     /* 96px */
}
```

### Border Radius
```css
:root {
  --radius-none: 0px;
  --radius-sm: 0.125rem;   /* 2px */
  --radius-base: 0.25rem;  /* 4px */
  --radius-md: 0.375rem;   /* 6px */
  --radius-lg: 0.5rem;     /* 8px */
  --radius-xl: 0.75rem;    /* 12px */
  --radius-2xl: 1rem;      /* 16px */
  --radius-full: 9999px;
}
```

### Shadows
```css
:root {
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
```

## Tailwind CSS Configuration

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        accent: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        success: '#22c55e',
        warning: '#f97316',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        primary: ['Inter', 'system-ui', 'sans-serif'],
        secondary: ['ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
```

### Custom CSS Components

#### globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html {
    font-family: 'Inter', system-ui, sans-serif;
  }
  
  body {
    @apply bg-gray-50 text-gray-900;
  }
  
  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold text-gray-900;
  }
  
  h1 {
    @apply text-4xl md:text-5xl lg:text-6xl;
  }
  
  h2 {
    @apply text-3xl md:text-4xl;
  }
  
  h3 {
    @apply text-2xl md:text-3xl;
  }
  
  h4 {
    @apply text-xl md:text-2xl;
  }
  
  h5 {
    @apply text-lg md:text-xl;
  }
  
  h6 {
    @apply text-base md:text-lg;
  }
}

@layer components {
  /* Button Components */
  .btn-primary {
    @apply bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-secondary {
    @apply bg-white text-blue-600 border border-blue-200 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-danger {
    @apply bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-warning {
    @apply bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed;
  }
  
  .btn-small {
    @apply px-4 py-2 text-sm;
  }
  
  .btn-large {
    @apply px-8 py-4 text-lg;
  }
  
  /* Card Components */
  .card {
    @apply bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200;
  }
  
  .card-hover {
    @apply card hover:shadow-2xl hover:-translate-y-1 transition-all duration-200;
  }
  
  .card-flat {
    @apply bg-white rounded-xl border border-gray-200 p-6;
  }
  
  /* Form Components */
  .input-primary {
    @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200;
  }
  
  .input-error {
    @apply input-primary border-red-300 focus:ring-red-500;
  }
  
  .label-primary {
    @apply block text-sm font-medium text-gray-700 mb-2;
  }
  
  .label-error {
    @apply label-primary text-red-600;
  }
  
  /* Navigation Components */
  .nav-link {
    @apply text-gray-600 hover:text-blue-600 transition-colors duration-200;
  }
  
  .nav-link-active {
    @apply text-blue-600 font-medium;
  }
  
  /* Medicine Components */
  .medicine-card {
    @apply card-hover cursor-pointer;
  }
  
  .medicine-image {
    @apply w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center text-6xl;
  }
  
  .medicine-price {
    @apply text-2xl font-bold text-green-600;
  }
  
  .medicine-stock {
    @apply text-sm font-medium px-2 py-1 rounded-full;
  }
  
  .stock-in {
    @apply medicine-stock bg-green-100 text-green-800;
  }
  
  .stock-low {
    @apply medicine-stock bg-yellow-100 text-yellow-800;
  }
  
  .stock-out {
    @apply medicine-stock bg-red-100 text-red-800;
  }
  
  /* Loading Components */
  .loading-spinner {
    @apply animate-spin rounded-full border-4 border-gray-200 border-t-blue-600;
  }
  
  .loading-dots {
    @apply flex space-x-1;
  }
  
  .loading-dot {
    @apply w-2 h-2 bg-gray-400 rounded-full animate-bounce;
  }
  
  .loading-dot:nth-child(2) {
    animation-delay: 0.1s;
  }
  
  .loading-dot:nth-child(3) {
    animation-delay: 0.2s;
  }
  
  /* Utility Components */
  .gradient-text {
    @apply bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent;
  }
  
  .glass-effect {
    @apply bg-white/80 backdrop-blur-sm border border-white/20;
  }
  
  .text-shadow {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

@layer utilities {
  /* Custom Utilities */
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  
  .text-balance {
    text-wrap: balance;
  }
  
  .aspect-square {
    aspect-ratio: 1 / 1;
  }
  
  .aspect-video {
    aspect-ratio: 16 / 9;
  }
}
```

## Component-Specific Styles

### Button Styles
```tsx
// ButtonStyle1 - Primary Gradient Button
const ButtonStyle1: React.FC<ButtonStyle1Props> = ({
  ButtonText,
  onClick,
  disabled = false,
  className = ''
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        bg-gradient-to-r from-blue-600 to-green-600 
        hover:from-blue-700 hover:to-green-700
        text-white px-6 py-3 rounded-lg font-semibold
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {ButtonText}
    </button>
  );
};
```

### Card Styles
```tsx
// Card Component
const Card: React.FC<CardProps> = ({
  Title,
  P,
  ICON,
  onClick,
  className = ''
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-lg p-6
        hover:shadow-xl transition-shadow duration-200
        ${onClick ? 'cursor-pointer hover:-translate-y-1 transition-transform duration-200' : ''}
        ${className}
      `}
    >
      {ICON && (
        <div className="mb-4 text-blue-600">
          {ICON}
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2 text-gray-900">
        {Title}
      </h3>
      <p className="text-gray-600 leading-relaxed">
        {P}
      </p>
    </div>
  );
};
```

### Navigation Styles
```tsx
// NavBar Component
const NavBar: React.FC<NavBarProps> = ({ user, onLogout }) => {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold gradient-text">
                MediSupply
              </h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">{user.name}</span>
                <button
                  onClick={onLogout}
                  className="btn-secondary btn-small"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/UserLogin" className="nav-link">
                  Login
                </Link>
                <Link href="/UserSignup" className="btn-primary btn-small">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
```

## Responsive Design

### Breakpoint System
```css
/* Mobile First Approach */
/* Base styles (mobile) */
.element {
  @apply text-sm p-4;
}

/* Small screens (640px and up) */
@media (min-width: 640px) {
  .element {
    @apply text-base p-6;
  }
}

/* Medium screens (768px and up) */
@media (min-width: 768px) {
  .element {
    @apply text-lg p-8;
  }
}

/* Large screens (1024px and up) */
@media (min-width: 1024px) {
  .element {
    @apply text-xl p-10;
  }
}

/* Extra large screens (1280px and up) */
@media (min-width: 1280px) {
  .element {
    @apply text-2xl p-12;
  }
}
```

### Grid System
```tsx
// Responsive Grid Layout
const MedicineGrid: React.FC<{ medicines: Medicine[] }> = ({ medicines }) => {
  return (
    <div className="
      grid 
      grid-cols-1 
      sm:grid-cols-2 
      lg:grid-cols-3 
      xl:grid-cols-4 
      2xl:grid-cols-5
      gap-4 
      sm:gap-6 
      lg:gap-8
    ">
      {medicines.map(medicine => (
        <MedicineCON key={medicine._id} medicine={medicine} />
      ))}
    </div>
  );
};
```

### Container System
```tsx
// Responsive Container
const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="
      w-full 
      mx-auto 
      px-4 
      sm:px-6 
      lg:px-8 
      max-w-7xl
    ">
      {children}
    </div>
  );
};
```

## Animation and Transitions

### CSS Transitions
```css
/* Smooth transitions for interactive elements */
.interactive {
  @apply transition-all duration-200 ease-in-out;
}

/* Hover effects */
.hover-lift {
  @apply hover:-translate-y-1 hover:shadow-lg transition-all duration-200;
}

/* Scale effects */
.hover-scale {
  @apply hover:scale-105 transition-transform duration-200;
}

/* Color transitions */
.color-transition {
  @apply transition-colors duration-200;
}
```

### Custom Animations
```css
/* Fade in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

/* Slide in from left */
@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in-left {
  animation: slideInLeft 0.3s ease-out;
}

/* Pulse animation */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
```

## Dark Mode Support

### Dark Mode Configuration
```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  // ... rest of config
}
```

### Dark Mode Styles
```css
/* Dark mode color overrides */
.dark {
  --color-gray-50: #111827;
  --color-gray-100: #1f2937;
  --color-gray-200: #374151;
  --color-gray-300: #4b5563;
  --color-gray-400: #6b7280;
  --color-gray-500: #9ca3af;
  --color-gray-600: #d1d5db;
  --color-gray-700: #e5e7eb;
  --color-gray-800: #f3f4f6;
  --color-gray-900: #f9fafb;
}

/* Dark mode component styles */
.dark .card {
  @apply bg-gray-800 border-gray-700;
}

.dark .btn-primary {
  @apply from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600;
}

.dark .input-primary {
  @apply bg-gray-800 border-gray-600 text-gray-100;
}
```

## Accessibility

### Focus States
```css
/* Consistent focus indicators */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2;
}

/* High contrast focus for accessibility */
.focus-high-contrast {
  @apply focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white;
}
```

### Screen Reader Support
```css
/* Hide visually but keep accessible */
.sr-only {
  @apply absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0;
}

/* Skip link for keyboard navigation */
.skip-link {
  @apply sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded;
}
```

## Performance Optimization

### CSS Optimization
```css
/* Use CSS custom properties for dynamic values */
:root {
  --header-height: 4rem;
  --sidebar-width: 16rem;
}

/* Optimize animations */
.optimized-animation {
  @apply transform-gpu; /* Use GPU acceleration */
}

/* Reduce paint operations */
.no-paint {
  @apply transform-gpu will-change-transform;
}
```

### Critical CSS
```css
/* Inline critical styles in HTML head */
.critical {
  /* Above-the-fold styles only */
  @apply bg-white text-gray-900;
}
```

## Best Practices

### 1. Consistent Naming
```css
/* Use BEM methodology or similar */
.medicine-card { }
.medicine-card__image { }
.medicine-card__title { }
.medicine-card--featured { }
```

### 2. Mobile First
```css
/* Start with mobile styles, then enhance */
.component {
  @apply text-sm p-4; /* Mobile */
  
  @screen sm {
    @apply text-base p-6; /* Tablet */
  }
  
  @screen lg {
    @apply text-lg p-8; /* Desktop */
  }
}
```

### 3. Semantic Colors
```css
/* Use semantic color names */
.success { @apply text-green-600; }
.warning { @apply text-yellow-600; }
.error { @apply text-red-600; }
.info { @apply text-blue-600; }
```

### 4. Consistent Spacing
```css
/* Use design system spacing */
.section {
  @apply py-8 md:py-12 lg:py-16;
}

.container {
  @apply px-4 sm:px-6 lg:px-8;
}
```

### 5. Performance Considerations
```css
/* Avoid expensive properties in animations */
.good-animation {
  @apply transform opacity; /* GPU accelerated */
}

.bad-animation {
  @apply width height; /* Layout thrashing */
}
```

This comprehensive styling documentation provides developers with all the information needed to maintain consistency and create beautiful, accessible, and performant user interfaces in the MediSupply application. 