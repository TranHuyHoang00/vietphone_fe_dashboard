import action_types from '../actions/action_types';

const initialState = {
    data_promotions: [],
    data_promotion: {},
    data_meta: {},
    is_loading: false,
    is_result: false,
}

const promotion_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.PROMOTION_START:
            return {
                ...state,
                is_loading: true,
                is_result: false,
            }
        case action_types.PROMOTION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.PROMOTION_FAIDED:
            return {
                ...state,
                is_loading: false,
                is_result: false,
            }
        case action_types.GET_LIST_PROMOTION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_promotions: action.data.promotions,
                data_meta: action.data.metadata
            }
        case action_types.GET_PROMOTION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
                data_promotion: action.data
            }
        case action_types.CREATE_PROMOTION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_PROMOTION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.EDIT_LIST_PROMOTION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
            }
        case action_types.DELETE_LIST_PROMOTION_SUCCESS:
            return {
                ...state,
                is_loading: false,
                is_result: true,
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