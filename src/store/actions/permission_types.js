import action_types from './action_types';
import { get_list_permission, get_permission, create_permission, delete_permission, edit_permission } from '../../services/permission_service';
import { message } from 'antd';
import { show_notification } from '../../utils/show_notification';

export const get_list_permission_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(permission_start());
            let data = await get_list_permission(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_permission_success(data.data.data));
            } else {
                dispatch(permission_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(permission_faided());
            show_notification(error);
        }
    }
}
export const get_permission_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(permission_start());
            let data = await get_permission(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_permission_success(data.data.data));
            } else {
                dispatch(permission_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(permission_faided());
            show_notification(error);
        }
    }
}
export const create_permission_redux = (data_permission) => {
    return async (dispatch, getState) => {
        try {
            dispatch(permission_start());
            let data = await create_permission(data_permission);
            if (data && data.data && data.data.success === 1) {
                dispatch(permission_success());
                message.success('Thành công');
            } else {
                dispatch(permission_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(permission_faided());
            show_notification(error);
        }
    }
}
export const delete_list_permission_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(permission_start());
        for (const id of list_id) {
            try {
                let data = await delete_permission(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(permission_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(permission_success());
    }
}
export const edit_list_permission_redux = (list_id, data_permission) => {
    return async (dispatch, getState) => {
        dispatch(permission_start());
        for (const id of list_id) {
            try {
                let data = await edit_permission(id, data_permission);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(permission_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(permission_success());
    }
}
export const edit_permission_redux = (id, data_permission) => {
    return async (dispatch, getState) => {
        try {
            dispatch(permission_start());
            let data = await edit_permission(id, data_permission);
            if (data && data.data && data.data.success === 1) {
                dispatch(permission_success());
                message.success('Thành công');
            } else {
                dispatch(permission_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(permission_faided());
            show_notification(error);
        }
    }
}
export const permission_start = () => ({
    type: action_types.PERMISSION_START,
})
export const permission_success = () => ({
    type: action_types.PERMISSION_SUCCESS,
})
export const permission_faided = () => ({
    type: action_types.PERMISSION_FAIDED,
})

export const get_list_permission_success = (data) => ({
    type: action_types.GET_LIST_PERMISSION_SUCCESS,
    data
})
export const get_permission_success = (data) => ({
    type: action_types.GET_PERMISSION_SUCCESS,
    data
})
export const on_change_permission_redux = (value, id) => ({
    type: action_types.ON_CHANGE_PERMISSION,
    value,
    id,
})
export const set_data_permission_redux = (data) => ({
    type: action_types.SET_DATA_PERMISSION,
    data,
})