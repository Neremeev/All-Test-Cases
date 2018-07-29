export const GET_PROPS = 'GET_PROPS';
export const ADD_ACTIVE_OBJECT = 'ADD_ACTIVE_OBJECT';
export const SERVER_ERRORED = 'SERVER_ERRORED';


export function addActiveObject(object) {
    return ({
        type: ADD_ACTIVE_OBJECT,
        payload: object
    });
}