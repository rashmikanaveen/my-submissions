const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}


const Content = (props) => {
  // const-definitions
  console.log(props)

  return (
    <div>
      <p><a href={props.link}>{props.name}</a> has {props.exercises} exercises to do</p>
    </div>
  )
}

const Total = (props) => {
  // const-definitions

  return (
    <div>
      <br />
      <hr />
      <p>This is Total</p>
      <hr />
      <br />
    </div>
  )
}




const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course= {course}/>
      <br />
      <ol>
        <li>      <Content name={part1.name} exercises={part1.exercises} link ='https://fullstackopen.com/en/part1'/></li>
        <li>      <Content name={part2.name} exercises={part2.exercises}link ='https://fullstackopen.com/en/part2' /></li>
        <li>      <Content name={part3.name} exercises={part3.exercises} link='https://fullstackopen.com/en/part3' /></li>
        
        
      </ol>


      
    </div>
  )
}


export default App