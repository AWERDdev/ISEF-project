# MediSupply Client Documentation

## Overview
The MediSupply client is a modern React application built with Next.js 15, TypeScript, and Tailwind CSS. It provides a responsive web interface for medical supply management, allowing users to browse medicines, manage shopping carts, and place orders.

## Technology Stack

### Core Technologies
- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS 4**: Utility-first CSS framework
- **Lucide React**: Icon library

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Turbopack**: Fast bundler (development)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── About/             # About page
│   ├── COMPLogin/         # Company login page
│   ├── COMPSignup/        # Company signup page
│   ├── COMPDATAUpdate/    # Company profile update
│   ├── Contact/           # Contact page
│   ├── Features/          # Features page
│   ├── Favorites/         # User favorites page
│   ├── MainPage/          # Main medicine catalog
│   ├── medicine/          # Medicine detail pages
│   │   └── [id]/          # Dynamic medicine pages
│   ├── Profile/           # User profile page
│   ├── PurchasePage/      # Purchase/checkout page
│   ├── SelectLogin/       # Login type selection
│   ├── SelectSignup/      # Signup type selection
│   ├── SelectUpdate/      # Update type selection
│   ├── ShoppingCart/      # Shopping cart page
│   ├── UserLogin/         # User login page
│   ├── UserSignup/        # User signup page
│   ├── UserDataUpdate/    # User profile update
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── Components/            # Reusable components
│   ├── AuthGuard.tsx      # Authentication guard
│   ├── BottomNav.tsx      # Bottom navigation
│   ├── ButtonStyles.tsx   # Button components
│   ├── Card.tsx           # Card component
│   ├── MedicineCON.tsx    # Medicine container
│   ├── NavBar.tsx         # Navigation bar
│   ├── NavBarNoAUTH.tsx   # Unauthenticated navbar
│   ├── NavBarNoAUTH2.tsx  # Alternative navbar
│   └── PageHandle.tsx     # Page loading/error states
├── Config.js              # Configuration settings
├── Tools/                 # Custom hooks and utilities
│   ├── useAppData.ts      # App data management
│   ├── useAppUpdate.ts    # App update utilities
│   ├── useInputHandling.ts # Input handling hooks
│   └── useLogOut.ts       # Logout functionality
└── Types/                 # TypeScript type definitions
    ├── Button.ts          # Button types
    ├── CardProps.ts       # Card component types
    ├── Company.ts         # Company data types
    ├── Items.ts           # Generic item types
    ├── Medicine.ts        # Medicine data types
    ├── Routes.ts          # Route constants
    └── User.ts            # User data types
```

## Getting Started

### Prerequisites
- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation
```bash
# Navigate to client directory
cd SaaS/client

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables
Create a `.env.local` file in the client directory:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3500
NEXT_PUBLIC_PROD=false
NEXT_PUBLIC_USE_TUNNEL=false

# Feature Flags
NEXT_PUBLIC_ENABLE_ANALYTICS=false
NEXT_PUBLIC_ENABLE_DEBUG=false
```

### Available Scripts
```bash
# Development
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## Core Components

### Navigation Components

#### NavBar.tsx
Main navigation bar for authenticated users.

**Props:**
```typescript
interface NavBarProps {
  user?: User;
  onLogout?: () => void;
}
```

**Usage:**
```tsx
import Navbar from '@/Components/NavBar';

<Navbar user={currentUser} onLogout={handleLogout} />
```

#### NavBarNoAUTH.tsx
Navigation bar for unauthenticated users.

**Usage:**
```tsx
import NavBarNoAUTH from '@/Components/NavBarNoAUTH';

<NavBarNoAUTH />
```

#### BottomNav.tsx
Bottom navigation for mobile devices.

**Usage:**
```tsx
import BottomNav from '@/Components/BottomNav';

<BottomNav />
```

### Button Components

#### ButtonStyles.tsx
Collection of styled button components.

**Available Styles:**
- `ButtonStyle1`: Primary gradient button
- `ButtonStyle2`: Secondary outline button
- `ButtonStyle3`: Danger button
- `ButtonStyle4`: Warning button
- `ButtonStyle5`: Icon button
- `ButtonStyle6`: Small button
- `ButtonStyle7`: Large button
- `ButtonStyle8`: Disabled button
- `ButtonStyle9`: Loading button

**Usage:**
```tsx
import { ButtonStyle1, ButtonStyle2 } from '@/Components/ButtonStyles';

<ButtonStyle1 ButtonText="Get Started" onClick={handleClick} />
<ButtonStyle2 ButtonText="Learn More" onClick={handleClick} />
```

