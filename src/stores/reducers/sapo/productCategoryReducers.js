import actionTypes from '@actions/sapo/actionTypes';

const initialState = {
    dataProductCategorys: [],
    dataProductCategory: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isRepeat: '',
}

const productCategoryReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_CATEGORY_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.PRODUCT_CATEGORY_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProductCategorys: action.data.sapo_product_categories,
                dataMeta: action.data.metadata,
                isRepeat: action.isRepeat,
            }
        case actionTypes.GET_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProductCategory: action.data
            }
        case actionTypes.CREATE_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_PRODUCT_CATEGORY:
            return {
                ...state,
                dataProductCategory: action.data,
            }
        case actionTypes.ON_CHANGE_PRODUCT_CATEGORY:
            let copyState = { ...state.dataProductCategory };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataProductCategory: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default productCategoryReducers;