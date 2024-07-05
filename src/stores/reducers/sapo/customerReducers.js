import actionTypes from '@actions/sapo/actionTypes';

const initialState = {
    dataCustomers: [],
    dataCustomer: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const customerReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CUSTOMER_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.CUSTOMER_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataCustomers: action.data.customers,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataCustomer: action.data
            }
        case actionTypes.CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_CUSTOMER:
            return {
                ...state,
                dataCustomer: action.data,
            }
        case actionTypes.ON_CHANGE_CUSTOMER:
            let copyState = { ...state.dataCustomer };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataCustomer: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default customerReducers;