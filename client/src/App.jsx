import React, { useEffect, useState } from 'react';

const App = () => {
  const [todos,setTodos]=useState([]);

  useEffect(()=>{
    async function getTodos(){
      const res=await fetch("http://localhost:5000/api/todos");
      const todos=await res.json();
      setTodos(todos);
    }
    getTodos();
  },[])
  return (
    <main className='container'>
      <h1 className='title'>Awesome ToDos</h1>
      <div className='todos'>
      {todos.length > 0 &&
        todos.map((todo) => (
          <div key={todo._id} className='todo'>
            <p>{todo.todo}</p>
            <div>
              <button className='todo_status'>{todo.status ? "☑" : "☐"}

              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}

export default App
