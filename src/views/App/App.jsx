import React from 'react';
import { renderRoutes } from 'react-router-config';
import NavBar from "../../components/NavBar/NavBar";
import AppBar from "../../components/AppBar/AppBar";

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div id="layout" className="content pure-g">
                    <NavBar/>
                    <AppBar/>
                </div>
            </React.Fragment>
        );
    }
}

export default App;
