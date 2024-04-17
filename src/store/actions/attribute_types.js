import action_types from './action_types';
import { get_list_attribute, get_attribute, create_attribute, delete_attribute, edit_attribute } from '../../services/attribute_service';
import { message } from 'antd';
import { show_notification } from '../../utils/show_notification';

export const get_list_attribute_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_start());
            let data = await get_list_attribute(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_attribute_success(data.data.data));
            } else {
                dispatch(attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_faided());
            show_notification(error);
        }
    }
}
export const get_attribute_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_start());
            let data = await get_attribute(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_attribute_success(data.data.data));
            } else {
                dispatch(attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_faided());
            show_notification(error);
        }
    }
}
export const create_attribute_redux = (data_attribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_start());
            let data = await create_attribute(data_attribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(attribute_success());
                message.success('Thành công');
            } else {
                dispatch(attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_faided());
            show_notification(error);
        }
    }
}
export const delete_list_attribute_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(attribute_start());
        for (const id of list_id) {
            try {
                let data = await delete_attribute(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(attribute_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(attribute_success());
    }
}
export const edit_list_attribute_redux = (list_id, data_attribute) => {
    return async (dispatch, getState) => {
        dispatch(attribute_start());
        for (const id of list_id) {
            try {
                let data = await edit_attribute(id, data_attribute);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(attribute_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(attribute_success());
    }
}
export const edit_attribute_redux = (id, data_attribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_start());
            let data = await edit_attribute(id, data_attribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(attribute_success());
                message.success('Thành công');
            } else {
                dispatch(attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_faided());
            show_notification(error);
        }
    }
}
export const attribute_start = () => ({
    type: action_types.ATTRIBUTE_START,
})
export const attribute_success = () => ({
    type: action_types.ATTRIBUTE_SUCCESS,
})
export const attribute_faided = () => ({
    type: action_types.ATTRIBUTE_FAIDED,
})

export const get_list_attribute_success = (data) => ({
    type: action_types.GET_LIST_ATTRIBUTE_SUCCESS,
    data
})
export const get_attribute_success = (data) => ({
    type: action_types.GET_ATTRIBUTE_SUCCESS,
    data
})
export const on_change_attribute_redux = (value, id) => ({
    type: action_types.ON_CHANGE_ATTRIBUTE,
    value,
    id,
})
export const set_data_attribute_redux = (data) => ({
    type: action_types.SET_DATA_ATTRIBUTE,
    data,
})