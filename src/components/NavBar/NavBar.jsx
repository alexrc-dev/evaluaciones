import React from 'react';
import './css/styles.css';
import {Link} from "react-router-dom";

class NavBar extends React.Component {
    render() {
        return (
            <nav>
                <div id={"nav-inner"}>
                    <div id={"nav-header"}>
                        <img src="/img/logo.jpg" alt="logo"/>
                    </div>
                    <div id={"nav-body"}>
                        <Link to={"/"} className="pure-button pure-button-primary-cs pure-u-1">Home</Link>
                    </div>
                </div>
            </nav>
        );
    }
}

export default NavBar;
