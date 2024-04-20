import action_types from '@actions/action_types';

const initialState = {
    data_brands: [],
    data_brand: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const brand_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.BRAND_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.BRAND_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.BRAND_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_BRAND_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_brands: action.data.brands,
                data_meta: action.data.metadata
            }
        case action_types.GET_BRAND_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_brand: action.data
            }
        case action_types.CREATE_BRAND_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_BRAND_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_BRAND_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_BRAND_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_BRAND:
            return {
                ...state,
                data_brand: action.data,
            }
        case action_types.ON_CHANGE_BRAND:
            let copyState = { ...state.data_brand };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_brand: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default brand_reducers;