import actionTypes from '@actions/website/actionTypes';

const initialState = {
    dataWarrantys: [],
    dataWarranty: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    isRepeat: '',
}

const warrantyReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WARRANTY_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.WARRANTY_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case actionTypes.GET_LIST_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataWarrantys: action.data.warranties,
                dataMeta: action.data.metadata,
                isRepeat: action.isRepeat,
            }
        case actionTypes.GET_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataWarranty: action.data
            }
        case actionTypes.CREATE_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.EDIT_LIST_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.DELETE_LIST_WARRANTY_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.SET_DATA_WARRANTY:
            return {
                ...state,
                dataWarranty: action.data,
            }
        case actionTypes.ON_CHANGE_WARRANTY:
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