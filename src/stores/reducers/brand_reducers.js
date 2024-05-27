import action_types from '@actions/action_types';

const initialState = {
    dataBrands: [],
    dataBrand: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const brandReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.BRAND_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.BRAND_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataBrands: action.data.brands,
                dataMeta: action.data.metadata
            }
        case action_types.GET_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataBrand: action.data
            }
        case action_types.CREATE_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_BRAND_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_BRAND:
            return {
                ...state,
                dataBrand: action.data,
            }
        case action_types.ON_CHANGE_BRAND:
            let copyState = { ...state.dataBrand };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataBrand: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default brandReducers;