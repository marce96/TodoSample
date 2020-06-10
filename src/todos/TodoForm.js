import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addTodoRequest } from './thunks';
import { getTodos } from './selectors';
import 'bootstrap/dist/css/bootstrap.min.css';

//connect()(Component to connect)
//it returns a connected version of the component
//higher order function

const AddTodo = (e, todos, inputValue, setInputValue, onCreatePressed) => {
    e.preventDefault();
    const isDuplicatedText = todos.some(todo => todo.text.toLowerCase() === inputValue.toLowerCase());

    if(inputValue.length > 1){
        if (!isDuplicatedText) {
            let data={
                text: inputValue,
                isCompleted: 0,
            }
            onCreatePressed(data);
            setInputValue("")
        } else {
            alert(`Item: ${inputValue} |  Has already been created`);
            setInputValue("");
        }
    }else{
        alert("type some todo")
    }
}

const TodoForm = ({ todos, onCreatePressed }) => {
    const [inputValue, setInputValue] = useState("");
    return (
        <div className="todo-form">
            <form>
                <div className="form-group">
                    <input
                        placeholder="Type your new todo here"
                        type="text"
                        className="form-control"
                        id="todo"
                        aria-describedby="todoHelp"
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                    />
                    <small id="todoHelp" className="form-text text-muted">Let's start working!</small>
                </div>
                <button className="btn btn-dark"
                    onClick={e => AddTodo(e, todos, inputValue, setInputValue, onCreatePressed)}>Create Todo</button>
            </form>
        </div>
    )
}

// state argument represents the entire Redux state
//it takes the state object and return other object containing the pieces of the state the component 
//needs access to
//the properties of the object that is returned will be passed as props on the component
const mapStateToProps = state => ({
    todos: getTodos(state),
});

//dispatch trigger actions that the redux store will respond to
const mapDispatchToProps = dispatch => ({
    onCreatePressed: text => dispatch(addTodoRequest(text))
});

//export connected component
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm);