import React , {useState} from 'react'

// AddTodo renders the input form used to create a new task in the list.
const AddTodo = ({ onAdd })=>{
    const [todo, setTodo] = useState('')

    // Submits the typed task title to the parent component for backend storage.
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!todo) return;
        console.log(todo)
        onAdd(todo);
        setTodo("");
    }
    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text"
                value={todo}
                onChange={(e)=> setTodo(e.target.value)}
                placeholder='Add a new Todo'
                required
            />
            <button type="submit" >Add Todo</button>
        </form>
    )
}

export default AddTodo