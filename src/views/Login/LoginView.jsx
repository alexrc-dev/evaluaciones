import React from 'react';
import './css/styles.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {tryLogin} from "../../actions";
import {Redirect} from "react-router";

let anime = null;
if (__CLIENT__) {
    anime = require('animejs').default;
}

class LoginView extends React.Component {
    state = {
        idIntent: '',
        password: '', correct: false, pending: false
    };

    componentDidMount() {
        if (anime && __CLIENT__) {
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

    bindChange = (prop) => evt => {
        this.setState({[prop]: evt.target.value});
    };

    tryToLogin = () => {
        let {idIntent, password} = this.state;
        this.props.tryLogin(idIntent, password);
    };

    render() {
        const {idIntent, password} = this.state;
        const {loaded, loading, code, error, userId} = this.props;
        const statusCode = error ? error.response.status : 0;
        console.log(this.props);
        if (!loading && !error && code === 0 && userId) return <Redirect to={'/admin'}/>;
        return (
            <React.Fragment>
                <div className="heading-bg heading-img"/>
                <div className="heading-bg heading-fade"/>

                <div className="middle-panel">
                    <h4 style={{textAlign: 'center'}}>Iniciar Sesión</h4>
                    <form className="pure-form pure-form-stacked">
                        <label>
                            Matricula o correo electrónico
                            <input value={idIntent} onChange={this.bindChange('idIntent')}
                                   className={code === 100 ? 'pure-input-1 mi-input-error' : "pure-input-1"}
                                   type="text" name="username" required/>
                            {statusCode === 404 && (
                                <p style={{color: 'red'}}>Usuario incorrecto</p>
                            )}
                        </label>
                        <br/>
                        <label>
                            Contraseña
                            <input value={password} onChange={this.bindChange('password')}
                                   className={code === 101 ? 'pure-input-1 mi-input-error' : "pure-input-1"}
                                   type="password" name="password" required/>
                            {statusCode === 401 && (
                                <p style={{color: 'red'}}>Contraseña incorrecta</p>
                            )}
                        </label>
                        <p style={{fontSize: 13}}>Si no tienes contraseña deja el campo en blanco.</p>
                        <br/>
                        {!loading && (<button onClick={this.tryToLogin} className="btn-primary pure-button pure-input-1"
                                              type="button">Entrar</button>)}
                        {loading && (
                            <p>Espere por favor. Correct: {loaded}</p>
                        )}
                    </form>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    userId: state.userSession.userId,
    loading: state.userSession.login.loading,
    loaded: state.userSession.login.loaded,
    error: state.userSession.login.error,
    code: state.userSession.code,
});
const mapDispatchToProps = dispatch => bindActionCreators({tryLogin}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LoginView);
