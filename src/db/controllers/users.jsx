import {
    listUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    saveUser,
    updateUserPassword,
    deleteUser
} from '../services/users';

const getUsers = async (req, res) => {
    try {
        let {rows} = await listUsers();
        res.status(200).json(rows);
    } catch (e) {
        console.log(e);
        res.status(500);
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
        res.status(500);
    }
};

const fetchForLogin = async (req, res) => {
    let {idIntent} = req.body;
    let user = await getUserByUsername(idIntent).rows[0];
    if (!user) user = await getUserByEmail(idIntent).rows[0];
    if (!user) return res.status(404).json({correct: false});
    req.session.userId = user["id"];
    res.status(200).json({correct: true});
};

const trySaveUser = async (req, res) => {
    try {
        let result = await saveUser(req.body);
        if (result.result.rowCount)
            res.status(201).json({created: true, id: result.id});
        else
            res.json({created: false})
    } catch (e) {
        console.error(e.message);
        res.status(500);
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
        res.status(500);
    }
};

export {
    getUsers,
    fetchUserById,
    fetchForLogin,
    trySaveUser,
    tryUpdatePassword,
};