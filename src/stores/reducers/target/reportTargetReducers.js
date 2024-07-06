import actionTypes from '@actions/target/actionTypes';

const initialState = {
    dataReportTargetShops: [],
    dataReportTargetShop: {},
    dataReportTargetStaffs: [],
    dataReportTargetStaff: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
}

const reportTargetReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REPORT_TARGET_START:
            return {
                ...state,
                isLoading: true,
                isResult: false,
            }
        case actionTypes.REPORT_TARGET_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
            }
        case actionTypes.REPORT_TARGET_FAIDED:
            return {
                ...state,
                isLoading: false,
                isResult: false,
            }

        case actionTypes.GET_LIST_REPORT_TARGET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataReportTargetShops: action.data,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_ALL_REPORT_TARGET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataReportTargetShops: action.data,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_REPORT_TARGET_SHOP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataReportTargetShop: action.data
            }
        case actionTypes.SET_DATA_REPORT_TARGET_SHOP:
            return {
                ...state,
                dataReportTargetShop: action.data,
            }
        case actionTypes.GET_LIST_REPORT_TARGET_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataReportTargetStaffs: action.data,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_ALL_REPORT_TARGET_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataReportTargetStaffs: action.data,
                dataMeta: action.data.metadata
            }
        case actionTypes.GET_REPORT_TARGET_STAFF_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isResult: true,
                dataReportTargetStaff: action.data
            }
        case actionTypes.SET_DATA_REPORT_TARGET_STAFF:
            return {
                ...state,
                dataReportTargetStaff: action.data,
            }
        default:
            return state;
    }
}

export default reportTargetReducers;