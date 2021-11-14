import Layout from '../components/layout/layout.js'
import { useState, useEffect } from 'react'
import initFirebase from '../firebase/initFirebase.js'
import firebase from 'firebase'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    TextField,
    Grid,
    Typography,
} from '@mui/material'
import WarningDialog from '../components/dialog.js'

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
        <Layout>
            <Grid container item justifyContent="space-between" sx={{ mb: 8 }}>
                <TextField
                    id="standard-basic"
                    label="Search"
                    variant="standard"
                    onChange={(event) => handleSearch(event)}
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
            </Grid>
            <Typography variant="h4" color="green">
                {status}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography
                                    variant="h6"
                                    color="grey"
                                    sx={{ fontWeight: 800 }}
                                >
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="h6"
                                    color="grey"
                                    sx={{ fontWeight: 800 }}
                                >
                                    Latin
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="h6"
                                    color="grey"
                                    sx={{ fontWeight: 800 }}
                                >
                                    Edit
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography
                                    variant="h6"
                                    color="grey"
                                    sx={{ fontWeight: 800 }}
                                >
                                    Delete
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {allData.map((item, index) => {
                            const currentlyEditing = checkIfCurrentlyEditing(
                                index,
                                editIdx
                            )

                            return (
                                <TableRow
                                    key={index}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
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
                                    </TableCell>
                                    <TableCell>
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
                                    </TableCell>
                                    <TableCell>
                                        {!currentlyEditing ? (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    startEditing(
                                                        item.doc,
                                                        index,
                                                        item
                                                    )
                                                }
                                            >
                                                Edit
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={() =>
                                                    stopEditing(item.doc, index)
                                                }
                                            >
                                                Save
                                            </Button>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            variant="outlined"
                                            color="secondary"
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
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    )
}
