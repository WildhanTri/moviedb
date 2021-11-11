import { combineReducers, createStore } from 'redux'
import AppReducer from './reducer';

const rootReducer = combineReducers({
    reducer: AppReducer
});

export const store = createStore(rootReducer);