import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

export const Html = ({assets, markup, store}) => {
    const head = Helmet.rewind();

    return (
        <html lang="es">
        <head>
            <meta charSet="utf-8"/>
            {head.base.toComponent()}
            {head.title.toComponent()}
            {head.meta.toComponent()}
            {head.link.toComponent()}
            {head.script.toComponent()}
            <link rel="shortcut icon" href={"/favicon.ico"}/>
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            {assets.client.css? (
                <link rel="stylesheet" href={assets.client.css}/>
            ) : null}
            {process.env.NODE_ENV === 'production' ? (
                <script src={assets.client.js} defer />
            ) : (
                <script src={assets.client.js} defer crossOrigin="true" />
            )}
        </head>
        <body>
        <div id="main" dangerouslySetInnerHTML={{ __html: markup }} />
        <script
            dangerouslySetInnerHTML={{
                __html: `window.__data=${serialize(store.getState())};`,
            }}
            charSet="UTF-8"
        />
        </body>
        </html>
    )
};
Html.propTypes = {
    assets: PropTypes.shape({
        styles: PropTypes.object,
        javascript: PropTypes.shape({
            main: PropTypes.string,
        }),
    }).isRequired,
    markup: PropTypes.string.isRequired,
    store: PropTypes.shape({
        getState: PropTypes.func,
    }).isRequired,
};

export default Html;