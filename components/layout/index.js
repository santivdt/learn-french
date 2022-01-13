import Navigation from '../Navigation/nav.js'
import styles from './index.module.scss'
import Footer from '../Footer'

const Layout = ({ children }) => {
    return (
        <div className={styles.container}>
            <Navigation />
            <main className={styles.content}>{children}</main>
            <Footer />
        </div>
    )
}

export default Layout
