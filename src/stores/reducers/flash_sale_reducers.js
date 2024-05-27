import action_types from '@actions/action_types';

const initialState = {
    dataFlashSales: [],
    dataFlashSale: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const flashSaleReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.FLASH_SALE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.FLASH_SALE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataFlashSales: action.data.flash_sales,
                dataMeta: action.data.metadata
            }
        case action_types.GET_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataFlashSale: action.data
            }
        case action_types.CREATE_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_FLASH_SALE:
            return {
                ...state,
                dataFlashSale: action.data,
            }
        case action_types.ON_CHANGE_FLASH_SALE:
            let copyState = { ...state.dataFlashSale };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataFlashSale: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default flashSaleReducers;