const Header = ( { name }) => <h1>{name}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map( part => (
      <Part part = {part} key = {part.id}/>
    ))}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
  return(
    <b>total of {total} exercises </b>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts}/>
    </div>
  )
}

export default Course