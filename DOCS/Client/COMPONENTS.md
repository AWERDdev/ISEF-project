# MediSupply Client Components Documentation

## Overview
This document provides detailed information about all reusable components in the MediSupply client application, including their props, usage examples, and implementation details.

## Navigation Components

### NavBar.tsx
Main navigation bar component for authenticated users.

**Location:** `src/Components/NavBar.tsx`

**Props:**
```typescript
interface NavBarProps {
  user?: User;
  onLogout?: () => void;
}
```

**Features:**
- User profile display
- Navigation menu
- Logout functionality
- Responsive design
- Search functionality

**Usage:**
```tsx
import Navbar from '@/Components/NavBar';

function App() {
  const handleLogout = () => {
    // Logout logic
  };

  return (
    <Navbar 
      user={currentUser} 
      onLogout={handleLogout} 
    />
  );
}
```

**Implementation Details:**
- Uses Tailwind CSS for styling
- Responsive breakpoints for mobile/desktop
- Dropdown menu for user actions
- Search bar integration
- Cart icon with item count

### NavBarNoAUTH.tsx
Navigation bar for unauthenticated users.

**Location:** `src/Components/NavBarNoAUTH.tsx`

**Props:** None

**Features:**
- Logo display
- Login/Signup buttons
- Responsive design
- Clean, minimal interface

**Usage:**
```tsx
import NavBarNoAUTH from '@/Components/NavBarNoAUTH';

function LandingPage() {
  return (
    <div>
      <NavBarNoAUTH />
      {/* Page content */}
    </div>
  );
}
```

### NavBarNoAUTH2.tsx
Alternative navigation bar with enhanced features.

**Location:** `src/Components/NavBarNoAUTH2.tsx`

**Props:**
```typescript
interface NavBarNoAUTH2Props {
  showSearch?: boolean;
  onSearch?: (query: string) => void;
}
```

**Features:**
- Enhanced search functionality
- Better mobile responsiveness
- Improved accessibility
- Dark mode support

**Usage:**
```tsx
import NavBarNoAUTH2 from '@/Components/NavBarNoAUTH2';

function MedicinePage() {
  const handleSearch = (query: string) => {
    // Search logic
  };

  return (
    <NavBarNoAUTH2 
      showSearch={true}
      onSearch={handleSearch}
    />
  );
}
```

### BottomNav.tsx
Bottom navigation component for mobile devices.

**Location:** `src/Components/BottomNav.tsx`

**Props:**
```typescript
interface BottomNavProps {
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}
```

**Features:**
- Mobile-first design
- Tab-based navigation
- Icon-based interface
- Active state indicators

**Usage:**
```tsx
import BottomNav from '@/Components/BottomNav';

function MobileLayout() {
  const handleTabChange = (tab: string) => {
    // Tab change logic
  };

  return (
    <div className="pb-16">
      {/* Page content */}
      <BottomNav 
        activeTab="home"
        onTabChange={handleTabChange}
      />
    </div>
  );
}
```

## Button Components

### ButtonStyles.tsx
Collection of styled button components with consistent design system.

**Location:** `src/Components/ButtonStyles.tsx`

**Available Button Styles:**

#### ButtonStyle1 - Primary Gradient Button
```tsx
interface ButtonStyle1Props {
  ButtonText: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

**Usage:**
```tsx
import { ButtonStyle1 } from '@/Components/ButtonStyles';

<ButtonStyle1 
  ButtonText="Get Started" 
  onClick={handleClick}
  disabled={false}
