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
                [getActionType(action.type)]: {
                    loading: true,
                    loaded: false,
                    error: null
                },
                ...state,
            }
        case `${GET_TEACHERS}_SUCCESS`:
            return {
                teachers: action.response.data,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null,
                },
                ...state
            };
        case `${GET_TEACHER}_SUCCESS`:
            return {
                teacher: action.response.data,
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: true,
                    error: null,
                },
                ...state
            };
        case `${GET_TEACHERS}_FAIL`:
            return {
                teachers: [],
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
                ...state
            };
        case `${GET_TEACHER}_FAIL`:
            return {
                teacher: {},
                [getActionType(action.type)]: {
                    loading: false,
                    loaded: false,
                    error: action.error,
                },
                ...state
            };
        case `${SAVE_TEACHERS}_FAIL`:
        case `${UPDATE_TEACHERS}_FAIL`:
        case `${DELETE_TEACHERS}_FAIL`:
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