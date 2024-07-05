import actionTypes from '@actions/system/actionTypes';

const initialState = {
    dataPermissions: [],
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const permissionReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PERMISSION_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.PERMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.PERMISSION_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_PERMISSION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataPermissions: action.data.permissions,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_PERMISSION_SUCCESS:
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