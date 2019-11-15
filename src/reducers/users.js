import {GET_USERS, GET_USER, SAVE_USER, UPDATE_USER} from "../constants/ActionTypes";

const defaultLoading = {
    loading: false,
    loaded: false,
    error: null,
};

const initialState = {
    users: [],
    user: {},
    get: defaultLoading,
    save: defaultLoading,
    update: defaultLoading,
};
const getActionType = type => {
    return type.split('_')[0].toLowerCase();
};
export default function users(state = initialState, action = {}) {
    switch (action.type) {
        case `${GET_USERS}_PENDING`:
        case `${GET_USER}_PENDING`:
        case `${SAVE_USER}_PENDING`:
        case `${UPDATE_USER}_PENDING`:
            return {
                ...state,
                [getActionType(action.type)]: {
                    loading: true,
                    loaded: false,
                    error: null
                },
                action,
            };
        case `${GET_USERS}_SUCCESS`: {
            return {
                ...state,
                users: action.response.data,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null
                },
                action,
            }
        }
        case `${GET_USER}_SUCCESS`: {
            return {
                ...state,
                user: action.response.data,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null
                },
                action,
            }
        }
        case `${SAVE_USER}_SUCCESS`:
        case `${UPDATE_USER}_SUCCESS`: {
            return {
                ...state,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null
                },
                action,
            };
        }
        case `${GET_USERS}_FAIL`:
            return {
                ...state,
                users: [],
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
                action,
            };
        case `${GET_USER}_FAIL`:
            return {
                ...state,
                user: {},
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
                action,
            };
        case `${SAVE_USER}_FAIL`:
        case `${UPDATE_USER}_FAIL`: {
            return {
                ...state,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: action.error,
                },
                action,
            }
        }
        default:
            return state;
    }
};