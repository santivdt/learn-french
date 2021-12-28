import { useState, useEffect } from 'react'
import QuizResultsTable from '../components/quizResultsTable'
import clsx from 'clsx'
import styles from '../styles/quiz.module.scss'
import { data } from '../utils/data.js'

const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export default function Quiz() {
    const [words, setWords] = useState(data)
    const [currentItem, setCurrentItem] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const [answersGivenByUser, setAnswersGivenByUser] = useState([])

    const getRandomInt = (end) => {
        return Math.floor(Math.random() * end)
    }

    const answerOptionArray = [
        words[currentItem].french,
        words[getRandomInt(words.length)].french,
        words[getRandomInt(words.length)].french,
    ]

    // does not work completely yet
    const checkUniqueAnswerOptions = () => {
        if (answerOptionArray[1] == answerOptionArray[2]) {
            answerOptionArray[2] = words[getRandomInt(data.length)].french
            checkUniqueAnswerOptions()
        } else {
            return
        }
    }

    shuffleArray(answerOptionArray)

    const startAgain = () => {
        setShowScore(false)
        setAnswersGivenByUser([])
        setCurrentItem(0)
        setScore(0)
    }

    const handleAnswerGiven = (item) => {
        if (words[currentItem].french == item) {
            setScore(score + 1)
        }

        const newAnswersGivenByUser = [...answersGivenByUser, item]
        setAnswersGivenByUser(newAnswersGivenByUser)

        const nextItem = currentItem + 1
        if (nextItem < data.length) {
            setCurrentItem(nextItem)
        } else {
            setShowScore(true)
        }
    }

    return (
        <div className={clsx(styles.quizcard, 'flex-column')}>
            {!showScore && (
                <>
                    <h2>How do you translate {words[currentItem].english}?</h2>
                    <h3>
                        Question {currentItem + 1} of {words.length}
                    </h3>
                </>
            )}
            {showScore ? (
                <div>
                    <h2>
                        Je score is: {score} / {words.length} (
                        {Math.floor((score / words.length) * 100)}%)
                    </h2>
                    <button className="outline" onClick={startAgain}>
                        Start again
                    </button>
                    <QuizResultsTable
                        data={words}
                        answersGivenByUser={answersGivenByUser}
                    />
                </div>
            ) : (
                <>
                    {answerOptionArray.map((item, index) => {
                        return (
                            <div key={index}>
                                <button
                                    className={clsx('outline')}
                                    onClick={() => {
                                        handleAnswerGiven(item)
                                    }}
                                >
                                    {item}
                                </button>
                            </div>
                        )
                    })}
                </>
            )}
        </div>
    )
}
