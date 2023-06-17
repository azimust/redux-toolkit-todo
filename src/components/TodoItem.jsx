import React from 'react'
import { useDispatch } from 'react-redux'
import { completeTodo, removeTodo } from '../store/todoSlice';

const TodoItem = ({ id, text, completed}) => {
    const dispatch = useDispatch();

    return (
        <li key={id}>
            <input type='checkbox' checked={completed} onChange={() => dispatch(completeTodo(id))}/>
            <span>{text}</span>
            <button onClick={() => dispatch(removeTodo(id))}>&times;</button>
        </li>
    )
}

export default TodoItem