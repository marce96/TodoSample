import React, { useEffect } from 'react';
import TodoListItem from './TodoListItem';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoForm from './TodoForm';
import { connect } from 'react-redux';
import { loadTodos, removeTodoRequest, markTodoAsCompleted } from './thunks';
import { getTodos, getTodosLoading, getCompletedTodos, getIncompleteTodos } from './selectors';

const TodoList = ({ completedTodos, incompleteTodos, onRemovePressed, onCompletePressed, isLoading, startLoadingTodos }) => {

    useEffect(() => {
        startLoadingTodos();
    }, []);

    const loadingMessage = <div>Loading Todos...</div>
    const content = (
        <>
            <TodoForm />
            <hr />
            <div className="list-wrapper">
                <p className="bg-dark text-white" style={{ padding: '15px' }}>IMCOMPLETE</p>

                {incompleteTodos.map((todo, key) =>
                    <TodoListItem
                        key={key}
                        todo={todo}
                        onRemovePressed={onRemovePressed}
                        onCompletePressed={onCompletePressed}
                    />
                )}

                <p className="bg-info text-white" style={{ padding: '15px' }}>COMPLETED</p>
                <hr />
                {completedTodos.map((todo, key) =>
                    <TodoListItem
                        key={key}
                        todo={todo}
                        onRemovePressed={onRemovePressed}
                        onCompletePressed={onCompletePressed}
                    />
                )}
            </div>
        </>
    );
    return isLoading ? loadingMessage : content
}
const mapStateToProps = state => ({
    isLoading: getTodosLoading(state),
    completedTodos: getCompletedTodos(state),
    incompleteTodos: getIncompleteTodos(state),
});

const mapDispatchToProps = dispatch => ({
    startLoadingTodos: () => dispatch(loadTodos()),
    onRemovePressed: id => dispatch(removeTodoRequest(id)),
    onCompletePressed: (todo) => dispatch(markTodoAsCompleted(todo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);