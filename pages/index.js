import React, { useEffect, useState } from 'react'
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
        <div className={styles.homecontainer}>
            <div className={styles.sidebar}>
            <button
                        onClick={() => {
                            resetCards()
                        }}
                        className="mb"
                    >
                        Reset cards
                    </button>
                    <button
                        onClick={() => {
                            changeOrder()
                        }}
                    >
                        Change order
                    </button>
                    
            </div>
            <div className={styles.homecontent}>
            {memoryOrder.map((item, index) => {
                        return (
                                <div className={styles.card}    >
                                        {!memoryStatus[index] && (
                                            <>
                                                {item.img ? (
                                                    <img src={item.img} width="100px" height="100px" alt={item.name}/>
                                                    
                                                ) : (
                                                    <img src="/dummy.png" width="100px" height="100px" alt={item.name}/>
                                                )}
                                            </>
                                        )}
                                        <span className={styles.cardtext}>
                                            {memoryStatus[index]
                                                ? item.latinName
                                                : ' '}
                                        </span>
                                        <button
                                            onClick={() => handleChange(index)}
                                           
                                        >
                                            {memoryStatus[index]
                                                ? 'Show Img'
                                                : 'Show name'}
                                        </button>
                                </div>
                        )
                    })}
            </div>
        </div>
    )
}
