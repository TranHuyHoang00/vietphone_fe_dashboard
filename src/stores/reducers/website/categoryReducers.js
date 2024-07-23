import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataCategorys: [],
    dataCategory: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isRepeat: '',
}

const categoryReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CATEGORY_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.CATEGORY_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataCategorys: action.data.categories,
                dataMeta: action.data.metadata,
                isRepeat: action.isRepeat,
            }
        case actionTypes.GET_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataCategory: action.data
            }
        case actionTypes.CREATE_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_CATEGORY:
            return {
                ...state,
                dataCategory: action.data,
            }
        case actionTypes.ON_CHANGE_CATEGORY:
            let copyState = { ...state.dataCategory };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataCategory: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default categoryReducers;