import action_types from '@actions/action_types';
import { get_list_category, get_category, create_category, delete_category, edit_category } from '@services/category_service';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_category_redux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_start());
            let data = await get_list_category(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_category_success(data.data.data));
            } else {
                dispatch(category_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_faided());
            show_notification(error);
        }
    }
}
export const get_category_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_start());
            let data = await get_category(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_category_success(data.data.data));
            } else {
                dispatch(category_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_faided());
            show_notification(error);
        }
    }
}
export const create_category_redux = (data_category) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_start());
            let data = await create_category(data_category);
            if (data && data.data && data.data.success === 1) {
                dispatch(category_success());
                message.success('Thành công');
            } else {
                dispatch(category_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_faided());
            show_notification(error);
        }
    }
}
export const delete_list_category_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(category_start());
        for (const id of list_id) {
            try {
                let data = await delete_category(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(category_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(category_success());
    }
}
export const edit_list_category_redux = (list_id, data_category) => {
    return async (dispatch, getState) => {
        dispatch(category_start());
        for (const id of list_id) {
            try {
                let data = await edit_category(id, data_category);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(category_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(category_success());
    }
}
export const edit_category_redux = (id, data_category) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_start());
            let data = await edit_category(id, data_category);
            if (data && data.data && data.data.success === 1) {
                dispatch(category_success());
                message.success('Thành công');
            } else {
                dispatch(category_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_faided());
            show_notification(error);
        }
    }
}
export const category_start = () => ({
    type: action_types.CATEGORY_START,
})
export const category_success = () => ({
    type: action_types.CATEGORY_SUCCESS,
})
export const category_faided = () => ({
    type: action_types.CATEGORY_FAIDED,
})

export const get_list_category_success = (data) => ({
    type: action_types.GET_LIST_CATEGORY_SUCCESS,
    data
})
export const get_category_success = (data) => ({
    type: action_types.GET_CATEGORY_SUCCESS,
    data
})
export const on_change_category_redux = (value, id) => ({
    type: action_types.ON_CHANGE_CATEGORY,
    value,
    id,
})
export const set_data_category_redux = (data) => ({
    type: action_types.SET_DATA_CATEGORY,
    data,
})