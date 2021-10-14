import Menu from '../menu/menu.js'
import Head from 'next/head'
import styles from './layout.module.css'
import Footer from '../footer/footer.js'


export default function Layout({pageTitle, children}) {

    return (
        <div className={styles.outerContainer} >
            <Head>
                <title>De Bomen App</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Menu/>
            <main className={styles.main}>
                {children}
            </main>
            <Footer />
        </div>
    )


}