import action_types from '@actions/action_types';

const initialState = {
    dataComments: [],
    dataComment: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const commentReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.COMMENT_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.COMMENT_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataComments: action.data.comments,
                dataMeta: action.data.metadata
            }
        case action_types.GET_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataComment: action.data
            }
        case action_types.CREATE_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_COMMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_COMMENT:
            return {
                ...state,
                dataComment: action.data,
            }
        case action_types.ON_CHANGE_COMMENT:
            let copyState = { ...state.dataComment };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataComment: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default commentReducers;