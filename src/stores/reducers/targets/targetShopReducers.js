import actionTypes from '@actions/targets/actionTypes';

const initialState = {
    dataTargetShops: [],
    dataTargetShop: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const targetShopReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TARGET_SHOP_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.TARGET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.TARGET_SHOP_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_TARGET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTargetShops: action.data.shop_monthly_target,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_TARGET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTargetShop: action.data
            }
        case actionTypes.CREATE_TARGET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_TARGET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_TARGET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_TARGET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_TARGET_SHOP:
            return {
                ...state,
                dataTargetShop: action.data,
            }
        case actionTypes.ON_CHANGE_TARGET_SHOP:
            let copyState = { ...state.dataTargetShop };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataTargetShop: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default targetShopReducers;