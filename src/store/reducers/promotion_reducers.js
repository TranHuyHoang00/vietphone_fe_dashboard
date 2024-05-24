import action_types from '@actions/action_types';

const initialState = {
    data_promotions: [],
    data_promotion: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const promotion_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.PROMOTION_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.PROMOTION_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_promotions: action.data.promotions,
                dataMeta: action.data.metadata
            }
        case action_types.GET_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_promotion: action.data
            }
        case action_types.CREATE_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_PROMOTION:
            return {
                ...state,
                data_promotion: action.data,
            }
        case action_types.ON_CHANGE_PROMOTION:
            let copyState = { ...state.data_promotion };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_promotion: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default promotion_reducers;