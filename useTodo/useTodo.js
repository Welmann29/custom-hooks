import { useEffect, useReducer } from "react"
import { todoReducer } from './todoReducer'

const init = () => {
    return JSON.parse( localStorage.getItem('todos') ) || [];
}

export const useTodo = () => {

    const [ todos, dispatchTodo ] = useReducer(todoReducer, [], init );
    
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos])
    

    const handleNewTodo = ( { description } ) => {
        if (description.length === 0) return;
        const newTodo = {
            id: new Date().getTime(),
            description,
            done: false
        };
        const action = {
            type: 'addTodo',
            payload: newTodo
        };
        dispatchTodo(action);
    }

    const handleRemoveTodo = (id) => {
        const action = {
            type: 'removeTodo',
            payload: id
        };
        dispatchTodo(action);
    }

    const handleToggleTodo = (id) => {
        const action = {
            type: 'toggleTodo',
            payload: id
        }
        dispatchTodo(action);
    } 
    
    return {
        todos,
        handleNewTodo,
        handleRemoveTodo,
        handleToggleTodo
    }
}
