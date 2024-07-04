import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataBanners: [],
    dataBanner: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const bannerReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.BANNER_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.BANNER_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataBanners: action.data.banners,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataBanner: action.data
            }
        case actionTypes.CREATE_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_BANNER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_BANNER:
            return {
                ...state,
                dataBanner: action.data,
            }
        case actionTypes.ON_CHANGE_BANNER:
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

export default bannerReducers;