import React from 'react';
import './css/styles.css';
let anime = null;
if(__CLIENT__){
    anime = require('animejs').default;
}
class LoginView extends React.Component {
    componentDidMount() {
        if(anime && __CLIENT__) {
            anime({
                targets: '.middle-panel',
                top: '50%',
                opacity: 1,
                easing: 'easeInOutQuad',
                duration: 800
            });
            anime({
                targets: '.heading-bg',
                backgroundColor: 'rgba(9, 25, 10, 0.6)',
                easing: 'easeInOutQuad',
                duration: 2000
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                <div className="heading-bg heading-img"/>
                <div className="heading-bg heading-fade"/>

                <div className="middle-panel">
                    <h4 style={{textAlign: 'center'}}>Iniciar Sesión</h4>

                    <form className="pure-form pure-form-stacked">
                        <label>
                            Matricula
                            <input className="pure-input-1" type="text" name="username" required/>
                        </label>
                        <br/>
                        <label>
                            Contraseña
                            <input className="pure-input-1" type="password" name="password" required/>
                        </label>
                        <br/>
                        <button className="btn-primary pure-button pure-input-1" type="button">Siguiente</button>
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

export default LoginView;
