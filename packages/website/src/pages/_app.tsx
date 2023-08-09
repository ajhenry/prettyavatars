import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Analytics } from '@vercel/analytics/react'
import withDarkMode, { MODE } from 'next-dark-mode'
import { AppProps } from 'next/app'
config.autoAddCss = false

import '@/styles/colors.css'
import '@/styles/globals.css'

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  )
}

export default withDarkMode(MyApp, {
  defaultMode: MODE.DARK,
})
