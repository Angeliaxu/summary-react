import { combineReducers } from 'redux';
import * as reducers from './reducer';

export const rootReducers = combineReducers({
    ...reducers
})