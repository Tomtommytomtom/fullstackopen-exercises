import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const reviews = [good, neutral, bad]

  const title = "give feedback"

  const setNewGood = newValue => setGood(newValue)
  const setNewNeutral = newValue => setNeutral(newValue)
  const setNewBad = newValue => setBad(newValue)

  const sumOfReviews = () => good + bad + neutral

  const calcAverage = () => (good - bad) / sumOfReviews()
  const percentageOfVotes = review => (review / sumOfReviews()) * 100

  const hasReceivedFeedback = () => {
    if(sumOfReviews() === 0){
      return false
    }
    return true
  }

  const statisticFunctions = [() => calcAverage(), (value) => percentageOfVotes(value), () => hasReceivedFeedback()]

  return (
    <div>
      <Header title={title} />
      <Button name="good" onClick={() => setNewGood(good + 1)} />
      <Button name="neutral" onClick={() => setNewNeutral(neutral + 1)} />
      <Button name="bad" onClick={() => setNewBad(bad + 1)} />
      <Statistics reviews={reviews} functions={statisticFunctions} />
    </div>
  )
}


const Statistics = ({reviews, functions}) => {
  if(!functions[2]()){
    return(
      <>
        <Header title="statistics" />
        <p>No feedback given</p>
      </>
    )
  }
  return(
    <>
      <Header title="statistics" />
      <table>
        <tbody>
          <Statistic string="good"    value={reviews[0]} />
          <Statistic string="neutral" value={reviews[1]} />
          <Statistic string="bad"     value={reviews[2]} />
          <Statistic string="average"      value={functions[0]()} />
          <StatisticPercent string="positive"     value={functions[1](reviews[0])} />
        </tbody>
      </table>
    </>
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

const Statistic = props => <tr><td>{props.string}</td><td>{props.value}</td></tr>
const StatisticPercent = props => <tr><td>{props.string}</td><td>{props.value} %</td></tr>

ReactDOM.render(<App />, 
  document.getElementById('root')
)