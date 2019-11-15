import {LOGIN} from "../constants/ActionTypes";

export const tryLogin = (idIntent, password) => ({
    type: LOGIN,
    request: {
        method: 'POST',
        path: '/users/userSession',
        data: {idIntent, password},
    }
});