import styles from './index.module.scss'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import { useState, forwardRef, useImperativeHandle } from 'react'

const Snackbar = forwardRef(({ type, message }, ref) => {
    const [showSnackbar, setShowSnackbar] = useState(false)

    useImperativeHandle(ref, () => ({
        show() {
            setShowSnackbar(true)
            setTimeout(() => {
                setShowSnackbar(false)
            }, 3000)
        },
    }))

    return (
        <>
            {showSnackbar && (
                <div
                    className={styles.snackbar}
                    style={{
                        backgroundColor:
                            type === 'success' ? '#4E9A51' : '#D84646',
                    }}
                >
                    <div className={styles.symbol}>
                        {type === 'success' ? (
                            <AiOutlineCheckCircle size="30" />
                        ) : (
                            <BiErrorCircle size="30" />
                        )}
                    </div>
                    <div className={styles.message}>{message}</div>
                </div>
            )}
        </>
    )
})

Snackbar.displayName = 'Snackbar'

export default Snackbar
