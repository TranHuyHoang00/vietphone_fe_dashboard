import action_types from '@actions/action_types';

const initialState = {
    data_product_pages: [],
    data_product_page: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const product_page_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.PRODUCT_PAGE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.PRODUCT_PAGE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_product_pages: action.data.product_pages,
                dataMeta: action.data.metadata
            }
        case action_types.GET_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_product_page: action.data
            }
        case action_types.CREATE_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_PRODUCT_PAGE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_PRODUCT_PAGE:
            return {
                ...state,
                data_product_page: action.data,
            }
        case action_types.ON_CHANGE_PRODUCT_PAGE:
            let copyState = { ...state.data_product_page };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_product_page: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default product_page_reducers;