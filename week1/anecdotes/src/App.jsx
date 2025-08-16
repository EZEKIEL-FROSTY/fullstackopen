import { useState } from 'react'

const Button = ({text, onClick}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const Header = ({text}) => {
  return(
    <div>
      <h1>{text}</h1>
    </div>
  )
}

const Display = ({text}) => {
  return(
    <div>
      {text}
    </div>
  )
}

const App = () => {
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
  const size = anecdotes.length
  const [votes, setVotes] = useState(new Array(size).fill(0));

  const nextAnecdote = () => {
    const randomNum = Math.floor(Math.random() * 100) % size
    setSelected(randomNum);
  }

  const vote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy);
  }

  const mostVotes = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Header text='Anecdote of the day'/>
      <Display text={anecdotes[selected]}/>
      <Button text='vote' onClick={vote}/>
      <Button text='next anecdote' onClick={nextAnecdote}/>
      <Header text='Anecdote with most votes'/>
      <Display text={anecdotes[mostVotes]}/>
      <Display text={`has ${votes[mostVotes]} votes`}/>
    </div>
  )
}

export default App