import action_types from '@actions/action_types';

const initialState = {
    data_locations: [],
    data_location: {},
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
                data_locations: action.data.locations,
                dataMeta: action.data.metadata
            }
        case action_types.GET_LOCATION_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_location: action.data
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
                data_location: action.data,
            }
        case action_types.ON_CHANGE_LOCATION:
            let copyState = { ...state.data_location };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_location: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default location_reducers;