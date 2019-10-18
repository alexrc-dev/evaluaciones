import React from 'react';
import {StaticRouter} from 'react-router-dom';
import express from 'express';
import {Provider} from "react-redux";
import {renderToString} from 'react-dom/server';
import {createMemoryHistory} from "history";
import {ReduxAsyncConnect, loadOnServer} from "redux-connect";
import {parse as parseUrl} from 'url';
import cookie, {plugToRequest} from 'react-cookie';
import routes from './routes';
import session from 'express-session';
import {
    Html, Api
} from "./helpers";
import ErrorPage from './error';
import configureStore from './store';

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST);

const server = express();
server.use(session(
    {
        secret: '53cr37',
    }
));
server
    .disable('x-powered-by')
    .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
    .get('/*', (req, res) => {
        plugToRequest(req, res);
        const api = new Api(req);
        const url = req.originalUrl || req.url;
        const location = parseUrl(url);
        const initialState = {};
        const history = createMemoryHistory({initialEntries: [req.url],});
        const store = configureStore(initialState, history, api);

        loadOnServer({store, location, routes, api})
            .then(() => {
                const context = {};
                const markup = renderToString(
                    <Provider store={store}>
                        <StaticRouter context={context} location={req.url}>
                            <ReduxAsyncConnect routes={routes} helpers={api}/>
                        </StaticRouter>
                    </Provider>
                );
                if (context.url) {
                    res.redirect(context.url);
                } else {
                    res.status(200).send(
                        `<!doctype html>
                         ${renderToString(<Html assets={assets} store={store} markup={markup} />)}`,
                    );
                }
            }).catch(error => {
                const errorPage = <ErrorPage message={error.message}/>;
                res.set({
                    'Cache-Control': 'public, max-age=60, no-transform',
                });
                console.error(error);
                res.status(500).send(`<!doctype html> ${renderToString(errorPage)}`);
        })
    });


export default server;
