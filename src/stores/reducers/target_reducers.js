import action_types from '@actions/action_types';

const initialState = {
    dataTargets: [
        { id: 1, store: { id: 1, name: 'vietphone 16' }, target: 650000000 },
        { id: 2, store: { id: 2, name: 'vietphone 21' }, target: 500000000 },
        { id: 3, store: { id: 3, name: 'vietphone 22' }, target: 450000000 },
        { id: 4, store: { id: 4, name: 'vietphone 25' }, target: 850000000 },
        { id: 10, store: { id: 10, name: 'vietphone 26' }, target: 550000000 },
        { id: 9, store: { id: 9, name: 'vietphone 27' }, target: 650000000 },
        { id: 5, store: { id: 5, name: 'vietphone 28' }, target: 650000000 },
        { id: 6, store: { id: 6, name: 'vietphone 29' }, target: 750000000 },
        { id: 7, store: { id: 7, name: 'vietphone 30' }, target: 650000000 },
        { id: 8, store: { id: 8, name: 'vietphone 31' }, target: 550000000 },
    ],
    dataTarget: {},
    dataMeta: { total: 1, page: "1", limit: "5" },
    isLoading: false,
    isResult: false,
}

const targetReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.TARGET_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.TARGET_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTargets: action.data.targets,
                dataMeta: action.data.metadata
            }
        case action_types.GET_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataTarget: action.data
            }
        case action_types.CREATE_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_TARGET:
            return {
                ...state,
                dataTarget: action.data,
            }
        case action_types.ON_CHANGE_TARGET:
            let copyState = { ...state.dataTarget };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataTarget: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default targetReducers;