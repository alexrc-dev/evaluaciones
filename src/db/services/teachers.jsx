import {query} from "../connection";
import uuid from 'uuid/v1';

const listTeachers = async () => await query("select teachers.*, u.* from teachers inner join users u on teachers.user_id = u.id");

const queryTeacherById = async id => await query("select teachers.* from teachers where user_id = $1", [id]);

const saveTeacher = async (data) => {
    let {id, name, last_names, age, gender, phone, phone2, address} = data;
    return await query("insert into teachers(user_id, name, last_names, age, gender, phone, phone2, address) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)",
        [id, name, last_names, age, gender, phone, phone2 ? phone2 : '', address ? address : ''])
};

const updateTeacher = async (id, data) => {
    let {name, last_names, age, gender, phone, phone2, address} = data;
    return await query(
        "update teachers set address = $1, age = $2, gender = $3, last_names = $4, name = $5, phone=$6,phone2=$7 where user_id = $8",
        [address, age, gender, last_names, name, phone, phone2, id]
    )
};
const deleteTeacher = async id => await query("delete from teachers where user_id = $1", [id])

export {
    listTeachers,
    queryTeacherById, saveTeacher, updateTeacher, deleteTeacher
}