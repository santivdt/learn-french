import { useState, useEffect } from 'react'
import firebase from 'firebase'
import initFirebase from '../firebase/initFirebase.js'
import { Button, TextField, Snackbar } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

export default function Editdata() {
    const [newItem, setNewItem] = useState({
        name: '',
        latinName: '',
        img: '',
    })

    const [status, setStatus] = useState({ open: false, text: '' })
    const [fileUrl, setFileUrl] = useState()
    const [users, setUsers] = useState([])

    const handleClose = () => {
        setStatus({ open: false, text: '' })
    }

    useEffect(() => {
        initFirebase()
        const fetchUsers = async () => {
            const usersCollection = await firebase
                .firestore()
                .collection('users')
                .get()
            setUsers(
                usersCollection.docs.map((doc) => {
                    return doc.data()
                })
            )
        }

        fetchUsers()
    }, [])

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
        console.log(newItem, 'to be set')
        try {
            await firebase
                .firestore()
                .collection('plants')
                .doc()
                .set({
                    name: newItem.name,
                    latinName: newItem.latinName,
                    img: newItem.img,
                    time_stamp: firebase.firestore.Timestamp.now(),
                })
                .then(
                    setStatus({ open: true, text: 'Your item was added!' }),
                    setNewItem({
                        name: '',
                        latinName: '',
                        img: '',
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

    const onFileChange = async (e) => {
        console.log('img added')
        const file = e.target.files[0]
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(file.name)
        await fileRef.put(file)
        setFileUrl(await fileRef.getDownloadURL())
        console.log(fileUrl, 'fileurl?')
        setNewItem({ ...newItem, img: fileUrl })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const username = e.target.username.value
        if (!username) {
            return
        }
        firebase
            .firestore()
            .collection('users')
            .doc(username)
            .set({ name: username, avatar: fileUrl })
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
                <Button component="label" variant="outlined" sx={{ mb: 2 }}>
                    Upload IMG
                    <input type="file" hidden onChange={onFileChange} />
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        addData()
                    }}
                >
                    Add
                </Button>
        </>
    )
}
