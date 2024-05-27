import action_types from '@actions/action_types';

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

const statistical_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.STATISTICAL_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.STATISTICAL_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.STATISTICAL_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }

        case action_types.GET_VIEW_WEB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataViewWebs: action.data,
            }
        case action_types.GET_VIEW_PRODUCT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataViewProducts: action.data,
            }
        case action_types.SET_STATISTICAL:
            return {
                ...state,
                dataStatistical: action.data,
            }
        case action_types.ON_CHANGE_STATISTICAL:
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

export default statistical_reducers;