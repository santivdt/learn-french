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

export default function Editdata() {
    const [plants, setPlants] = useState([])
    const [editIdx, setEditIdx] = useState(-1)
    const [value, setValue] = useState({ name: '', latinName: '' })

    useEffect(() => {
        initFirebase()
        const getPlants = async () => {
            let response = []
            const querySnapshot = await firebase
                .firestore()
                .collection('plants')
                .get()
            querySnapshot.forEach((doc) => {
                response.push({ [`${doc.id}`]: doc.data() })
            })

            setPlants(response)
        }
        getPlants()
    }, [])

    const [status, setStatus] = useState()

    const handleRemove = async (doc) => {
        console.log('deleteitem called')
        firebase
            .firestore()
            .collection('plants')
            .doc(doc[0])
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
        console.log(plants)
        setEditIdx(index)

        setValue({
            name: item[doc].name,
            latinName: item[doc].latinName,
        })
    }

    const writeToFireBaseStore = (doc) => {
        console.log('writetofirebasestore init')
        console.log(doc)
        // console.log(data)
        console.log(value)
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
                />
            </Grid>
            <Typography variant="h4" color="green">
                {status}
            </Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Naam</TableCell>
                            <TableCell>Latijn</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {plants.map((item, index) => {
                            let key = Object.keys(item, index)
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
                                            item[key].name
                                        ) : (
                                            <TextField
                                                name={item[key].name}
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
                                            item[key].latinName
                                        ) : (
                                            <TextField
                                                name={item[key].latinName}
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
                                                        key[0],
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
                                                    stopEditing(key[0], index)
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
                                            onClick={() => handleRemove(key)}
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
