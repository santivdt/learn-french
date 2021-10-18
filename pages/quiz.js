import Layout from '../components/layout/layout'
import {data} from '../data/data.js'
import Image from 'next/image'
import React, {useState} from "react"
import Button from '@material-ui/core/Button'
import {button} from "../styles/Button.module.css"

export default function Quiz() {

    const [currentItem, setCurrentItem] = useState(0)
    const [showScore, setShowScore] = useState(false)
	const [score, setScore] = useState(0)

    console.log(data)

    const getRandomInt = (einde) => {
        return Math.floor(Math.random() * einde)
    }

    const randomShuffleArray = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex
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
        data[currentItem].name,
        data[getRandomInt(data.length)].latinName,
        data[getRandomInt(data.length)].latinName,
        data[getRandomInt(data.length)].latinName,
        data[getRandomInt(data.length)].latinName
    ]

    const copyOfAnswerOptionArray = [...answerOptionArray]
    randomShuffleArray(copyOfAnswerOptionArray)


    const nextQuestion = () => {
        if(currentItem + 1 < data.length) {
            const newCurrentItem = currentItem + 1
            setCurrentItem(newCurrentItem)
        } else return
    }

    const prevQuestion = () => {
            const newCurrentItem2 = currentItem - 1
            setCurrentItem(newCurrentItem2)
    }

    const checkAnswer = (item) => {
        if(data[currentItem].name == item) {
            console.log('goed')
            setScore(score + 1)
            console.log('score nu: ', score)
        }
        
        const nextItem = currentItem + 1
        if(nextItem < data.length) {
            setCurrentItem(nextItem)
        } else {
            setShowScore(true)
        }
    }

    return (
        <Layout>
            <div>
                <Image
                    width="400px"
                    height="400px"
                    alt="test"
                    src={data[currentItem].img}
                />
                    <h2>Welke plant zie je hier?</h2>
                    <h3>
                        Vraag {currentItem + 1} van {data.length}
                    </h3>
                    {showScore ? (
                        <div>
                           Je score is: {score}
                        </div>
                    ) : (
                        <> 
                            {copyOfAnswerOptionArray.map((item, index) => {
                        return (
                            <div
                                key={index}
                            >
                                <Button
                                    onClick={() => {checkAnswer(item)}}
                                >
                                    {item}
                                </Button>
                                <br/>
                                    
                            </div>
                
                        )
                    })}
                        </>
                    )
                }

                {/* {(currentItem > 0) ?
                    <Button
                        variant="contained"
                        color="primary"
                        className={button}
                        onClick={() => {prevQuestion()}}
                    >
                        Vorige
                    </Button>
                    : ''}
                {(currentItem + 1 < data.length) ?
                    <Button
                        variant="contained"
                        color="primary"
                        className={button}
                        onClick={() => {nextQuestion()}}
                    >
                        Volgende
                    </Button>
                    : ''} */}
            </div>
        </Layout>
    )
}