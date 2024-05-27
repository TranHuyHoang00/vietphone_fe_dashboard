import action_types from '@actions/action_types';

const initialState = {
    dataProducts: [],
    dataProduct: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isEdit: false,
    dataFilter: {
        page: 1,
        limit: 5,
        search: '',
        product_brand: '',
        tag: '',
        is_active: '',
        category: '',
        has_page: '',
    },
    description: '',
}

const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.PRODUCT_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.PRODUCT_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProducts: action.data.products,
                dataMeta: action.data.metadata
            }
        case action_types.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProduct: action.data,
                description: action.data.description,
            }
        case action_types.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_PRODUCT:
            return {
                ...state,
                dataProduct: action.data,
            }
        case action_types.ON_CHANGE_PRODUCT:
            let copyState = { ...state.dataProduct };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataProduct: {
                    ...copyState,
                }
            }
        case action_types.ON_CHANGE_PRODUCT_DESCRIPTION:
            return {
                ...state,
                description: action.value
            }
        case action_types.CLICK_EDIT_PRODUCT:
            return {
                ...state,
                isEdit: !state.isEdit
            }
        case action_types.SET_dataFilter_PRODUCT:
            return {
                ...state,
                dataFilter: action.data,
            }
        default:
            return state;
    }
}

export default productReducers;