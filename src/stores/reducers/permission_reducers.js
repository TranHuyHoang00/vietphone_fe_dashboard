import action_types from '@actions/action_types';

const initialState = {
    dataPermissions: [],
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const permissionReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.PERMISSION_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.PERMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.PERMISSION_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_PERMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataPermissions: action.data.permissions,
                dataMeta: action.data.metadata
            }
        case action_types.GET_PERMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_permission: action.data
            }

        default:
            return state;
    }
}

export default permissionReducers;