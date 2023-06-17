import React from 'react'

const Inputs = ({text, setText, addTodo}) => {
    return (
        <label>
            <input value={text} onChange={(e) => setText(e.target.value)} />
            <button onClick={addTodo}>Add</button>
        </label>
    )
}

export default Inputs