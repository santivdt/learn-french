import Layout from '../components/layout/layout.js'
import { useState } from 'react'
import firebase from 'firebase'
import { Button, TextField, Grid, Typography } from '@mui/material'

export default function Editdata() {
    const [newItem, setNewItem] = useState({
        name: '',
        latinName: '',
    })

    const [status, setStatus] = useState()

    const getData = () => {
        firebase
            .firestore()
            .collection('plants')
            .onSnapshot((doc) => {
                console.log(doc.data())
            })
    }

    const addData = async () => {
        try {
            await firebase
                .firestore()
                .collection('plants')
                .doc()
                .set({
                    name: newItem.name,
                    latinName: newItem.latinName,
                    time_stamp: firebase.firestore.Timestamp.now(),
                })
                .then(
                    setStatus('Your item was added to the database!'),
                    setTimeout(() => {
                        setStatus('')
                    }, 2000),
                    setNewItem({
                        name: '',
                        latinName: '',
                    })
                )
        } catch (error) {
            console.log(error)
        }
    }

    const handleData = (input, type) => {
        switch (type) {
            case 'name':
                setNewItem({ ...newItem, name: input })
                break
            case 'latinName':
                setNewItem({ ...newItem, latinName: input })
                break
        }
    }

    return (
        <Layout>
            <Grid
                container
                item
                justifyContent="flex-start"
                sx={{ mb: 8 }}
                flexDirection="column"
            >
                <Button
                    onClick={() => {
                        getPlants()
                    }}
                >
                    Get Data
                </Button>
                <Typography variant="h6" sx={{ mb: 2 }} color="green">
                    {status}
                </Typography>
                <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    value={newItem.name}
                    onChange={(event, type) =>
                        handleData(event.target.value, 'name')
                    }
                    sx={{ mb: 2 }}
                />
                <TextField
                    id="latinName"
                    label="Latin Name"
                    value={newItem.latinName}
                    variant="outlined"
                    onChange={(event, type) =>
                        handleData(event.target.value, 'latinName')
                    }
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    onClick={() => {
                        addData()
                    }}
                >
                    Add
                </Button>
            </Grid>
        </Layout>
    )
}
