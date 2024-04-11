import action_types from '../actions/action_types';

const initialState = {
    data_products: [],
    data_product: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
    is_edit: false,
    data_filter: {
        page: 1,
        limit: 5,
        search: '',
        product_brand: '',
        tag: '',
        is_active: '',
        category: '',
        has_page: '',
    },
}

const product_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.PRODUCT_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.PRODUCT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.PRODUCT_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_products: action.data.products,
                data_meta: action.data.metadata
            }
        case action_types.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_product: action.data
            }
        case action_types.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
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
        case action_types.CLICK_EDIT_PRODUCT:
            return {
                ...state,
                is_edit: !state.is_edit
            }
        case action_types.SET_DATA_FILTER_PRODUCT:
            return {
                ...state,
                data_filter: action.data,
            }
        default:
            return state;
    }
}

export default product_reducers;