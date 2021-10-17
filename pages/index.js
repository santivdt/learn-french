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

    const randomShuffleArray = (array) => {
        console.log('array', array)
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

    const [memoryStatus, setMemoryStatus] = useState(data)

    //TO DO works but does not seem to update the state?
    const changeOrder = (array) => {
        const newMem = randomShuffleArray(array)
        setMemoryStatus(newMem)
    }

    const [showName, setShowName] = useState(false)

    const handleChange = (position) => {
        console.log('handlechange')
        let newMemoryStatus = memoryStatus.map((item, index) => {
            if(index === position) {
                return {...item, showName: !item.showName}
            }
            else return item
        })
        setMemoryStatus(newMemoryStatus)
    }

    const resetCards = () => {
        console.log('reset cards')
        if (showName) {
            let setAllTrue = memoryStatus.map(o => ({ ...o, showName: true }))
            return setMemoryStatus(setAllTrue)
        } else {
            let setAllFalse = memoryStatus.map(o => ({ ...o, showName: false }))
            return setMemoryStatus(setAllFalse)
        }
    }

    const changeSwitch = () => {
        console.log('changeswitch')
        if(showName) {
            let showNameFalse = memoryStatus.map(o => ({ ...o, showName: false }))
            return (
                setMemoryStatus(showNameFalse),
                    setShowName(false)
            )
        } else {
            let showNameTrue = memoryStatus.map(o => ({ ...o, showName: true }))
            return (
                setMemoryStatus(showNameTrue),
                    setShowName(true)
            )
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
                    onClick={() => {changeOrder(memoryStatus)}}
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
                {memoryStatus.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => {handleChange(index)}}
                            className={styles.card}
                        >
                            {!item.showName && <Image
                                src={item.img}
                                width="100px"
                                height="100px"
                            />}
                            <span>
                                <center>
                                    {item.showName ? item.latinName : ''}
                                </center>
                            </span>

                        </div>

                    )})
                }
            </div>
        </Layout>
  )
}
