import { useState, useEffect, useRef } from 'react'
import initFirebase from '../firebase/initFirebase.js'
import firebase from 'firebase'
import Dialog from '../components/Dialog/index.js'
import Snackbar from '../components/Snackbar/index.js'
import {
    MdModeEditOutline,
    MdDeleteOutline,
    MdDoneOutline,
} from 'react-icons/md'
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

    const snackbarRef = useRef(null)

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
            snackbarRef.current.show()
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
            <Dialog
                show={warningDialogOpen}
                title="Are you sure?"
                confirm={remove}
                cancel={cancelDialog}
                description="Are you sure you want to delete this item?"
                confirmButton="Delete"
                cancelButton="Cancel"
                id={itemToDelete}
            />
            <Snackbar
                type="success"
                message="Data succesfully edited!"
                ref={snackbarRef}
            />
            <div className="maincontent">
                <input
                    label="Search"
                    className="textfield-input"
                    onChange={handleSearch}
                    value={search}
                    placeholder="Search ..."
                />
                <table>
                    <thead>
                        <tr>
                            <th>English</th>
                            <th>French</th>
                            <th>&nbsp;</th>
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
                                    <td className={styles.icons}>
                                        {isEditing ? (
                                            <MdDoneOutline
                                                size="20"
                                                className="btn outline"
                                                onClick={() => save(id)}
                                            >
                                                Save
                                            </MdDoneOutline>
                                        ) : (
                                            <MdModeEditOutline
                                                size="20"
                                                className="btn outline"
                                                onClick={() => edit(id)}
                                            >
                                                Edit
                                            </MdModeEditOutline>
                                        )}
                                        <MdDeleteOutline
                                            size="20"
                                            color="#F68B1C"
                                            disabled={isEditing}
                                            className="btn outline"
                                            onClick={() => openDialog(id)}
                                        >
                                            Delete
                                        </MdDeleteOutline>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Editdata
