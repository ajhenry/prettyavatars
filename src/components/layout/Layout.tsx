import clsx from 'clsx'
import * as React from 'react'

import { Footer } from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import { useDarkMode } from 'next-dark-mode'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { darkModeActive: isDarkMode } = useDarkMode()

  return (
    <div
      className={clsx(
        'flex min-h-screen flex-col',
        isDarkMode ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'
      )}
    >
      <Header />
      <div className={clsx('flex h-full flex-1 flex-col')}>{children}</div>
      <Footer />
    </div>
  )
}
