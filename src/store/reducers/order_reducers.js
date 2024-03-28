import action_types from '../actions/action_types';

const initialState = {
    data_orders: [],
    data_order: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const order_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.ORDER_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.ORDER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.ORDER_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_ORDER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_orders: action.data.orders,
                data_meta: action.data.metadata
            }
        case action_types.GET_ORDER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_order: action.data
            }
        case action_types.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_ORDER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_ORDER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_ORDER_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.SET_DATA_ORDER:
            return {
                ...state,
                data_order: action.data,
            }
        case action_types.ON_CHANGE_ORDER:
            let copyState = { ...state.data_order };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_order: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default order_reducers;