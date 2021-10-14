import Menu from '../menu/menu.js'
import Head from 'next/head'
import styles from './layout.module.css'
import Footer from '../footer/footer.js'


export default function Layout({pageTitle, children}) {

    return (
        <>
            <Head>
                <title>De Bomen App</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <div className={styles.outerContainer} >
                <div className={styles.container}>
                    <Menu/>
                    <main>
                        {children}
                    </main>
                </div>
                <Footer></Footer>
            </div>
        </>
    )


}