import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataGroupAttributes: [],
    dataGroupAttribute: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isRepeat: '',
}

const groupAttributeReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GROUP_ATTRIBUTE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.GROUP_ATTRIBUTE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataGroupAttributes: action.data.group_attributes,
                dataMeta: action.data.metadata,
                isRepeat: action.isRepeat,
            }
        case actionTypes.GET_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataGroupAttribute: action.data
            }
        case actionTypes.CREATE_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_GROUP_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_GROUP_ATTRIBUTE:
            return {
                ...state,
                dataGroupAttribute: action.data,
            }
        case actionTypes.ON_CHANGE_GROUP_ATTRIBUTE:
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