import Link from 'next/link'
import styles from './nav.module.scss'
import { GoThreeBars } from "react-icons/go";
import {menuItems} from './menuitems.js'
import { GoX } from "react-icons/go";
import { useState } from 'react';
import clsx from 'clsx';

export default function Navigation() {
    
    const [menuVisible, setMenuVisible] = useState(false)

    const toggleMenu = () => {
        console.log('1', menuVisible)
        setMenuVisible(prevMenuVisible => !prevMenuVisible)
        console.log('2', menuVisible)
    }
    

    return (
        <div className={styles.navcontainer}>
            <div className={styles.company}><Link href="/">BRAVOBRAVO</Link></div>
            <div className={styles.itemcontainer}>
                {menuItems.map((item, index) => {
                    return (
                        <span className={styles.item} key={index}>
                            <Link href={item.url}>
                                <a>{item.title}</a>
                            </Link>
                        </span>
                    )
                })}
              <GoThreeBars class={styles.hamburger} size="20" onClick={() => toggleMenu()}/>  
            </div>
            <div className={clsx(
                styles.mobilenav,
                {
                    [styles.visible]: menuVisible,
                }
            )} >
                <GoX className={styles.close} size="50" onClick={() => toggleMenu()}/>
                {menuItems.map((item, index) => {
                    return (
                        <div key={index}>{item.title}</div>
                    )
                })}
            </div>
        </div>
    )
}
