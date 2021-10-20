import Layout from '../components/layout/layout.js'
import React from 'react'
import { data } from '../data/data'
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
} from '@mui/material'

export default function Editdata() {
    return (
        <Layout>
            <Grid container justifyContent="space-between" sx={{ mb: 8 }}>
                <TextField
                    id="standard-basic"
                    label="Search"
                    variant="standard"
                />
                <Button variant="contained">
                    <span className="material-icons">add</span>
                </Button>
            </Grid>
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
                        {data.map((item, index) => (
                            <TableRow
                                key={item.index}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell>{item.latinName}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary">
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                    >
                                        <span className="material-icons">
                                            delete
                                        </span>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Layout>
    )
}
