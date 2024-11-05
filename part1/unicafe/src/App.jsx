import { useState } from 'react'
import './App.css'
import Button from "./Button.jsx"
import Statistics from "./Statistics.jsx"

function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const points = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0}
  const [votes, setVotes] = useState(points)

  function getMaxedVote() {
    const maxVote = Math.max(...Object.values(votes))
    const indexOfMaxVote = Object.keys(votes).find(key => votes[key] === maxVote)

    return {
      anecdote: anecdotes[indexOfMaxVote],
      votes: maxVote
    }
  }

  const {anecdote, votes: maxVote} = getMaxedVote()

  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={() => setGood(good + 1)} name="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} name="neutral"/>
      <Button onClick={() => setBad(bad + 1)} name="bad"/>
      
      <h1>Statistics</h1>
      {(good || neutral || bad) ? <Statistics good={good} neutral={neutral} bad={bad} /> : <p>No feedback given</p>}

      <h1>Anecdote of the day</h1>    
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={() => setVotes({...votes, [selected]: votes[selected] + 1})} name="vote"/>
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} name="next anecdote"/>
      
      <h1>Anecdote with most vote</h1>
      {maxVote > 0 ? (
        <>
        <p>{anecdote}</p>
        <p>has {maxVote} votes</p>
        </>
      ) : <p>No votes yet</p>}

    </div>
  )
}

export default App
