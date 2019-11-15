import {GET_TEACHERS, GET_TEACHER, SAVE_TEACHERS, UPDATE_TEACHERS, DELETE_TEACHERS} from "../constants/ActionTypes";

const defaultLoading = {
    loading: false,
    loaded: false,
    error: null,
};

const initialState = {
    teachers: [],
    teacher: {},
    get: defaultLoading,
    save: defaultLoading,
    update: defaultLoading,
};
const getActionType = type => {
    return type.split('_')[0].toLowerCase();
};

export default function teachers(state = initialState, action = {}) {
    switch (action.type) {
        case `${GET_TEACHERS}_PENDING`:
        case `${GET_TEACHER}_PENDING`:
        case `${SAVE_TEACHERS}_PENDING`:
        case `${UPDATE_TEACHERS}_PENDING`:
        case `${DELETE_TEACHERS}_PENDING`:
            return {
                ...state,
                [getActionType(action.type)]: {
                    loading: true,
                    loaded: false,
                    error: null
                },
                action,
            }
        case `${GET_TEACHERS}_SUCCESS`:
            console.log(`${action.type}_SUCCESS`)
            return {
                ...state,
                teachers: action.response.data,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null,
                },
                action,
            };
        case `${GET_TEACHER}_SUCCESS`:
            return {
                ...state,
                teacher: action.response.data,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null,
                },
                action,
            };
        case `${GET_TEACHERS}_FAIL`:
            return {
                ...state,
                teachers: [],
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
                action,
            };
        case `${SAVE_TEACHERS}_SUCCESS`:
        case `${UPDATE_TEACHERS}_SUCCESS`:
        case `${DELETE_TEACHERS}_SUCCESS`:
            return {
                ...state,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null
                },
                action,
            }
        case `${GET_TEACHER}_FAIL`:
            return {
                ...state,
                teacher: {},
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
                action,
            };
        case `${SAVE_TEACHERS}_FAIL`:
        case `${UPDATE_TEACHERS}_FAIL`:
        case `${DELETE_TEACHERS}_FAIL`:
            return {
                ...state,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
                action

            };
        default:
            return state;
    }
}