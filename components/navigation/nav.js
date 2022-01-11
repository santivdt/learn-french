import Link from 'next/link'
import styles from './index.module.scss'
import { GoThreeBars } from 'react-icons/go'
import { menuItems } from './menuitems.js'
import { GoX } from 'react-icons/go'
import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { BsSun, BsMoon } from 'react-icons/bs'

const Navigation = () => {
    const [menuVisible, setMenuVisible] = useState(false)
    const [darkMode, setDarkMode] = useState(false)

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode)
    }

    const toggleMenu = () => {
        setMenuVisible((prevMenuVisible) => !prevMenuVisible)
    }

    useEffect(() => {
        darkMode
            ? document.querySelector('body').classList.add('darkmode')
            : document.querySelector('body').classList.remove('darkmode')
    }, [darkMode])

    useEffect(() => {
        const userDarkMode = window.matchMedia(
            '(prefers-color-scheme: dark)'
        ).matches

        userDarkMode ? setDarkMode(true) : setDarkMode(false)
    }, [])

    const router = useRouter()

    return (
        <div className={styles.navcontainer}>
            <div className={styles.company}>
                <Link href="/">BRAVO</Link>
            </div>
            <div className={styles.itemcontainer}>
                {menuItems.map((item, index) => {
                    return (
                        <span
                            className={clsx(styles.item, {
                                [styles.activelink]:
                                    router.pathname === item.url,
                            })}
                            key={index}
                        >
                            <Link href={item.url}>
                                <a>{item.title}</a>
                            </Link>
                        </span>
                    )
                })}
                <GoThreeBars
                    className={styles.hamburger}
                    size="20"
                    onClick={() => toggleMenu()}
                />
                <span onClick={toggleDarkMode}>
                    {darkMode ? <BsSun size="20" /> : <BsMoon size="20" />}
                </span>
            </div>
            <div
                className={clsx(styles.mobilenav, {
                    [styles.visible]: menuVisible,
                })}
            >
                <GoX
                    className={styles.close}
                    size="50"
                    onClick={() => toggleMenu()}
                />
                {menuItems.map((item, index) => {
                    return (
                        <div key={index} onClick={() => toggleMenu()}>
                            <Link href={item.url}>
                                <a>{item.title}</a>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Navigation
