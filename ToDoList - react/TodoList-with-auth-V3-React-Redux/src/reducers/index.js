import {combineReducers} from 'redux';
import session from './session';
import data from './tasks';

export default combineReducers({
    session,
    data
});
