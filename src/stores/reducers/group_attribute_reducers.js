import action_types from '@actions/action_types';

const initialState = {
    dataGroupAttributes: [],
    dataGroupAttribute: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const groupAttributeReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.GROUP_ATTRIBUTE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.GROUP_ATTRIBUTE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataGroupAttributes: action.data.group_attributes,
                dataMeta: action.data.metadata
            }
        case action_types.GET_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataGroupAttribute: action.data
            }
        case action_types.CREATE_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_GROUP_ATTRIBUTE:
            return {
                ...state,
                dataGroupAttribute: action.data,
            }
        case action_types.ON_CHANGE_GROUP_ATTRIBUTE:
            let copyState = { ...state.dataGroupAttribute };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataGroupAttribute: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default groupAttributeReducers;