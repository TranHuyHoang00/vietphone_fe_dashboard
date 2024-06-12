import action_types from '@actions/action_types';

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
        case action_types.VARIANT_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
                isEditVariant: false,
            }
        case action_types.VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.VARIANT_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataVariants: action.data.product_variants,
                dataMeta: action.data.metadata
            }
        case action_types.GET_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataVariant: action.data
            }
        case action_types.CREATE_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_VARIANT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_VARIANT:
            return {
                ...state,
                dataVariant: action.data,
                isEditVariant: true,
            }
        case action_types.ON_CHANGE_VARIANT:
            let copyState = { ...state.dataVariant };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataVariant: {
                    ...copyState,
                },
                isEditVariant: true,
            }
        case action_types.CLICK_EDIT_VARIANT:
            return {
                ...state,
                isEdit: !state.isEdit
            }
        case action_types.SET_DATA_FILTER_VARIANT:
            return {
                ...state,
                dataFilter: action.data,
            }
        default:
            return state;
    }
}

export default variantReducers;