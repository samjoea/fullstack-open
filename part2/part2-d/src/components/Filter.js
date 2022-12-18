
function Filter({searchFunc, resultsData}) {
  return (
    <div>
        filter shown with <input type='search' onChange={searchFunc} /> <br />
        {resultsData.map(val => (
            <p key={val.number}>{val.name}</p>
        ))}
    </div>
  )
}

export default Filter