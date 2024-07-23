import actionTypes from '@actions/target/actionTypes';

const initialState = {
    dataTargetStaffs: [],
    dataTargetStaff: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isRepeat: '',
}

const targetStaffReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TARGET_STAFF_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.TARGET_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.TARGET_STAFF_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_TARGET_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTargetStaffs: action.data.staff_monthly_target,
                dataMeta: action.data.metadata,
                isRepeat: action.isRepeat,
            }
        case actionTypes.GET_TARGET_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTargetStaff: action.data
            }
        case actionTypes.CREATE_TARGET_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_TARGET_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_TARGET_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_TARGET_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_TARGET_STAFF:
            return {
                ...state,
                dataTargetStaff: action.data,
            }
        case actionTypes.ON_CHANGE_TARGET_STAFF:
            let copyState = { ...state.dataTargetStaff };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataTargetStaff: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default targetStaffReducers;