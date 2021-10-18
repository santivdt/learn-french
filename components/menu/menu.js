import styles from './menu.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from "next/router";


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
                    alt="tree"
                    />
                </span>
                 <ul className={styles.ulContainer}>
                     <li className={styles.item}>
                         <Link href='/'>
                             <a
                                 className={styles.link}
                             >
                                Home
                            </a>
                         </Link>
                     </li>
                     <li className={styles.item}>
                         <Link href='/about'>
                             <a className={styles.link}>
                                 About
                             </a>
                         </Link>
                     </li>
                     <li className={styles.item}>
                         <Link href='/editdata'>
                             <a className={styles.link}>
                                Edit data
                             </a>
                         </Link>
                     </li>
                     <li className={styles.item}>
                         <Link href='/quiz'>
                             <a className={styles.link}>
                                Quiz
                             </a>
                         </Link>
                     </li>
                 </ul>
            </div>
        </div>
    )
}