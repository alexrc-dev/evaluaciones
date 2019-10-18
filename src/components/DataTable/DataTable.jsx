import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './css/styles.css';

class DataTable extends Component {
    render() {
        const {columns, data} = this.props;
        return (
            <table style={{width: '100%'}} className="pure-table pure-table-horizontal">
                <thead>
                <tr>
                    {columns.map((col, i) => (
                        <th key={i}>{col}</th>
                    ))}
                    <th style={{display: 'flex'}}>
                        <div style={{flexGrow: 1}}/>
                        <button title={"Agregar"} className="pure-button mi-action-button"
                                style={{backgroundColor: 'var(--primary-color)'}}><i style={{color: '#fff'}}
                                                                                     className="material-icons">add</i>
                        </button>

                    </th>
                </tr>
                </thead>
                <tbody>
                {data.map((d, i) => (
                    <tr key={i}>
                        {Object.keys(d).map((k, j) => (
                            <td key={j}>{d[k]}</td>
                        ))}
                        <td style={{display: 'flex'}}>
                            <div style={{flexGrow: 1}}/>
                            <button title={"Editar"} className="pure-button mi-action-button"
                                    style={{backgroundColor: '#ffc107'}}><i className="material-icons">edit</i>
                            </button>
                            <button title={"Eliminar"} className="pure-button mi-action-button"
                                    style={{backgroundColor: '#f44336'}}><i style={{color: '#fff'}}
                                                                            className="material-icons">delete</i>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }
}

DataTable.propTypes = {
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    action1Callback: PropTypes.func,
    action2Callback: PropTypes.func,
    action3Callback: PropTypes.func,
};

export default DataTable;