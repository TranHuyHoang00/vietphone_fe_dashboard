import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataTags: [],
    dataTag: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const tagReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TAG_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.TAG_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTags: action.data.tags,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTag: action.data
            }
        case actionTypes.CREATE_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_TAG:
            return {
                ...state,
                dataTag: action.data,
            }
        case actionTypes.ON_CHANGE_TAG:
            let copyState = { ...state.dataTag };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataTag: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default tagReducers;