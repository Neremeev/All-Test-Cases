import React from 'react';
import {Route, Switch} from 'react-router-dom';
import Main from './containers/main';
import './App.css';


export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={Main}/>
            </Switch>
        </div>
    );
}
