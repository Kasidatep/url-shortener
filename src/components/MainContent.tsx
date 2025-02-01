'use client';

import React, { useEffect } from 'react';

import { StytchProvider } from '@stytch/nextjs';
import { createStytchHeadlessClient } from '@stytch/nextjs/headless';
import { env } from '@/config/env';
import Profile from './Profile';
const stytch = createStytchHeadlessClient(env.stytch?.publicToken);


function MyApp({ Component, pageProps }: { Component: React.ComponentType, pageProps: any }) {
  return (
    <StytchProvider stytch={stytch}>
      <Profile />
      <Component {...pageProps} />
    </StytchProvider>
  );
}

export default MyApp;