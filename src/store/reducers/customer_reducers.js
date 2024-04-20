import action_types from '@actions/action_types';

const initialState = {
    data_customers: [],
    data_customer: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const customer_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.CUSTOMER_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.CUSTOMER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.CUSTOMER_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_CUSTOMER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_customers: action.data.customers,
                data_meta: action.data.metadata
            }
        case action_types.GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_customer: action.data
            }
        case action_types.CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_CUSTOMER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_CUSTOMER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_CUSTOMER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_CUSTOMER:
            return {
                ...state,
                data_customer: action.data,
            }
        case action_types.ON_CHANGE_CUSTOMER:
            let copyState = { ...state.data_customer };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_customer: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default customer_reducers;