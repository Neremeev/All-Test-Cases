import {
    CHOOSE_VIEW,
} from '../actions/listActions';

const initialState = {
    view: false,
};

export default function view(state = initialState, action) {
    switch (action.type) {

        case CHOOSE_VIEW:
            return {
                ...state,
                view: action.payload,
            };

        default:
            return state;
    }
}