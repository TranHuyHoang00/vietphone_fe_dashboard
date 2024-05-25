import action_types from '@actions/action_types';
import { get_list_group, get_group, create_group, delete_group, edit_group } from '@services/group_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const get_list_group_redux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_start());
            let data = await get_list_group(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_group_success(data.data.data));
            } else {
                dispatch(group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_faided());
            showNotification(error);
        }
    }
}
export const get_group_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_start());
            let data = await get_group(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_group_success(data.data.data));
            } else {
                dispatch(group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_faided());
            showNotification(error);
        }
    }
}
export const create_group_redux = (data_group) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_start());
            let data = await create_group(data_group);
            if (data && data.data && data.data.success === 1) {
                dispatch(group_success());
                message.success('Thành công');
            } else {
                dispatch(group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_faided());
            showNotification(error);
        }
    }
}
export const delete_list_group_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(group_start());
        for (const id of list_id) {
            try {
                let data = await delete_group(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(group_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(group_success());
    }
}
export const edit_list_group_redux = (list_id, data_group) => {
    return async (dispatch, getState) => {
        dispatch(group_start());
        for (const id of list_id) {
            try {
                let data = await edit_group(id, data_group);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(group_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(group_success());
    }
}
export const edit_group_redux = (id, data_group) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_start());
            let data = await edit_group(id, data_group);
            if (data && data.data && data.data.success === 1) {
                dispatch(group_success());
                message.success('Thành công');
            } else {
                dispatch(group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_faided());
            showNotification(error);
        }
    }
}
export const group_start = () => ({
    type: action_types.GROUP_START,
})
export const group_success = () => ({
    type: action_types.GROUP_SUCCESS,
})
export const group_faided = () => ({
    type: action_types.GROUP_FAIDED,
})

export const get_list_group_success = (data) => ({
    type: action_types.GET_LIST_GROUP_SUCCESS,
    data
})
export const get_group_success = (data) => ({
    type: action_types.GET_GROUP_SUCCESS,
    data
})
export const on_change_group_redux = (value, id) => ({
    type: action_types.ON_CHANGE_GROUP,
    value,
    id,
})
export const set_data_group_redux = (data) => ({
    type: action_types.SET_DATA_GROUP,
    data,
})