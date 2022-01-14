import { MdOutlineClear, MdOutlineCheck } from 'react-icons/md'

const QuizResultsTable = ({ data, answersGivenByUser }) => {
    console.log('test')
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
                                <MdOutlineCheck size="20" color="green" />
                            )}
                            {answersGivenByUser[index] !==
                                data[index].french && (
                                <MdOutlineClear size="20" color="red" />
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

export default QuizResultsTable
