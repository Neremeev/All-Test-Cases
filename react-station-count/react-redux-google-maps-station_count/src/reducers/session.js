import {
    ADD_ACTIVE_OBJECT,
} from '../actions/sessionActions';

const initialState = {
    objects: [
        {
            address: {
                city: "Москва",
                number: "+7 (495) 269 84 10",
                street: "ул. Ленинская Слобода, 19",
                build: "Бизнес-центр «Омега плаза»"
            },
            lat: 55.7084315,
            lng: 37.652795200000014,
            icon: require('../styles/image/star.png')
    },
        {
            address: {
                city: "Санкт-Петербург",
                number: "+ 7 (812) 240-43-35",
                street: "196158, наб. Обводного канала 199,",
                build: "«Обводный двор», офис 3 «А»"
            },
            lat: 59.909697,
            lng: 30.285432000000014,
            icon: require('../styles/image/more.png')
        }],
    activeObject: { lat: 0 },
};

export default function session(state = initialState, action) {
    switch (action.type) {

        case ADD_ACTIVE_OBJECT:
            return {
                ...state,
                activeObject: action.payload,
            };

        default:
            return state;
    }
}