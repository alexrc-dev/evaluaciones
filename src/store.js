import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import {connectRouter, routerMiddleware} from "connected-react-router";
import reducers from './reducers';
import api from './middleware/api';
const configureStore = (initialState, history, apiHelper) => {
    const middlewares = applyMiddleware(
        routerMiddleware(history),
        thunk,
        api(apiHelper)
    );

    const store = createStore(
        combineReducers({
            router: connectRouter(history),
            ...reducers
        }),
        initialState,
        middlewares,
    );
    return store;
};
export default configureStore;