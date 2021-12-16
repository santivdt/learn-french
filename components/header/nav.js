import Link from 'next/link'
import styles from './nav.module.scss'
import { GoThreeBars } from "react-icons/go";


export default function Navigation() {
    const menuItems = [
        {
            title: 'Home',
            url: '/',
        },
        {
            title: 'About',
            url: '/about',
        },
        {
            title: 'Quiz',
            url: '/quiz',
        },
        {
            title: 'Edit Data',
            url: '/editdata',
        },
        {
            title: 'Add Data',
            url: '/adddata',
        },
    ]

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
              <GoThreeBars class={styles.hamburger} size="20"/>  
            </div>
        </div>
    )
}
