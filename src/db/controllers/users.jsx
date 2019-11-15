import {
    listUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    saveUser,
    updateUserPassword,
    deleteUser
} from '../services/users';
import {encryptPassword} from "../../helpers/Extras/passwordExtras";

const getUsers = async (req, res) => {
    try {
        let {rows} = await listUsers();
        res.status(200).json(rows);
    } catch (e) {
        console.log(e);
        res.status(500).json({error: true, description: e.message});
    }
};
const fetchUserById = async (req, res) => {
    try {
        let {id} = req.params;
        let {rows} = await getUserById(id);
        if (rows.length === 0) return res.status(404);
        res.json(rows[0]);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({error: true, description: e.message});
    }
};

const fetchForLogin = async (req, res) => {
    try {

        let {idIntent, password} = req.body;
        let result = await getUserByUsername(idIntent);

        // console.log('RESULT: ', result.rows.length);
        if (result.rowCount === 0) result = await getUserByEmail(idIntent);
        if (result.rowCount === 0) return res.status(404).json({error: 'Usuario no encontrado'});
        let user = result.rows[0];
        let enc = encryptPassword(password, user['salt']);
        if (user['password'] === enc.pass) {
            req.session.userId = user["id"];
            req.session.code = user["role"];
            res.status(200).json({code: user['role'], userId: req.session.userId});
        } else {
            res.status(401).json({error: 'Contraseña incorrecta'});
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({error: true, description: e.message});
    }
};

const trySaveUser = async (req, res) => {
    try {
        let result = await saveUser(req.body);
        if (result.rowCount)
            res.status(201).json({created: true, id: result.id});
        else
            res.json({created: false})
    } catch (e) {
        console.error('Error on save user:', e.message);
        res.status(500).json({error: true, description: e.message});
    }
};

const tryUpdatePassword = async (req, res) => {
    try {
        let {id, password} = req.body;
        let {rowCount} = await updateUserPassword(id, password);
        if (rowCount)
            res.status(204).json({updated: true});
        else
            res.json({updated: false})
    } catch (e) {
        console.log(e);
        res.status(500).json({error: true, description: e.message});
    }
};

export {
    getUsers,
    fetchUserById,
    fetchForLogin,
    trySaveUser,
    tryUpdatePassword,
};