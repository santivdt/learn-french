import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import '../styles/globals.scss'
import Layout from '../components/layout/index.js'
import CoockieBar from '../components/Coockiebar'
import { useState, useEffect } from 'react'

const MyApp = (props) => {
    const [darkMode, setDarkMode] = useState(true)

    const { Component, pageProps } = props

    useEffect(() => {
        // Remove the server-side injected CSS.
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
            <ThemeContextWrapper>
                <Layout>
                    <CoockieBar />
                    <Component {...pageProps} />
                </Layout>
            </ThemeContextWrapper>
        </>
    )
}

MyApp.propTypes = {
    Component: PropTypes.elementType.isRequired,
    pageProps: PropTypes.object.isRequired,
}

export default MyApp
