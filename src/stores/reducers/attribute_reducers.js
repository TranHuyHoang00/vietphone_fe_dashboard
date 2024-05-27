import action_types from '@actions/action_types';

const initialState = {
    dataAttributes: [],
    dataAttribute: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const attributeReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.ATTRIBUTE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.ATTRIBUTE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataAttributes: action.data.attributes,
                dataMeta: action.data.metadata
            }
        case action_types.GET_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataAttribute: action.data
            }
        case action_types.CREATE_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_ATTRIBUTE:
            return {
                ...state,
                dataAttribute: action.data,
            }
        case action_types.ON_CHANGE_ATTRIBUTE:
            let copyState = { ...state.dataAttribute };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataAttribute: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default attributeReducers;