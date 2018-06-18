import { createStore, combineReducers } from 'redux';
import { system } from './reducers/system';
import { tracker } from './reducers/tracker';

export const ActionCreator = (type: string, payload: any) => ({
    type,
    payload
})

export const store = createStore(combineReducers({
    system,
    tracker
}));