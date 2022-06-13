
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
  return(
    <div>
      <Header course={course} key={course.id}/>
      <Content parts={course.parts} key={course.parts.id}/>
      <Total sum={course.parts.reduce((sum,item)=>sum+item.exercises,0)} key='0'/> 
    </div>
  )

}

export default Course