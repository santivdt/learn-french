import Link from 'next/link'
import styles from './index.module.scss'
import { GoThreeBars } from 'react-icons/go'
import { menuItems } from './menuitems.js'
import { GoX } from 'react-icons/go'
import { useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { BsSun, BsMoon } from 'react-icons/bs'
import { ThemeContext, themes } from './contexts/ThemeContext'

const Navigation = ({ toggleDarkMode, darkMode }) => {
    const [menuVisible, setMenuVisible] = useState(false)

    const toggleMenu = () => {
        setMenuVisible((prevMenuVisible) => !prevMenuVisible)
    }

    const router = useRouter()

    return (
        <div
            className={clsx(styles.navcontainer, {
                [styles.darkmode]: darkMode,
            })}
        >
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
                {darkMode ? (
                    <BsSun size="20" onClick={toggleDarkMode} />
                ) : (
                    <BsMoon size="20" onClick={toggleDarkMode} />
                )}
                <ThemeContext.Consumer>
                    {({ changeTheme }) => (
                        <Button
                            color="link"
                            onClick={() => {
                                setDarkMode(!darkMode)
                                changeTheme(
                                    darkMode ? themes.light : themes.dark
                                )
                            }}
                        >
                            <i
                                className={
                                    darkMode ? 'fas fa-sun' : 'fas fa-moon'
                                }
                            ></i>
                            <span className="d-lg-none d-md-block">
                                Switch mode
                            </span>
                        </Button>
                    )}
                </ThemeContext.Consumer>
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
