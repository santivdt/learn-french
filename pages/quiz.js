import { useState } from 'react'
import QuizResultsTable from '../components/QuizResultsTable'
import clsx from 'clsx'
import styles from '../styles/quiz.module.scss'
import { data } from '../utils/data.js'
import initFirebase from '../firebase/initFirebase.js'
import firebase from 'firebase'

const shuffleArray = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[a[i], a[j]] = [a[j], a[i]]
    }
    return a
}

export default function Quiz(props) {
    const { entries } = props
    console.log('entries', entries)

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
        <div className="container-center">
            <div className={clsx(styles.quizcard, 'flex-column')}>
                {!showScore && (
                    <>
                        <h3>
                            Question {currentItem + 1} of {words.length}
                        </h3>
                        <div className={styles.outerbar}>
                            <div
                                className={styles.innerbar}
                                style={{
                                    width: `calc(1% * ${stepSize} * ${currentItem})`,
                                }}
                            >
                                {Math.floor(stepSize * currentItem)}%
                            </div>
                        </div>
                        <h2>{words[currentItem].english}</h2>
                    </>
                )}
                {showScore ? (
                    <div>
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
    )
}

export async function getServerSideProps() {
    initFirebase()
    const w = []

    const querySnapshot = await firebase.firestore().collection('test').get()
    querySnapshot.forEach((doc) =>
        w.push({ id: doc.id, showEnglish: true, ...doc.data() })
    )

    return {
        props: { words: w },
    }
}
