import { useState, useEffect } from 'react'
import initFirebase from '../firebase/initFirebase.js'
import firebase from 'firebase'
import {
    TextField,
} from '@mui/material'
import WarningDialog from '../components/dialog.js'
import styles from '../styles/editdata.module.scss'

export default function Editdata() {
    const [allData, setAllData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [editIdx, setEditIdx] = useState(-1)
    const [value, setValue] = useState({ name: '', latinName: '' })
    const [open, setOpen] = useState(false)
    const [itemToDeleteName, setItemToDeleteName] = useState('')
    const [itemToDeleteKey, setItemToDeleteKey] = useState('')
    const [status, setStatus] = useState('')

    const handleClickCancel = () => {
        setOpen(false)
    }

    const handleClickOpen = (doc, name) => {
        setItemToDeleteKey(doc)
        setItemToDeleteName(name)
        setOpen(true)
    }

    const handleClickOke = () => {
        handleRemove(itemToDeleteKey)
        setItemToDeleteName('')
        setItemToDeleteKey('')
        setOpen(false)
    }

    useEffect(() => {
        initFirebase()
        const getData = async () => {
            let response = []
            const querySnapshot = await firebase
                .firestore()
                .collection('plants')
                .get()
            querySnapshot.forEach((doc) => {
                let temp = doc.data()
                temp.doc = doc.id
                response.push(temp)
            })

            setAllData(response)
            setFilteredData(response)
        }
        getData()
    }, [])

    const handleSearch = (event) => {
        console.log('handlesearch')
        console.log(allData)
        let value = event.target.value.toLowerCase()
        let result = []

        console.log(result)
        // setFilteredData(result)
    }

    const handleRemove = async (doc) => {
        firebase
            .firestore()
            .collection('plants')
            .doc(doc)
            .delete()
            .then(() => {
                console.log('yes'),
                    setStatus('Your item has been deleted'),
                    setTimeout(() => {
                        setStatus('')
                    }, 2000)
            })
            .catch((error) => {
                console.error('Error removing document: ', error)
            })
    }

    const startEditing = async (doc, index, item) => {
        setEditIdx(index)

        setValue({
            name: item.name,
            latinName: item.latinName,
        })
    }

    const writeToFireBaseStore = (doc) => {
        try {
            firebase
                .firestore()
                .collection('plants')
                .doc(doc)
                .set(value)
                .then(() => {
                    console.log('yes'),
                        setStatus('Your item has been updated'),
                        setTimeout(() => {
                            setStatus('')
                        }, 2000)
                })
        } catch (error) {
            console.log(error)
        }
    }

    const stopEditing = (key, i) => {
        writeToFireBaseStore(key)
        setEditIdx(-1)
        setValue({ name: '', latinName: '' })
    }

    const handleChange = (e, type) => {
        if (type === 'name') {
            setValue({ ...value, name: e })
        } else if (type === 'latinName') {
            setValue({ ...value, latinName: e })
        }
    }

    const checkIfCurrentlyEditing = (index, editIdx) => {
        return index === editIdx
    }

    return (
        <>
            <TextField
                    id="standard-basic"
                    label="Search"
                    variant="standard"
                    onChange={(event) => handleSearch(event)}
                    className={styles.search}
                />
                <WarningDialog
                    title="Are you sure?"
                    handleClickCancel={handleClickCancel}
                    handleClickOke={handleClickOke}
                    state={open}
                    itemToDeleteKey={itemToDeleteKey}
                >
                    Are you sure you want to delete {itemToDeleteName}?
                </WarningDialog>
            <span className={styles.status}>{status}</span>
            <table>
                    <thead>
                        <tr>
                            <th>
                                Name
                            </th>
                            <th>                                
                                Latin
                            </th>                            
                            <th>                                
                                Edit
                            </th>                            
                            <th>                                
                                Delete
                            </th>
                        </tr>
                    </thead>
                <tbody>
                    {allData.map((item, index) => {
                        const currentlyEditing = checkIfCurrentlyEditing(
                            index,
                            editIdx
                        )

                        return (
                            <tr
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <td>
                                    {!currentlyEditing ? (
                                        item.name
                                    ) : (
                                        <TextField
                                            name={item.name}
                                            value={value.name}
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.value,
                                                    'name'
                                                )
                                            }
                                        />
                                    )}
                                </td>
                                <td>
                                    {!currentlyEditing ? (
                                        item.latinName
                                    ) : (
                                        <TextField
                                            name={item.latinName}
                                            value={value.latinName}
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.value,
                                                    'latinName'
                                                )
                                            }
                                        />
                                    )}
                                </td>
                                <td>
                                    {!currentlyEditing ? (
                                        <button
                                            
                                            onClick={() =>
                                                startEditing(
                                                    item.doc,
                                                    index,
                                                    item
                                                )
                                            }
                                        >
                                            Edit
                                        </button>
                                    ) : (
                                        <button
                                            
                                            onClick={() =>
                                                stopEditing(item.doc, index)
                                            }
                                        >
                                            Save
                                        </button>
                                    )}
                                </td>
                                <td>
                                    <button
                                        
                                        disabled={currentlyEditing}
                                        onClick={() =>
                                            handleClickOpen(
                                                item.doc,
                                                item.name
                                            )
                                        }
                                    >
                                        <span className="material-icons">
                                            delete
                                        </span>
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
