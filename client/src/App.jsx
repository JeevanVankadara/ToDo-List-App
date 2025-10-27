import React, { useEffect, useState } from 'react';

const App = () => {
  const [todos,setTodos]=useState([]);
  const [content,setContent]=useState("");

  useEffect(()=>{
    async function getTodos(){
      const res=await fetch("http://localhost:5000/api/todos");
      const todos=await res.json();
      setTodos(todos);
    }
    getTodos();
  },[])

  const createTodo=async(e)=>{
    e.preventDefault();
    const res=await fetch("http://localhost:5000/api/todos",{
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

  async function statusUpdate(id,currentStatus){
    const res=await fetch(`http://localhost:5000/api/todos/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({status:!currentStatus}),
    });
    const updatedTodo=await res.json();
    setTodos(prev=>prev.map(t=>(t._id===id)? updatedTodo : t));
  }

  return (
    <main className='container'>
      <h1 className='title'>Awesome ToDos</h1>
      <form className='form' onSubmit={createTodo}>
        <input type="text" placeholder='Enter the todo...' value={content}  onChange={(e)=>(setContent(e.target.value))} className='form_input' required/>
        <button type='submit' >Create</button>
      </form>
      <div className='todos'>
      {todos.length > 0 &&
        todos.map((todo) => (
          <div key={todo._id} className='todo'>
            <p>{todo.todo}</p>
            <div>
              <button className='todo_status' onClick={()=>statusUpdate(todo._id,todo.status)}>
                {todo.status ? "☑" : "☐"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
