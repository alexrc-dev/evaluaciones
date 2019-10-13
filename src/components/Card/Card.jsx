import React from 'react';
import PropTypes from 'prop-types';
import './css/styles.css'

class Card extends React.Component {

    render() {
        return (
            <div {...this.props} className="mi-card">
                <div className="mi-card-header">
                    <h5 style={{margin: 10}}>{this.props.title}</h5>
                </div>
                <div className="mi-card-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

Card.propTypes = {
    title: PropTypes.string,
    children: PropTypes.any
}

export default Card;
