import action_types from '@actions/action_types';
import { get_list_promotion, get_promotion, create_promotion, delete_promotion, edit_promotion } from '@services/promotion_service';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_promotion_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(promotion_start());
            let data = await get_list_promotion(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_promotion_success(data.data.data));
            } else {
                dispatch(promotion_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(promotion_faided());
            show_notification(error);
        }
    }
}
export const get_promotion_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(promotion_start());
            let data = await get_promotion(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_promotion_success(data.data.data));
            } else {
                dispatch(promotion_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(promotion_faided());
            show_notification(error);
        }
    }
}
export const create_promotion_redux = (data_promotion) => {
    return async (dispatch, getState) => {
        try {
            dispatch(promotion_start());
            let data = await create_promotion(data_promotion);
            if (data && data.data && data.data.success === 1) {
                dispatch(promotion_success());
                message.success('Thành công');
            } else {
                dispatch(promotion_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(promotion_faided());
            show_notification(error);
        }
    }
}
export const delete_list_promotion_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(promotion_start());
        for (const id of list_id) {
            try {
                let data = await delete_promotion(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(promotion_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(promotion_success());
    }
}
export const edit_list_promotion_redux = (list_id, data_promotion) => {
    return async (dispatch, getState) => {
        dispatch(promotion_start());
        for (const id of list_id) {
            try {
                let data = await edit_promotion(id, data_promotion);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(promotion_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(promotion_success());
    }
}
export const edit_promotion_redux = (id, data_promotion) => {
    return async (dispatch, getState) => {
        try {
            dispatch(promotion_start());
            let data = await edit_promotion(id, data_promotion);
            if (data && data.data && data.data.success === 1) {
                dispatch(promotion_success());
                message.success('Thành công');
            } else {
                dispatch(promotion_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(promotion_faided());
            show_notification(error);
        }
    }
}
export const promotion_start = () => ({
    type: action_types.PROMOTION_START,
})
export const promotion_success = () => ({
    type: action_types.PROMOTION_SUCCESS,
})
export const promotion_faided = () => ({
    type: action_types.PROMOTION_FAIDED,
})

export const get_list_promotion_success = (data) => ({
    type: action_types.GET_LIST_PROMOTION_SUCCESS,
    data
})
export const get_promotion_success = (data) => ({
    type: action_types.GET_PROMOTION_SUCCESS,
    data
})
export const on_change_promotion_redux = (value, id) => ({
    type: action_types.ON_CHANGE_PROMOTION,
    value,
    id,
})
export const set_data_promotion_redux = (data) => ({
    type: action_types.SET_DATA_PROMOTION,
    data,
})