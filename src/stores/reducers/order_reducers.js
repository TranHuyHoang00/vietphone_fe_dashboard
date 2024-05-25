import action_types from '@actions/action_types';

const initialState = {
    dataOrders: [],
    dataOrder: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const order_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.ORDER_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.ORDER_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataOrders: action.data.orders,
                dataMeta: action.data.metadata
            }
        case action_types.GET_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataOrder: action.data
            }
        case action_types.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_ORDER:
            return {
                ...state,
                dataOrder: action.data,
            }
        case action_types.ON_CHANGE_ORDER:
            let copyState = { ...state.dataOrder };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataOrder: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default order_reducers;