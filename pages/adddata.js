import { useState } from 'react'
import firebase from 'firebase'
import initFirebase from '../firebase/initFirebase'
import { Snackbar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { MdOutlineClear } from 'react-icons/md'

const Editdata = () => {
    const [newItem, setNewItem] = useState({
        english: '',
        french: '',
    })

    const [status, setStatus] = useState({ open: false, text: null })

    const handleClose = () => {
        setStatus({ open: false, text: null })
    }

    const action = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <MdOutlineClear size="20" />
            </IconButton>
        </>
    )

    const addData = async () => {
        initFirebase()
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

    const handleData = (event) => {
        setNewItem((prevNewItem) => ({
            ...prevNewItem,
            [event.target.name]: event.target.value,
        }))
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
            <input
                id="english"
                name="english"
                value={newItem.english}
                onChange={handleData}
                className="textfield-input"
                placeholder="English.."
            />
            <input
                id="french"
                name="french"
                value={newItem.french}
                onChange={handleData}
                className="textfield-input"
                placeholder="French"
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

export default Editdata
