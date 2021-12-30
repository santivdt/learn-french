import Link from 'next/link'
import styles from './index.module.scss'
import { GoThreeBars } from 'react-icons/go'
import { menuItems } from './menuitems.js'
import { GoX } from 'react-icons/go'
import { useState } from 'react'
import clsx from 'clsx'
import { useRouter } from 'next/router'

export default function Navigation() {
    const [menuVisible, setMenuVisible] = useState(false)

    const toggleMenu = () => {
        console.log('1', menuVisible)
        setMenuVisible((prevMenuVisible) => !prevMenuVisible)
        console.log('2', menuVisible)
    }

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
                                [styles.test]: router.pathname === item.url,
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
