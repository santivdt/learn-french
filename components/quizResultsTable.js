import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material'
import Image from 'next/image'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { red, green } from '@mui/material/colors'

export default function QuizResultsTable({ data, answersGivenByUser }) {
    return (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>&nbsp;</TableCell>
                        <TableCell>Vraag</TableCell>
                        <TableCell>Foto</TableCell>
                        <TableCell>Jouw antwoord</TableCell>
                        <TableCell>Correcte antwoord</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                {' '}
                                {answersGivenByUser[index] ==
                                    data[index].latinName && (
                                    <CheckIcon sx={{ color: green[500] }} />
                                )}
                                {answersGivenByUser[index] !==
                                    data[index].latinName && (
                                    <ClearIcon sx={{ color: red[500] }} />
                                )}
                            </TableCell>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                {' '}
                                <Image
                                    width="80px"
                                    height="80px"
                                    alt="test"
                                    src={data[index].img}
                                />
                            </TableCell>
                            <TableCell>{answersGivenByUser[index]}</TableCell>
                            <TableCell>{data[index].latinName}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
