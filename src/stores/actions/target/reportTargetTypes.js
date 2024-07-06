import actionTypes from './actionTypes';
import {
    getListReportTargetShop, getAllReportTargetShop,
    //getListReportTargetStaff, getAllReportTargetStaff,
    getReportTargetShop, getReportTargetStaff
} from '@services/target/reportTargetServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

const X1 = [
    {
        staff: { id: 1, name: "QUACH ANH MINH", phone_number: "0876277393" },
        value: "50000000.00",
        month: "2024-08-01",
        target_product_category: [
            {
                id: 2,
                product_category: {
                    id: 2,
                    name: "PHỤ KIỆN VI TÍNH",
                    code: "PGN00017",
                    is_active: true
                },
                quantity: 1,
                value: "0.00"
            },
            {
                id: 3,
                product_category: {
                    id: 3,
                    name: "ĐIỆN THOẠI CẢM ỨNG",
                    code: "PGN00017",
                    is_active: true
                },
                quantity: 411,
                value: "60000.00"

            },
            {
                id: 4,
                product_category: {
                    id: 3,
                    name: "PIN SẠC DỰ PHÒNG",
                    code: "PGN00017",
                    is_active: true
                },
                quantity: 11,
                value: "650000000.00"

            }
        ],
        revenue: {
            total_revenue: "10219000.00",
            product_sales: [
                { category: 'ĐIỆN THOẠI CẢM ỨNG', quantity: -2, revenue: "5380000.00" },
                { category: 'IPHONE NGUYÊN SEAL', quantity: 10, revenue: "14090000.00" },
                { category: 'DỊCH VỤ SỬA CHỮA - ƯU ĐÃI', quantity: 0, revenue: "0.00" },
                { category: 'PIN SẠC DỰ PHÒNG', quantity: 14, revenue: "79000.00" },
                { category: 'PHỤ KIỆN', quantity: 27, revenue: "1636000.00" },
                { category: 'TAI NGHE', quantity: 7, revenue: "0.00" },
                { category: 'LOA NGHE NHẠC', quantity: 1, revenue: "299000.00" },
                { category: 'LOA KÉO KARAOKE', quantity: 1, revenue: "1190000.00" }
            ],
        },
        daily: {
            total_revenue: "53800000.00",
            product_sales: [
                { category: 'ĐIỆN THOẠI CẢM ỨNG', quantity: -2, revenue: "5380000.00" },
                { category: 'IPHONE NGUYÊN SEAL', quantity: 10, revenue: "14090000.00" },
                { category: 'DỊCH VỤ SỬA CHỮA - ƯU ĐÃI', quantity: 0, revenue: "0.00" },
                { category: 'PIN SẠC DỰ PHÒNG', quantity: 2, revenue: "79000.00" },
                { category: 'PHỤ KIỆN', quantity: 27, revenue: "1636000.00" },
                { category: 'TAI NGHE', quantity: 7, revenue: "299000.00" },
                { category: 'LOA NGHE NHẠC', quantity: 1, revenue: "299000.00" },
                { category: 'LOA KÉO KARAOKE', quantity: 1, revenue: "1190000.00" }
            ],
        }
    },
    {
        staff: { id: 2, name: "QUACH ANH", phone_number: "0876277393" },
        value: "50000000.00",
        month: "2024-08-01",
        target_product_category: [
            {
                id: 2,
                product_category: {
                    id: 2,
                    name: "PHỤ KIỆN VI TÍNH",
                    code: "PGN00017",
                    is_active: true
                },
                quantity: 1,
                value: "0.00"
            },
            {
                id: 3,
                product_category: {
                    id: 3,
                    name: "ĐIỆN THOẠI CẢM ỨNG",
                    code: "PGN00017",
                    is_active: true
                },
                quantity: 4,
                value: "65000000.00"

            }
        ],
        revenue: {
            total_revenue: "10219000.00",
            product_sales: [
                { category: 'ĐIỆN THOẠI CẢM ỨNG', quantity: -2, revenue: "5380000.00" },
                { category: 'IPHONE NGUYÊN SEAL', quantity: 10, revenue: "14090000.00" },
                { category: 'DỊCH VỤ SỬA CHỮA - ƯU ĐÃI', quantity: 0, revenue: "0.00" },
                { category: 'PIN SẠC DỰ PHÒNG', quantity: 2, revenue: "79000.00" },
                { category: 'PHỤ KIỆN', quantity: 27, revenue: "1636000.00" },
                { category: 'TAI NGHE', quantity: 7, revenue: "0.00" },
                { category: 'LOA NGHE NHẠC', quantity: 1, revenue: "299000.00" },
                { category: 'LOA KÉO KARAOKE', quantity: 1, revenue: "1190000.00" }
            ],
        },
        daily: {
            total_revenue: "53800000.00",
            product_sales: [
                { category: 'ĐIỆN THOẠI CẢM ỨNG', quantity: -2, revenue: "5380000.00" },
                { category: 'IPHONE NGUYÊN SEAL', quantity: 10, revenue: "14090000.00" },
                { category: 'DỊCH VỤ SỬA CHỮA - ƯU ĐÃI', quantity: 0, revenue: "0.00" },
                { category: 'PIN SẠC DỰ PHÒNG', quantity: 2, revenue: "79000.00" },
                { category: 'PHỤ KIỆN', quantity: 27, revenue: "1636000.00" },
                { category: 'TAI NGHE', quantity: 7, revenue: "299000.00" },
                { category: 'LOA NGHE NHẠC', quantity: 1, revenue: "299000.00" },
                { category: 'LOA KÉO KARAOKE', quantity: 1, revenue: "1190000.00" }
            ],
        }
    }
];
const X2 = [
    {
        staff: { id: 1, name: "QUACH ANH MINH", phone_number: "0876277393" },
        value: "50000000.00",
        month: "2024-08-01",
        target_product_category: [
            {
                id: 2,
                product_category: {
                    id: 2,
                    name: "PHỤ KIỆN VI TÍNH",
                    code: "PGN00017",
                    is_active: true
                },
                quantity: 1,
                value: "0.00"
            },
            {
                id: 3,
                product_category: {
                    id: 3,
                    name: "ĐIỆN THOẠI CẢM ỨNG",
                    code: "PGN00017",
                    is_active: true
                },
                quantity: 411,
                value: "6500000000.00"

            },

        ],
        revenue: {
            total_revenue: "10219000.00",
            product_sales: [
                { category: 'ĐIỆN THOẠI CẢM ỨNG', quantity: -2, revenue: "5380000.00" },
                { category: 'IPHONE NGUYÊN SEAL', quantity: 10, revenue: "14090000.00" },
                { category: 'DỊCH VỤ SỬA CHỮA - ƯU ĐÃI', quantity: 0, revenue: "0.00" },
                { category: 'PIN SẠC DỰ PHÒNG', quantity: 2, revenue: "79000.00" },
                { category: 'PHỤ KIỆN', quantity: 27, revenue: "1636000.00" },
                { category: 'TAI NGHE', quantity: 7, revenue: "0.00" },
                { category: 'LOA NGHE NHẠC', quantity: 1, revenue: "299000.00" },
                { category: 'LOA KÉO KARAOKE', quantity: 1, revenue: "1190000.00" }
            ],
        },
        daily: {
            total_revenue: "53800000.00",
            product_sales: [
                { category: 'ĐIỆN THOẠI CẢM ỨNG', quantity: -2, revenue: "5380000.00" },
                { category: 'IPHONE NGUYÊN SEAL', quantity: 10, revenue: "14090000.00" },
                { category: 'DỊCH VỤ SỬA CHỮA - ƯU ĐÃI', quantity: 0, revenue: "0.00" },
                { category: 'PIN SẠC DỰ PHÒNG', quantity: 2, revenue: "79000.00" },
                { category: 'PHỤ KIỆN', quantity: 27, revenue: "1636000.00" },
                { category: 'TAI NGHE', quantity: 7, revenue: "299000.00" },
                { category: 'LOA NGHE NHẠC', quantity: 1, revenue: "299000.00" },
                { category: 'LOA KÉO KARAOKE', quantity: 1, revenue: "1190000.00" }
            ],
        }
    },
    {
        staff: { id: 2, name: "QUACH ANH", phone_number: "0876277393" },
        value: "50000000.00",
        month: "2024-08-01",
        target_product_category: [
            {
                id: 2,
                product_category: {
                    id: 2,
                    name: "PHỤ KIỆN VI TÍNH",
                    code: "PGN00017",
                    is_active: true
                },
                quantity: 1,
                value: "0.00"
            },
            {
                id: 3,
                product_category: {
                    id: 3,
                    name: "ĐIỆN THOẠI CẢM ỨNG",
                    code: "PGN00017",
                    is_active: true
                },
                quantity: 4,
                value: "65000000.00"

            }
        ],
        revenue: {
            total_revenue: "10219000.00",
            product_sales: [
                { category: 'ĐIỆN THOẠI CẢM ỨNG', quantity: -2, revenue: "5380000.00" },
                { category: 'IPHONE NGUYÊN SEAL', quantity: 10, revenue: "14090000.00" },
                { category: 'DỊCH VỤ SỬA CHỮA - ƯU ĐÃI', quantity: 0, revenue: "0.00" },
                { category: 'PIN SẠC DỰ PHÒNG', quantity: 2, revenue: "79000.00" },
                { category: 'PHỤ KIỆN', quantity: 27, revenue: "1636000.00" },
                { category: 'TAI NGHE', quantity: 7, revenue: "0.00" },
                { category: 'LOA NGHE NHẠC', quantity: 1, revenue: "299000.00" },
                { category: 'LOA KÉO KARAOKE', quantity: 1, revenue: "1190000.00" }
            ],
        },
        daily: {
            total_revenue: "53800000.00",
            product_sales: [
                { category: 'ĐIỆN THOẠI CẢM ỨNG', quantity: -2, revenue: "5380000.00" },
                { category: 'IPHONE NGUYÊN SEAL', quantity: 10, revenue: "14090000.00" },
                { category: 'DỊCH VỤ SỬA CHỮA - ƯU ĐÃI', quantity: 0, revenue: "0.00" },
                { category: 'PIN SẠC DỰ PHÒNG', quantity: 2, revenue: "79000.00" },
                { category: 'PHỤ KIỆN', quantity: 27, revenue: "1636000.00" },
                { category: 'TAI NGHE', quantity: 7, revenue: "299000.00" },
                { category: 'LOA NGHE NHẠC', quantity: 1, revenue: "299000.00" },
                { category: 'LOA KÉO KARAOKE', quantity: 1, revenue: "1190000.00" }
            ],
        }
    }
];
const combineData = (datasFirst, datasSecond) => {
    const newDatas = datasFirst.map((itemFirst) => {
        const itemSelected = datasSecond.find((itemSecond) => itemSecond?.staff?.id === itemFirst.staff?.id);
        return {
            ...itemFirst,
            daily: itemSelected?.revenue ? itemSelected?.revenue : {},
        };
    });
    return newDatas;
}

