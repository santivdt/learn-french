import Navigation from '../navigation/nav.js'
import styles from './layout.module.scss'
import Footer from '../footer/footer'

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Navigation />
            <main className={styles.content}>{children}</main>
            <div className={styles.footercontainer}>
                <Footer />
            </div>
        </div>
    )
}
