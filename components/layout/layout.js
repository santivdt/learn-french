import Header from '../header/header'
import styles from './layout.module.scss'
import Footer from '../footer/footer'
import clsx from 'clsx'

export default function Layout({ children }) {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.content}>{children}</main>
            <div className={styles.footercontainer}>
                <Footer />
            </div>
        </div>
    )
}
