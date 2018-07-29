import React from 'react';
import {Route, Switch} from 'react-router-dom';
import ProfileContainer from './containers/AllTasksContainer';
import LoginContainer from './containers/LoginContainer';
import PrivateRoute from './containers/PrivateRoute';
import TaskPage from "./containers/PersTaskContainer";
import './App.css';


export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={LoginContainer}/>
                <PrivateRoute path="/tasks" component={ProfileContainer}/>
                <PrivateRoute path="/task/:id" component={TaskPage} />
            </Switch>
        </div>
    );
}
