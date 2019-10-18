import {GET_USER, GET_USERS, SAVE_USER, UPDATE_USER} from "../constants/ActionTypes";

export const getUsers = () => ({
    type: GET_USERS,
    request: {
        method: "GET",
        path: '/users/',
    }
});
export const getUser = (id) => ({
    type: GET_USER,
    request: {
        method: "GET",
        path: '/users/' + id,
    }
});

export const saveUser = data => ({
    type: SAVE_USER,
    request: {
        method: 'POST',
        path: '/users/',
        data
    }
});

export const updateUser = (id, data) => ({
    type: UPDATE_USER,
    request: {
        method: 'PATCH',
        path: '/users/',
        data: {id, ...data},
    }
});
