import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataFlashSales: [],
    dataFlashSale: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const flashSaleReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FLASH_SALE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.FLASH_SALE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataFlashSales: action.data.flash_sales,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataFlashSale: action.data
            }
        case actionTypes.CREATE_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_FLASH_SALE:
            return {
                ...state,
                dataFlashSale: action.data,
            }
        case actionTypes.ON_CHANGE_FLASH_SALE:
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