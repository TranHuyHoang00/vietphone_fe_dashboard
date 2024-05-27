import action_types from '@actions/action_types';

const initialState = {
    dataTags: [],
    dataTag: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const tagReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.TAG_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.TAG_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTags: action.data.tags,
                dataMeta: action.data.metadata
            }
        case action_types.GET_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTag: action.data
            }
        case action_types.CREATE_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_TAG_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_TAG:
            return {
                ...state,
                dataTag: action.data,
            }
        case action_types.ON_CHANGE_TAG:
            let copyState = { ...state.dataTag };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataTag: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default tagReducers;