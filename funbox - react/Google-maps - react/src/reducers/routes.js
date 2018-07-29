import {
    SERVER_SUCCESS,
    ADD_NEW_ROUTE,
    DELETE_ROUTE
} from '../actions/routesActions';

const initialState = {
    markers: [],
    routes: [],
};

export default function route (state = initialState, action) {
    switch (action.type) {

        case SERVER_SUCCESS:
            return {
                ...state,
                markers: action.payload.markers,
                routes: action.payload.routes,
            };

        case ADD_NEW_ROUTE:
            return {
                ...state,
                markers: action.payload.markers,
                routes: action.payload.routes,
            };

        case DELETE_ROUTE:
            return {
                ...state,
                markers: action.payload.markers,
                routes: action.payload.routes,
            };


        default:
            return state;
    }
}
