import styles from '../styles/Home.module.css'
import React, { useState } from "react"
import {button} from '../styles/Button.module.css'
import Layout from '../components/layout/layout.js'
import { createTheme } from '@material-ui/core/styles'
import { data } from '../data/data'
import {
    Switch,
    Button,
    Box,
    Card,
    CardActions,
    CardContent,
    Typography,
    CardHeader,
    Avatar,
    IconButton,
    CardMedia,
    Collapse
} from "@material-ui/core"


export default function Home() {

    const randomArrayShuffle = (array) => {
        let currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    const randomData = randomArrayShuffle(data)

    const [memoryStatus, setMemoryStatus] = useState(randomData)

    const [whichOne, setWhichOne] = useState(true)

    const handleChange = (position) => {
        const newMemoryStatus = memoryStatus.map((item, index) => {
            if(index === position) {
                return {...item, showNormal: !item.showNormal}
            }
            else return item
        })

        setMemoryStatus(newMemoryStatus)
        console.log(memoryStatus)
    }

    const showLatin = () => {
        const showNormalFalse = memoryStatus.map(o => ({ ...o, showNormal: false }))
        return (
            setMemoryStatus(showNormalFalse),
            setWhichOne(false)
        )
    }

    const showNormal = () => {
        const showNormalTrue = memoryStatus.map(o => ({ ...o, showNormal: true }))
        return (
            setMemoryStatus(showNormalTrue),
            setWhichOne(true)
    )
    }

    const resetCards = () => {
        if (whichOne) {
            const setAllTrue = memoryStatus.map(o => ({ ...o, showNormal: true }))
            return setMemoryStatus(setAllTrue)
        } else {
            const setAllFalse = memoryStatus.map(o => ({ ...o, showNormal: false }))
            return setMemoryStatus(setAllFalse)
        }
    }

    return (
    <Layout pageTitle="home">
        <div className={styles.buttonContainer}>
              {whichOne &&  <p>    <Button
                  variant="contained"
                  color="primary"
                  className={button}
                  onClick={() => {showLatin()}}
              >
                  Show Latin
              </Button>
              </p>
              }
              {!whichOne &&  <p>    <Button
                  variant="contained"
                  color="primary"
                  className={button}
                  onClick={() => {showNormal()}}
              >
                  Show Normal
              </Button>
              </p>
              }
            <Button
                variant="contained"
                color="primary"
                className={button}
                onClick={() => {resetCards()}}
            >
                Reset cards
            </Button>
        </div>
        <div className={styles.container}>

              {memoryStatus.map((item, index) => {
                  const flipSide = item.showNormal ? styles.showNormal : styles.showLatin
                  return (

                      <div
                          className={`${styles.card} ${flipSide}`}
                          key={index}
                          onClick={() => handleChange(index)}
                      >
                        <span>
                            {item.showNormal && <p>{item.name}</p>}
                            {!item.showNormal && <p>{item.latinName}</p>}
                        </span>
                      </div>
                  )
              })}
        </div>
    </Layout>


  )
}
