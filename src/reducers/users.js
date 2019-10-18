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
                }
            };
        case `${GET_USERS}_SUCCESS`: {
            return {
                users: action.response.data,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null
                },
                ...state
            }
        }
        case `${GET_USER}_SUCCESS`: {
            return {
                user: action.response.data,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null
                },
                ...state
            }
        }
        case `${GET_USERS}_FAIL`:
            return {
                users: [],
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
                ...state
            };
        case `${GET_USER}_FAIL`:
            return {
                user: {},
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
                ...state
            };
        case `${SAVE_USER}_FAIL`:
        case `${UPDATE_USER}_FAIL`: {
            return {
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
                ...state
            }
        }
    }
};