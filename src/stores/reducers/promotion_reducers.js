import action_types from '@actions/action_types';

const initialState = {
    dataPromotions: [],
    dataPromotion: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const promotionReducers = (state = initialState, action) => {
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
                dataPromotions: action.data.promotion_info,
                dataMeta: action.data.metadata
            }
        case action_types.GET_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataPromotion: action.data
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
                dataPromotion: action.data,
            }
        case action_types.ON_CHANGE_PROMOTION:
            let copyState = { ...state.dataPromotion };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataPromotion: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default promotionReducers;