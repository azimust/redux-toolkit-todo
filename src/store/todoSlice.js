import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: []
    },
    reducers: {
        addTodo(state, action) {
            state.todos.push({
                id: new Date().getTime(),
                text: action.payload,
                completed: false
            })
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        completeTodo(state, action) {
            const toggleTask = state.todos.find(todo => todo.id === action.payload);
            toggleTask.completed = !toggleTask.completed
        }
    }
})

export const {addTodo, removeTodo, completeTodo} = todoSlice.actions;

export default todoSlice.reducer