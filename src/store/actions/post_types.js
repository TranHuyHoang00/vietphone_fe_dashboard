import action_types from './action_types';
import { get_list_post, get_post, create_post, delete_post, edit_post } from '../../services/post_service';
import { message } from 'antd';
import { show_notification } from '../../utils/show_notification';

export const get_list_post_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(post_start());
            let data = await get_list_post(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_post_success(data.data.data));
            } else {
                dispatch(post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(post_faided());
            show_notification(error);
        }
    }
}
export const get_post_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(post_start());
            let data = await get_post(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_post_success(data.data.data));
            } else {
                dispatch(post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(post_faided());
            show_notification(error);
        }
    }
}
export const create_post_redux = (data_post) => {
    return async (dispatch, getState) => {
        try {
            dispatch(post_start());
            let data = await create_post(data_post);
            if (data && data.data && data.data.success === 1) {
                dispatch(post_success());
                message.success('Thành công');
            } else {
                dispatch(post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(post_faided());
            show_notification(error);
        }
    }
}
export const delete_list_post_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(post_start());
        for (const id of list_id) {
            try {
                let data = await delete_post(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(post_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(post_success());
    }
}
export const edit_list_post_redux = (list_id, data_post) => {
    return async (dispatch, getState) => {
        dispatch(post_start());
        for (const id of list_id) {
            try {
                let data = await edit_post(id, data_post);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(post_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(post_success());
    }
}
export const edit_post_redux = (id, data_post) => {
    return async (dispatch, getState) => {
        try {
            dispatch(post_start());
            let data = await edit_post(id, data_post);
            if (data && data.data && data.data.success === 1) {
                dispatch(post_success());
                message.success('Thành công');
            } else {
                dispatch(post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(post_faided());
            show_notification(error);
        }
    }
}
export const post_start = () => ({
    type: action_types.POST_START,
})
export const post_success = () => ({
    type: action_types.POST_SUCCESS,
})
export const post_faided = () => ({
    type: action_types.POST_FAIDED,
})

export const get_list_post_success = (data) => ({
    type: action_types.GET_LIST_POST_SUCCESS,
    data
})
export const get_post_success = (data) => ({
    type: action_types.GET_POST_SUCCESS,
    data
})
export const on_change_post_redux = (value, id) => ({
    type: action_types.ON_CHANGE_POST,
    value,
    id,
})
export const set_data_post_redux = (data) => ({
    type: action_types.SET_DATA_POST,
    data,
})