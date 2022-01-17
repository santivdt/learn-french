import React, { useEffect, useState } from 'react'
import styles from '../styles/home.module.scss'
import initFirebase from '../firebase/initFirebase.js'
import firebase from 'firebase'
import clsx from 'clsx'
import { shuffleArray } from '../utils/helpers'
import Image from 'next/image'

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [words, setWords] = useState([])
    const [language, setLanguage] = useState(true)
    const [showAnswer, setShowAnswer] = useState(false)
    const [answer, setAnswer] = useState(null)

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
            w.push({
                id: doc.id,
                showEnglish: true,
                ...doc.data(),
                isCurrentQuestion: false,
            })
        )
        setWords([...shuffleArray(w)])
        setLoading(false)
    }

    const automaticQuiz = () => {
        let randomOrder = []
        while (randomOrder.length < words.length) {
            let r = Math.floor(Math.random() * words.length)
            if (randomOrder.indexOf(r) === -1) randomOrder.push(r)
        }

        const timer = (ms) => new Promise((res) => setTimeout(res, ms))

        const load = async () => {
            for (let num of randomOrder) {
                setWords((oldWords) =>
                    oldWords.map((word, index) =>
                        index === num
                            ? { ...word, isCurrentQuestion: true }
                            : { ...word, isCurrentQuestion: false }
                    )
                )

                // to do how to make sure the last one is cleared?
                // todo make sur you cant start two quizzes
                // todo stop quiz possibility
                await timer(2000)
                setAnswer(words[num].french)
                setShowAnswer(true)
                await timer(500)
                setAnswer(null)
                setShowAnswer(false)
            }
        }

        load()
    }

    useEffect(() => {
        initFirebase()
        getWords()
    }, [])

    return (
        <>
            {showAnswer && <div className={styles.answer}>{answer}</div>}
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
                <button
                    className={clsx('outline', 'contained')}
                    onClick={automaticQuiz}
                >
                    Start Quiz
                </button>
            </div>
            <div className={clsx('maincontent', styles.grid)}>
                {loading && <div>Loading...</div>}
                {words.map(
                    ({
                        id,
                        english,
                        french,
                        showEnglish,
                        isCurrentQuestion,
                    }) => {
                        return (
                            <div
                                className={clsx(styles.card, {
                                    [styles.activequestion]: isCurrentQuestion,
                                })}
                                key={id}
                                onClick={() => handleChange(id)}
                            >
                                <div className={styles.flag}>
                                    {showEnglish ? (
                                        <Image
                                            src="/english.png"
                                            width="20"
                                            height="20"
                                            alt="flag"
                                        />
                                    ) : (
                                        <Image
                                            src="/french.png"
                                            width="20"
                                            height="20"
                                            alt="flag"
                                        />
                                    )}
                                </div>
                                <span>{showEnglish ? english : french}</span>
                            </div>
                        )
                    }
                )}
            </div>
        </>
    )
}

export default Home
