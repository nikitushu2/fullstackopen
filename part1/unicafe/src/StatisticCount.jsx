export default function StatisticCount(props) {
    const {good, neutral, bad} = props
    return (
        <>
        <tr>
        <td>all</td> 
        <td>{good + neutral + bad}</td>
        </tr>
        <tr>
        <td>average</td>
        <td>{(good + neutral + bad) / 3}</td>
        </tr>
        <tr>
        <td>positive</td>
        <td>{(good / (good + neutral + bad)) * 100}%</td>
        </tr>
        </>
    )
}