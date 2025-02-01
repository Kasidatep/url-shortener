'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStytchUser } from '@stytch/nextjs';

export default function Profile() {
  const router = useRouter();
  const { user, isInitialized } = useStytchUser();

  useEffect(() => {
    if (isInitialized && user === null) {
        alert('Please log in to view your profile');
      router.push('/login');
    }
  }, [user, isInitialized]);

  return (
    <div>
      <h1>Your Profile</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}