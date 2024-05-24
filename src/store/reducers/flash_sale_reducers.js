import action_types from '@actions/action_types';

const initialState = {
    data_flash_sales: [],
    data_flash_sale: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const flash_sale_reducers = (state = initialState, action) => {
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
                data_flash_sales: action.data.flash_sales,
                dataMeta: action.data.metadata
            }
        case action_types.GET_FLASH_SALE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_flash_sale: action.data
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
                data_flash_sale: action.data,
            }
        case action_types.ON_CHANGE_FLASH_SALE:
            let copyState = { ...state.data_flash_sale };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_flash_sale: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default flash_sale_reducers;