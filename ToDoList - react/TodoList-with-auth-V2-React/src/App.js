import React from 'react';
import { EventEmitter } from 'events';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

import TaskPage from './components/TaskPage';
import Login from './components/Login';
import App from './components/App';
import PrivateRoute from './components/PrivateRoute';
import './App.css';


window.mockyData = {};
window.authLogin = new EventEmitter();
window.nameFilter = new EventEmitter();
window.taskSort = new EventEmitter();
window.addTask = new EventEmitter();
window.returnButton = new EventEmitter();
window.taskPagePriority = new EventEmitter();
window.taskPageStatus = new EventEmitter();
window.returnButton = new EventEmitter();
window.setObj = new EventEmitter();
window.clsBTN = false;
window.allObj = '';
window.allObj2 = [];
window.oldFilterObj = [];
window.objectLink = '';
window.oldFilterObj = [];


const Menu = () => (
    <Router>
        <div>
            <Route path="/" component={Login} />
            <PrivateRoute path="/tasks" component={App} />
            <PrivateRoute path="/task/:id" component={TaskPage} />
        </div>
    </Router>
);


export default Menu;
