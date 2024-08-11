const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Navigation = (props) => {
  console.log(props)
  return (
    <>
    <nav>
    <a href='https://fullstackopen.com/en/part1'>PART1</a><br />
    <a href='https://fullstackopen.com/en/part2'>PART2</a><br />
    <a href='https://fullstackopen.com/en/part3'>PART3</a><br />


    </nav>
    
    </>
  )

}


const Content = (props) => {
  // const-definitions
  
  const parts=props.parts
  console.log(parts)

  return (
    <div>
      
      <ol>
        <li><p><a href='https://fullstackopen.com/en/part1'>{parts[0].name}</a> has {parts[0].exercises} exercises to do</p></li>
        <li><p><a href='https://fullstackopen.com/en/part2'>{parts[1].name}</a> has {parts[1].exercises} exercises to do</p></li>
        <li><p><a href='https://fullstackopen.com/en/part3'>{parts[2].name}</a> has {parts[2].exercises} exercises to do</p></li>
        
        
        
      </ol>
    </div>
  )
}

const Total = (props) => {
  // const-definitions
  const parts=props.parts
  console.log('Total',parts)

  let sum=parts[0].exercises+parts[1].exercises+parts[0].exercises
  
  return (
    <div>
      
      <hr />
      <p>Total number of exercises: {sum}</p>
    
    </div>
  )
}




const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  return (
    <div>
      <Header course= {course.name}/>
      <Navigation/>
      <br />
      <Content parts={course.parts}/>
      <br />
      <Total parts={course.parts}/>


      
    </div>
  )
}


export default App