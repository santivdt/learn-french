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



export default function Editdata() {

    const data = [
        {name: 'Groot Afrikaantje', latinName: 'Tagetes Erecta', showNormal: true},
        {name: 'Staande geranium', latinName: 'Pelargonium zonate', showNormal: true},
        {name: 'Vuursalie', latinName: 'Salvia splendens', showNormal: true},
        {name: 'Kattenstaart', latinName: 'Amaranthus caudatus', showNormal: true},
        {name: 'Waterbegonia', latinName: 'Begonia semperflorens', showNormal: true},
        {name: 'Oost indische kers', latinName: 'Tropacolum majus', showNormal: true},
        {name: 'Lavendel', latinName: 'Lanvedula angustifolia', showNormal: true},
        {name: 'Kattenkruid', latinName: 'Nepeta faassenii', showNormal: true},
        {name: 'Kogeldistel', latinName: 'Echiniops bannaticus', showNormal: true},
        {name: 'Hemelsleutel', latinName: 'Sedum herbstfreude', showNormal: true},
        {name: 'Snooty', latinName: 'Trichechus', showNormal: true},
        {name: 'Zomereik', latinName: 'Quercus robur', showNormal: true},
        {name: 'Chinese treurwilg', latinName: 'Salix babylonica', showNormal: true},
        {name: 'Kleinbladige klimop', latinName: 'Hedera helix', showNormal: true},
        {name: 'Zachte berk', latinName: 'Betula pubescens', showNormal: true},
        {name: 'Treurwilg', latinName: 'Salix sepulcralis', showNormal: true},
        {name: 'Hollandse linde', latinName: 'Tilia europaea', showNormal: true},
        {name: 'Okkernoot', latinName: 'Juglans regia', showNormal: true},
        {name: 'Gewone esdoorn', latinName: 'Acer pseudoplatanus', showNormal: true},
        {name: 'Noorse esdoorn', latinName: 'Acer platanoides', showNormal: true},
        {name: 'Spaanse aak', latinName: 'Acer campestre', showNormal: true},
        {name: 'Beuk', latinName: 'Fagus sylvatica', showNormal: true},
    ]

    return (
        <Layout>
            <p className={styles.controls}>
                <TextField id="standard-basic" label="Search" variant="standard" />
                <Button variant="contained" className={styles.buttonAdd}>
                    Add new
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
                                        Delete
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