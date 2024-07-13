import actionTypes from './actionTypes';
import dayjs from 'dayjs';
import {
    getListReportTargetShop, getAllReportTargetShop,
    getListReportTargetStaff, getAllReportTargetStaff,
    getReportTargetShop, getReportTargetStaff
} from '@services/target/reportTargetServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';


const combineDataStaff = async (datasFirst, datasSecond, dataFilter) => {
    const newDatas = await Promise.all(datasFirst.map(async (itemFirst) => {
        const itemSelected = datasSecond.find((itemSecond) => itemSecond?.staff?.id === itemFirst.staff?.id);
        const userRole = itemFirst?.staff?.role?.code;
        let shopID = null;
        let dataAchieveTargetShopMonths = null;
        let dataAchieveTargetShopDailys = null;
        if (userRole === "officialHeadShops" || userRole === "probationHeadShops") {
            shopID = itemFirst?.staff?.shop?.id;
        }
        if (shopID !== null) {
            const dataFilterSecond = {
                start: dayjs(dataFilter?.end).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                end: dataFilter?.end
            }
            dataAchieveTargetShopMonths = await getReportTargetShopForStaff(dataFilter, [shopID]);
            dataAchieveTargetShopDailys = await getReportTargetShopForStaff(dataFilterSecond, [shopID]);
        }

        return {
            ...itemFirst,
            daily: itemSelected?.revenue ? itemSelected?.revenue : {},
            revenueShopMonth: dataAchieveTargetShopMonths ? dataAchieveTargetShopMonths?.[0]?.revenue : null,
            revenueShopDaily: dataAchieveTargetShopDailys ? dataAchieveTargetShopDailys?.[0]?.revenue : null,
        };
    }));
    return newDatas;
}
const getReportTargetShopForStaff = async (dataFilter, listId) => {
    try {
        const data = await getListReportTargetShop(dataFilter, listId);
        if (data && data.data) {
            return data?.data?.data
        } else {
            return []
        }
    } catch (error) {
        return []
    }
}
const combineDataShop = (datasFirst, datasSecond) => {
    const newDatas = datasFirst.map((itemFirst) => {
        const itemSelected = datasSecond.find((itemSecond) => itemSecond?.shop?.id === itemFirst.shop?.id);
        return {
            ...itemFirst,
            daily: itemSelected?.revenue ? itemSelected?.revenue : {},
        };
    });
    return newDatas;
}

export const getListReportTargetShopRedux = (dataFilter, listId) => {
    return async (dispatch, getState) => {
        try {
            dispatch(reportTargetStart());
            const dataFirst = await getListReportTargetShop(dataFilter, listId);
            const dataFilterSecond = {
                start: dayjs(dataFilter?.end).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                end: dataFilter?.end
            }
            const dataSecond = await getListReportTargetShop(dataFilterSecond, listId);
            if (dataFirst && dataSecond && dataFirst.data && dataSecond.data) {
                const newDatas = combineDataShop(dataFirst?.data?.data, dataSecond?.data?.data);
                dispatch(getListReportTargetShopSuccess(newDatas));

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
            const dataFirst = await getAllReportTargetShop(dataFilter);
            const dataFilterSecond = {
                start: dayjs(dataFilter?.end).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                end: dataFilter?.end
            }
            const dataSecond = await getAllReportTargetShop(dataFilterSecond);
            if (dataFirst && dataSecond && dataFirst.data && dataSecond.data) {
                const newDatas = combineDataShop(dataFirst?.data?.data, dataSecond?.data?.data);
                dispatch(getAllReportTargetShopSuccess(newDatas));
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
            const dataFirst = await getListReportTargetStaff(dataFilter, listId);
            const dataFilterSecond = {
                start: dayjs(dataFilter?.end).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                end: dataFilter?.end
            }
            const dataSecond = await getListReportTargetStaff(dataFilterSecond, listId);

            if (dataFirst && dataSecond && dataFirst.data && dataSecond.data) {
                const newDatas = await combineDataStaff(dataFirst?.data?.data, dataSecond?.data?.data, dataFilter);
                dispatch(getListReportTargetStaffSuccess(newDatas));
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
export const getAllReportTargetStaffRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(reportTargetStart());
            const dataFirst = await getAllReportTargetStaff(dataFilter);
            const dataFilterSecond = {
                start: dayjs(dataFilter?.end).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                end: dataFilter?.end
            }
            const dataSecond = await getAllReportTargetStaff(dataFilterSecond);
            if (dataFirst && dataSecond && dataFirst.data && dataSecond.data) {
                const newDatas = await combineDataStaff(dataFirst?.data?.data, dataSecond?.data?.data, dataFilter);
                dispatch(getAllReportTargetStaffSuccess(newDatas));
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

export const setDataFilterReportTargetShopRedux = (data) => ({
    type: actionTypes.SET_DATA_FILTER_REPORT_TARGET_SHOP,
    data,
})
export const setTypeActiveReportTargetShopRedux = (data) => ({
    type: actionTypes.SET_TYPE_ACTIVE_REPORT_TARGET_SHOP,
    data,
})
export const setDataFilterReportTargetStaffRedux = (data) => ({
    type: actionTypes.SET_DATA_FILTER_REPORT_TARGET_STAFF,
    data,
})
export const setTypeActiveReportTargetStaffRedux = (data) => ({
    type: actionTypes.SET_TYPE_ACTIVE_REPORT_TARGET_STAFF,
    data,
})