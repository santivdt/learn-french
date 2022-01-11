import styles from './index.module.scss'
const Dialog = ({
    show,
    title,
    confirm,
    cancel,
    description,
    confirmButton,
    cancelButton,
    id,
}) => {
    return (
        <>
            {show && (
                <div className={styles.overlay}>
                    <div className={styles.dialog}>
                        <div className={styles.dialog__content}>
                            <h2 className={styles.dialog__title}>{title}</h2>
                            <p className={styles.dialog__description}>
                                {description}
                            </p>
                        </div>

                        <div className={styles.dialog__footer}>
                            <button
                                className={styles.dialog__confirm}
                                onClick={() => confirm(id)}
                            >
                                {confirmButton}
                            </button>
                            <button
                                className={styles.dialog__cancel}
                                onClick={cancel}
                            >
                                {cancelButton}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Dialog
