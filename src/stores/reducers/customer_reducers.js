import action_types from '@actions/action_types';

const initialState = {
    dataCustomers: [],
    dataCustomer: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const customerReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.CUSTOMER_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.CUSTOMER_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataCustomers: action.data.customers,
                dataMeta: action.data.metadata
            }
        case action_types.GET_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataCustomer: action.data
            }
        case action_types.CREATE_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_CUSTOMER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_CUSTOMER:
            return {
                ...state,
                dataCustomer: action.data,
            }
        case action_types.ON_CHANGE_CUSTOMER:
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