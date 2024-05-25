import action_types from '@actions/action_types';

const initialState = {
    dataAttributes: [],
    data_attribute: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const attribute_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.ATTRIBUTE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.ATTRIBUTE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataAttributes: action.data.attributes,
                dataMeta: action.data.metadata
            }
        case action_types.GET_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_attribute: action.data
            }
        case action_types.CREATE_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_ATTRIBUTE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_ATTRIBUTE:
            return {
                ...state,
                data_attribute: action.data,
            }
        case action_types.ON_CHANGE_ATTRIBUTE:
            let copyState = { ...state.data_attribute };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_attribute: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default attribute_reducers;