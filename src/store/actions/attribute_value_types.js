import action_types from './action_types';
import { get_list_attribute_value, get_attribute_value, create_attribute_value, delete_attribute_value, edit_attribute_value } from '../../services/attribute_value_service';
import { message } from 'antd';

export const get_list_attribute_value_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_value_start());
            let data = await get_list_attribute_value(data_filter);
            if (data && data.data && data.data.success == 1) {
                dispatch(get_list_attribute_value_success(data.data.data));
            } else {
                dispatch(attribute_value_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_value_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const get_attribute_value_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_value_start());
            let data = await get_attribute_value(id);
            if (data && data.data && data.data.success == 1) {
                dispatch(get_attribute_value_success(data.data.data));
            } else {
                dispatch(attribute_value_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_value_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_attribute_value_redux = (data_attribute_value) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_value_start());
            let data = await create_attribute_value(data_attribute_value);
            if (data && data.data && data.data.success == 1) {
                dispatch(attribute_value_success());
                message.success('Thành công');
            } else {
                dispatch(attribute_value_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_value_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const delete_list_attribute_value_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(attribute_value_start());
        for (const id of list_id) {
            try {
                let data = await delete_attribute_value(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(attribute_value_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(attribute_value_success());
    }
}
export const edit_list_attribute_value_redux = (list_id, data_attribute_value) => {
    return async (dispatch, getState) => {
        dispatch(attribute_value_start());
        for (const id of list_id) {
            try {
                let data = await edit_attribute_value(id, data_attribute_value);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(attribute_value_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(attribute_value_success());
    }
}
export const edit_attribute_value_redux = (id, data_attribute_value) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attribute_value_start());
            let data = await edit_attribute_value(id, data_attribute_value);
            if (data && data.data && data.data.success == 1) {
                dispatch(attribute_value_success());
                message.success('Thành công');
            } else {
                dispatch(attribute_value_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attribute_value_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const attribute_value_start = () => ({
    type: action_types.ATTRIBUTE_VALUE_START,
})
export const attribute_value_success = () => ({
    type: action_types.ATTRIBUTE_VALUE_SUCCESS,
})
export const attribute_value_faided = () => ({
    type: action_types.ATTRIBUTE_VALUE_FAIDED,
})

export const get_list_attribute_value_success = (data) => ({
    type: action_types.GET_LIST_ATTRIBUTE_VALUE_SUCCESS,
    data
})
export const get_attribute_value_success = (data) => ({
    type: action_types.GET_ATTRIBUTE_VALUE_SUCCESS,
    data
})
export const on_change_attribute_value_redux = (value, id) => ({
    type: action_types.ON_CHANGE_ATTRIBUTE_VALUE,
    value,
    id,
})
export const set_data_attribute_value_redux = (data) => ({
    type: action_types.SET_DATA_ATTRIBUTE_VALUE,
    data,
})