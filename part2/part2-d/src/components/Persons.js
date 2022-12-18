import { deleteData } from "../service/service"

function Persons({ personData, setPersons, setMessage, setNotify, setError}) {

  const handleDelete = async (id, name) => {
    let temp = [ ...personData ];
    let newData = temp.filter(val => val.id !== id);
    console.log(newData);
    try {
      await deleteData(id);
      setPersons(newData);
    } catch (error) {
      setMessage(`Information of ${name} has already been removed from server`)
      setNotify(true);
      setError(true);
    }
  }
  return (
    <div>
        {personData.map(person => (
          <div key={person.name}>
            {person.name} {person.number}
            <button onClick={
              () => {
                let confirm = window.confirm(`Delete ${person.name} ?`);
                confirm && handleDelete(person.id, person.name);
                setMessage(`${person.name} deleted successfully`);
                setNotify(true);
              }
            }>delete</button>
          </div>
        ))}
    </div>
  )
}

export default Persons