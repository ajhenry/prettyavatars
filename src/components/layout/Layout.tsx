import clsx from 'clsx';
import * as React from 'react';
import useDarkMode from 'use-dark-mode';

import { Footer } from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { value } = useDarkMode(true);

  console.log('dark mode: ', value);
  // Put Header or Footer Here
  return (
    <div className={clsx('min-h-screen')}>
      <Header />
      <div className={clsx('h-full')}>{children}</div>
      <Footer />
    </div>
  );
}
