import { config } from '@fortawesome/fontawesome-svg-core'
import withDarkMode, { MODE } from 'next-dark-mode'
import { AppProps } from 'next/app'

import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import '@/styles/colors.css'
import '@/styles/globals.css'

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return <Component {...pageProps} />
}

export default withDarkMode(MyApp, {
  defaultMode: MODE.DARK,
})