### Card Components

#### Card.tsx
Reusable card component for displaying content.

**Props:**
```typescript
interface CardProps {
  Title: React.ReactNode;
  P: string;
  ICON?: React.ReactNode;
  onClick?: () => void;
}
```

**Usage:**
```tsx
import Card from '@/Components/Card';
import { Box } from 'lucide-react';

<Card 
  Title="Feature Title"
  P="Feature description"
  ICON={<Box size={40} />}
  onClick={handleClick}
/>
```

#### MedicineCON.tsx
Medicine container component for displaying medicine cards.

**Props:**
```typescript
interface MedicineCONProps {
  medicine: Medicine;
  onAddToCart?: (medicineId: string, quantity: number) => void;
  onViewDetails?: (medicineId: string) => void;
}
```

**Usage:**
```tsx
import MedicineCON from '@/Components/MedicineCON';

<MedicineCON 
  medicine={medicineData}
  onAddToCart={handleAddToCart}
  onViewDetails={handleViewDetails}
/>
```

### Authentication Components

#### AuthGuard.tsx
Component to protect routes requiring authentication.

**Usage:**
```tsx
import AuthGuard from '@/Components/AuthGuard';

<AuthGuard>
  <ProtectedComponent />
</AuthGuard>
```

### Page State Components

#### PageHandle.tsx
Components for handling page loading and error states.

**Available Components:**
- `LoadingPage`: Loading spinner
- `ErrorPage`: Error display
- `EmptyState`: Empty state display

**Usage:**
```tsx
import { LoadingPage, ErrorPage } from '@/Components/PageHandle';

{loading && <LoadingPage />}
{error && <ErrorPage error={error} />}
```

## Custom Hooks

### useAppData.ts
Hook for managing application data and state.

**Features:**
- User authentication state
- Shopping cart management
- Medicine data caching
- API communication

**Usage:**
```tsx
import { useAppData } from '@/Tools/useAppData';

const { user, cart, medicines, loading, error } = useAppData();
```

### useInputHandling.ts
Hook for handling form inputs and validation.

**Features:**
- Input state management
- Form validation
- Error handling
- Submit handling

**Usage:**
```tsx
import { useInputHandling } from '@/Tools/useInputHandling';

const { values, errors, handleChange, handleSubmit, isValid } = useInputHandling({
  initialValues: { email: '', password: '' },
  validationSchema: loginSchema,
  onSubmit: handleLogin
});
```

### useLogOut.ts
Hook for handling user logout.

**Usage:**
```tsx
import { useLogOut } from '@/Tools/useLogOut';

const { logout, loading } = useLogOut();
```

## Type Definitions

