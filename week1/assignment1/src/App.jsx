import { useState } from 'react'

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  )
}

const StatisticLine = ({value, text}) => {
  return(
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [values, setValues] = useState(0)

  const handleGoodClick = () => {
    const updatedGood = good + 1
    const updatedAll = all + 1
    setGood(updatedGood);
    setAll(updatedAll)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    const updatedAll = all + 1
    setNeutral(updatedNeutral)
    setAll(updatedAll)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    const updatedAll = all + 1
    setBad(updatedBad)
    setAll(updatedAll)
  }

  const average = all === 0 ? 0 : (good - bad) / all
  const calculatePercentage = (value, all) => {
    if(all === 0 || value === 0)
    {
      return '0%'
    }
    else
    {
      return `${(value / all) * 100} %`
    }
  }
  const positive = () => {
    return calculatePercentage(good, all)
  }

  const Statistics = (props) => {
    if(props.all === 0)
    {
      return(
        <div>No feedback given</div>
      )
    }
    else
    {
      return (
        <table>
          <tbody>
            <StatisticLine text='good' value={props.good}/>
            <StatisticLine text='neutral' value={props.neutral}/>
            <StatisticLine text='bad' value={props.bad}/>
            <StatisticLine text='all' value={props.all}/>
            <StatisticLine text = 'average' value={props.average}/>
            <StatisticLine text ='positive' value={props.positive()}/>
          </tbody>
        </table>
      )
    }
  }


  return (
    <div>
      <Header text = 'give feedback'/>
      <Button text='good' onClick={handleGoodClick}/>
      <Button text='neutral'onClick={handleNeutralClick}/>
      <Button text='bad' onClick={handleBadClick}/>
      <Header text ='statistics'/>
      <Statistics
      good={good}
      bad={bad}
      neutral={neutral}
      all={all}
      average={average}
      positive={positive}/>
    </div>
  )
}

export default App