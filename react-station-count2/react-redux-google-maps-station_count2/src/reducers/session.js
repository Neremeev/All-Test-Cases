import {
    GET_PROPS,
    ADD_ACTIVE_OBJECT,
    SERVER_ERRORED
} from '../actions/sessionActions';

const initialState = {
    stations: null,
    check_ins: null,
    activeObject: null,
    errors: {
        errorServer: ''
    },
    random: 1,
};

export default function session(state = initialState, action) {
    switch (action.type) {

        case GET_PROPS:
            return {
                ...state,
                stations: action.payload.stations,
                check_ins: action.payload.check_ins,
            };

        case ADD_ACTIVE_OBJECT:
            return {
                ...state,
                activeObject: action.payload,
                random: Math.random()
            };


        case SERVER_ERRORED:
            return {
                ...state,
                errors: {
                    errorServer: action.payload.errorServer,
                }
            };

        default:
            return state;
    }
}
