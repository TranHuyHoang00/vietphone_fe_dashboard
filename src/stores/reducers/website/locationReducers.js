import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataLocations: [],
    dataLocation: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isRepeat: '',
}

const locationReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOCATION_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.LOCATION_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataLocations: action.data.locations,
                dataMeta: action.data.metadata,
                isRepeat: action.isRepeat,
            }
        case actionTypes.GET_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataLocation: action.data
            }
        case actionTypes.CREATE_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_LOCATION:
            return {
                ...state,
                dataLocation: action.data,
            }
        case actionTypes.ON_CHANGE_LOCATION:
            let copyState = { ...state.dataLocation };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataLocation: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default locationReducers;