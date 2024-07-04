import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataPosts: [],
    dataPost: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const postReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.POST_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.POST_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataPosts: action.data.posts,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataPost: action.data
            }
        case actionTypes.CREATE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_POST:
            return {
                ...state,
                dataPost: action.data,
            }
        case actionTypes.ON_CHANGE_POST:
            let copyState = { ...state.dataPost };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataPost: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default postReducers;