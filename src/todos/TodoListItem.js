import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoListItem = ({ todo, onRemovePressed, onCompletePressed }) => (
    <div className="list-item">
        <h3>{todo.text} {(todo.isCompleted && <span className="badge badge-dark" style={{fontSize: '0.8rem'}}>Task completed</span>)}</h3> 
        <div className="button-container">
            {(!todo.isCompleted) &&
            <button className="btn btn-dark" onClick={(e) => 
            {onCompletePressed(todo)}}>Completed</button>}
            <button className="btn btn-danger" onClick={(e) => {
                onRemovePressed(todo.id)} }>Remove</button>
        </div>
        <hr/>
    </div>
)

export default TodoListItem;