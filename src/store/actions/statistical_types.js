import action_types from '@actions/action_types';
import { get_view_web, get_view_product } from '@services/statistical_service';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_view_web_redux = (value) => {
    return async (dispatch, getState) => {
        try {
            dispatch(statistical_start());
            let data = await get_view_web(value);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_view_web_success(data.data.data));
            } else {
                dispatch(statistical_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(statistical_faided());
            show_notification(error);
        }
    }
}
export const get_view_product_redux = (value) => {
    return async (dispatch, getState) => {
        try {
            dispatch(statistical_start());
            let data = await get_view_product(value);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_view_product_success(data.data.data));
            } else {
                dispatch(statistical_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(statistical_faided());
            show_notification(error);
        }
    }
}
export const statistical_start = () => ({
    type: action_types.STATISTICAL_START,
})
export const statistical_success = () => ({
    type: action_types.STATISTICAL_SUCCESS,
})
export const statistical_faided = () => ({
    type: action_types.STATISTICAL_FAIDED,
})

export const get_view_web_success = (data) => ({
    type: action_types.GET_VIEW_WEB_SUCCESS,
    data
})
export const get_view_product_success = (data) => ({
    type: action_types.GET_VIEW_PRODUCT_SUCCESS,
    data
})
export const on_change_statistical_redux = (value, id) => ({
    type: action_types.ON_CHANGE_STATISTICAL,
    value,
    id,
})
export const set_statistical_redux = (data) => ({
    type: action_types.SET_STATISTICAL,
    data,
})