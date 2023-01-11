import clsx from 'clsx';
import * as React from 'react';

import { Footer } from '@/components/layout/Footer';
import Header from '@/components/layout/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  // Put Header or Footer Here
  return (
    <div className='h-screen'>
      <Header />
      <div className={clsx('h-full')}>{children}</div>
      <Footer />
    </div>
  );
}
