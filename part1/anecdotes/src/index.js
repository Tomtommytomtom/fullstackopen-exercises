import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const [votes, setVote] = useState(Array(anecdotes.length).fill(0))

  const getIndexOfHighestVote = () => votes.reduce((prevVote, curVote, curIdx) => {
      if(curVote > votes[prevVote]){
          return curIdx
    }
    return prevVote
  },0)
  

  const addNewVote = indexOfAnecdote => {
      const newVotes  = [...votes]
      newVotes[indexOfAnecdote] += 1
      return setVote(newVotes)
    }

  const randomNextInt = (max, prev) => {
    const randomInteger = Math.floor(Math.random() * max)
    if(randomInteger == prev){
      return randomNextInt(max)
    }
    else{
      return randomInteger
    }
  }

  const randomState = () => setSelected(randomNextInt(props.anecdotes.length, selected))

  return (
    <div>
      <DisplayAnecdote header="Anecdote of the Day" selected={selected} votes={votes} anecdotes={anecdotes}/>
      <Button string="next anecdote" click={() => randomState()} />
      <Button string="vote" click={() => addNewVote(selected)} />
      <DisplayAnecdote header="Anecdote with most votes" selected={getIndexOfHighestVote()} votes={votes} anecdotes={anecdotes} />
    </div>
  )
}

const DisplayAnecdote = ({header, selected, votes, anecdotes}) => {
  return(
    <>
      <Header title= {header} />
      <p>{anecdotes[selected]}</p>
      <p>has: {votes[selected]} votes</p>
    </>
  )
}

const Header = props => <h2>{props.title}</h2>

const Button = ({string, click}) =>{
    return(
        <button onClick={click}>{string}</button>
    )
}


const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)