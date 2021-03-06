import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

function PrivateRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                if (rest.session.user) {
                    return (
                        <Component {...props} />
                    );
                }

                return (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: props.location},
                        }}
                    />
                );
            }}
        />
    );
}

export default connect(
    state => ({
        session: state.session,
    }),
    null,
)(PrivateRoute);
