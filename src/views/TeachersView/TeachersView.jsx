import React from 'react';
import {Helmet} from "react-helmet";
import {DataTable} from "../../components";

const fake_columns = [
    "Name", "Last Name", "ID"
];

class TeachersView extends React.Component {
    state = {
        adding: false,
        editing: false,
        action: 'Agregar Profesor Dragon',
        gender: 'Indefinido',
        username: '',
        email: '',
        password: '',
        name: '', last_names: '',
        age: '', phone: '', phone2: '',
        address: '',
    };
    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    tryToSave = () => {

    };

    render() {
        const {adding, editing, action, address, age, email, last_names, name, password, phone, phone2, username, gender} = this.state;
        return (
            <React.Fragment>
                <Helmet title={"Profesores Dragon"}/>
                <div className="pure-g">
                    {(adding || editing) && (
                        <div className="pure-u-1">
                            <form className="pure-form">
                                <fieldset>
                                    <legend>{action}</legend>
                                    <label>
                                        Matricula:
                                        <input required value={username} onChange={this.handleChange('username')}
                                               type="number" placeholder={"Matricula"}/>
                                    </label>
                                    <label>
                                        Email:
                                        <input required value={email} onChange={this.handleChange('email')} type="email"
                                               placeholder={"Email"}/>
                                    </label>
                                    <label>
                                        Password:
                                        <input required value={password} onChange={this.handleChange('password')}
                                               type="password" placeholder={"Password"}/>
                                    </label>
                                    <label>
                                        Nombre (s):
                                        <input required value={name} onChange={this.handleChange('name')} type="text"
                                               placeholder={"Nombre (s)"}/>
                                    </label>
                                    <label>
                                        Apellidos:
                                        <input required value={last_names} onChange={this.handleChange('last_names')}
                                               type="text" placeholder={"Apellidos"}/>
                                    </label>
                                    <label>
                                        Edad:
                                        <input required value={age} onChange={this.handleChange('age')} type="number"
                                               placeholder={"Edad"}/>
                                    </label>
                                    <label>
                                        Sexo:
                                        <select required onChange={this.handleChange('gender')} value={gender}>
                                            <option value={'Femenino'}>
                                                Femenino
                                            </option>
                                            <option value={'Masculino'}>
                                                Masculino
                                            </option>
                                            <option value={'Indefinido'}>
                                                Indefinido
                                            </option>
                                        </select>
                                    </label>
                                    <label>
                                        Telefono:
                                        <input required value={phone} onChange={this.handleChange('phone')} type="phone"
                                               placeholder={"Telefono"}/>
                                    </label>
                                    <label>
                                        Telefono 2:
                                        <input value={phone2} onChange={this.handleChange('phone2')} type="phone"
                                               placeholder={"Telefono 2"}/>
                                    </label>
                                    <label>
                                        Direccion
                                        <textarea onChange={this.handleChange("address")}>{address}</textarea>
                                    </label>
                                    <input type="button" value={"Guardar"}/>
                                </fieldset>
                            </form>
                        </div>
                    )}
                    <div className="pure-u-1">
                        <DataTable columns={fake_columns} data={fakeData}/>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default TeachersView;
