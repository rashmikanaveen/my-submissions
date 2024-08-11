import { useState } from 'react'

const Display =({ good, neutral, bad })=>{
  if(good===0 && neutral===0 && bad===0){
    return(
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  return(
    <div>
      
      <p>good {good} <br />
      neutral {neutral} <br />
      bad {bad}<br />
      all {good+neutral+bad}<br />
      average {(good-bad)/(good+neutral+bad)}<br />
      positive {(good/(good+neutral+bad))*100} % <br />
      </p>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feed back</h1>
      <button onClick={()=>setGood(good+1)}>good</button>
      <button onClick={()=>setNeutral(neutral+1)}>neutral</button>
      <button onClick={()=>setBad(bad+1)}>bad</button>
      <h2>Statistics</h2>
      <Display good={good} neutral={neutral} bad={bad}/>
      
      
      
    </div>
  )
}

export default App

