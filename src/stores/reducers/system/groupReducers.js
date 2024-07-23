import actionTypes from '@actions/system/actionTypes';

const initialState = {
    dataGroups: [],
    dataGroup: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isRepeat: '',
}

const groupReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GROUP_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.GROUP_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataGroups: action.data.groups,
                dataMeta: action.data.metadata,
                isRepeat: action.isRepeat,
            }
        case actionTypes.GET_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataGroup: action.data
            }
        case actionTypes.CREATE_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_GROUP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_GROUP:
            return {
                ...state,
                dataGroup: action.data,
            }
        case actionTypes.ON_CHANGE_GROUP:
            let copyState = { ...state.dataGroup };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataGroup: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default groupReducers;