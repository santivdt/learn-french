import styles from '../styles/Home.module.css'
import React, { useState } from "react"
import {button} from '../styles/Button.module.css'
import Layout from '../components/layout/layout.js'
import { data } from '../data/data'
import Image from 'next/image'
import {
    Switch,
    Button,
} from "@material-ui/core"


export default function Home() {
    
    const allFalse = new Array(data.length)
    const allTrue = new Array(data.length)
        
    allFalse.fill(false)
    allTrue.fill(true)

    const [memoryStatus, setMemoryStatus] = useState(allFalse)
    const [baseValue, setBaseValue] = useState(false)
    const [memoryOrder, setMemoryOrder] = useState(data)


    const randomShuffleArray = (array) => {
        console.log('=================Random shuffle array initiatied=====================')
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
    

    // werkt niet, geen idee waarom niet
    const changeOrder = () => {
        console.log('Change Order initiated')
        console.log('data zou staande geranium moeten zijn', memoryOrder[0].name)
        const newData = randomShuffleArray(memoryOrder)
        console.log('newdata name zou elke keer anders moeten zijn', newData[0].name)
        // setMemoryOrder(newData)
    }

    const handleChange = (position) => {
            const newMemoryStatus = memoryStatus.map((item, index) => 
                    { 
                       if(index === position) {
                           return !item
                       }
                       else return item
                    }
            )
            setMemoryStatus(newMemoryStatus)
    }

    const changeSwitch = () => {
       if(baseValue) {
           setMemoryStatus(allFalse)
           setBaseValue(false)
       } else {
            setMemoryStatus(allTrue)
            setBaseValue(true)
       }
    }

    const resetCards = () => {
        if(baseValue) {
            setMemoryStatus(allTrue)
        } else {
             setMemoryStatus(allFalse)
        }
    }

    return (
        <Layout>
            <div className={styles.buttonContainer}>
                <Button
                    variant="contained"
                    color="primary"
                    className={button}
                    onClick={() => {resetCards()}}
                >
                    Reset cards
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    className={button}
                    onClick={() => {changeOrder()}}
                >
                    Change order
                </Button>
                <div>
                    <Switch
                        color="primary"
                        onChange={() => {changeSwitch()}}/>
                </div>
            </div>
            <div className={styles.container}>
                {memoryOrder.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {handleChange(index)}}
                            className={styles.card}
                        >
                            {!memoryStatus[index] && <Image
                                src={item.img}
                                width="100px"
                                height="100px"
                            />}
                            <span>
                                <center>
                                    {memoryStatus[index] ? item.latinName : ''}
                                </center>
                            </span>

                        </div>

                    )})
                }
            </div>
        </Layout>
  )
}