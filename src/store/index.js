import { combineReducers, createStore, applyMiddleware } from 'redux';
import rootReducer from "./reducers/main";

const reducers = combineReducers({
    root: rootReducer,
});

const store = createStore(
    reducers,
)

export default store;
