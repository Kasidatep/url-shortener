'use client';

import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';

export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return <LazyMotion features={domAnimation} strict><MotionConfig reducedMotion="user" transition={{ type: 'spring', stiffness: 340, damping: 30 }}>{children}</MotionConfig></LazyMotion>;
}
