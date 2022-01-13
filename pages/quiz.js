import { useState } from 'react'
import QuizResultsTable from '../components/QuizResultsTable'
import clsx from 'clsx'
import styles from '../styles/quiz.module.scss'
import { data } from '../utils/data.js'
import { shuffleArray } from '../utils/helpers'

const Quiz = () => {
    const [words, setWords] = useState(data)
    const [currentItem, setCurrentItem] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const [answersGivenByUser, setAnswersGivenByUser] = useState([])

    const stepSize = (1 / words.length) * 100

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
        <>
            <div className="maincontent">
                <div className={clsx(styles.quizcard)}>
                    {!showScore && (
                        <div className={styles.quizquestion}>
                            <div className={styles.counter}>
                                {currentItem + 1} / {words.length}
                            </div>
                            <h2>
                                What is the correct translation of{' '}
                                {words[currentItem].english}?
                            </h2>
                        </div>
                    )}
                    {showScore ? (
                        <div className={styles.results}>
                            <h2>
                                Je score is: {score} / {words.length} (
                                {Math.floor((score / words.length) * 100)}%)
                            </h2>
                            <button
                                className={clsx('outline', 'mb', 'contained')}
                                onClick={startAgain}
                            >
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
            </div>
        </>
    )
}

export default Quiz
