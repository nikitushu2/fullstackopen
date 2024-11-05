import StatisticLine from "./StatisticLine.jsx"
import StatisticCount from "./StatisticCount.jsx"

export default function Statistics(props) {
    const {good, neutral, bad} = props;

    return (
        <>
        <table>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticCount good={good} neutral={neutral} bad={bad} />
        </table>
        </>
    )
}