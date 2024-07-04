import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataRepairs: [],
    dataRepair: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const repairReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REPAIR_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.REPAIR_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataRepairs: action.data.repairtimes,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataRepair: action.data
            }
        case actionTypes.CREATE_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_REPAIR:
            return {
                ...state,
                dataRepair: action.data,
            }
        case actionTypes.ON_CHANGE_REPAIR:
            let copyState = { ...state.dataRepair };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataRepair: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default repairReducers;