import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import '../styles/globals.scss'
import Layout from '../components/Layout/index.js'
import CoockieBar from '../components/Coockiebar'
import { useEffect } from 'react'

const MyApp = (props) => {
    const { Component, pageProps } = props

    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side')
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, [])

    return (
        <>
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
        </>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}

export default MyApp
