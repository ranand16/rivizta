import '../styles/globals.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps, router }: AppProps) {
  const { query } = router;
  return <Component {...pageProps} query={query} />
}

export default MyApp
