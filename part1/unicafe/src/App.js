import { useState } from 'react'
const Header = (props) => (
  <h1>{props.text}</h1>
)

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  ) 
}

const Statistics = (props) => {
  if (props.goodValue === 0 
    && props.neutralValue === 0 
    && props.badValue === 0)
      return <p>No feedback given</p>

  return (
  <table>
    <tbody>
    <StatisticLine text="good" value={props.goodValue}></StatisticLine>
    <StatisticLine text="neutral" value={props.neutralValue}></StatisticLine>
    <StatisticLine text="bad" value={props.badValue}></StatisticLine>
    <StatisticLine text="all" value={props.goodValue + props.neutralValue + props.badValue}></StatisticLine>
    <StatisticLine text="average" value={(props.goodValue - props.badValue) / (props.goodValue + props.neutralValue + props.badValue)}></StatisticLine>
    <StatisticLine text="positive" value={(props.goodValue / (props.goodValue + props.neutralValue + props.badValue)) * 100 + " %"}></StatisticLine>
    </tbody>
  </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setNewGood = (newValue) => {
    setGood(newValue)
  }
  const setNewNeutral = (newValue) => {
    setNeutral(newValue)
  }
  const setNewBad = (newValue) => {
    setBad(newValue)
  }

  return (
    <div>
      <Header text="give feedback"></Header>
      <Button handleClick={() => setNewGood(good + 1)} text="good"></Button>
      <Button handleClick={() => setNewNeutral(neutral + 1)} text="neutral"></Button>
      <Button handleClick={() => setNewBad(bad + 1)} text="bad"></Button>
      <Header text="statistics"></Header>
      <Statistics goodValue={good} neutralValue={neutral} badValue={bad}></Statistics>
    </div>
  )
}

export default App