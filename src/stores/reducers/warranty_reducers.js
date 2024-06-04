import action_types from '@actions/action_types';

const initialState = {
    dataWarrantys: [],
    dataWarranty: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const warrantyReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.WARRANTY_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.WARRANTY_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataWarrantys: action.data.warranties,
                dataMeta: action.data.metadata
            }
        case action_types.GET_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataWarranty: action.data
            }
        case action_types.CREATE_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.EDIT_LIST_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.DELETE_LIST_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.SET_DATA_WARRANTY:
            return {
                ...state,
                dataWarranty: action.data,
            }
        case action_types.ON_CHANGE_WARRANTY:
            let copyState = { ...state.dataWarranty };
            copyState[action.id] = action.value;
            return {
                ...state,
                dataWarranty: {
                    ...copyState,
                }
            }
        default:
            return state;
    }
}

export default warrantyReducers;