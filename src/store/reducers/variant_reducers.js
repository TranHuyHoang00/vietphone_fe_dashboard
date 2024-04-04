import action_types from '../actions/action_types';

const initialState = {
    data_variants: [],
    data_variant: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
    is_edit: false,
    data_filter: {
        page: 1,
        limit: 5,
        search: ''
    },
}

const variant_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.VARIANT_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.VARIANT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.VARIANT_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_VARIANT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_variants: action.data.product_variants,
                data_meta: action.data.metadata
            }
        case action_types.GET_VARIANT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_variant: action.data
            }
        case action_types.CREATE_VARIANT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_VARIANT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_VARIANT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_VARIANT_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_VARIANT:
            return {
                ...state,
                data_variant: action.data,
            }
        case action_types.ON_CHANGE_VARIANT:
            let copyState = { ...state.data_variant };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_variant: {
                    ...copyState,
                }
            }
        case action_types.CLICK_EDIT_VARIANT:
            return {
                ...state,
                is_edit: !state.is_edit
            }
        case action_types.SET_DATA_FILTER_VARIANT:
            return {
                ...state,
                data_filter: action.data,
            }
        default:
            return state;
    }
}

export default variant_reducers;