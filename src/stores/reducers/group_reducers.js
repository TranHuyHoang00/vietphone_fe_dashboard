import action_types from '@actions/action_types';

const initialState = {
    dataGroups: [],
    dataGroup: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const groupReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.GROUP_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.GROUP_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataGroups: action.data.groups,
                dataMeta: action.data.metadata
            }
        case action_types.GET_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataGroup: action.data
            }
        case action_types.CREATE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_GROUP:
            return {
                ...state,
                dataGroup: action.data,
            }
        case action_types.ON_CHANGE_GROUP:
            let copyState = { ...state.dataGroup };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataGroup: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default groupReducers;