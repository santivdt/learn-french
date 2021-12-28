import ClearIcon from '@mui/icons-material/Clear'
import CheckIcon from '@mui/icons-material/Check'
import { red, green } from '@mui/material/colors'

export default function QuizResultsTable({ data, answersGivenByUser }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>&nbsp;</th>
                    <th>English</th>
                    <th>Your answer</th>
                    <th>Correct answer</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>
                            {answersGivenByUser[index] ==
                                data[index].french && (
                                <CheckIcon sx={{ color: green[500] }} />
                            )}
                            {answersGivenByUser[index] !==
                                data[index].french && (
                                <ClearIcon sx={{ color: red[500] }} />
                            )}
                        </td>
                        <td>{data[index].english}</td>

                        <td>{answersGivenByUser[index]}</td>
                        <td>{data[index].french}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
