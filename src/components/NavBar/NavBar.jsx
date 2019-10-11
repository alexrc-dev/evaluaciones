import React from 'react';
import './css/styles.css';
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
class NavBar extends React.Component {
    render() {
        return (
            <nav>
                <div id={"nav-inner"}>
                    <div id={"nav-header"}>
                        <img src="/img/logo.jpg" alt="logo"/>
                    </div>
                    <div id={"nav-body"}>
                        <ul style={{listStyle: 'none', padding: 0}}>
                            {this.props.routes.map((route, key) => (
                                <li key={key}>
                                    <Link className="pure-button pure-u-1" to={route.path}>{route.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

NavBar.propTypes = {
    routes: PropTypes.array.isRequired,
};
export default NavBar;
