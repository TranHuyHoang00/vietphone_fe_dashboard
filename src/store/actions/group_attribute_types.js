import action_types from './action_types';
import { get_list_group_attribute, get_group_attribute, create_group_attribute, delete_group_attribute, edit_group_attribute } from '../../services/group_attribute_service';
import { message } from 'antd';

export const get_list_group_attribute_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_attribute_start());
            let data = await get_list_group_attribute(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_group_attribute_success(data.data.data));
            } else {
                dispatch(group_attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_attribute_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const get_group_attribute_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_attribute_start());
            let data = await get_group_attribute(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_group_attribute_success(data.data.data));
            } else {
                dispatch(group_attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_attribute_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_group_attribute_redux = (data_group_attribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_attribute_start());
            let data = await create_group_attribute(data_group_attribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(group_attribute_success());
                message.success('Thành công');
            } else {
                dispatch(group_attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_attribute_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const delete_list_group_attribute_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(group_attribute_start());
        for (const id of list_id) {
            try {
                let data = await delete_group_attribute(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(group_attribute_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(group_attribute_success());
    }
}
export const edit_list_group_attribute_redux = (list_id, data_group_attribute) => {
    return async (dispatch, getState) => {
        dispatch(group_attribute_start());
        for (const id of list_id) {
            try {
                let data = await edit_group_attribute(id, data_group_attribute);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(group_attribute_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(group_attribute_success());
    }
}
export const edit_group_attribute_redux = (id, data_group_attribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_attribute_start());
            let data = await edit_group_attribute(id, data_group_attribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(group_attribute_success());
                message.success('Thành công');
            } else {
                dispatch(group_attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_attribute_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const group_attribute_start = () => ({
    type: action_types.GROUP_ATTRIBUTE_START,
})
export const group_attribute_success = () => ({
    type: action_types.GROUP_ATTRIBUTE_SUCCESS,
})
export const group_attribute_faided = () => ({
    type: action_types.GROUP_ATTRIBUTE_FAIDED,
})

export const get_list_group_attribute_success = (data) => ({
    type: action_types.GET_LIST_GROUP_ATTRIBUTE_SUCCESS,
    data
})
export const get_group_attribute_success = (data) => ({
    type: action_types.GET_GROUP_ATTRIBUTE_SUCCESS,
    data
})
export const on_change_group_attribute_redux = (value, id) => ({
    type: action_types.ON_CHANGE_GROUP_ATTRIBUTE,
    value,
    id,
})
export const set_data_group_attribute_redux = (data) => ({
    type: action_types.SET_DATA_GROUP_ATTRIBUTE,
    data,
})