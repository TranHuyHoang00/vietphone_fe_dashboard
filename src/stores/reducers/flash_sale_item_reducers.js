import action_types from '@actions/action_types';

const initialState = {
    dataFlashSaleItems: [],
    dataFlashSaleItem: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const flashSaleItemReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.FLASH_SALE_ITEM_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.FLASH_SALE_ITEM_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataFlashSaleItems: action.data.flash_sale_items,
                dataMeta: action.data.metadata
            }
        case action_types.GET_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataFlashSaleItem: action.data
            }
        case action_types.CREATE_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.CREATE_LIST_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_FLASH_SALE_ITEM:
            return {
                ...state,
                dataFlashSaleItem: action.data,
            }
        case action_types.ON_CHANGE_FLASH_SALE_ITEM:
            let copyState = { ...state.dataFlashSaleItem };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataFlashSaleItem: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default flashSaleItemReducers;