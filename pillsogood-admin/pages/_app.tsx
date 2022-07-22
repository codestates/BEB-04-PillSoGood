import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import client from "../apollo-client";
import { RouteGuard } from '../components/RouteGuard';
import React from "react";
import styled from "styled-components";
import { NavBar } from '../components/NavBar';

const StyledFooter = styled.footer`
  position: fixed; 
  bottom: 0; 
  width: 100%; 
`

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <ApolloProvider client={client}>
        <header>
          <title>Pill so Good</title>
          <meta name="description" content="Pill so good 관리자 페이지" />
          <link rel="icon" href="/favicon.ico" />
        </header>
        <main>
          <NavBar/>
          <RouteGuard>
            <Component {...pageProps} />
          </RouteGuard>
        </main>
        <StyledFooter>
          © 2022. PillSoGood Co. all rights reserved.
        </StyledFooter>
      </ApolloProvider>
  )
}

export default MyApp
