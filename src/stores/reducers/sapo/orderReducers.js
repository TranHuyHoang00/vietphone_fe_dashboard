import actionTypes from '@actions/sapo/actionTypes';

const initialState = {
    dataOrders: [],
    dataOrder: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const orderReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ORDER_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.ORDER_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataOrders: action.data.orders,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataOrder: action.data
            }
        case actionTypes.CREATE_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_ORDER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_ORDER:
            return {
                ...state,
                dataOrder: action.data,
            }
        case actionTypes.ON_CHANGE_ORDER:
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

export default orderReducers;