import React from 'react';
import { renderRoutes } from 'react-router-config';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <h1>App View</h1>

                {renderRoutes(this.props.route.routes)}
            </React.Fragment>
        );
    }
}

export default App;
