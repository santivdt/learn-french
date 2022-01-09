import Navigation from '../navigation/nav.js'
import styles from './index.module.scss'
import Footer from '../footer'

const Layout = ({ children }) => {
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

export default Layout