export const getListReportTargetShopRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(reportTargetStart());
            const data = await getListReportTargetShop(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListReportTargetShopSuccess(data.data.data));
            } else {
                dispatch(reportTargetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(reportTargetFaided());
            showNotification(error);
        }
    }
}
export const getAllReportTargetShopRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(reportTargetStart());
            const data = await getAllReportTargetShop(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getAllReportTargetShopSuccess(data.data.data));
            } else {
                dispatch(reportTargetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(reportTargetFaided());
            showNotification(error);
        }
    }
}
export const getDataReportTargetShopRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(reportTargetStart());
            const data = await getReportTargetShop(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getReportTargetShopSuccess(data.data.data));
            } else {
                dispatch(reportTargetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(reportTargetFaided());
            showNotification(error);
        }
    }
}

export const getListReportTargetStaffRedux = (dataFilter, listId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(reportTargetStart());
            const newDataCombine = combineData(X1, X2);
            dispatch(getAllReportTargetStaffSuccess(newDataCombine));
            // const data = await getListReportTargetStaff(dataFilter, listId);
            // if (data && data.data && data.data.success === 1) {
            //     dispatch(getListReportTargetStaffSuccess(newDataCombine));
            // } else {
            //     dispatch(reportTargetFaided());
            //     message.error('Lỗi');
            // }
        } catch (error) {
            dispatch(reportTargetFaided());
            showNotification(error);
        }
    }
}
export const getAllReportTargetStaffRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(reportTargetStart());
            const newDataCombine = combineData(X1, X2);
            dispatch(getAllReportTargetStaffSuccess(newDataCombine));
            // const data = await getAllReportTargetStaff(dataFilter);
            // if (data && data.data && data.data.success === 1) {
            //     dispatch(getAllReportTargetStaffSuccess(data.data.data));
            // } else {
            //     dispatch(reportTargetFaided());
            //     message.error('Lỗi');
            // }
        } catch (error) {
            dispatch(reportTargetFaided());
            showNotification(error);
        }
    }
}
export const getDataReportTargetStaffRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(reportTargetStart());
            const data = await getReportTargetStaff(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getReportTargetStaffSuccess(data.data.data));
            } else {
                dispatch(reportTargetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(reportTargetFaided());
            showNotification(error);
        }
    }
}
export const reportTargetStart = () => ({
    type: actionTypes.REPORT_TARGET_START,
})
export const reportTargetSuccess = () => ({
    type: actionTypes.REPORT_TARGET_SUCCESS,
})
export const reportTargetFaided = () => ({
    type: actionTypes.REPORT_TARGET_FAIDED,
})

export const getListReportTargetShopSuccess = (data) => ({
    type: actionTypes.GET_LIST_REPORT_TARGET_SHOP_SUCCESS,
    data
})
export const getAllReportTargetShopSuccess = (data) => ({
    type: actionTypes.GET_ALL_REPORT_TARGET_SHOP_SUCCESS,
    data
})
export const getReportTargetShopSuccess = (data) => ({
    type: actionTypes.GET_REPORT_TARGET_SHOP_SUCCESS,
    data
})
export const getListReportTargetStaffSuccess = (data) => ({
    type: actionTypes.GET_LIST_REPORT_TARGET_STAFF_SUCCESS,
    data
})
export const getAllReportTargetStaffSuccess = (data) => ({
    type: actionTypes.GET_ALL_REPORT_TARGET_STAFF_SUCCESS,
    data
})
export const getReportTargetStaffSuccess = (data) => ({
    type: actionTypes.GET_REPORT_TARGET_STAFF_SUCCESS,
    data
})
export const setDataReportTargetRedux = (data) => ({
    type: actionTypes.SET_DATA_REPORT_TARGET,
    data,
})