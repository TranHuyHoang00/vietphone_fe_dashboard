import action_types from '@actions/action_types';

const initialState = {
    data_flash_sale_items: [],
    data_flash_sale_item: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const flash_sale_item_reducers = (state = initialState, action) => {
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
                data_flash_sale_items: action.data.flash_sale_items,
                dataMeta: action.data.metadata
            }
        case action_types.GET_FLASH_SALE_ITEM_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_flash_sale_item: action.data
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
                data_flash_sale_item: action.data,
            }
        case action_types.ON_CHANGE_FLASH_SALE_ITEM:
            let copyState = { ...state.data_flash_sale_item };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_flash_sale_item: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default flash_sale_item_reducers;