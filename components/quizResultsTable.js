import Image from 'next/image'
import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { red, green } from '@mui/material/colors'

export default function QuizResultsTable({ data, answersGivenByUser }) {
    return (
            <table>
                <thead>
                    <tr>
                        <th>&nbsp;</th>
                        <th>Vraag</th>
                        <th>Foto</th>
                        <th>Jouw antwoord</th>
                        <th>Correcte antwoord</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>
                                {' '}
                                {answersGivenByUser[index] ==
                                    data[index].latinName && (
                                    <CheckIcon sx={{ color: green[500] }} />
                                )}
                                {answersGivenByUser[index] !==
                                    data[index].latinName && (
                                    <ClearIcon sx={{ color: red[500] }} />
                                )}
                            </td>
                            <td>{index + 1}</td>
                            <td>
                                {' '}
                                <Image
                                    width="80px"
                                    height="80px"
                                    alt="test"
                                    src={data[index].img}
                                />
                            </td>
                            <td>{answersGivenByUser[index]}</td>
                            <td>{data[index].latinName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
    )
}
