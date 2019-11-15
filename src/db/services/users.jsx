import {encryptPassword} from '../../helpers/Extras/passwordExtras'
import uuid from 'uuid/v1';
import {query} from "../connection";

const listUsers = async () => await query("select * from users");

const getUserById = async (id) => await query("select * from users where id = $1", [id]);

const getUserByUsername = async (username) => await query("select * from users where username = $1", [username]);

const getUserByEmail = async (email) => await query("select * from users where email = $1", [email]);

const saveUser = async (data) => {
    const {password, username, email, role} = data;
    let encryptedPassword = password === '' ? {pass: '', salt: ''} : encryptPassword(password);
    let id = uuid();
    let result = await query("insert into users(id, username, email, password, salt, role) values ($1, $2, $3, $4, $5, $6)",
        [id, username, email, encryptedPassword.pass, encryptedPassword.salt, role]);
    // console.log('RESULT: ', result);
    return {
        ...result,
        id
    }
};
const updateUserPassword = async (id, password) => {
    let enc = encryptPassword(password);
    return await query("update users set password = $1, salt = $2 where id= $3", [enc.pass, enc.salt, id]);
};

const deleteUser = async id => await query("delete from users where id = $1", [id]);

export {
    listUsers,
    getUserById, getUserByUsername, getUserByEmail,
    saveUser, updateUserPassword, deleteUser
}