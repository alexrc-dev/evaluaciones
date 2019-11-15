import {LOGIN} from "../constants/ActionTypes";

const initialState = {
    userId: null,
    code: 0,
    login: {
        loaded: false,
        loading: false,
        error: null,
    },
};
export default function userSession(state = initialState, action = {}) {
    // console.log('REDUXS', action);
    if (action.type === `${LOGIN}_SUCCESS`) {
        console.log('SUCCESS', action);
        return {
            ...state,
            login: {
                loaded: true,
                loading: false,
                error: null,
            },
            code: action.response.data['code'],
            userId: action.response.data['userId']

        }
    } else if (action.type === `${LOGIN}_PENDING`) {
        console.log('PENDING', action);
        return {
            ...state,
            login: {
                loaded: false,
                loading: true,
                error: null,
            },
        }
    } else if (action.type === `${LOGIN}_FAIL`) {

        return {
            ...state,
            login: {
                loaded: true,
                loading: false,
                error: action.error,
            },
            code: 0,
            userId: '',

        }
    } else return state;
}