import action_types from '@actions/action_types';

const initialState = {
    data_tasks: [],
    data_task: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const task_reducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.TASK_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.TASK_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_tasks: action.data.task_results,
                dataMeta: action.data.metadata
            }
        case action_types.GET_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                data_task: action.data
            }
        case action_types.CREATE_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_TASK_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_TASK:
            return {
                ...state,
                data_task: action.data,
            }
        case action_types.ON_CHANGE_TASK:
            let copyState = { ...state.data_task };
            copyState[action.id] = action.value;
            return {
                ...state,
                data_task: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default task_reducers;