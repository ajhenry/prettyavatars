import clsx from 'clsx'
import * as React from 'react'
import useDarkMode from 'use-dark-mode'

import { Footer } from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { value: _ } = useDarkMode(true)

  return (
    <div className={clsx('flex min-h-screen flex-col')}>
      <Header />
      <div className={clsx('h-full flex-1')}>{children}</div>
      <Footer />
    </div>
  )
}
