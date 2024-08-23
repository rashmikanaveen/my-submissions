import { useState } from 'react'

const Header = (props) => {
  const { course } = props
  return (
    <h2>{course}</h2>
  )
}

const Course_1 = ({ course }) => {
  const  name  = course.name
  const parts = course.parts
  console.log(parts);

  return (
    <div>
      <h2>{name}</h2>
      {parts.map((part, index) => (
        <div key={index}>
          {part.name} {part.exercises}
          
        </div>
      ))}
    </div>
  );
};
const Sum =({parts})=>{
  
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return(
    <div>
      <b>total of {total} exercises</b>
    </div>
  )
  console.log(total);
}



const Course = () => {
  const courses = [{
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
  },
  {
    name: 'Node.js',
    id: 2,
    parts: [
      {
        name: 'Routing',
        exercises: 3,
        id: 1
      },
      {
        name: 'Middlewares',
        exercises: 7,
        id: 2
      }
    ]
  }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      
      <Course_1 course={courses[0]} />
      <Sum parts={courses[0].parts} />
      
      <Course_1 course={courses[1]} />
      <Sum parts={courses[1].parts} />
      
    </div>
  )
}

export default Course