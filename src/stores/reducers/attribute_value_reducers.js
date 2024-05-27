import action_types from '@actions/action_types';

const initialState = {
    dataAttributeValues: [],
    dataAttributeValue: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const attributeValueReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.ATTRIBUTE_VALUE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.ATTRIBUTE_VALUE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataAttributeValues: action.data.attribute_values,
                dataMeta: action.data.metadata
            }
        case action_types.GET_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataAttributeValue: action.data
            }
        case action_types.CREATE_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_ATTRIBUTE_VALUE:
            return {
                ...state,
                dataAttributeValue: action.data,
            }
        case action_types.ON_CHANGE_ATTRIBUTE_VALUE:
            let copyState = { ...state.dataAttributeValue };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataAttributeValue: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default attributeValueReducers;