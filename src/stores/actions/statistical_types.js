import action_types from '@actions/action_types';
import { getViewWeb, getViewProduct } from '@services/statistical_service';
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
    type: action_types.STATISTICAL_START,
})
export const statisticalSuccess = () => ({
    type: action_types.STATISTICAL_SUCCESS,
})
export const statisticalFaided = () => ({
    type: action_types.STATISTICAL_FAIDED,
})

export const getViewWebSuccess = (data) => ({
    type: action_types.GET_VIEW_WEB_SUCCESS,
    data
})
export const getViewProductSuccess = (data) => ({
    type: action_types.GET_VIEW_PRODUCT_SUCCESS,
    data
})
export const onChangeStatisticalRedux = (value, id) => ({
    type: action_types.ON_CHANGE_STATISTICAL,
    value,
    id,
})
export const setDataStatisticalRedux = (data) => ({
    type: action_types.SET_STATISTICAL,
    data,
})