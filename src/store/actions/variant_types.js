import action_types from './action_types';
import { get_list_variant, get_variant, create_variant, delete_variant, edit_variant } from '../../services/variant_service';
import { message } from 'antd';

export const get_list_variant_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_start());
            let data = await get_list_variant(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_variant_success(data.data.data));
            } else {
                dispatch(variant_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const get_variant_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_start());
            let data = await get_variant(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_variant_success(data.data.data));
            } else {
                dispatch(variant_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_variant_redux = (data_variant) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_start());
            let data = await create_variant(data_variant);
            if (data && data.data && data.data.success === 1) {
                dispatch(variant_success());
                message.success('Thành công');
            } else {
                dispatch(variant_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(variant_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const delete_list_variant_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(variant_start());
        for (const id of list_id) {
            try {
                let data = await delete_variant(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(variant_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(variant_success());
    }
}
export const edit_list_variant_redux = (list_id, data_variant) => {
    return async (dispatch, getState) => {
        dispatch(variant_start());
        for (const id of list_id) {
            try {
                let data = await edit_variant(id, data_variant);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(variant_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(variant_success());
    }
}
export const edit_variant_redux = (id, data_variant) => {
    return async (dispatch, getState) => {
        try {
            dispatch(variant_start());
            let data = await edit_variant(id, data_variant);
            if (data && data.data && data.data.success === 1) {
                dispatch(variant_success());
                message.success('Thành công');
            } else {
                dispatch(variant_faided());
                message.error(`Lỗi khi sửa biến thể`);
            }
        } catch (error) {
            dispatch(variant_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const variant_start = () => ({
    type: action_types.VARIANT_START,
})
export const variant_success = () => ({
    type: action_types.VARIANT_SUCCESS,
})
export const variant_faided = () => ({
    type: action_types.VARIANT_FAIDED,
})

export const get_list_variant_success = (data) => ({
    type: action_types.GET_LIST_VARIANT_SUCCESS,
    data
})
export const get_variant_success = (data) => ({
    type: action_types.GET_VARIANT_SUCCESS,
    data
})
export const on_change_variant_redux = (value, id) => ({
    type: action_types.ON_CHANGE_VARIANT,
    value,
    id,
})
export const set_data_variant_redux = (data) => ({
    type: action_types.SET_DATA_VARIANT,
    data,
})

export const click_edit_variant_redux = (data) => ({
    type: action_types.CLICK_EDIT_VARIANT,
    data: data
})
export const set_data_filter_variant_redux = (data) => ({
    type: action_types.SET_DATA_FILTER_VARIANT,
    data,
})