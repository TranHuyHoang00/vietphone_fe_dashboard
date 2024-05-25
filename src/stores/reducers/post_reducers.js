import action_types from '@actions/action_types';

const initialState = {
    dataPosts: [],
    dataPost: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const post_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.POST_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.POST_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataPosts: action.data.posts,
                dataMeta: action.data.metadata
            }
        case action_types.GET_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataPost: action.data
            }
        case action_types.CREATE_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_POST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_POST:
            return {
                ...state,
                dataPost: action.data,
            }
        case action_types.ON_CHANGE_POST:
            let copyState = { ...state.dataPost };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataPost: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default post_reducers;