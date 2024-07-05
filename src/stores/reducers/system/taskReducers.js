import actionTypes from '@actions/system/actionTypes';

const initialState = {
    dataTasks: [],
    dataTask: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const taskReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TASK_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.TASK_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTasks: action.data.task_results,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTask: action.data
            }
        case actionTypes.CREATE_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_TASK:
            return {
                ...state,
                dataTask: action.data,
            }
        case actionTypes.ON_CHANGE_TASK:
            let copyState = { ...state.dataTask };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataTask: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default taskReducers;