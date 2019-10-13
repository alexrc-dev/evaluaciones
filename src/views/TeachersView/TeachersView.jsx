import React from 'react';
import {Helmet} from "react-helmet";

class TeachersView extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Helmet title={"Profesores Dragon"}/>
                <h1>TeachersView</h1>
            </React.Fragment>
        );
    }
}

export default TeachersView;
