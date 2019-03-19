import { loadState, saveState } from "../util/localStorage";
import { createStore } from "redux";
import { throttle } from 'lodash';
import { rootReducers } from '../reducer/rootReducer';

export const configureStore = () => {
    const persistedState = loadState();
    const store = createStore(
        rootReducers,
        persistedState
    );
    store.subscribe(throttle(() => {
        saveState({
            todoReducer: store.getState().todoReducer
        })
    }, 1000))

    return store
}