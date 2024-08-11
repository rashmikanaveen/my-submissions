import { useState } from 'react'

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const getMaxIndex=(points)=>{
  let max=points[0]
  let maxIndex=0
  for(let i=1;i<points.length;i++){
    if(points[i]>max){
      max=points[i]
      maxIndex=i
    }
  }
  return maxIndex

}
const ShowAnecdoteWithLargestNumberOfVotes =({anecdotes,points})=>{
  let total = 0;
  for (let i = 0; i < points.length; i++) {
    total += points[i];
    }
  
  if(total===0){
      return (<div></div>)
    
  }
  let maxIndex=getMaxIndex(points)
  console.log("This is the index of the anecdote with most votes",maxIndex)
  return (<div>
    <h1>Anecdote with Most votes</h1>
    <p>{anecdotes[maxIndex]} <br />has{points[maxIndex]} votes</p>
  </div>)
  
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(anecdotes.length).fill(0));
  

  const getSelected =()=>{
    const number= getRandomInt(anecdotes.length)
    console.log("This is ",number,"selected anecdote")
    setSelected(number)
  }
   
   
  const handVote = () => {
    const newPoints = [...points];
    newPoints[selected] += 1;
    setPoints(newPoints);
  };
  console.log(...points)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br />
      has {points[selected]} votes <br />
      <button onClick={handVote}>vote</button>
      <button onClick={getSelected}>next anecdote </button>
      <ShowAnecdoteWithLargestNumberOfVotes anecdotes={anecdotes} points={points}/>
      
    </div>
  )
}

export default App