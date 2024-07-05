import actionTypes from './actionTypes';
import { getViewWeb, getViewProduct } from '@services/statistical/statisticalServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getViewWebRedux = (value) => {
    return async (dispatch, getState) => {
        try {
            dispatch(statisticalStart());
            let data = await getViewWeb(value);
            if (data && data.data && data.data.success === 1) {
                dispatch(getViewWebSuccess(data.data.data));
            } else {
                dispatch(statisticalFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(statisticalFaided());
            showNotification(error);
        }
    }
}
export const getViewProductRedux = (value) => {
    return async (dispatch, getState) => {
        try {
            dispatch(statisticalStart());
            let data = await getViewProduct(value);
            if (data && data.data && data.data.success === 1) {
                dispatch(getViewProductSuccess(data.data.data));
            } else {
                dispatch(statisticalFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(statisticalFaided());
            showNotification(error);
        }
    }
}
export const statisticalStart = () => ({
    type: actionTypes.STATISTICAL_START,
})
export const statisticalSuccess = () => ({
    type: actionTypes.STATISTICAL_SUCCESS,
})
export const statisticalFaided = () => ({
    type: actionTypes.STATISTICAL_FAIDED,
})

export const getViewWebSuccess = (data) => ({
    type: actionTypes.GET_VIEW_WEB_SUCCESS,
    data
})
export const getViewProductSuccess = (data) => ({
    type: actionTypes.GET_VIEW_PRODUCT_SUCCESS,
    data
})
export const onChangeStatisticalRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_STATISTICAL,
    value,
    id,
})
export const setDataStatisticalRedux = (data) => ({
    type: actionTypes.SET_STATISTICAL,
    data,
})