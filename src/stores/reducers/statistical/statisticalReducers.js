import actionTypes from '@actions/statistical/actionTypes';

const initialState = {
    dataStatistical: {
        type: 'day',
        start: '',
        end: '',
    },
    isLoading: false,
    isResult: false,

    dataViewWebs: [],
    dataViewProducts: [],
}

const statisticalReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STATISTICAL_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.STATISTICAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.STATISTICAL_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }

        case actionTypes.GET_VIEW_WEB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataViewWebs: action.data,
            }
        case actionTypes.GET_VIEW_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataViewProducts: action.data,
            }
        case actionTypes.SET_STATISTICAL:
            return {
                ...state,
                dataStatistical: action.data,
            }
        case actionTypes.ON_CHANGE_STATISTICAL:
            let copyState = { ...state.dataStatistical };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataStatistical: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default statisticalReducers;