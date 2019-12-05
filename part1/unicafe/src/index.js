import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = "give feedback"

  const setNewGood = newValue => setGood(newValue)
  const setNewNeutral = newValue => setNeutral(newValue)
  const setNewBad = newValue => setBad(newValue)

  return (
    <div>
      <Header title={title} />
      <Button name="good" onClick={() => setNewGood(good + 1)} />
      <Button name="neutral" onClick={() => setNewNeutral(neutral + 1)} />
      <Button name="bad" onClick={() => setNewBad(bad + 1)} />
      <Header title="statistics" />
      <Display string="good"    value={good} />
      <Display string="neutral" value={neutral} />
      <Display string="bad"     value={bad} />
    </div>
  )
}

const Button = props => {
    return(
        <button onClick={props.onClick}>
            {props.name}
        </button>
    )
}

const Header = props => <h1>{props.title}</h1>

const Display = props => <p>{props.string} {props.value}</p>

ReactDOM.render(<App />, 
  document.getElementById('root')
)