/>
```

**Styling:**
- Blue to green gradient background
- White text
- Hover effects
- Disabled state styling

#### ButtonStyle2 - Secondary Outline Button
```tsx
interface ButtonStyle2Props {
  ButtonText: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

**Usage:**
```tsx
import { ButtonStyle2 } from '@/Components/ButtonStyles';

<ButtonStyle2 
  ButtonText="Learn More" 
  onClick={handleClick}
/>
```

**Styling:**
- White background with border
- Blue text
- Hover background change
- Clean, minimal design

#### ButtonStyle3 - Danger Button
```tsx
interface ButtonStyle3Props {
  ButtonText: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

**Usage:**
```tsx
import { ButtonStyle3 } from '@/Components/ButtonStyles';

<ButtonStyle3 
  ButtonText="Delete" 
  onClick={handleDelete}
/>
```

**Styling:**
- Red background
- White text
- Warning/destructive actions
- Hover effects

#### ButtonStyle4 - Warning Button
```tsx
interface ButtonStyle4Props {
  ButtonText: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

**Usage:**
```tsx
import { ButtonStyle4 } from '@/Components/ButtonStyles';

<ButtonStyle4 
  ButtonText="Update" 
  onClick={handleUpdate}
/>
```

**Styling:**
- Orange background
- White text
- Warning/update actions
- Gradient effects

#### ButtonStyle5 - Icon Button
```tsx
interface ButtonStyle5Props {
  ButtonText?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

**Usage:**
```tsx
import { ButtonStyle5 } from '@/Components/ButtonStyles';
import { Heart, Share } from 'lucide-react';

<ButtonStyle5 onClick={handleFavorite}>
  <Heart size={20} />
</ButtonStyle5>

<ButtonStyle5 onClick={handleShare}>
  <Share size={20} />
</ButtonStyle5>
```

**Styling:**
- Circular/square design
- Icon-focused
- Hover effects
- Compact size

#### ButtonStyle6 - Small Button
```tsx
interface ButtonStyle6Props {
  ButtonText: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

**Usage:**
```tsx
import { ButtonStyle6 } from '@/Components/ButtonStyles';

<ButtonStyle6 
  ButtonText="Add" 
  onClick={handleAdd}
/>
```

**Styling:**
- Smaller padding
- Compact design
- Same gradient as ButtonStyle1
- Reduced font size

#### ButtonStyle7 - Large Button
```tsx
interface ButtonStyle7Props {
  ButtonText: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

**Usage:**
```tsx
import { ButtonStyle7 } from '@/Components/ButtonStyles';

<ButtonStyle7 
  ButtonText="Purchase Now" 
  onClick={handlePurchase}
/>
```

**Styling:**
- Larger padding
- Bigger font size
- Prominent design
- Call-to-action styling

#### ButtonStyle8 - Disabled Button
```tsx
interface ButtonStyle8Props {
  ButtonText: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

**Usage:**
```tsx
import { ButtonStyle8 } from '@/Components/ButtonStyles';

<ButtonStyle8 
  ButtonText="Processing..." 
  disabled={true}
/>
```

**Styling:**
- Grayed out appearance
- Reduced opacity
- Cursor not-allowed
- Disabled state

#### ButtonStyle9 - Loading Button
```tsx
interface ButtonStyle9Props {
  ButtonText: string;
  onClick?: () => void;
  loading?: boolean;
  className?: string;
  children?: React.ReactNode;
}
```

**Usage:**
```tsx
import { ButtonStyle9 } from '@/Components/ButtonStyles';

<ButtonStyle9 
  ButtonText="Loading..." 
  loading={true}
/>
```

**Styling:**
- Loading spinner
- Disabled during loading
- Loading text
- Animated effects

## Card Components

### Card.tsx
Reusable card component for displaying content in a consistent layout.

**Location:** `src/Components/Card.tsx`

**Props:**
```typescript
interface CardProps {
  Title: React.ReactNode;
  P: string;
  ICON?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}
```

**Features:**
- Flexible content layout
- Optional icon support
- Clickable functionality
- Responsive design
- Hover effects

**Usage:**
```tsx
import Card from '@/Components/Card';
import { Box, Search, Shield } from 'lucide-react';

// Basic card
<Card 
  Title="Feature Title"
  P="This is a description of the feature."
/>

// Card with icon
<Card 
  Title="Search Medicines"
  P="Find medicines quickly with our advanced search system."
  ICON={<Search size={40} />}
/>

// Clickable card
<Card 
  Title="Security"
  P="Your data is protected with enterprise-grade security."
  ICON={<Shield size={40} />}
  onClick={handleSecurityClick}
/>
```

**Styling:**
- White background
- Rounded corners
- Shadow effects
- Hover animations
- Responsive padding

### MedicineCON.tsx
Specialized container component for displaying medicine information.

**Location:** `src/Components/MedicineCON.tsx`

**Props:**
```typescript
interface MedicineCONProps {
  medicine: Medicine;
  onAddToCart?: (medicineId: string, quantity: number) => void;
  onViewDetails?: (medicineId: string) => void;
  onFavorite?: (medicineId: string) => void;
  isFavorite?: boolean;
  className?: string;
}
```

**Features:**
- Medicine image display
- Price and stock information
- Add to cart functionality
- View details link
- Favorite functionality
- Responsive design

**Usage:**
```tsx
import MedicineCON from '@/Components/MedicineCON';

function MedicineGrid() {
  const handleAddToCart = (medicineId: string, quantity: number) => {
    // Add to cart logic
  };

  const handleViewDetails = (medicineId: string) => {
    // Navigate to details page
  };

  const handleFavorite = (medicineId: string) => {
    // Toggle favorite
  };

  return (
    <MedicineCON 
      medicine={medicineData}
      onAddToCart={handleAddToCart}
      onViewDetails={handleViewDetails}
      onFavorite={handleFavorite}
      isFavorite={isFavorite}
    />
  );
}
```

**Styling:**
- Card-based layout
- Medicine image placeholder
- Price highlighting
- Stock status indicators
- Action buttons
- Hover effects

## Authentication Components

### AuthGuard.tsx
Component to protect routes and content that require authentication.

**Location:** `src/Components/AuthGuard.tsx`

**Props:**
```typescript
interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
}
```

**Features:**
- Authentication checking
- Automatic redirect
- Custom fallback content
- Loading states

**Usage:**
```tsx
import AuthGuard from '@/Components/AuthGuard';

function ProtectedPage() {
  return (
    <AuthGuard>
      <div>
        <h1>Protected Content</h1>
        <p>This content is only visible to authenticated users.</p>
      </div>
    </AuthGuard>
  );
}

// With custom fallback
function ProfilePage() {
  return (
    <AuthGuard 
      fallback={<div>Please log in to view your profile.</div>}
    >
      <UserProfile />
    </AuthGuard>
  );
}
```

**Implementation Details:**
- Checks localStorage for auth tokens
- Redirects to login if not authenticated
- Shows loading state during check
- Supports custom fallback content

## Page State Components

### PageHandle.tsx
Components for handling common page states like loading, errors, and empty states.

**Location:** `src/Components/PageHandle.tsx`

**Available Components:**

#### LoadingPage
Displays a loading spinner with optional message.

**Props:**
```typescript
interface LoadingPageProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}
```

**Usage:**
```tsx
import { LoadingPage } from '@/Components/PageHandle';

function MedicineList() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <LoadingPage message="Loading medicines..." />;
  }

  return <MedicineGrid />;
}
```

**Styling:**
- Animated spinner
- Centered layout
- Customizable message
- Different sizes

#### ErrorPage
Displays error messages with retry functionality.

**Props:**
```typescript
interface ErrorPageProps {
  error: string | Error;
  onRetry?: () => void;
  showRetry?: boolean;
}
```

**Usage:**
```tsx
import { ErrorPage } from '@/Components/PageHandle';

function MedicineDetail() {
  const [error, setError] = useState<string | null>(null);

  const handleRetry = () => {
    // Retry logic
  };

  if (error) {
    return (
      <ErrorPage 
        error={error}
        onRetry={handleRetry}
        showRetry={true}
      />
    );
  }

  return <MedicineContent />;
}
```

**Styling:**
- Error icon
- Error message display
- Retry button
- Clean error layout

#### EmptyState
Displays content when there's no data to show.

**Props:**
```typescript
interface EmptyStateProps {
  title: string;
  message: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
}
```

**Usage:**
```tsx
import { EmptyState } from '@/Components/PageHandle';
import { ShoppingCart } from 'lucide-react';

function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState([]);

  if (cartItems.length === 0) {
    return (
      <EmptyState 
        title="Your cart is empty"
        message="Add some medicines to get started."
        icon={<ShoppingCart size={64} />}
        action={<ButtonStyle1 ButtonText="Browse Medicines" />}
      />
    );
  }

  return <CartItems />;
}
```

**Styling:**
- Centered layout
- Large icon
- Clear messaging
- Call-to-action button

## Form Components

### Input Components
While not separate files, the application includes reusable input patterns.

**Common Input Patterns:**

#### Text Input
```tsx
interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  required?: boolean;
  type?: 'text' | 'email' | 'password';
}
```

**Usage:**
```tsx
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    </form>
  );
}
```

#### Select Input
```tsx
interface SelectInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  error?: string;
  required?: boolean;
}
```

**Usage:**
```tsx
function CategoryFilter() {
  const [category, setCategory] = useState('');

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'antibiotics', label: 'Antibiotics' },
    { value: 'pain-relief', label: 'Pain Relief' },
    { value: 'cardiovascular', label: 'Cardiovascular' }
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Category
      </label>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
```

## Layout Components

### Container
Reusable container component for consistent page layouts.

**Usage:**
```tsx
function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}
```

### Grid Layout
Responsive grid system for displaying content.

**Usage:**
```tsx
function MedicineGrid({ medicines }: { medicines: Medicine[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {medicines.map(medicine => (
        <MedicineCON 
          key={medicine._id} 
          medicine={medicine} 
        />
      ))}
    </div>
  );
}
```

## Component Best Practices

### 1. Props Interface
Always define TypeScript interfaces for component props:
```tsx
interface ComponentProps {
  title: string;
  description?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}
```

### 2. Default Props
Use default props for optional values:
```tsx
const Component: React.FC<ComponentProps> = ({
  title,
  description = '',
  onClick,
  disabled = false,
  className = ''
}) => {
  // Component implementation
};
```

### 3. Conditional Rendering
Use conditional rendering for optional elements:
```tsx
{description && (
  <p className="text-gray-600">{description}</p>
)}

{onClick && (
  <button onClick={onClick} disabled={disabled}>
    {title}
  </button>
)}
```

### 4. Accessibility
Include proper accessibility attributes:
```tsx
<button
  onClick={onClick}
  disabled={disabled}
  aria-label={title}
  aria-describedby={description ? 'description' : undefined}
>
  {title}
</button>
```

### 5. Error Boundaries
Wrap components in error boundaries:
```tsx
class ComponentErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage error="Something went wrong" />;
    }

    return this.props.children;
  }
}
```

## Component Testing

### Unit Tests
Test individual components in isolation:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
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

test('calls onClick when card is clicked', () => {
  const handleClick = jest.fn();
  
  render(
    <Card 
      Title="Test Title"
      P="Test description"
      onClick={handleClick}
    />
  );
  
  fireEvent.click(screen.getByText('Test Title'));
  expect(handleClick).toHaveBeenCalledTimes(1);
});
```

### Integration Tests
Test component interactions:
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import MedicineCON from '@/Components/MedicineCON';

test('adds medicine to cart when add to cart button is clicked', () => {
  const handleAddToCart = jest.fn();
  const medicine = {
    _id: '1',
    name: 'Test Medicine',
    price: 10.99,
    stock: 'In Stock'
  };
  
  render(
    <MedicineCON 
      medicine={medicine}
      onAddToCart={handleAddToCart}
    />
  );
  
  fireEvent.click(screen.getByText('Add to Cart'));
  expect(handleAddToCart).toHaveBeenCalledWith('1', 1);
});
```

## Performance Optimization

### 1. React.memo
Use React.memo for expensive components:
```tsx
const ExpensiveComponent = React.memo(({ data }: { data: any[] }) => {
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});
```

### 2. useMemo
Memoize expensive calculations:
```tsx
const ExpensiveCalculation = ({ items }: { items: any[] }) => {
  const processedItems = useMemo(() => {
    return items.map(item => ({
      ...item,
      processed: expensiveOperation(item)
    }));
  }, [items]);

  return <div>{/* Render processed items */}</div>;
};
```

### 3. useCallback
Memoize callback functions:
```tsx
const ParentComponent = () => {
  const handleClick = useCallback((id: string) => {
    // Handle click logic
  }, []);

  return <ChildComponent onClick={handleClick} />;
};
```

## Component Documentation

### JSDoc Comments
Add comprehensive documentation to components:
```tsx
/**
 * Card component for displaying content in a consistent layout.
 * 
 * @param props - Component props
 * @param props.Title - The title content (can be string or React node)
 * @param props.P - The description text
 * @param props.ICON - Optional icon to display
 * @param props.onClick - Optional click handler
 * @param props.className - Additional CSS classes
 * 
 * @example
 * ```tsx
 * <Card 
 *   Title="Feature Title"
 *   P="This is a description of the feature."
 *   ICON={<Search size={40} />}
 *   onClick={handleClick}
 * />
 * ```
 */
const Card: React.FC<CardProps> = ({
  Title,
  P,
  ICON,
  onClick,
  className = ''
}) => {
  // Component implementation
};
```

This comprehensive component documentation provides developers with all the information needed to effectively use and extend the MediSupply client components. 