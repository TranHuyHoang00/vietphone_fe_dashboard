import actionTypes from '@actions/target/actionTypes';

const initialState = {
    dataTargetProductCategorys: [],
    dataTargetProductCategory: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const targetProductCategoryReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TARGET_PRODUCT_CATEGORY_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.TARGET_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.TARGET_PRODUCT_CATEGORY_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_TARGET_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTargetProductCategorys: action.data.sapo_product_categories,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_TARGET_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTargetProductCategory: action.data
            }
        case actionTypes.CREATE_TARGET_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_TARGET_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_TARGET_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_TARGET_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_TARGET_PRODUCT_CATEGORY:
            return {
                ...state,
                dataTargetProductCategory: action.data,
            }
        case actionTypes.ON_CHANGE_TARGET_PRODUCT_CATEGORY:
            let copyState = { ...state.dataTargetProductCategory };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataTargetProductCategory: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default targetProductCategoryReducers;