import React from 'react';
import {Route, Switch} from 'react-router-dom';
import StationsContainer from './containers/StationsContainer';
import './App.css';


export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={StationsContainer}/>
            </Switch>
        </div>
    );
}