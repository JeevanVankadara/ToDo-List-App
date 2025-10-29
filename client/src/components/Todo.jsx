import React from "react";

// Use Vite environment variable for API URL in production (set VITE_API_URL in Vercel)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const Todo = (props) => {
    const { todo, setTodos } = props;

    async function statusUpdate(id, currentStatus) {
    const res = await fetch(`${API_URL}/api/todos/${id}`, {
            method: "PUT",
            body: JSON.stringify({ status: !currentStatus }),
            headers: {
                "Content-Type": "application/json"
            },
        });

        if (res.ok) {
            const updatedTodo = await res.json();
            setTodos(currentTodos =>
                currentTodos.map(currentTodo =>
                    currentTodo._id === id ? updatedTodo : currentTodo
                )
            );
        }
    }

    const deleteTask=async(id)=>{
    const res=await fetch(`${API_URL}/api/todos/${id}`,{
            method:"DELETE",
        })

        if(res.ok){
            setTodos(currentTodos=>
                currentTodos.filter(todo=>todo._id!==id)
            )
        }
    }
    return (
        <div key={todo._id} className="todo">
            <p className={todo.status ? "completed" : ""}>{todo.todo}</p>
            
            <div className="mutations">
                <button
                    className="todo_status"
                    onClick={() => statusUpdate(todo._id, todo.status)}
                >
                    {todo.status ? "☑" : "☐"}
                </button>

                <button
                    className="todo_delete"
                    onClick={() => deleteTask(todo._id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    );
};

export default Todo;