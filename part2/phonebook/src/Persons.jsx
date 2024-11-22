export default function Persons(props) {
    return (
        <>
        {props.term ? props.persons.filter(person => person.name.toLowerCase().includes(props.term.toLowerCase())).map((person, i) =>
        <div className="entry" key={person.id}>
        <li>{person.name} {person.number}</li>
        <button onClick={() => props.onDelete(person.id)}>Delete</button>
        </div>)
        : props.persons.map((person, i) =>
        <div className="entry" key={person.id}>
        <li>{person.name} {person.number}</li>
        <button onClick={() => props.onDelete(person.id)}>Delete</button>
        </div>
        )
        }
        </>
    )
}