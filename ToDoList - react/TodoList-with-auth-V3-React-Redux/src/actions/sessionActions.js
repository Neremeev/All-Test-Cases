export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_ERRORED = 'AUTH_ERRORED';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const SERVER_ERRORED = 'SERVER_ERRORED';


export function authSuccess(data) {
    return ({
        type: AUTH_SUCCESS,
        payload: {
            id: data.id,
            data: data
        }
    });
}

export function authHasErrored(message) {
    return ({
        type: AUTH_ERRORED,
        payload: {
            errorMsg: message,
        },
        error: true,
    });
}

export function serverHasErrored(message) {
    return ({
        type: SERVER_ERRORED,
        payload: {
            errorServer: message,
        },
        error: true,
    });
}

export function login(body) {
    return (dispatch) => {

        fetch('http://www.mocky.io/v2/5b2ca30c2f00004f00ebd2f1')
            .then(response => response.json())
            .then(data => {

                const {login, password} = body;

                for (let i = 0; i < data.length; i++) {

                    if (data[i].name === login) {

                        if (data[i].pass === password) {
                            return dispatch(authSuccess(data[i]))
                        } else {
                            return dispatch(authHasErrored(true))
                        }

                    }
                }
                return dispatch(authHasErrored(true))
            }, () => dispatch(serverHasErrored(true)))
    };
}

export function logout() {

    return ({
        type: AUTH_LOGOUT,
    });
}
