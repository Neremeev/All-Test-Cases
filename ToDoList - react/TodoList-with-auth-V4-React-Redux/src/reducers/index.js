import {combineReducers} from 'redux';
import session from './session';
import data from './tasks';
import view from './view';

export default combineReducers({
    session,
    data,
    view
});
