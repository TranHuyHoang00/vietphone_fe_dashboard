import actionTypes from '@actions/system/actionTypes';

const initialState = {
    dataUsers: [],
    dataUser: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,

    dataUserPermis: [],
    isSuperUser: true,
}

const userReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.USER_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataUsers: action.data.users,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataUser: action.data
            }
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_USER:
            return {
                ...state,
                dataUser: action.data,
            }
        case actionTypes.ON_CHANGE_USER:
            let copyState = { ...state.dataUser };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataUser: {
                    ...copyState,
                }
            }
        case actionTypes.GET_LIST_USER_PERMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataUserPermis: action?.data?.permissions ? action?.data?.permissions : []
            }
        case actionTypes.SET_IS_SUPERUSER:
            return {
                ...state,
                isSuperUser: action.data,
            }
        default:
            return state;
    }
}

export default userReducers;