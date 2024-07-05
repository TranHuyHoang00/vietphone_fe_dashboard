import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataMediaBases: [],
    dataMediaBase: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const mediaBaseReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MEDIA_BASE_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.MEDIA_BASE_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataMediaBases: action.data.media_bases,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataMediaBase: action.data
            }
        case actionTypes.CREATE_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_MEDIA_BASE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_MEDIA_BASE:
            return {
                ...state,
                dataMediaBase: action.data,
            }
        case actionTypes.ON_CHANGE_MEDIA_BASE:
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