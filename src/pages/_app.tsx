import client from '@/apollo/apollo';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>
          Lawpath - Aus Address Validation
        </title>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
