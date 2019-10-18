import React from 'react';
import {renderRoutes} from 'react-router-config';
import {AppBar, NavBar} from "../../components";

const mainStyles = {
    width: 'calc(100% - 277px)',
    margin: '80px 20px 0 253px',
};

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar routes={this.props.route.routes}/>
                <AppBar title={this.props.route.titles[this.props.location.pathname]}/>
                <main style={mainStyles}>
                    {renderRoutes(this.props.route.routes)}
                </main>
            </React.Fragment>
        );
    }
}

export default App;
