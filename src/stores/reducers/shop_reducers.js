import action_types from '@actions/action_types';

const initialState = {
    dataShops: [],
    dataShop: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const shopReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.SHOP_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SHOP_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataShops: action.data.shops,
                dataMeta: action.data.metadata
            }
        case action_types.GET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataShop: action.data
            }
        case action_types.CREATE_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_SHOP:
            return {
                ...state,
                dataShop: action.data,
            }
        case action_types.ON_CHANGE_SHOP:
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