import React, {useState, useEffect} from "react"

import AddTodo from "./AddTodo"
import TodoItem from "./TodoItem"
import BACKEND_URL from "../config/config"

// TodoList loads saved tasks and manages add/delete actions for the entire todo list.
const TodoList = () =>{
    const [todos, setTodos] = useState([]);

    // Fetch the existing tasks from the backend when the component first loads.
    useEffect(()=>{
        fetchTodos();
    }, [])

    // Retrieves all todo items from the API and stores them in local state.
    const fetchTodos = async () =>{
        try {
            const response = await fetch(`${BACKEND_URL}/get-todos`)
            const data = await response.json()
            setTodos(data)
        } catch (error) {
            console.error("Error fetching the data", error)
        }
    }

    // Sends a new title to the backend and updates the list with the created item.
    const addTodo = async (title) =>{
        console.log("Adding todo", title)
        try {
            const response = await fetch(`${BACKEND_URL}/add-todo`,{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title})
            })
            console.log("response is", response)
            const newTodo = await response.json();
            setTodos((prev)=> [...prev, newTodo])
            console.log("Response received", response)
        } catch (error) {
            console.error("Error while creating the todo", error)
        }
    }

    // Deletes a task by id and removes it from the UI after the backend confirms deletion.
    const deleteTodo = async (id) => {
        try {
            const response = await fetch(`${BACKEND_URL}/delete-todo/${id}`, {
                method: "DELETE"
            })
            if (response.ok) {
                setTodos((prev) => prev.filter(todo => todo._id !== id))
            } else {
                console.error("Failed to delete todo")
            }
        } catch (error) {
            console.error("Error while deleting the todo", error)
        }
    }

    return (
        <div>
            <h1> Todo List </h1>
            <AddTodo onAdd= {addTodo} />
            <ul>
                {
                    todos.map( todo => (
                        <TodoItem key={todo._id} todo={todo} onDelete={deleteTodo}></TodoItem>
                    ))
                }
            </ul>
        </div>
    )

}

export default TodoList
