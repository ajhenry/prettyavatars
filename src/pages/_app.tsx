import { config } from '@fortawesome/fontawesome-svg-core'
import { SessionProvider } from 'next-auth/react'
import withDarkMode, { MODE } from 'next-dark-mode'
import { AppProps } from 'next/app'

import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '@/styles/colors.css'
import '@/styles/globals.css'

import { trpc } from '../utils/trpc'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />{' '}
    </SessionProvider>
  )
}

export default withDarkMode(trpc.withTRPC(MyApp), {
  defaultMode: MODE.DARK,
})
