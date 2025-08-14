'use client';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/login');
      } else if (roles && !roles.includes(user.role)) {
        router.push('/403'); // yetki yok sayfası
      }
    }
  }, [user, loading, router, roles]);

  if (loading) return <p>Loading...</p>;

  return user ? children : null;
}
