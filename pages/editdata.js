import { useState, useEffect } from 'react'
import initFirebase from '../firebase/initFirebase.js'
import firebase from 'firebase'
import WarningDialog from '../components/Dialog.js'
import styles from '../styles/editdata.module.scss'

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

    const doSearch = (nameKey, myArray) => {
        console.log('dosearch', 'nk', nameKey, 'ma', myArray)
        //to do make not capital sensitive
        const newResults = []
        for (var i = 0; i < myArray.length; i++) {
            if (
                myArray[i].english.includes(nameKey) ||
                myArray[i].french.includes(nameKey)
            ) {
                newResults.push(myArray[i])
            }
        }
        return newResults
    }

    const showAlert = () => {
        setStatus('Your item has been updated')

        setTimeout(() => {
            setStatus(null)
        }, 2000)
    }

    const edit = (id) => {
        if (search.length < 1) {
            const newWords = words.map((item) => ({
                ...item,
                isEditing: item.id === id ? true : false,
            }))
            setWords(newWords)
            const item = words.find((item) => item.id === id)
            setEditEnglish(item.english)
            setEditFrench(item.french)
        } else if (search.length > 0) {
            console.log('you are editing search results')
            console.log(results)
            const newSearchResults = results.map((item) => ({
                ...item,
                isEditing: item.id === id ? true : false,
            }))
            setResults(newSearchResults)
            const item = results.find((item) => item.id === id)
            setEditEnglish(item.english)
            setEditFrench(item.french)
        }
    }

    const save = async (id) => {
        try {
            setLoading(true)
            await firebase
                .firestore()
                .collection('words')
                .doc(id)
                .set({ english: editEnglish, french: editFrench })

            if (search.length < 1) {
                const newWords = [...words]
                const wordIndex = newWords.findIndex((item) => item.id === id)

                newWords[wordIndex].isEditing = false
                newWords[wordIndex].english = editEnglish
                newWords[wordIndex].french = editFrench
                setWords(newWords)
            } else if (search.length > 1) {
                const newResults = [...results]
                const resultIndex = newResults.findIndex(
                    (item) => item.id === id
                )

                newResults[resultIndex].isEditing = false
                newResults[resultIndex].english = editEnglish
                newResults[resultIndex].french = editFrench
                setResults(newResults)
            }
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
    }, [results])

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
            <input
                id="standard-basic"
                label="Search"
                variant="standard"
                className={styles.search}
                onChange={handleSearch}
                value={search}
                placeholder="Search ..."
            />
            {status && <span className={styles.status}>{status}</span>}
            <table className={styles.table}>
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
