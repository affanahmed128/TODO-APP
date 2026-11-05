import React from "react"

// TodoItem displays a single task and includes the delete action for that item.
const TodoItem = ({ todo, onDelete ,onComplete }) => {
    return (
        <li>
            {todo.title} {todo.completed}
            <button onClick={() => onDelete(todo._id)}>
                Delete
            </button>
        </li>
    );
};

export default TodoItem;