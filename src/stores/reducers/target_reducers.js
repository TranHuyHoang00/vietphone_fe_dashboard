import action_types from '@actions/action_types';

const initialState = {
    dataTargets: [

    ],
    dataTarget: {},
    dataMeta: { total: 1, page: "1", limit: "5" },
    isLoading: false,
    isResult: false,
}

const targetReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.TARGET_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.TARGET_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTargets: action.data.targets,
                dataMeta: action.data.metadata
            }
        case action_types.GET_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTarget: action.data
            }
        case action_types.CREATE_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_TARGET:
            return {
                ...state,
                dataTarget: action.data,
            }
        case action_types.ON_CHANGE_TARGET:
            let copyState = { ...state.dataTarget };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataTarget: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default targetReducers;