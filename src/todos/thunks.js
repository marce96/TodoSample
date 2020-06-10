import { loadTodosInProgress, loadTodosSuccess, loadTodosFailure, createTodo, removeTodo, completedTodo } from './actions';

export const loadTodos = () => async (dispatch, getState) => {
    try {
        dispatch(loadTodosInProgress());
        const response = await fetch('http://localhost:60801/api/Todos');
        const todos = await response.json();
        console.log(todos);
        dispatch(loadTodosSuccess(todos));
    } catch (error) {
        dispatch(loadTodosFailure());
        console.log(error);
    }
}

export const addTodoRequest = text => async dispatch => {
    try {
        const response = await fetch('http://localhost:60801/api/Todos', {
            method: 'post', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(text) // body data type must match "Content-Type" header
        });
        const todo = await response.json();
        dispatch(createTodo(todo));
    } catch (err) {
        console.log(err)
    }
}

export const removeTodoRequest = id => async dispatch => {
    try {
        const response = await fetch(`http://localhost:60801/api/Todos/${id}`, {
            method: 'delete' // *GET, POST, PUT, DELETE, etc.
        });
        const todo = await response.json();
        dispatch(removeTodo(todo));
    } catch (err) {
        console.log(err)
    }
}

export const markTodoAsCompleted = (todo) => async dispatch => {
        const data = {
        text: todo.text,
        isCompleted: 1
    };
    console.log("this is from mark todo as completed");
    console.log(todo);
    try {
        const response = await fetch(`http://localhost:60801/api/Todos/${todo.id}`, {
            method: 'put', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-type': 'application/json; charset=UTF-8'           
             },
            body: JSON.stringify(data),
        });
        const updatedTodo = await response.json();
        console.info(response.json());
        dispatch(completedTodo(updatedTodo));
    } catch (err) {
        console.log(err)
    }
}