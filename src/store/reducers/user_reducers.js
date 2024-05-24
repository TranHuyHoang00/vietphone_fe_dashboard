import action_types from '@actions/action_types';

const initialState = {
    data_users: [],
    data_user: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,

    dataUserPermissions: [],
    isSuperUser: true,
}

const user_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.USER_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.USER_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_users: action.data.users,
                dataMeta: action.data.metadata
            }
        case action_types.GET_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_user: action.data
            }
        case action_types.CREATE_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_USER:
            return {
                ...state,
                data_user: action.data,
            }
        case action_types.ON_CHANGE_USER:
            let copyState = { ...state.data_user };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_user: {
                    ...copyState,
                }
            }
        case action_types.GET_LIST_USER_PERMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataUserPermissions: action?.data?.permissions ? action?.data?.permissions : []
            }
        case action_types.SET_IS_SUPERUSER:
            return {
                ...state,
                isSuperUser: action.data,
            }
        default:
            return state;
    }
}

export default user_reducers;