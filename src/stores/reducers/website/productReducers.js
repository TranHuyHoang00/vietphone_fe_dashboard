import actionTypes from '@actions/website/actionTypes';

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
        source: '',
    },
    dataFilterProductRepair: {
        page: 1,
        limit: 5,
        search: '',
        product_brand: '',
        tag: '',
        is_active: '',
        category: '',
        has_page: '',
        source: 'repair',
    },
    description: '',
    isEditProduct: false,

}

const productReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PRODUCT_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
                isEditProduct: false,
            }
        case actionTypes.PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.PRODUCT_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProducts: action.data.products,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProduct: action.data,
                description: action.data.description,
            }
        case actionTypes.CREATE_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_PRODUCT:
            return {
                ...state,
                dataProduct: action.data,
                isEditProduct: true,
            }
        case actionTypes.ON_CHANGE_PRODUCT:
            let copyState = { ...state.dataProduct };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataProduct: {
                    ...copyState,
                },
                isEditProduct: true,
            }
        case actionTypes.ON_CHANGE_PRODUCT_DESCRIPTION:
            return {
                ...state,
                description: action.value,
                isEditProduct: true,
            }
        case actionTypes.CLICK_EDIT_PRODUCT:
            return {
                ...state,
                isEdit: !state.isEdit,
            }
        case actionTypes.SET_DATA_FILTER_PRODUCT:
            return {
                ...state,
                dataFilter: action.data,
            }
        case actionTypes.SET_DATA_FILTER_PRODUCT_REPAIR:
            return {
                ...state,
                dataFilterProductRepair: action.data,
            }
        default:
            return state;
    }
}

export default productReducers;