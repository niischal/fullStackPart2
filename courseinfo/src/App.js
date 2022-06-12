const Header = ({course}) => {
  return(
    <h1>{course.name}</h1>
  )
}

const Part = ({part}) => {
  return(
    <p>{part.name}  {part.exercises}</p>
  )
}
const Content = ({parts}) =>{
  return(
    <>
      {parts.map(i => 
       <Part part={i} key={i.id}/>
      )}
    </>
  )
}

const Total = ({sum}) => {
  return(
    <h4>total of {sum} exercises </h4>
  )
}
const Course = ({course}) => {
  // const getSum=(total,num)=>{
  //   return total+num
  // }
  // const sum= course.parts.reduce(getSum,0)
  
  return(
    
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total sum={sum} key='0'/> 
    </div>
  )
  
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App