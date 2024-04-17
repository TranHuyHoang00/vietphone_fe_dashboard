import action_types from './action_types';
import { get_list_tag, get_tag, create_tag, delete_tag, edit_tag } from '../../services/tag_service';
import { message } from 'antd';
import { show_notification } from '../../utils/show_notification';

export const get_list_tag_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tag_start());
            let data = await get_list_tag(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_tag_success(data.data.data));
            } else {
                dispatch(tag_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tag_faided());
            show_notification(error);
        }
    }
}
export const get_tag_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tag_start());
            let data = await get_tag(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_tag_success(data.data.data));
            } else {
                dispatch(tag_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tag_faided());
            show_notification(error);
        }
    }
}
export const create_tag_redux = (data_tag) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tag_start());
            let data = await create_tag(data_tag);
            if (data && data.data && data.data.success === 1) {
                dispatch(tag_success());
                message.success('Thành công');
            } else {
                dispatch(tag_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tag_faided());
            show_notification(error);
        }
    }
}
export const delete_list_tag_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(tag_start());
        for (const id of list_id) {
            try {
                let data = await delete_tag(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(tag_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(tag_success());
    }
}
export const edit_list_tag_redux = (list_id, data_tag) => {
    return async (dispatch, getState) => {
        dispatch(tag_start());
        for (const id of list_id) {
            try {
                let data = await edit_tag(id, data_tag);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(tag_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(tag_success());
    }
}
export const edit_tag_redux = (id, data_tag) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tag_start());
            let data = await edit_tag(id, data_tag);
            if (data && data.data && data.data.success === 1) {
                dispatch(tag_success());
                message.success('Thành công');
            } else {
                dispatch(tag_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tag_faided());
            show_notification(error);
        }
    }
}
export const tag_start = () => ({
    type: action_types.TAG_START,
})
export const tag_success = () => ({
    type: action_types.TAG_SUCCESS,
})
export const tag_faided = () => ({
    type: action_types.TAG_FAIDED,
})

export const get_list_tag_success = (data) => ({
    type: action_types.GET_LIST_TAG_SUCCESS,
    data
})
export const get_tag_success = (data) => ({
    type: action_types.GET_TAG_SUCCESS,
    data
})
export const on_change_tag_redux = (value, id) => ({
    type: action_types.ON_CHANGE_TAG,
    value,
    id,
})
export const set_data_tag_redux = (data) => ({
    type: action_types.SET_DATA_TAG,
    data,
})