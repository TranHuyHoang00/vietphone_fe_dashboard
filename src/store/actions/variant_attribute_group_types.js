import action_types from '@actions/action_types';
import { get_list_variant_attribute_group, get_variant_attribute_group, create_variant_attribute_group, delete_variant_attribute_group, edit_variant_attribute_group } from '@services/variant_attribute_group_service';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_variant_attribute_group_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_attribute_group_start());
            let data = await get_list_variant_attribute_group(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_variant_attribute_group_success(data.data.data));
            } else {
                dispatch(variant_attribute_group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_attribute_group_faided());
            show_notification(error);
        }
    }
}
export const get_variant_attribute_group_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_attribute_group_start());
            let data = await get_variant_attribute_group(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_variant_attribute_group_success(data.data.data));
            } else {
                dispatch(variant_attribute_group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_attribute_group_faided());
            show_notification(error);
        }
    }
}
export const create_variant_attribute_group_redux = (data_variant_attribute_group) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_attribute_group_start());
            let data = await create_variant_attribute_group(data_variant_attribute_group);
            if (data && data.data && data.data.success === 1) {
                dispatch(variant_attribute_group_success());
                message.success('Thành công');
            } else {
                dispatch(variant_attribute_group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_attribute_group_faided());
            show_notification(error);
        }
    }
}
export const delete_list_variant_attribute_group_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(variant_attribute_group_start());
        for (const id of list_id) {
            try {
                let data = await delete_variant_attribute_group(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(variant_attribute_group_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(variant_attribute_group_success());
    }
}
export const edit_list_variant_attribute_group_redux = (list_id, data_variant_attribute_group) => {
    return async (dispatch, getState) => {
        dispatch(variant_attribute_group_start());
        for (const id of list_id) {
            try {
                let data = await edit_variant_attribute_group(id, data_variant_attribute_group);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(variant_attribute_group_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(variant_attribute_group_success());
    }
}
export const edit_variant_attribute_group_redux = (id, data_variant_attribute_group) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_attribute_group_start());
            let data = await edit_variant_attribute_group(id, data_variant_attribute_group);
            if (data && data.data && data.data.success === 1) {
                dispatch(variant_attribute_group_success());
                message.success('Thành công');
            } else {
                dispatch(variant_attribute_group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_attribute_group_faided());
            show_notification(error);
        }
    }
}
export const variant_attribute_group_start = () => ({
    type: action_types.VARIANT_ATTRIBUTE_GROUP_START,
})
export const variant_attribute_group_success = () => ({
    type: action_types.VARIANT_ATTRIBUTE_GROUP_SUCCESS,
})
export const variant_attribute_group_faided = () => ({
    type: action_types.VARIANT_ATTRIBUTE_GROUP_FAIDED,
})

export const get_list_variant_attribute_group_success = (data) => ({
    type: action_types.GET_LIST_VARIANT_ATTRIBUTE_GROUP_SUCCESS,
    data
})
export const get_variant_attribute_group_success = (data) => ({
    type: action_types.GET_VARIANT_ATTRIBUTE_GROUP_SUCCESS,
    data
})
export const on_change_variant_attribute_group_redux = (value, id) => ({
    type: action_types.ON_CHANGE_VARIANT_ATTRIBUTE_GROUP,
    value,
    id,
})
export const set_data_variant_attribute_group_redux = (data) => ({
    type: action_types.SET_DATA_VARIANT_ATTRIBUTE_GROUP,
    data,
})
