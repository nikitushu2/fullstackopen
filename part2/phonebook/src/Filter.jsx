export default function Filter(props) {
    return <input value={props.term} onChange={props.changeTerm}/>
}