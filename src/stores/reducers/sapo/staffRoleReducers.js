import actionTypes from '@actions/sapo/actionTypes';

const initialState = {
    dataStaffRoles: [],
    dataStaffRole: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const staffRoleReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STAFF_ROLE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.STAFF_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.STAFF_ROLE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_STAFF_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataStaffRoles: action.data.staff_roles,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_STAFF_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataStaffRole: action.data
            }
        case actionTypes.CREATE_STAFF_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_STAFF_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_STAFF_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_STAFF_ROLE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_STAFF_ROLE:
            return {
                ...state,
                dataStaffRole: action.data,
            }
        case actionTypes.ON_CHANGE_STAFF_ROLE:
            let copyState = { ...state.dataStaffRole };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataStaffRole: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default staffRoleReducers;