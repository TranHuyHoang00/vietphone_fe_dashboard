import actionTypes from './actionTypes';
import dayjs from 'dayjs';
import {
    getListReportTargetShop, getAllReportTargetShop,
    getListReportTargetStaff, getAllReportTargetStaff,
    getReportTargetShop, getReportTargetStaff
} from '@services/target/reportTargetServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

const combineDataStaff = (datasFirst, datasSecond) => {
    const newDatas = datasFirst.map((itemFirst) => {
        const itemSelected = datasSecond.find((itemSecond) => itemSecond?.staff?.id === itemFirst.staff?.id);
        return {
            ...itemFirst,
            daily: itemSelected?.revenue ? itemSelected?.revenue : {},
        };
    });
    return newDatas;
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
                const newDatas = combineDataStaff(dataFirst?.data?.data, dataSecond?.data?.data);
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
                const newDatas = combineDataStaff(dataFirst?.data?.data, dataSecond?.data?.data);
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