### User Types
```typescript
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: 'user' | 'admin';
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Company Types
```typescript
export interface Company {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  license: string;
  type: 'Hospital' | 'Pharmacy' | 'Clinic' | 'Laboratory';
  size: 'Small' | 'Medium' | 'Large';
  isVerified: boolean;
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Medicine Types
```typescript
export interface Medicine {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: string;
  description: string;
  longDescription: string;
  image: string;
  manufacturer: string;
  dosage: string;
  expiryDate: string;
  sideEffects: string[];
  contraindications: string[];
  minimumOrder: number;
  maxOrder: number;
  deliveryTime: string;
  certifications: string[];
  rating: number;
  reviewCount: number;
}
```

## Page Components

### Home Page (page.tsx)
Landing page with hero section and feature overview.

**Features:**
- Hero section with call-to-action
- Feature cards
- Responsive design
- Navigation to signup

### MainPage
Medicine catalog with search and filtering.

**Features:**
- Medicine grid display
- Search functionality
- Category filtering
- Pagination
- Add to cart functionality

### Medicine Detail Page ([id]/page.tsx)
Detailed view of individual medicine.

**Features:**
- Medicine information display
- Add to cart
- Request quote
- Add to favorites
- Related medicines

### Shopping Cart Page
Shopping cart management.

**Features:**
- Cart item display
- Quantity adjustment
- Remove items
- Proceed to checkout
- Price calculation

### Authentication Pages
- **UserLogin**: User login form
- **UserSignup**: User registration
- **COMPLogin**: Company login
- **COMPSignup**: Company registration
- **SelectLogin**: Login type selection
- **SelectSignup**: Signup type selection

## Styling System

### Tailwind CSS Configuration
The application uses Tailwind CSS 4 with custom configuration.

**Custom Colors:**
```css
:root {
  --color-primary: 59 130 246; /* blue-500 */
  --color-secondary: 34 197 94; /* green-500 */
  --color-accent: 249 115 22; /* orange-500 */
  --color-danger: 239 68 68; /* red-500 */
}
```

**Custom Components:**
```css
@layer components {
  .btn-primary {
    @apply bg-gradient-to-r from-blue-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-green-700 transition-all duration-200;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200;
  }
}
```

### Responsive Design
The application is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## State Management

### Local Storage
The application uses localStorage for:
- User authentication tokens
- Shopping cart data
- User preferences
- Session data

**Storage Keys:**
```typescript
const STORAGE_KEYS = {
  USER_TOKEN: 'userToken',
  COMPANY_TOKEN: 'companyToken',
  USER_ID: 'USERID',
  COMPANY_ID: 'COMPID',
  CART: 'cart',
  FAVORITES: 'favorites',
  THEME: 'theme'
};
```

### API Communication
The application communicates with the backend API using fetch.

**Base Configuration:**
```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_PROD === 'true'
  ? 'https://your-production-api.com'
  : 'http://localhost:3500';
```

## Performance Optimization

### Code Splitting
Next.js automatically handles code splitting for:
- Page components
- Dynamic imports
- Route-based splitting

### Image Optimization
- Next.js Image component for automatic optimization
- Lazy loading for images
- Responsive image sizes

### Caching Strategy
- API response caching
- Static page generation
- Browser caching headers

## Error Handling

### Global Error Boundary
```tsx
// app/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="btn-primary"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
```

### API Error Handling
```typescript
const handleApiError = (error: any) => {
  if (error.status === 401) {
    // Handle unauthorized
    logout();
  } else if (error.status === 404) {
    // Handle not found
    router.push('/404');
  } else {
    // Handle other errors
    showErrorNotification(error.message);
  }
};
```

## Testing

### Component Testing
```tsx
import { render, screen } from '@testing-library/react';
import Card from '@/Components/Card';

test('renders card with title and description', () => {
  render(
    <Card 
      Title="Test Title"
      P="Test description"
    />
  );
  
  expect(screen.getByText('Test Title')).toBeInTheDocument();
  expect(screen.getByText('Test description')).toBeInTheDocument();
});
```

### Page Testing
```tsx
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page';

test('renders home page with hero section', () => {
  render(<HomePage />);
  
  expect(screen.getByText(/Medical Supply Made Simple/)).toBeInTheDocument();
  expect(screen.getByText(/Get Started/)).toBeInTheDocument();
});
```

## Deployment

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm start
```

### Environment Configuration
```bash
# Production environment
NEXT_PUBLIC_PROD=true
NEXT_PUBLIC_API_URL=https://your-production-api.com
```

### Deployment Platforms
- **Vercel**: Recommended for Next.js
- **Netlify**: Alternative hosting
- **AWS Amplify**: AWS hosting
- **Docker**: Containerized deployment

## Best Practices

### Code Organization
1. **Component Structure**: Keep components small and focused
2. **File Naming**: Use PascalCase for components, camelCase for utilities
3. **Import Organization**: Group imports by type
4. **Type Safety**: Use TypeScript for all components

### Performance
1. **Lazy Loading**: Use dynamic imports for large components
2. **Memoization**: Use React.memo for expensive components
3. **Optimization**: Optimize images and assets
4. **Caching**: Implement proper caching strategies

### Accessibility
1. **Semantic HTML**: Use proper HTML elements
2. **ARIA Labels**: Add accessibility attributes
3. **Keyboard Navigation**: Ensure keyboard accessibility
4. **Color Contrast**: Maintain proper contrast ratios

### Security
1. **Input Validation**: Validate all user inputs
2. **XSS Prevention**: Sanitize user content
3. **CSRF Protection**: Implement CSRF tokens
4. **Secure Headers**: Use security headers

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

#### API Connection Issues
```bash
# Check API URL configuration
echo $NEXT_PUBLIC_API_URL

# Test API connectivity
curl http://localhost:3500/health
```

#### Styling Issues
```bash
# Rebuild Tailwind CSS
npm run build:css

# Clear browser cache
# Hard refresh: Ctrl+Shift+R
```

### Debug Mode
Enable debug mode for development:
```env
NEXT_PUBLIC_ENABLE_DEBUG=true
```

## Support and Resources

### Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

### Community
- [Next.js GitHub](https://github.com/vercel/next.js)
- [React GitHub](https://github.com/facebook/react)
- [Tailwind CSS GitHub](https://github.com/tailwindlabs/tailwindcss)

### Tools
- [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools)
- [Next.js DevTools](https://nextjs.org/docs/advanced-features/nextjs-compiler)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) 