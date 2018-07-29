export const GET_PROPS = 'GET_PROPS';
export const ADD_ACTIVE_OBJECT = 'ADD_ACTIVE_OBJECT';
export const SERVER_ERRORED = 'SERVER_ERRORED';


export function addActiveObject(object) {
    return ({
        type: ADD_ACTIVE_OBJECT,
        payload: object
    });
}


export function getSuccess(checkins, stations) {
    return ({
        type: GET_PROPS,
        payload: {
            stations: stations,
            check_ins: checkins,
        }
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

export function getProps() {
    return (dispatch) => {

        fetch('http://server-heroku-test.herokuapp.com/data')
            .then(response => response.json())
            .then(data => {
                return dispatch(getSuccess(data.checkins_timestamps, data.stations))
            }, () => dispatch(serverHasErrored(true)))
    };
}
