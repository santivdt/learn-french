import { Menu, Home, Info, Star, Edit, Add } from '@mui/icons-material'
import Link from 'next/link'
import { useState } from 'react'
import styles from './nav.module.scss'

export default function Navigation() {
    const menuItems = [
        {
            title: 'Home',
            url: '/',
            icon: <Home />,
        },
        {
            title: 'About',
            url: '/about',
            icon: <Info />,
        },
        {
            title: 'Quiz',
            url: '/quiz',
            icon: <Star />,
        },
        {
            title: 'Edit Data',
            url: '/editdata',
            icon: <Edit />,
        },
        {
            title: 'Add Data',
            url: '/adddata',
            icon: <Add />,
        },
    ]

    return (
        <div className={styles.navcontainer}>
            <div className={styles.company}>BRAVOBRAVO</div>
            <div className={styles.itemcontainer}>
                {menuItems.map((item, index) => {
                    return (
                        <span className={styles.item} key={index}>
                            {item.title}
                        </span>
                    )
                })}
            </div>
        </div>
    )
}
