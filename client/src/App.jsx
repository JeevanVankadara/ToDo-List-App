import React, { useEffect, useState } from 'react';
import Todo from './components/Todo'; 

// Use Vite environment variable for API URL in production (set VITE_API_URL in Vercel)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const App = () => {
  const [todos,setTodos]=useState([]);
  const [content,setContent]=useState("");

  useEffect(()=>{
    async function getTodos(){
      const res=await fetch(`${API_URL}/api/todos`);
      const todos=await res.json();
      setTodos(todos);
    }
    getTodos();
  },[])

  const createTodo=async(e)=>{
    e.preventDefault();
    const res=await fetch(`${API_URL}/api/todos`,{
      method:"POST",
      body:JSON.stringify({todo:content}),
      headers:{
        "Content-Type":"application/json",
      },
    });
    const newTodo= await res.json();

    setContent("");
    setTodos([...todos,newTodo]);
  }

  return (
    <main className='container'>
      <h1 className='title'>Bunny ToDos</h1>
      <form className='form' onSubmit={createTodo}>
        <input type="text" placeholder='Enter the todo...' value={content}  onChange={(e)=>(setContent(e.target.value))} className='form_input' required/>
        <button className='form_button' type='submit' >Create</button>
      </form>
      <div className='todos'>
      {todos.length > 0 &&
        todos
          .sort((a, b) => a.status - b.status) 
          .map((todo) => (
            <Todo key={todo._id} todo={todo} setTodos={setTodos}/>
        ))}
      </div>    
    </main>
 )
}

export default App;