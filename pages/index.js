import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.scss'
import initFirebase from '../firebase/initFirebase.js'
import firebase from 'firebase'
import clsx from 'clsx'
import { shuffleArray } from '../utils/helpers'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [words, setWords] = useState([])
    const [language, setLanguage] = useState(true)

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
        if (language) {
            const newWords = words.map((item) => ({
                ...item,
                showEnglish: true,
            }))
            setWords(newWords)
        } else {
            const newWords = words.map((item) => ({
                ...item,
                showEnglish: false,
            }))
            setWords(newWords)
        }
    }

    const changeLanguage = () => {
        setLanguage((state) => !state)
        const newWords = [...words]
        newWords.map((item) => {
            item.showEnglish = !item.showEnglish
        })
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
        <>
            <div className="sidebar">
                <button
                    onClick={resetCards}
                    className={clsx('mb', 'outline', 'contained')}
                >
                    Reset cards
                </button>
                <button
                    className={clsx('mb', 'outline', 'contained')}
                    onClick={changeOrder}
                >
                    Change order
                </button>
                <button
                    className={clsx('outline', 'contained')}
                    onClick={changeLanguage}
                >
                    {!language ? 'En - Fr' : 'Fr - En'}
                </button>
            </div>
            <div className={clsx('maincontent', styles.grid)}>
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
                                    alt="flag"
                                />
                            ) : (
                                <img
                                    src="/french.png"
                                    width="20"
                                    height="20"
                                    className={styles.flag}
                                    alt="flag"
                                />
                            )}
                            <span>{showEnglish ? english : french}</span>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Home
