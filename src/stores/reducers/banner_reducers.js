import action_types from '@actions/action_types';

const initialState = {
    dataBanners: [],
    dataBanner: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const banner_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.BANNER_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.BANNER_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataBanners: action.data.banners,
                dataMeta: action.data.metadata
            }
        case action_types.GET_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataBanner: action.data
            }
        case action_types.CREATE_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_BANNER:
            return {
                ...state,
                dataBanner: action.data,
            }
        case action_types.ON_CHANGE_BANNER:
            let copyState = { ...state.dataBanner };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataBanner: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default banner_reducers;