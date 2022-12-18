
function Persons({personData}) {
  return (
    <div>
        {personData.map(person => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  )
}

export default Persons