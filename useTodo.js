import { useEffect, useReducer } from 'react';
import { todoReducer } from '../08-useReducer/todoReducer';

const init = () => {
    return JSON.parse( localStorage.getItem( 'todos' )) || [];
}

export const useTodo = ( initialValue = [] ) => {
    const [ todos, dispatchTodo ] = useReducer( todoReducer, initialValue, init );

    useEffect(() => {
        localStorage.setItem( 'todos', JSON.stringify( todos ) )
    }, [todos])
    

    const handleNewTodo = ( todo ) => {

        const action = {
            type: '[TODO] Add todo',
            payload: todo
        };

        dispatchTodo( action );
    }

    const handleDeleteTodo = ( todoId ) => {

        const action = {
            type: '[TODO] Remove todo',
            payload: todoId
        };

        dispatchTodo( action );

    }

    const handleToggleTodo = ( todoId ) => {
        const action = {
            type: '[TODO] Toggle todo',
            payload: todoId
        };

        dispatchTodo( action );
    }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done ).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
    }
}