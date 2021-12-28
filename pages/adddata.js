import { useState, useEffect } from 'react'
import firebase from 'firebase'
import initFirebase from '../firebase/initFirebase.js'
import { Button, TextField, Snackbar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import clsx from 'clsx'
import styles from '../styles/adddata.module.scss'

export default function Editdata() {
    const [newItem, setNewItem] = useState({
        english: '',
        french: '',
    })

    const [status, setStatus] = useState({ open: false, text: '' })

    const handleClose = () => {
        setStatus({ open: false, text: '' })
    }

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
                .collection('words')
                .doc()
                .set({
                    english: newItem.english,
                    french: newItem.french,
                    time_stamp: firebase.firestore.Timestamp.now(),
                })
                .then(
                    setStatus({ open: true, text: 'Your item was added!' }),
                    setNewItem({
                        english: '',
                        french: '',
                    })
                )
        } catch (error) {
            console.log(error)
        }
    }

    const handleData = (input, type) => {
        switch (type) {
            case 'english':
                setNewItem({ ...newItem, english: input })
                break
            case 'french':
                setNewItem({ ...newItem, french: input })
                break
        }
    }

    return (
        <>
            <Snackbar
                open={status.open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={status.text}
                action={action}
            />

            <TextField
                id="english"
                label="English"
                variant="outlined"
                value={newItem.english}
                onChange={(event, type) =>
                    handleData(event.target.value, 'english')
                }
                sx={{ mb: 2 }}
            />
            <TextField
                id="french"
                label="French"
                value={newItem.french}
                variant="outlined"
                onChange={(event, type) =>
                    handleData(event.target.value, 'french')
                }
                sx={{ mb: 2 }}
            />
            <button
                disabled={
                    newItem.french.length < 1 && newItem.french.length < 1
                }
                className="contained"
                onClick={() => {
                    addData()
                }}
            >
                Add
            </button>
        </>
    )
}
