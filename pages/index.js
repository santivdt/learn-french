import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.scss'
import initFirebase from '../firebase/initFirebase.js'
import firebase from 'firebase'
import clsx from 'clsx'

const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [words, setWords] = useState([])

    const changeOrder = () => {
        const newWords = [...shuffleArray(words)]
        setWords(newWords)
    }

    const handleChange = (id) => {
        const newWords = [...words]
        const wordIndex = newWords.findIndex((item) => item.id === id)
        newWords[wordIndex].showEnglish = !newWords[wordIndex].showEnglish
        setWords(newWords)
    }

    const resetCards = () => {
        const newWords = words.map((item) => ({ ...item, showEnglish: true }))
        setWords(newWords)
    }

    const getWords = async () => {
        const w = []
        setLoading(true)
        const querySnapshot = await firebase
            .firestore()
            .collection('words')
            .get()
        querySnapshot.forEach((doc) =>
            w.push({ id: doc.id, showEnglish: true, ...doc.data() })
        )
        setWords([...shuffleArray(w)])
        setLoading(false)
    }

    useEffect(() => {
        initFirebase()
        getWords()
    }, [])

    return (
        <div className={styles.homecontainer}>
            <div className={styles.sidebar}>
                <button
                    onClick={resetCards}
                    className={clsx('mb', 'outline', 'contained')}
                >
                    Reset cards
                </button>
                <button
                    className={clsx('outline', 'contained')}
                    onClick={changeOrder}
                >
                    Change order
                </button>
            </div>
            <div className={styles.homecontent}>
                {loading && <div>Loading...</div>}
                {words.map(({ id, english, french, showEnglish }) => {
                    return (
                        <div
                            className={styles.card}
                            key={id}
                            onClick={() => handleChange(id)}
                        >
                            {showEnglish ? (
                                <img
                                    src="/english.png"
                                    width="20"
                                    height="20"
                                    className={styles.flag}
                                />
                            ) : (
                                <img
                                    src="/french.png"
                                    width="20"
                                    height="20"
                                    className={styles.flag}
                                />
                            )}
                            {showEnglish ? english : french}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
