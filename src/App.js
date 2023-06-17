import React, { useState } from 'react';

import './App.css';

import Inputs from './components/Inputs';
import TodoList from './components/TodoList';

import { addTodo } from './store/todoSlice';
import { useDispatch } from 'react-redux';

function App() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const addTask = () => {
    dispatch(addTodo(text))
    setText('')
  }

  return (
    <div className='App'>
      <Inputs text={text} setText={setText} addTodo={addTask}/>

      <TodoList/>
    </div>
  )
}

export default App;
