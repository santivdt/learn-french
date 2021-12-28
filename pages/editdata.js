import { useState, useEffect } from 'react'
import initFirebase from '../firebase/initFirebase.js'
import firebase from 'firebase'
import { TextField } from '@mui/material'
import WarningDialog from '../components/dialog.js'
import styles from '../styles/editdata.module.scss'

const doSearch = (nameKey, myArray) => {
    const results = []
    for (var i = 0; i < myArray.length; i++) {
        if (
            myArray[i].name.includes(nameKey) ||
            myArray[i].latinName.includes(nameKey)
        ) {
            results.push(myArray[i])
        }
    }
    return results
}

export default function Editdata() {
    const [words, setWords] = useState([])
    const [status, setStatus] = useState(null)
    const [editEnglish, setEditEnglish] = useState('')
    const [loading, setLoading] = useState(false)
    const [editFrench, setEditFrench] = useState('')
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [warningDialogOpen, setWarningDialogOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const items = search.length > 0 ? results : words

    const handleSearch = (event) => {
        setSearch(event.currentTarget.value)
    }

    const showAlert = () => {
        setStatus('Your item has been updated')

        setTimeout(() => {
            setStatus(null)
        }, 2000)
    }

    const edit = (id) => {
        const newWords = words.map((item) => ({
            ...item,
            isEditing: item.id === id ? true : false,
        }))
        setWords(newWords)

        const item = word.find((item) => item.id === id)
        setEditEnglish(item.english)
        setEditFrench(item.french)
    }

    const save = async (id) => {
        try {
            setLoading(true)
            await firebase
                .firestore()
                .collection('words')
                .doc(id)
                .set({ english: editEnglish, french: editFrench })

            const newWords = [...words]
            const wordIndex = newWords.findIndex((item) => item.id === id)

            newWords[wordIndex].isEditing = false
            newWords[wordIndex].english = editEnglish
            newWords[wordIndex].french = editFrench

            setWords(newWords)
            setLoading(false)
            showAlert()
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const openDialog = (id) => {
        setWarningDialogOpen(true)
        setItemToDelete(id)
    }

    const cancelDialog = () => {
        setWarningDialogOpen(false)
        setItemToDelete(null)
    }

    const remove = async (id) => {
        firebase
            .firestore()
            .collection('words')
            .doc(id)
            .delete()
            .then(() => {
                setStatus('Your item has been deleted'),
                    setTimeout(() => {
                        setStatus(null)
                    }, 2000),
                    setWarningDialogOpen(false),
                    setItemToDelete(null)
            })
            .catch((error) => {
                console.error('Error removing document: ', error)
            })
    }

    const getWords = async () => {
        const w = []
        setLoading(true)
        const querySnapshot = await firebase
            .firestore()
            .collection('words')
            .get()
        querySnapshot.forEach((doc) =>
            w.push({
                id: doc.id,
                showEnglish: true,
                isEditing: false,
                ...doc.data(),
            })
        )
        setWords(w)
        setLoading(false)
    }

    useEffect(() => {
        initFirebase()
        getWords()
    }, [])

    useEffect(() => {
        const items = doSearch(search, words)
        setResults(items)
    }, [search])

    return (
        <>
            <WarningDialog
                title="Are you sure?"
                cancelDialog={cancelDialog}
                confirmDialog={remove}
                state={warningDialogOpen}
                id={itemToDelete}
            >
                Are you sure you want to delete this item?
            </WarningDialog>
            <TextField
                id="standard-basic"
                label="Search"
                variant="standard"
                className={styles.search}
                onChange={handleSearch}
                value={search}
            />

            {status && <span className={styles.status}>{status}</span>}
            <table>
                <thead>
                    <tr>
                        <th>English</th>
                        <th>French</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(({ id, english, french, isEditing }) => {
                        return (
                            <tr
                                key={id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <td>
                                    {isEditing ? (
                                        <TextField
                                            name={english}
                                            value={editEnglish}
                                            onChange={(event) =>
                                                setEditEnglish(
                                                    event.currentTarget.value
                                                )
                                            }
                                        />
                                    ) : (
                                        english
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <TextField
                                            name={french}
                                            value={editFrench}
                                            onChange={(e) =>
                                                setEditFrench(
                                                    e.currentTarget.value
                                                )
                                            }
                                        />
                                    ) : (
                                        french
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <button onClick={() => save(id)}>
                                            Save
                                        </button>
                                    ) : (
                                        <button onClick={() => edit(id)}>
                                            Edit
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        disabled={isEditing}
                                        onClick={() => openDialog(id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}
