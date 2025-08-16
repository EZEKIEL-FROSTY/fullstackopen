import { useState } from "react"

const Header = (props) => {
  return(
    <div>
      <h1> {props.course} </h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      {props.part} {props.exercises}
    </div>
  )
}

const Content = (props) => {
    return (
      <div>
        <Part part = {props.parts[0].name} exercises = {props.parts[0].exercises}/>
        <Part part = {props.parts[1].name} exercises = {props.parts[1].exercises}/>
        <Part part = {props.parts[2].name} exercises = {props.parts[2].exercises}/>
      </div>
    )
}

const Hello = ({name, age}) => {
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>
        Hello, {name}, you are {age} years old.
      </p>
      <p>
        You were probably born in {bornYear()}
      </p>
    </div>
  )
}
const History = (props) => {
    if (props.allClicks.length === 0)
    {
      return (
        <div>
          the app is used by pressing the buttons
        </div>
      )
    }
    return (
      <div>
        button press history : {props.allClicks.join(' ')}
      </div>
    )
}

const Display = ({counter}) => <div>{counter}</div>

const Button = (props) => {
  const { onClick, text } = props;
  return (
    <button onClick={onClick}> 
      {text} 
    </button>
  )
}


const App = () => {
  const course = {
    name : 'Half Stack application development',
    parts : [
      {
        name : 'Fundamentals of React',
        exercises : 10
      },
      {
        name : 'Using props to pass data',
        exercises : 7
      },

      {
        name : 'State of a component',
        exercises : 14
      }
    ]
  }
  const name = "Bisque"
  const age = 14
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value ', counter)

  const increaseByOne = () => {
    console.log('increasing, value before ', counter)
    setCounter(counter + 1)
  }

  const setToZero = () => {
    console.log('resetting to zero, value before ', counter)
    setCounter(0)
  }
  const decreaseByOne = () => {
    console.log('decreasing, value before ', counter)
    setCounter(counter - 1)
  }

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const [value, setValue] = useState(10)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }

  const handleClick = () => {
    console.log('clicked the button')
  }

  const hello = (who) => () => {
      console.log('hello', who)
  }

  const setToValue = (newValue) => () => {
    console.log('value now' , newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Header course = {course.name} />
      <Content parts = {course.parts}/>
      <Hello name = "Frosty" age = {14+1} />
      <Hello name={name} age={age} />
      <Display counter = {counter}/>
      <Button onClick={increaseByOne} text='plus'/>
      <Button onClick={setToZero} text='zero'/>
      <Button onClick={decreaseByOne} text='minus'/>
      <div>
        {left}
        <Button onClick={handleLeftClick} text='left'/>
        <Button onClick={handleRightClick} text='right'/>
        {right}
        <History allClicks = {allClicks} />
        <Button onClick={handleClick} text = 'button'></Button>
        <Button onClick={hello('Frosty')} text='HI FROSTY'/>
        <button onClick={setToValue(1000)}>thousand</button>
        <button onClick={setToValue(0)}>reset</button>
        <button onClick={setToValue(value + 1)}>increment</button>
      </div>
    </div>
  )
}

export default App
