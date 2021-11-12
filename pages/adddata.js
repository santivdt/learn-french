import Layout from '../components/layout/layout.js'
import { useState } from 'react'
import firebase from 'firebase'
import { Button, TextField, Grid, Typography, Snackbar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export default function Editdata() {
    const [newItem, setNewItem] = useState({
        name: '',
        latinName: '',
    })

    const [status, setStatus] = useState({ open: false, text: '' })

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    )

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
                    setStatus({ open: true, text: 'Your item was added!' }),
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

    const handleClose = () => {
        setStatus({ open: false, text: '' })
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
                <Snackbar
                    open={status.open}
                    autoHideDuration={3000}
                    onClose={handleClose}
                    message={status.text}
                    action={action}
                />
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
