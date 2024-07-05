import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataFlashSaleItems: [],
    dataFlashSaleItem: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const flashSaleItemReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FLASH_SALE_ITEM_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.FLASH_SALE_ITEM_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataFlashSaleItems: action.data.flash_sale_items,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataFlashSaleItem: action.data
            }
        case actionTypes.CREATE_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.CREATE_LIST_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_FLASH_SALE_ITEM:
            return {
                ...state,
                dataFlashSaleItem: action.data,
            }
        case actionTypes.ON_CHANGE_FLASH_SALE_ITEM:
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