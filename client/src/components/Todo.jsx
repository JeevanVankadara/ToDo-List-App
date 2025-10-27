import React from "react";

const Todo = (props) => {
    const { todo, setTodos } = props;

    async function statusUpdate(id, currentStatus) {
        const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
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
        const res=await fetch(`http://localhost:5000/api/todos/${id}`,{
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