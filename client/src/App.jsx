import React from 'react'
import { useEffect,useState } from 'react';

const App = () => {
  const [message,setMessage]=useState("");

  useEffect(()=>{
    async function getTodos(){
      const res=await fetch("http://localhost:5000/api/todos");
      const todos=await res.json();
      setMessage(todos.msg);
    }
    getTodos();
  },[])
  return (
    <main className='contanier'>
      <h1>Awesome ToDos</h1>
      {message && <p>{message}</p>}
    </main>
  )
}

export default App
