import React, { useState, useEffect } from 'react';

import './App.css';

import Inputs from './components/Inputs';
import TodoList from './components/TodoList';

import { addTodo, fetchTodos, addNewTodo } from './store/todoSlice';
import { useDispatch, useSelector } from 'react-redux';

function App() {
  const [text, setText] = useState('');
  const { status, error } = useSelector(state => state.todos)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos())
  }, [dispatch])

  const addTask = () => {
    if (text.trim().length) {
      dispatch(addNewTodo(text))
      setText('')
    }
  }

  return (
    <div className='App'>
      <Inputs text={text} setText={setText} addTodo={addTask} />
      {status === 'loading' && <h1>Loading</h1>}
      {error && <h2>Error: {error}'</h2>}
      <TodoList />
    </div>
  )
}

export default App;
