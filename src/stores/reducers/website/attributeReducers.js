import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataAttributes: [],
    dataAttribute: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isRepeat: '',
}

const attributeReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ATTRIBUTE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.ATTRIBUTE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataAttributes: action.data.attributes,
                dataMeta: action.data.metadata,
                isRepeat: action.isRepeat,
            }
        case actionTypes.GET_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataAttribute: action.data
            }
        case actionTypes.CREATE_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_ATTRIBUTE:
            return {
                ...state,
                dataAttribute: action.data,
            }
        case actionTypes.ON_CHANGE_ATTRIBUTE:
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