import { useState } from 'react'

const Statistics =({ good, neutral, bad })=>{
  const all=good+neutral+bad
  console.log("Total of feedbaks",all)
  if(good===0 && neutral===0 && bad===0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>

<table>
  <tbody>
    <tr>
      <td><StatisticLine text='good' value={good}/></td>
    </tr>
    <tr>
      <td><StatisticLine text='neutral' value={neutral}/></td>
    </tr>
    <tr>
      <td><StatisticLine text='bad' value={bad}/></td>
    </tr>
    <tr>
      <td><StatisticLine text='all' value={all}/></td>
    </tr>
    <tr>
      <td><StatisticLine text='average' value={(good-bad)/all}/></td>
    </tr>
    <tr>
      <td><StatisticLine text='positive' value={(good/all)*100+'%'}/></td>
    </tr>
  </tbody>
</table>
      
      
      
      
      
      
      
      
    </div>
  )
}
const StatisticLine=({text,value})=>{
  return(
    <div>{text} {value}</div>
  )
}


const Button =(props)=>{
  const {handleClick,text}=props
  return(
    <button onClick={handleClick}>{text}</button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodincrement=()=>setGood(good+1)
  const setNeutralincrement=()=>setNeutral(neutral+1)
  const setBadincrement=()=>setBad(bad+1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setGoodincrement} text='good'/>
      <Button handleClick={setNeutralincrement} text='neutral'/>
      <Button handleClick={setBadincrement} text='bad'/>
      
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
      
      
      
      
    </div>
  )
}

export default App

