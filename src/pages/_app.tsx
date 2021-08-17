import type { AppProps } from 'next/app';
import React from "react";
import Head from 'next/head';

import "../styles/index.scss";
import { wrapper } from '@src/store/store';
const App = ({ Component, pageProps }: AppProps) => {
    // React.useEffect(() => {
    //     console.log("HMMMMMMMMMMMM!");
        
    // }, [])
    return (
        <>
            <Head>
                <title>Netsyde</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name='format-detection' content='telephone=no' />
                <meta name='mobile-web-app-capable' content='yes' />
                <meta name='theme-color' content='#FFFFFF' />
                <link rel='manifest' href='/manifest.json' />
            </Head>
            <Component {...pageProps} />
        </>
    )
}

export default wrapper.withRedux(App);