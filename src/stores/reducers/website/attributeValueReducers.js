import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataAttributeValues: [],
    dataAttributeValue: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const attributeValueReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ATTRIBUTE_VALUE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.ATTRIBUTE_VALUE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataAttributeValues: action.data.attribute_values,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataAttributeValue: action.data
            }
        case actionTypes.CREATE_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_ATTRIBUTE_VALUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_ATTRIBUTE_VALUE:
            return {
                ...state,
                dataAttributeValue: action.data,
            }
        case actionTypes.ON_CHANGE_ATTRIBUTE_VALUE:
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