import styles from './menu.module.css'
import Image from 'next/image'

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
                     <li className={styles.item}>Home</li>
                     <li className={styles.item}>About</li>
                     <li className={styles.item}>Edit data</li>
                 </ul>
            </div>
        </div>
    )
}