import React, { useEffect, useState } from 'react'
import Layout from '../components/layout/layout.js'
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
import styles from '../styles/home.module.scss'
import initFirebase from '../firebase/initFirebase.js'
import firebase from 'firebase'

export default function Home() {
    const [plants, setPlants] = useState([])
    const allFalse = new Array(plants.length).fill(false)
    const allTrue = new Array(plants.length).fill(true)
    const [memoryStatus, setMemoryStatus] = useState(allFalse)

    useEffect(() => {
        initFirebase()
        const getPlants = async () => {
            let response = []
            const querySnapshot = await firebase
                .firestore()
                .collection('plants')
                .get()
            querySnapshot.forEach((doc) => {
                response.push(doc.data())
            })

            setPlants(response)
            setMemoryOrder(response)
            const allFalse = new Array(plants.length).fill(false)
            setMemoryStatus(allFalse)
        }
        getPlants()
    }, [])

    const [baseValue, setBaseValue] = useState(false)
    const [memoryOrder, setMemoryOrder] = useState(plants)

    console.log('memstat', memoryStatus)

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
        console.log('handlechange', position)
        const newMemoryStatus = memoryStatus.map((item, index) => {
            if (index === position) {
                console.log('true')
                return !item
            } else return item
        })
        console.log('newmemsta', newMemoryStatus)
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
                <Grid item justifyContent="center" alignSelf="center">
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
                <Grid
                    item
                    container
                    direction="row"
                    justifyContent="center"
                    className={styles.TEST}
                >
                    {memoryOrder.map((item, index) => {
                        return (
                            <Grid item xs={8} sm={4} md={3} lg={2} key={index}>
                                <Card
                                    sx={{
                                        m: 2,
                                        minHeight: 200,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <CardContent>
                                        {!memoryStatus[index] && (
                                            <>
                                                {item.img ? (
                                                    <CardMedia
                                                        component="img"
                                                        src={item.img}
                                                        width="100px"
                                                        height="100px"
                                                        alt={item.name}
                                                    />
                                                ) : (
                                                    <CardMedia
                                                        component="img"
                                                        src="dummy.png"
                                                        width="100px"
                                                        height="100px"
                                                        alt={item.name}
                                                    />
                                                )}
                                            </>
                                        )}
                                        <Typography>
                                            {memoryStatus[index]
                                                ? item.latinName
                                                : ' '}
                                        </Typography>
                                    </CardContent>
                                    <CardActions
                                        sx={{
                                            flexGrow: 1,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-start',
                                        }}
                                    >
                                        <Button
                                            onClick={() => handleChange(index)}
                                            size="small"
                                            variant="contained"
                                        >
                                            {memoryStatus[index]
                                                ? 'Show Img'
                                                : 'Show name'}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
        </Layout>
    )
}
