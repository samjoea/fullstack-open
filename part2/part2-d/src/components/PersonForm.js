
function PersonForm({submitFunc, changeFunc, nameData, numberData}) {
  return (
    <div>
        <form onSubmit={submitFunc}>
            <div>
            name: <input name='name' value={nameData} onChange={changeFunc} />
            </div>
            <div>
            number: <input name='number' value={numberData} onChange={changeFunc} required/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    </div>
  )
}

export default PersonForm