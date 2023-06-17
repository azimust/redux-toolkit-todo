import React from 'react'
import { useDispatch } from 'react-redux'
import { completeTodo, removeTodo, deleteTodo, checkTodo } from '../store/todoSlice';

const TodoItem = ({ id, title, completed }) => {
    const dispatch = useDispatch();

    return (
        <li key={id}>
            <input type='checkbox' checked={completed} onChange={() => dispatch(checkTodo(id))} />
            <span>{title}</span>
            <button onClick={() => dispatch(deleteTodo(id))}>&times;</button>
        </li>
    )
}

export default TodoItem