import React from 'react';
import {Helmet} from "react-helmet";
import {DataTable} from "../../components";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {getTeachers, getUser, getTeacher, saveTeacher, saveUser} from "../../actions";
import {
    Grid,
    TextField,
    Button,
    Snackbar,
    SnackbarContent,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@material-ui/core";
import {SAVE_TEACHERS, SAVE_USER} from "../../constants/ActionTypes";
import {Redirect} from "react-router";


const headCells = [
    {id: 'username', primary: true, numeric: false, disablePadding: false, label: 'Matricula'},
    {id: 'name', numeric: false, disablePadding: false, label: 'Nombre'},
    {id: 'last_names', numeric: false, disablePadding: false, label: 'Apellidos'},
    {id: 'email', numeric: false, disablePadding: false, label: 'Email'},
    {id: 'phone', numeric: true, disablePadding: false, label: 'Telefono'},
]

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
        redirect: false,
        to: '',
        saving: false,
    };
    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };
    validateFields = () => {
        const {email, username, phone, last_names, age, name} = this.state;
        let correctUsername = username !== name;
        return email !== '' && correctUsername && phone !== '' && last_names !== '' && age !== '';
    };

    tryToSave = () => {
        if (!this.validateFields()) return;
        let userData = {
            password: '',
            role: 1,
            username: this.state.username,
            email: this.state.email,
        };
        // this.setState({saving: true})
        this.props.saveUser(userData);
    };
    openEditTools = id => () => {
        if (id !== -1) {
            this.setState({editing: true, adding: false});
        } else this.setState({editing: false, adding: true});
    };

    componentDidMount() {
        let session = this.props.userSession;
        if (session.code !== 0)
            return this.setState({redirect: true, to: '/'});
        this.props.getTeachers();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('NEXT PROPS TEACHERS', nextProps);
        if (!this.state.saving && nextProps.users.save.loaded && nextProps.users.action.type === `${SAVE_USER}_SUCCESS`) {
            let userId = nextProps.users.action.response.data['id'];
            let {name, last_names, age, gender, phone, phone2, address} = this.state;
            let teacherData = {
                id: userId,
                name, last_names, age, gender, phone, phone2, address,
            };
            this.props.saveTeacher(teacherData);
            this.setState({saving: true});
        } else if (nextProps.users.save.loaded && nextProps.users.action.type === `${SAVE_USER}_FAIL`) {
            let error = nextProps.users.action.error;
            let status = error.response.status;
            /*if (status === 401) {
                this.setState({redirect: true, to: '/'});
            }*/
        }
        if (nextProps.teachers.save.loaded && nextProps.teachers.action.type === `${SAVE_TEACHERS}_SUCCESS`) {
            this.closeEditingTools();
            this.props.getTeachers();
        }
    }

    closeEditingTools = () => {
        this.setState({editing: false, adding: false});
    };

    render() {
        const {redirect, to, adding, editing, action, address, age, email, last_names, name, password, phone, phone2, username, gender} = this.state;
        if (redirect) return <Redirect to={to}/>
        return (
            <React.Fragment>
                <Helmet title={"Profesores Dragon"}/>

                {(adding || editing) && (
                    <form className="pure-form">
                        <Grid container spacing={2}>
                            <Grid item md={12}>
                                <Typography variant={"subtitle1"}>{action}</Typography>
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    type={"number"}
                                    autoFocus
                                    error={username === name}
                                    helperText={username === name ? 'La matricula no debe ser igual al nombre' : ''}
                                    value={username}
                                    onChange={this.handleChange('username')}
                                    label={"Matricula"}
                                    disabled={editing}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    type={"email"}
                                    value={email}
                                    error={email === ''}
                                    helperText={email === '' ? 'El email no debe ir vacio.' : ''}
                                    onChange={this.handleChange('email')}
                                    label={"Email"}
                                    disabled={editing}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            {/*<Grid item md={4}>
                                <TextField
                                    type={"password"}
                                    value={editing ? '********' : password}
                                    onChange={this.handleChange('password')}
                                    label={"Contraseña"}
                                    disabled={editing}
                                    required
                                    fullWidth
                                />
                            </Grid>*/}
                            <Grid item md={4}>
                                <TextField
                                    type={"text"}
                                    error={name === ''}
                                    helperText={name === '' ? 'El nombre no debe ir vacio.' : ''}
                                    value={name}
                                    onChange={this.handleChange('name')}
                                    label={"Nombre"}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    type={"text"}
                                    value={last_names}
                                    error={last_names === ''}
                                    helperText={last_names === '' ? 'Los apellidos no deben ir vacios.' : ''}
                                    onChange={this.handleChange('last_names')}
                                    label={"Apellidos"}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    type={"number"}
                                    value={age}
                                    error={age === ''}
                                    helperText={age === '' ? 'Debes incluir una edad.' : ''}
                                    onChange={this.handleChange('age')}
                                    label={"Edad"}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={4}>
                                <FormControl fullWidth>
                                    <InputLabel>
                                        Sexo:
                                    </InputLabel>
                                    <Select onChange={this.handleChange('gender')} value={gender}>
                                        <MenuItem value={'Femenino'}>
                                            Femenino
                                        </MenuItem>
                                        <MenuItem value={'Masculino'}>
                                            Masculino
                                        </MenuItem>
                                        <MenuItem value={'Indefinido'}>
                                            Indefinido
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    type={"phone"}
                                    value={phone}
                                    error={phone === ''}
                                    helperText={phone === '' ? 'Debes de incluir por lo menos un telefono' : ''}
                                    onChange={this.handleChange('phone')}
                                    label={"Telefono"}
                                    required
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={4}>
                                <TextField
                                    type={"phone"}
                                    value={phone2}
                                    onChange={this.handleChange('phone2')}
                                    label={"Telefono 2"}
                                    fullWidth
                                />
                            </Grid>
                            <Grid item md={12}>
                                <TextField
                                    type={"text"}
                                    value={address}
                                    onChange={this.handleChange('address')}
                                    label={"Direccion"}
                                    fullWidth
                                    multiline
                                    rowsMax={4}
                                    rows={2}
                                />
                            </Grid>
                            <Grid item md={6}>
                                <div style={{display: 'flex'}}>
                                    <Button onClick={this.tryToSave} variant={"contained"}
                                            color={"secondary"}>Guardar</Button>
                                    <Button onClick={this.closeEditingTools}>Cancelar</Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                )}
                <div className="pure-u-1">
                    <DataTable addCallback={this.openEditTools(-1)} rows={this.props.teachers.teachers}
                               headCells={headCells}/>
                </div>

            </React.Fragment>
        );
    }
}


export default connect(
    state => ({
        teachers: {...state.teachers},
        users: {...state.users},
        userSession: {...state.userSession},
    }),
    dispatch => bindActionCreators({getTeachers, getTeacher, getUser, saveUser, saveTeacher}, dispatch),
)(TeachersView);
