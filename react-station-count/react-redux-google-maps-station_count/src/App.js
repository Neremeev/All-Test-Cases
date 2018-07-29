import React from 'react';
import {Route, Switch} from 'react-router-dom';
import StationsContainer from './containers/mainContainer';
import Page_404 from './containers/Page_404';
import './App.css';


export default function App() {
    return (
        <div>
            <Switch>
                <Route exact path="/" component={StationsContainer}/>
                <Route exact path="/404" component={Page_404}/>
            </Switch>
        </div>
    );
}
