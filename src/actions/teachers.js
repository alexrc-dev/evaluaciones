import {GET_TEACHER, GET_TEACHERS, SAVE_TEACHERS, UPDATE_TEACHERS, DELETE_TEACHERS} from "../constants/ActionTypes";

export const getTeachers = () => ({
    type: GET_TEACHERS,
    request: {
        method: "GET",
        path: '/teachers/',
    }
});

export const getTeacher = id => ({
    type: GET_TEACHER,
    request: {
        method: "GET",
        path: `/teachers/${id}`
    }
});

export const saveTeacher = data => ({
    type: SAVE_TEACHERS,
    request: {
        method: "POST",
        path: '/teachers/',
        data,
    }
});

export const updateTeacher = (id, data) => ({
    type: UPDATE_TEACHERS,
    request: {
        method: "PATCH",
        path: '/teachers/',
        data: {id, ...data},
    }
});

export const deleteTeacher = (id) => ({
    type: DELETE_TEACHERS,
    request: {
        method: "DELETE",
        path: '/teachers/',
        data: {id},
    }
});