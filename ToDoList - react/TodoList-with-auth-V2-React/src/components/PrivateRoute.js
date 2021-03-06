import React from 'react';
import fakeAuth from "./fakeAuth";
import {
    Route,
    Redirect
} from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}

        render={props =>
            fakeAuth.isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: props.location }
                    }}
                />


            )
        }
    />
);


export default PrivateRoute;