import Layout from '../components/layout/layout'
import { data } from '../data/data.js'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from '@mui/material'
import QuizResultsTable from '../components/quizResultsTable'

export default function Quiz() {
    const [currentItem, setCurrentItem] = useState(0)
    const [showScore, setShowScore] = useState(false)
    const [score, setScore] = useState(0)
    const [answersGivenByUser, setAnswersGivenByUser] = useState([])

    console.log('ff kijken', answersGivenByUser)

    const mappingData = data

    const getRandomInt = (einde) => {
        return Math.floor(Math.random() * einde)
    }

    const randomShuffleArray = (array) => {
        let currentIndex = array.length,
            temporaryValue,
            randomIndex
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex -= 1
            temporaryValue = array[currentIndex]
            array[currentIndex] = array[randomIndex]
            array[randomIndex] = temporaryValue
        }
        return array
    }

    const answerOptionArray = [
        data[currentItem].latinName,
        data[getRandomInt(data.length)].latinName,
        data[getRandomInt(data.length)].latinName,
    ]

    const checkUniqueAnswerOptions = () => {
        if (answerOptionArray[1] == answerOptionArray[2]) {
            answerOptionArray[2] = data[getRandomInt(data.length)].latinName
            checkUniqueAnswerOptions()
        } else {
            return
        }
    }

    const copyOfAnswerOptionArray = [...answerOptionArray]
    randomShuffleArray(copyOfAnswerOptionArray)

    const handleAnswerGiven = (item) => {
        // check if given answer is correct and change score
        if (data[currentItem].latinName == item) {
            setScore(score + 1)
        }

        // add given answer to answers given
        const newAnswersGivenByUser = [...answersGivenByUser, item]
        setAnswersGivenByUser(newAnswersGivenByUser)

        // check if there is a next question and go to NQ or score
        const nextItem = currentItem + 1
        if (nextItem < data.length) {
            setCurrentItem(nextItem)
        } else {
            setShowScore(true)
        }
    }

    return (
        <Layout>
            <div>
                {!showScore && (
                    <>
                        <h2>Welke plant zie je hier?</h2>
                        <h3>
                            Vraag {currentItem + 1} van {data.length}
                        </h3>
                    </>
                )}
                {showScore ? (
                    <div>
                        <h2>Je score is: {score}</h2>
                        <QuizResultsTable
                            data={mappingData}
                            answersGivenByUser={answersGivenByUser}
                        />
                    </div>
                ) : (
                    <>
                        <Image
                            width="400px"
                            height="400px"
                            alt="test"
                            src={data[currentItem].img}
                        />
                        {copyOfAnswerOptionArray.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 2, minWidth: '100%' }}
                                        onClick={() => {
                                            handleAnswerGiven(item)
                                        }}
                                    >
                                        {item}
                                    </Button>
                                    <br />
                                </div>
                            )
                        })}
                    </>
                )}
            </div>
        </Layout>
    )
}
