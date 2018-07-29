export const SERVER_SUCCESS = 'SERVER_SUCCESS';
export const SERVER_ERRORED = 'SERVER_ERRORED';
export const ADD_NEW_ROUTE = 'ADD_NEW_ROUTE';
export const DELETE_ROUTE = 'DELETE_ROUTE';

export function serverSuccess(data) {
    return ({
        type: SERVER_SUCCESS,
        payload: {
            markers: data[0],
            routes: data[1]
        }
    });
}

export function serverHasErrored() {
    return ({
        type: SERVER_ERRORED,
        error: true,
    });
}

export function addNewRoute(newMarkers, newRoutes) {
    return ({
        type: ADD_NEW_ROUTE,
        payload: {
            routes: newRoutes,
            markers: newMarkers
        }
    });
}

export function deleteRoute(markers, routes) {
    return ({
        type: DELETE_ROUTE,
        payload: {
            routes: routes,
            markers: markers
        }
    });
}



export function getDefaultRoutes() {
    return (dispatch) => {
        fetch('http://www.mocky.io/v2/5b3b63cf3300001200599c37')
            .then(response => response.json())
            .then(data => {dispatch(serverSuccess(data))})
            .catch(() => dispatch(serverHasErrored()) )
    };
}