import React from 'react';
import { hot } from 'react-hot-loader';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TodoList from './todos/TodoList';

const App = () => (
   <>
   <div className="container-fluid">
       <h1 className="jumbotron bg-dark text-white">Todo App</h1>
   </div>
     <div className="container App">
        <TodoList />
    </div>
   </>
)

export default hot(module)(App);