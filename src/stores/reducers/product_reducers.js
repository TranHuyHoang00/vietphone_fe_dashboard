import action_types from '@actions/action_types';

const initialState = {
    data_products: [],
    data_product: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    is_edit: false,
    dataFilter: {
        page: 1,
        limit: 5,
        search: '',
        product_brand: '',
        tag: '',
        is_active: '',
        category: '',
        has_page: '',
    },
    description: '',
}

const product_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.PRODUCT_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.PRODUCT_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_products: action.data.products,
                dataMeta: action.data.metadata
            }
        case action_types.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_product: action.data,
                description: action.data.description,
            }
        case action_types.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_PRODUCT:
            return {
                ...state,
                data_product: action.data,
            }
        case action_types.ON_CHANGE_PRODUCT:
            let copyState = { ...state.data_product };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_product: {
                    ...copyState,
                }
            }
        case action_types.ON_CHANGE_PRODUCT_DESCRIPTION:
            return {
                ...state,
                description: action.value
            }
        case action_types.CLICK_EDIT_PRODUCT:
            return {
                ...state,
                is_edit: !state.is_edit
            }
        case action_types.SET_dataFilter_PRODUCT:
            return {
                ...state,
                dataFilter: action.data,
            }
        default:
            return state;
    }
}

export default product_reducers;