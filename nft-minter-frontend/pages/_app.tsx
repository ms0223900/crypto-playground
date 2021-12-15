import '../styles/globals.css'
import type { AppProps } from 'next/app';

console.log(process.env.NEXT_PUBLIC_TEST_ENV)

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
