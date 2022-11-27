import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  const handleClick = (event) => {
    const name = event.target.name;

    switch(name) {
      case 'good':
        setGood(val => val + 1);
        break;
      case 'neutral':
        setNeutral(val => val + 1);
        break;
      case 'bad':
        setBad(val => val + 1);
        break;
      default:
        console.log('error');
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name='good' func={handleClick} />
      <Button name='neutral' func={handleClick} />
      <Button name='bad' func={handleClick} />
      <h1>statistics</h1>
      {all ? <Statistics
        good={good} neutral={neutral} bad={bad} 
        average={average} all={all} positive={positive}
       /> : <p>No feedback given</p>}
    </div>
  )
}

const Button = (props) => {
  const {name, func} = props;
  return <button name={name} onClick={func} >{name}</button>
}

const Statistics = (props) => {
  const {good, bad, neutral, all, positive, average} = props
  return (
    <div> 
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='all' value={all}/>
      <StatisticLine text='average' value={average ? average : 0}/>
      <StatisticLine text='positive' value={positive ? positive + '%' : 0 + '%'} />
    </div>
  )
}

const StatisticLine = (props) => {
  const {text, value} = props;
  return (
    <table>
      <tbody>
        <tr>
          <td style={{width: 60}}>{text}</td>
          <td>{value}</td>
        </tr>
      </tbody>
    </table>
  )
}



export default App