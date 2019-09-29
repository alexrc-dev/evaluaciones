import React from 'react';
import PropTypes from 'prop-types';

const Error = ({ message, stackTrace }) => (
  <div
    style={{
      fontFamily: __SERVER__ ? 'Helvetica, sans-serif' : null,
      fontSize: __SERVER__ ? '20px' : '16px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: __SERVER__ ? '100vh' : null,
    }}
  >
    <h2>Lo Sentimos :(, Algo salio mal con lo que quieres ver.&nbsp;</h2>
    <strong style={{ color: 'red' }}>{message}</strong>
    <pre>{stackTrace}</pre>
    <span style={{ textAlign: 'center' }}>
      <p>
        <a href="javascript: history.back()">Regresar</a>
      </p>
      <p>
        <a href="/">Ir al Inicio</a>
      </p>
      <p>o intenta con una pagina diferente.</p>
    </span>
  </div>
);

Error.propTypes = {
  message: PropTypes.string.isRequired,
  stackTrace: PropTypes.string,
};

Error.defaultProps = {
  stackTrace: null,
};

export default Error;
