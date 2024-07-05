import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataVariants: [],
    dataVariant: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isEdit: false,
    dataFilter: {
        page: 1,
        limit: 5,
        search: ''
    },
    isEditVariant: false,
}

const variantReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.VARIANT_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
                isEditVariant: false,
            }
        case actionTypes.VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.VARIANT_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataVariants: action.data.product_variants,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataVariant: action.data
            }
        case actionTypes.CREATE_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_VARIANT:
            return {
                ...state,
                dataVariant: action.data,
                isEditVariant: true,
            }
        case actionTypes.ON_CHANGE_VARIANT:
            let copyState = { ...state.dataVariant };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataVariant: {
                    ...copyState,
                },
                isEditVariant: true,
            }
        case actionTypes.CLICK_EDIT_VARIANT:
            return {
                ...state,
                isEdit: !state.isEdit
            }
        case actionTypes.SET_DATA_FILTER_VARIANT:
            return {
                ...state,
                dataFilter: action.data,
            }
        default:
            return state;
    }
}

export default variantReducers;