import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import '../styles/globals.scss'
import Layout from '../components/Layout/index.js'
import CoockieBar from '../components/Coockiebar'
import { useEffect } from 'react'
import { SessionProvider } from 'next-auth/react'

const MyApp = ({ session }, props) => {
    const { Component, pageProps } = props

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])

    return (
        <SessionProvider session={session}>
            <Head>
                <title>Bravo</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <Layout>
                <CoockieBar />
                <Component {...pageProps} />
            </Layout>
        </SessionProvider>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}

export default MyApp
