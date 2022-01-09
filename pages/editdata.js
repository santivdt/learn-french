import { useState, useEffect } from 'react'
import initFirebase from '../firebase/initFirebase.js'
import firebase from 'firebase'
import WarningDialog from '../components/Dialog.js'
import styles from '../styles/editdata.module.scss'

const Editdata = () => {
    const [words, setWords] = useState([])
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [editItem, setEditItem] = useState({ english: '', french: '' })
    const [search, setSearch] = useState('')
    const [warningDialogOpen, setWarningDialogOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)

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
        const item = words.find((item) => item.id === id)

        setEditItem({
            ...editItem,
            english: item.english,
            french: item.french,
        })
    }

    const save = async (id) => {
        try {
            setLoading(true)
            await firebase
                .firestore()
                .collection('words')
                .doc(id)
                .set({ english: editItem.english, french: editItem.french })

            setLoading(false)
            showAlert()
            getWords()
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

    const handleChange = (event) => {
        const { name, value } = event.target
        setEditItem((prevEditItem) => {
            return {
                ...prevEditItem,
                [name]: value,
            }
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
                    {words
                        .filter(
                            ({ english, french }) =>
                                english
                                    .toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                french
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                        )
                        .map(({ id, english, french, isEditing }) => (
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
                                        <input
                                            type="text"
                                            name="english"
                                            value={editItem.english}
                                            onChange={handleChange}
                                        />
                                    ) : (
                                        english
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            name="french"
                                            value={editItem.french}
                                            onChange={handleChange}
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
                        ))}
                </tbody>
            </table>
        </>
    )
}

export default Editdata
