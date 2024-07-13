const Header = (props) => {
  // const-definitions

  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}


const Content = (props) => {
  // const-definitions

  return (
    <div>
      <br />
      <hr />
      <p>This is content</p>
      <hr />
      <br />
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
  // const-definitions
  const course = 'Half Stack application development'

  console.log('Hi')
  return (
    <div>
      <Header course={course} />
      <Content  />
      <Total />
      
    </div>
  )
}
export default App