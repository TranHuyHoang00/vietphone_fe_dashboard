import action_types from '@actions/action_types';

const initialState = {
    dataLocations: [],
    dataLocation: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const location_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.LOCATION_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.LOCATION_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataLocations: action.data.locations,
                dataMeta: action.data.metadata
            }
        case action_types.GET_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataLocation: action.data
            }
        case action_types.CREATE_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_LOCATION:
            return {
                ...state,
                dataLocation: action.data,
            }
        case action_types.ON_CHANGE_LOCATION:
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

export default location_reducers;