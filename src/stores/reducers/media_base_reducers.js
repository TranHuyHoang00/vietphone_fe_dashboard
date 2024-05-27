import action_types from '@actions/action_types';

const initialState = {
    dataMediaBases: [],
    dataMediaBase: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const mediaBaseReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.MEDIA_BASE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.MEDIA_BASE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataMediaBases: action.data.media_bases,
                dataMeta: action.data.metadata
            }
        case action_types.GET_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataMediaBase: action.data
            }
        case action_types.CREATE_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_MEDIA_BASE:
            return {
                ...state,
                dataMediaBase: action.data,
            }
        case action_types.ON_CHANGE_MEDIA_BASE:
            let copyState = { ...state.dataMediaBase };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataMediaBase: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default mediaBaseReducers;