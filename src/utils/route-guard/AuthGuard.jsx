'use client';
import PropTypes from 'prop-types';

import { useEffect } from 'react';

// next
import { useRouter } from 'next/navigation';

// project-imports
import Loader from 'components/Loader';

// ==============================|| AUTH GUARD ||============================== //

export default function AuthGuard({ children }) {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/auth/protected');
      const json = await res?.json();
      //check is user or therapist route
      if (!json?.protected) {
        router.push('/login');
      }
    };
    fetchData();

    // eslint-disable-next-line
  }, [session]);

  return <>{children}</>;
}

AuthGuard.propTypes = { children: PropTypes.any };
