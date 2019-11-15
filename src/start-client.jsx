import {BrowserRouter} from "react-router-dom";
import React from 'react';
import {hydrate} from 'react-dom';
import {Provider} from "react-redux";
import{ ConnectedRouter} from "connected-react-router";
import {createBrowserHistory} from "history";
import {ReduxAsyncConnect} from "redux-connect";
import routes from './routes';
import configureStore from './store';
// import './assets/css/pure-min.css';
// import './assets/css/global.css';

import {Api} from "./helpers";

export default () => {
    const history = createBrowserHistory();
    const api = new Api();
    const store = configureStore(window.__data, history, api);

    hydrate(
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <BrowserRouter>
                    <ReduxAsyncConnect routes={routes} helpers={api}/>
                </BrowserRouter>
            </ConnectedRouter>
        </Provider>,
        document.getElementById('main')
    );
};
