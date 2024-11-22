export default function PersonForm(props) {
    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
            name: <input value={props.newName} onChange={props.nameChange}/>
            </div>
            <div>number: <input value={props.newNumber} onChange={props.numberChange}/></div>
            <div>
            <button type="submit" onClick={props.queryChange}>add</button>
            </div>
        </form>
    )
}