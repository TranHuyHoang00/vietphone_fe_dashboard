import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataBrands: [],
    dataBrand: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const brandReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BRAND_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.BRAND_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataBrands: action.data.brands,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataBrand: action.data
            }
        case actionTypes.CREATE_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_BRAND:
            return {
                ...state,
                dataBrand: action.data,
            }
        case actionTypes.ON_CHANGE_BRAND:
            let copyState = { ...state.dataBrand };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataBrand: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default brandReducers;