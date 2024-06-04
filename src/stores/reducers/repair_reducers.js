import action_types from '@actions/action_types';

const initialState = {
    dataRepairs: [],
    dataRepair: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const repairReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.REPAIR_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.REPAIR_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataRepairs: action.data.repairtimes,
                dataMeta: action.data.metadata
            }
        case action_types.GET_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataRepair: action.data
            }
        case action_types.CREATE_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_REPAIR_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_REPAIR:
            return {
                ...state,
                dataRepair: action.data,
            }
        case action_types.ON_CHANGE_REPAIR:
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