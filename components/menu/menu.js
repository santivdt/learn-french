import styles from './menu.module.css'
import Image from 'next/image'
import Link from 'next/link'

export default function Menu() {

    return (
        <div className={styles.outerMenu}>
            <div className={styles.innerMenu}>
                <span className={styles.logo}>
                    <Image
                    priority
                    src="/../public/tree.png"
                    height={50}
                    width={50}
                    />
                </span>
                 <ul className={styles.ulContainer}>
                     <li className={styles.item}>
                         <Link href='/'>
                             <a>
                                Home
                            </a>
                         </Link>
                     </li>
                     <li className={styles.item}>
                         <Link href='/about'>
                             <a>
                                 About
                             </a>
                         </Link>
                     </li>
                     <li className={styles.item}>
                         <Link href='/editdata'>
                             <a>
                                Edit data
                             </a>
                         </Link>
                     </li>
                 </ul>
            </div>
        </div>
    )
}