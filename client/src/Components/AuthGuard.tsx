'use client';

import { useAppData } from '@/Tools/useAppData';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingPage } from './PageHandle';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAUTH, isLoading } = useAppData();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAUTH) {
      router.push('/');
    }
  }, [isAUTH, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingPage />
      </div>
    );
  }

  if (!isAUTH) {
    return null;
  }

  return <>{children}</>;
}; 