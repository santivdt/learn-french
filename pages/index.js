import Head from 'next/head'
import styles from '../styles/Home.module.css'
import React, { useState } from "react"
import {button} from '../styles/Button.module.css'



export default function Home() {

    const randomArrayShuffle = (array) => {
        var currentIndex = array.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }
        return array;
    }

    const data = [
        {name: 'Groot Afrikaantje', latinName: 'Tagetes Erecta', showNormal: true},
        {name: 'Staande geranium', latinName: 'Pelargonium zonate', showNormal: true},
        {name: 'Vuursalie', latinName: 'Salvia splendens', showNormal: true},
        {name: 'Kattenstaart amarant', latinName: 'Amaranthus caudatus', showNormal: true},
        {name: 'Waterbegonia', latinName: 'Begonia semperflorens', showNormal: true},
        {name: 'Oost indische kers', latinName: 'Tropacolum majus', showNormal: true},
        {name: 'Lavendel', latinName: 'Lanvedula angustifolia', showNormal: true},
        {name: 'Kattenkruid', latinName: 'Nepeta faassenii', showNormal: true},
        {name: 'Kogeldistel', latinName: 'Echiniops bannaticus', showNormal: true},
        {name: 'Hemelsleutel', latinName: 'Sedum herbstfreude', showNormal: true},
        {name: 'Snooty', latinName: 'Trichechus', showNormal: true},
        {name: 'Zomereik', latinName: 'Quercus robur', showNormal: true},
        {name: 'Chinese treurwilg', latinName: 'Salix babylonica', showNormal: true},
        {name: 'Kleinbladige klimop', latinName: 'Hedera helix', showNormal: true},
        {name: 'Zachte berk', latinName: 'Betula pubescens', showNormal: true},
        {name: 'Treurwilg', latinName: 'Salix sepulcralis', showNormal: true},
        {name: 'Hollandse linde', latinName: 'Tilia europaea', showNormal: true},
        {name: 'Okkernoot', latinName: 'Juglans regia', showNormal: true},
        {name: 'Gewone esdoorn', latinName: 'Acer pseudoplatanus', showNormal: true},
        {name: 'Noorse esdoorn', latinName: 'Acer platanoides', showNormal: true},
        {name: 'Spaanse aak', latinName: 'Acer campestre', showNormal: true},
        {name: 'Beuk', latinName: 'Fagus sylvatica', showNormal: true},
    ]

    const randomData = randomArrayShuffle(data)

    const [memoryStatus, setMemoryStatus] = useState(
        randomData
    )

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
        const showNormalFalse = memoryStatus.map(o => ({ ...o, showNormal: false }));
        return (
            setMemoryStatus(showNormalFalse),
            setWhichOne(false)
        )
    }

    const showNormal = () => {
        const showNormalTrue = memoryStatus.map(o => ({ ...o, showNormal: true }));
        return (
            setMemoryStatus(showNormalTrue),
            setWhichOne(true)
    )
    }

    return (
    <div className={styles.container}>
      <Head>
        <title>Ken je Bomenp</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Ken je plantjes!
        </h1>

        <p className={styles.description}>
          Op naar professional hovenier-life
        </p>
          {whichOne &&  <p> <button
              onClick={showLatin}
              className={button}
          >
              Laat latijnse namen zien
          </button>
          </p>
          }
          {!whichOne &&  <p> <button
              onClick={showNormal}
              className={button}
          >
              Laat Normale namen zien
          </button>
          </p>
          }


          <div className={styles.outerContainer}>
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
          </div>
      </main>

      <footer className={styles.footer}>
        Brought to you by Santi Development
      </footer>
    </div>
  )
}
