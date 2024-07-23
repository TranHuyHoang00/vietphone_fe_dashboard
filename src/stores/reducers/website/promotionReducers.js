import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataPromotions: [],
    dataPromotion: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isRepeat: '',
}

const promotionReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PROMOTION_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.PROMOTION_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataPromotions: action.data.promotion_info,
                dataMeta: action.data.metadata,
                isRepeat: action.isRepeat,
            }
        case actionTypes.GET_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataPromotion: action.data
            }
        case actionTypes.CREATE_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_PROMOTION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_PROMOTION:
            return {
                ...state,
                dataPromotion: action.data,
            }
        case actionTypes.ON_CHANGE_PROMOTION:
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