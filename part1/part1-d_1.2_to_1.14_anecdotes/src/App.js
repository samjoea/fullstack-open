import { useState } from 'react'

const specifiedArr = (length) => {
  let arr = new Array(length).fill(0);
  return arr;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const anecdoteLength = anecdotes.length;

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(() => specifiedArr(anecdoteLength));


  const handleSelected = () => {
    const randomNum = Math.floor(Math.random() * (anecdotes.length));
    setSelected(randomNum);
  }

  const handleVote = () => {
    const votes = [...vote];
    votes[selected] += 1;
    setVote(votes);
  }
  console.log(vote)
  console.log(selected)

  const maxVote = vote.reduce((a,b) => Math.max(a, b))
  const indexMaxVote = vote.indexOf(maxVote);

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      has {vote[selected]} votes
      <br />
      <button onClick={handleVote} >vote</button>
      <button onClick={handleSelected}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {maxVote ? anecdotes[indexMaxVote] : null}<br />
      {maxVote ? `has ${maxVote} votes` : null}
    </div>
  )
}

export default App