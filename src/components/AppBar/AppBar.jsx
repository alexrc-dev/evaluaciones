import React from 'react';
import './css/styles.css'
import PropTypes from 'prop-types';
class AppBar extends React.Component {

    render() {
        return (
            <header>
                <div className="toolbar">
                    <h5 className="head-title">{this.props.title}</h5>
                    <div style={{flexGrow: 1}}/>
                    <button id="logout-btn">Cerrar Sesion</button>
                </div>
            </header>
        );
    }
}

AppBar.propTypes = {
    title: PropTypes.string.isRequired,
};
export default AppBar;
