import {
    AUTH_SUCCESS,
    AUTH_ERRORED,
    AUTH_LOGOUT,
    SERVER_ERRORED,
} from '../actions/sessionActions';

const initialState = {
    user: null,
    data: null,
    errors: {
        errorMsg: '',
        errorServer: ''
    }
};

export default function session(state = initialState, action) {
    switch (action.type) {

        case AUTH_SUCCESS:
            return {
                ...state,
                user: {
                    id: action.payload.id,
                },
                data: action.payload.data,
                errors: {
                    errorMsg: '',
                    errorServer: ''
                }
            };

        case AUTH_LOGOUT:
            return {
                ...state,
                user: null,
            };

        case AUTH_ERRORED:
            return {
                ...state,
                errors: {
                    errorMsg: action.payload.errorMsg,
                    errorServer: ''
                }
            };

        case SERVER_ERRORED:
            return {
                ...state,
                errors: {
                    errorMsg: '',
                    errorServer: action.payload.errorServer,
                }
            };

        default:
            return state;
    }
}
