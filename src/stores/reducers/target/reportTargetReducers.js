import actionTypes from '@actions/target/actionTypes';
import dayjs from 'dayjs';
const initialState = {
    dataReportTargetShops: [],
    dataReportTargetShop: {},
    dataReportTargetStaffs: [],
    dataReportTargetStaff: {},
    dataMeta: {},
    isLoading: false,
    isResult: false,
    dataFilterShop: {
        start: dayjs().startOf('month').format("YYYY-MM-DD HH:mm:ss"),
        end: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    },
    typeActiveShop: {
        typeTable: 'overview',
        typeTime: 'month',
        typeView: 'all',
        listId: [],
    },

    dataFilterStaff: {
        start: dayjs().startOf('month').format("YYYY-MM-DD HH:mm:ss"),
        end: dayjs().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
    },
    typeActiveStaff: {
        typeTable: 'overview',
        typeTime: 'month',
        typeView: 'all',
        listId: [],
    },

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
        case actionTypes.SET_DATA_FILTER_REPORT_TARGET_SHOP:
            return {
                ...state,
                dataFilterShop: action.data,
            }
        case actionTypes.SET_TYPE_ACTIVE_REPORT_TARGET_SHOP:
            return {
                ...state,
                typeActiveShop: action.data,
            }
        case actionTypes.SET_DATA_FILTER_REPORT_TARGET_STAFF:
            return {
                ...state,
                dataFilterStaff: action.data,
            }
        case actionTypes.SET_TYPE_ACTIVE_REPORT_TARGET_STAFF:
            return {
                ...state,
                typeActiveStaff: action.data,
            }
        default:
            return state;
    }
}

export default reportTargetReducers;