import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataProductPages: [],
    dataProductPage: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isEditProductPage: false,
}

const productPageReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_PAGE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
                isEditProductPage: false,
            }
        case actionTypes.PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.PRODUCT_PAGE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProductPages: action.data.product_pages,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProductPage: action.data
            }
        case actionTypes.CREATE_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_PRODUCT_PAGE:
            return {
                ...state,
                dataProductPage: action.data,
                isEditProductPage: true,
            }
        case actionTypes.ON_CHANGE_PRODUCT_PAGE:
            let copyState = { ...state.dataProductPage };
            copyState[action.id] = action.value;
            return {
                ...state,
                isEditProductPage: true,
                dataProductPage: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default productPageReducers;