import actionTypes from '@actions/target/actionTypes';

const initialState = {
    dataReportTargetShops: [],
    dataReportTargetShop: {},
    dataReportTargetStaffs: [
        // {
        //     staff_monthly_target: {
        //         id: 24,
        //         staff: {
        //             id: 250,
        //             phone_number: "0336129272",
        //             name: "LÊ THỊ KIM HỒNG",
        //             status: "active",
        //             role: {
        //                 id: 2,
        //                 name: "NV BH CT",
        //                 code: "officialStaffSales"
        //             }
        //         },
        //         value: "100000000.00",
        //         month: "2024-07-01",
        //         target_product_category: [
        //             {
        //                 id: 13,
        //                 product_category: {
        //                     id: 1,
        //                     name: "PHỤ KIỆN",
        //                     code: "PK",
        //                     is_active: true
        //                 },
        //                 quantity: 0,
        //                 value: "10000000.00"
        //             },
        //             {
        //                 id: 14,
        //                 product_category: {
        //                     id: 3,
        //                     name: "ĐIỆN THOẠI CẢM ỨNG",
        //                     code: "DTCU",
        //                     is_active: true
        //                 },
        //                 quantity: 10,
        //                 value: "0.00"
        //             },
        //             {
        //                 id: 15,
        //                 product_category: {
        //                     id: 14,
        //                     name: "ÂM THANH",
        //                     code: "AT",
        //                     is_active: true
        //                 },
        //                 quantity: 0,
        //                 value: "25000000.00"
        //             }
        //         ]
        //     },
        //     revenue: {
        //         total_revenue: "200000000.00",
        //         product_sales: [
        //             {
        //                 code: "AT",
        //                 category_name: "ÂM THANH",
        //                 quantity: 0,
        //                 revenue: 175800
        //             },
        //             {
        //                 code: "PK",
        //                 category_name: "PHỤ KIỆN",
        //                 quantity: 17,
        //                 revenue: 20000000
        //             },
        //             {
        //                 code: "DTCU",
        //                 category_name: "ĐIỆN THOẠI CẢM ỨNG",
        //                 quantity: 16,
        //                 revenue: 15870000
        //             }

        //         ]
        //     },
        //     staff: {
        //         id: 250,
        //         user: {
        //             id: 3576,
        //             phone: "0336129272",
        //             full_name: "Tí Nị"
        //         },
        //         phone_number: "0336129272",
        //         name: "LÊ THỊ KIM HỒNG",
        //         status: "active",
        //         role: {
        //             id: 2,
        //             name: "NV BH CT",
        //             code: "officialStaffSales"
        //         }
        //     }
        // }
    ],
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