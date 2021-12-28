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
    const [plants, setPlants] = useState([])
    const [status, setStatus] = useState(null)
    const [editName, setEditName] = useState('')
    const [loading, setLoading] = useState(false)
    const [editLatinName, setEditLatinName] = useState('')
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const [warningDialogOpen, setWarningDialogOpen] = useState(false)
    const [itemToDelete, setItemToDelete] = useState(null)
    const items = search.length > 0 ? results : plants

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
        const newPlants = plants.map((item) => ({
            ...item,
            isEditing: item.id === id ? true : false,
        }))
        setPlants(newPlants)

        const item = plants.find((item) => item.id === id)
        setEditName(item.name)
        setEditLatinName(item.latinName)
    }

    const save = async (id) => {
        try {
            setLoading(true)
            await firebase
                .firestore()
                .collection('plants')
                .doc(id)
                .set({ name: editName, latinName: editLatinName })

            const newPlants = [...plants]
            const plantIndex = newPlants.findIndex((item) => item.id === id)

            newPlants[plantIndex].isEditing = false
            newPlants[plantIndex].name = editName
            newPlants[plantIndex].latinName = editLatinName

            setPlants(newPlants)
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
        console.log('remove called', id)
        firebase
            .firestore()
            .collection('plants')
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

    const getPlants = async () => {
        const p = []
        setLoading(true)
        const querySnapshot = await firebase
            .firestore()
            .collection('plants')
            .get()
        querySnapshot.forEach((doc) =>
            p.push({
                id: doc.id,
                showName: false,
                isEditing: false,
                ...doc.data(),
            })
        )
        setPlants(p)
        setLoading(false)
    }

    useEffect(() => {
        initFirebase()
        getPlants()
    }, [])

    useEffect(() => {
        const items = doSearch(search, plants)
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
                        <th>Name</th>
                        <th>Latin</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(({ id, name, latinName, isEditing }) => {
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
                                            name={name}
                                            value={editName}
                                            onChange={(event) =>
                                                setEditName(
                                                    event.currentTarget.value
                                                )
                                            }
                                        />
                                    ) : (
                                        name
                                    )}
                                </td>
                                <td>
                                    {isEditing ? (
                                        <TextField
                                            name={latinName}
                                            value={editLatinName}
                                            onChange={(e) =>
                                                setEditLatinName(
                                                    e.currentTarget.value
                                                )
                                            }
                                        />
                                    ) : (
                                        latinName
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
