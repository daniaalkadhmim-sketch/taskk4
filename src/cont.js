import {useState} from "react";

function Counter (){
  const[x,setX]= useState(100)
  
  return (
    <div>
      <p>you clicked {x} time</p>
      <button onClick={() =>setX(x +10)}>Click me</button>
    </div>
  )

}
export default Counter;

