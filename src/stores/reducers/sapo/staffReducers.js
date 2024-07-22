import actionTypes from '@actions/sapo/actionTypes';

const initialState = {
    dataStaffs: [],
    dataStaff: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isRepeat: '',
}

const staffReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STAFF_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.STAFF_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataStaffs: action.data.staff,
                dataMeta: action.data.metadata,
                isRepeat: action.isRepeat,
            }
        case actionTypes.GET_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataStaff: action.data
            }
        case actionTypes.CREATE_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_STAFF:
            return {
                ...state,
                dataStaff: action.data,
            }
        case actionTypes.ON_CHANGE_STAFF:
            let copyState = { ...state.dataStaff };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataStaff: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default staffReducers;