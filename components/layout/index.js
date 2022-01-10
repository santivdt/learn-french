import Navigation from '../navigation/nav.js'
import styles from './index.module.scss'
import Footer from '../footer'
import clsx from 'clsx'
import { useState } from 'react'

const Layout = ({ children }) => {
    const [darkMode, setDarkmode] = useState(false)

    const toggleDarkMode = () => {
        console.log('toggleDM!')
        setDarkmode((prevDarkMode) => !prevDarkMode)
    }
    console.log('darkMode, Layout', darkMode)
    return (
        <div
            className={clsx(styles.container, {
                [styles.darkmode]: darkMode,
            })}
        >
            <Navigation toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
            <main className={styles.content}>{children}</main>
            <div className={styles.footercontainer}>
                <Footer />
            </div>
        </div>
    )
}

export default Layout
