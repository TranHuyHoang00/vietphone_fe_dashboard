import actionTypes from '@actions/sapo/actionTypes';

const initialState = {
    dataProductCategoryTargets: [],
    dataProductCategoryTarget: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const productCategoryTargetReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_CATEGORY_TARGET_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.PRODUCT_CATEGORY_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.PRODUCT_CATEGORY_TARGET_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_PRODUCT_CATEGORY_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProductCategoryTargets: action.data.sapo_target_product_categories,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_PRODUCT_CATEGORY_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProductCategoryTarget: action.data
            }
        case actionTypes.CREATE_PRODUCT_CATEGORY_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_PRODUCT_CATEGORY_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_PRODUCT_CATEGORY_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_PRODUCT_CATEGORY_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_PRODUCT_CATEGORY_TARGET:
            return {
                ...state,
                dataProductCategoryTarget: action.data,
            }
        case actionTypes.ON_CHANGE_PRODUCT_CATEGORY_TARGET:
            let copyState = { ...state.dataProductCategoryTarget };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataProductCategoryTarget: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default productCategoryTargetReducers;