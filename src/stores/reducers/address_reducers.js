import action_types from '@actions/action_types';

const initialState = {
    dataProvinces: [],
    dataProvince: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,

    dataDistricts: [],
    dataDistrict: {},
    dataWards: [],
    dataWard: {},
}

const addressReducers = (state = initialState, action) => {
    switch (action.type) {
        case action_types.ADDRESS_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case action_types.ADDRESS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case action_types.ADDRESS_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }
        case action_types.GET_LIST_PROVINCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProvinces: action.data.provinces,
                dataMeta: action.data.metadata
            }
        case action_types.GET_PROVINCE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataProvince: action.data
            }
        case action_types.SET_DATA_PROVINCE:
            return {
                ...state,
                dataProvince: action.data,
            }

        case action_types.GET_LIST_DISTRICT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataDistricts: action.data.districts,
                dataMeta: action.data.metadata
            }
        case action_types.GET_DISTRICT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataDistrict: action.data
            }
        case action_types.SET_DATA_DISTRICT:
            return {
                ...state,
                dataDistrict: action.data,
            }

        case action_types.GET_LIST_WARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataWards: action.data.wards,
                dataMeta: action.data.metadata
            }
        case action_types.GET_WARD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataWard: action.data
            }
        case action_types.SET_DATA_WARD:
            return {
                ...state,
                dataWard: action.data,
            }
        default:
            return state;
    }
}

export default addressReducers;