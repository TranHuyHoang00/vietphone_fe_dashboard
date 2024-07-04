import actionTypes from '@actions/sapo/actionTypes';

const initialState = {
    dataShops: [],
    dataShop: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const shopReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SHOP_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SHOP_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataShops: action.data.shops,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataShop: action.data
            }
        case actionTypes.CREATE_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_SHOP:
            return {
                ...state,
                dataShop: action.data,
            }
        case actionTypes.ON_CHANGE_SHOP:
            let copyState = { ...state.dataShop };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataShop: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default shopReducers;