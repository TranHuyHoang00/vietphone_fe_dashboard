import action_types from './action_types';
import { get_list_category_post, get_category_post, create_category_post, delete_category_post, edit_category_post } from '../../services/category_post_service';
import { message } from 'antd';

export const get_list_category_post_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_post_start());
            let data = await get_list_category_post(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_category_post_success(data.data.data));
            } else {
                dispatch(category_post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_post_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const get_category_post_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_post_start());
            let data = await get_category_post(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_category_post_success(data.data.data));
            } else {
                dispatch(category_post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_post_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_category_post_redux = (data_category_post) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_post_start());
            let data = await create_category_post(data_category_post);
            if (data && data.data && data.data.success === 1) {
                dispatch(category_post_success());
                message.success('Thành công');
            } else {
                dispatch(category_post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_post_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const delete_list_category_post_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(category_post_start());
        for (const id of list_id) {
            try {
                let data = await delete_category_post(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(category_post_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(category_post_success());
    }
}
export const edit_list_category_post_redux = (list_id, data_category_post) => {
    return async (dispatch, getState) => {
        dispatch(category_post_start());
        for (const id of list_id) {
            try {
                let data = await edit_category_post(id, data_category_post);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(category_post_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(category_post_success());
    }
}
export const edit_category_post_redux = (id, data_category_post) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_post_start());
            let data = await edit_category_post(id, data_category_post);
            if (data && data.data && data.data.success === 1) {
                dispatch(category_post_success());
                message.success('Thành công');
            } else {
                dispatch(category_post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_post_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const category_post_start = () => ({
    type: action_types.CATEGORY_POST_START,
})
export const category_post_success = () => ({
    type: action_types.CATEGORY_POST_SUCCESS,
})
export const category_post_faided = () => ({
    type: action_types.CATEGORY_POST_FAIDED,
})

export const get_list_category_post_success = (data) => ({
    type: action_types.GET_LIST_CATEGORY_POST_SUCCESS,
    data
})
export const get_category_post_success = (data) => ({
    type: action_types.GET_CATEGORY_POST_SUCCESS,
    data
})
export const on_change_category_post_redux = (value, id) => ({
    type: action_types.ON_CHANGE_CATEGORY_POST,
    value,
    id,
})
export const set_data_category_post_redux = (data) => ({
    type: action_types.SET_DATA_CATEGORY_POST,
    data,
})