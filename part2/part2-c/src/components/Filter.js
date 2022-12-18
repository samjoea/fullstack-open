import ShowCountryInfo from "./ShowCountryInfo"
import WeatherData from "./WeatherData"

function Filter({ resultsData, show, setShow }) {
  const dataLength = resultsData.length
  console.log(resultsData)
  const displayData = (country) => {
    const {capital, area, languages, flags, name, latlng} = resultsData[country]
    return (
      <div>
        <h1>{name.common}</h1>
        <span>
          Capital {
            capital.length > 1 ? 
              capital.map(c => <li key={c}>{c}</li>)
              : capital[0]
            }
        </span><br/>
        <span>Area {area}</span>
        <h3>languages</h3>
        <ul>
          {Object.values(languages).map(l => <li key={l}>{l}</li>)}
        </ul>
        <img src={flags.png} width={100} height={100} alt='flag'/>
        <h1>Weather in {capital ? capital: null}</h1>
        <WeatherData lat={latlng[0]} lon={latlng[1]} />
      </div>
    )
  }
  if (dataLength === 1) {
    return displayData(0);
  }
  if (dataLength > 10) return <p>Too many matches, specify another filter</p>
  if (dataLength && dataLength <= 10) {
    return resultsData.map((data, i) => (
      <div key={data.cca2}>
        {data.name.common}
        <ShowCountryInfo display={displayData} index={i} />
      </div>
    ))
  }
}

export default Filter