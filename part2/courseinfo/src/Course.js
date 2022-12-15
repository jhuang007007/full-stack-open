const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part =>
        <Part key={part.id} part={part}/>
      )}
      <Total course={course} />      
    </div>
  )
}

const Part = ({ part }) => {
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({ course }) => {
  const total = course.parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)

  return (
    <p><b>total of {total} exercises</b></p>
  )
}

export default Course