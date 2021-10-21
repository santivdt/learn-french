import React, { useState } from 'react'
import Layout from '../components/layout/layout.js'
import { data } from '../data/data'
import Image from 'next/image'
import {
    Switch,
    Button,
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    CardMedia,
} from '@mui/material'
import image from 'next/image'

export default function Home() {
    const allFalse = new Array(data.length)
    const allTrue = new Array(data.length)

    allFalse.fill(false)
    allTrue.fill(true)

    const [memoryStatus, setMemoryStatus] = useState(allFalse)
    const [baseValue, setBaseValue] = useState(false)
    const [memoryOrder, setMemoryOrder] = useState(data)

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

    const changeOrder = () => {
        const copyOfMemoryOrder = [...memoryOrder]
        randomShuffleArray(copyOfMemoryOrder)
        setMemoryOrder(copyOfMemoryOrder)
    }

    const handleChange = (position) => {
        const newMemoryStatus = memoryStatus.map((item, index) => {
            if (index === position) {
                return !item
            } else return item
        })
        setMemoryStatus(newMemoryStatus)
    }

    const changeSwitch = () => {
        if (baseValue) {
            setMemoryStatus(allFalse)
            setBaseValue(false)
        } else {
            setMemoryStatus(allTrue)
            setBaseValue(true)
        }
    }

    const resetCards = () => {
        if (baseValue) {
            setMemoryStatus(allTrue)
        } else {
            setMemoryStatus(allFalse)
        }
    }

    return (
        <Layout>
            <Grid container direction="column" alignContent="center">
                <Grid
                    item
                    sx="12"
                    justifyContent="center"
                    alignItems="space-betweens"
                >
                    <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            resetCards()
                        }}
                        size="large"
                        sx={{ color: 'white', px: 4, mx: 2 }}
                    >
                        Reset cards
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            changeOrder()
                        }}
                        size="large"
                        sx={{ color: 'white', px: 4, mr: 2 }}
                    >
                        Change order
                    </Button>
                    <Switch
                        color="primary"
                        onChange={() => {
                            changeSwitch()
                        }}
                    />
                </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="center">
                {memoryOrder.map((item, index) => {
                    return (
                        <Grid 
                            item xs={8} 
                            sm={4} 
                            md={3} 
                            lg={2} 
                            key={index}
                        >
                            <Card
                            sx={{m: 2 }}
                            
                        >
                            <CardContent>
                                {!memoryStatus[index] && (
                                    <CardMedia
                                        component="img"
                                        src={item.img}
                                        width="100px"
                                        height="100px"
                                        alt={item.name}
                                    />
                                )}
                                <Typography>
                                    {memoryStatus[index] ? item.latinName : ''}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ flexGrow: 1 }}>
                                <Button
                                    onClick={() => handleChange(index)}
                                    size="small"
                                    variant="contained"
                                >
                                    {baseValue ? 'Show Img' : 'Show name'}
                                </Button>
                            </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Layout>
    )
}
