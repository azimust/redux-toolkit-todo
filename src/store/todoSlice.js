import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
    'todos/fetchTodos',
    async function (_, { rejectWithValue }) {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10');

            if (!response.ok) {
                throw new Error('serverError!')
            }

            const data = await response.json();

            return data
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

export const deleteTodo = createAsyncThunk(
    'todos/deleteTodo',
    async function (id, { rejectWithValue, dispatch }) {
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                throw new Error("can't remove todo. Server Error")
            }

            dispatch(removeTodo(id))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const checkTodo = createAsyncThunk(
    'todos/checkTodo',
    async function (id, { rejectWithValue, dispatch, getState }) {
        const todo = getState().todos.todos.find(todo => todo.id === id);

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    completed: !todo.completed
                })
            });

            if (!response.ok) {
                throw new Error("can't complete todo. Server Error")
            }

            dispatch(completeTodo(id))
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

export const addNewTodo = createAsyncThunk(
    'todos/addNewTodo',
    async function (text, { rejectWithValue, dispatch }) {
        try {
            const todo = {
                title: text,
                userId: 1,
                completed: false
            }

            const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(todo)
            })
            if (!response.ok) {
                throw new Error("can't add todo. Server Error")
            }

            const data = await response.json()
            dispatch(addTodo(data))

        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
)

const setError = (state, action) => {
    state.status = 'error';
    state.error = action.payload
};

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        status: null,
        error: null
    },
    reducers: {
        addTodo(state, action) {
            // state.todos.push({
            //     id: new Date().getTime(),
            //     title: action.payload,
            //     completed: false
            // })
            state.todos.push(action.payload)
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        },
        completeTodo(state, action) {
            const toggleTask = state.todos.find(todo => todo.id === action.payload);
            toggleTask.completed = !toggleTask.completed
        }
    },
    extraReducers: {
        [fetchTodos.pending]: (state) => {
            state.status = 'loading';
            state.error = null;
        },
        [fetchTodos.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.todos = action.payload
        },
        [fetchTodos.rejected]: setError,
        [deleteTodo.rejected]: setError,
        [checkTodo.rejected]: setError,
        [addNewTodo.rejected]: setError
    }
})

const { addTodo, removeTodo, completeTodo } = todoSlice.actions;

export default todoSlice.reducer