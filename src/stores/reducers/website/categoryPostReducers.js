import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataCategoryPosts: [],
    dataCategoryPost: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const categoryPostReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CATEGORY_POST_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.CATEGORY_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.CATEGORY_POST_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataCategoryPosts: action.data.categories,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataCategoryPost: action.data
            }
        case actionTypes.CREATE_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_CATEGORY_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_CATEGORY_POST:
            return {
                ...state,
                dataCategoryPost: action.data,
            }
        case actionTypes.ON_CHANGE_CATEGORY_POST:
            let copyState = { ...state.dataCategoryPost };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataCategoryPost: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default categoryPostReducers;