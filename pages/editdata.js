import Layout from '../components/layout/layout.js'
import styles from "../styles/editdata.module.css";
import React from "react";
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import 'material-icons/iconfont/material-icons.css'
import { data } from '../data/data'

export default function Editdata() {

    return (
        <Layout>
            <p className={styles.controls}>
                <TextField id="standard-basic" label="Search" variant="standard" />
                <Button variant="contained" className={styles.buttonAdd}>
                    <span className="material-icons">add</span>
                </Button>
            </p>
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
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {item.name}
                                </TableCell>
                                <TableCell>{item.latinName}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                    >
                                        <span className="material-icons">delete</span>
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