import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from "../apollo-client";

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <ApolloProvider client={client}>
      <header>
        <title>Pill so Good</title>
        <meta name="description" content="Pill so good 관리자 페이지" />
        <link rel="icon" href="/favicon.ico" />
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer>
        © 2022. PillSoGood Co. all rights reserved.
      </footer>
    </ApolloProvider>
  )
}

export default MyApp
