import action_types from '@actions/action_types';
import { get_list_task, get_task, create_task, delete_task, edit_task } from '@services/task_service';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_task_redux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(task_start());
            let data = await get_list_task(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_task_success(data.data.data));
            } else {
                dispatch(task_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(task_faided());
            show_notification(error);
        }
    }
}
export const get_task_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(task_start());
            let data = await get_task(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_task_success(data.data.data));
            } else {
                dispatch(task_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(task_faided());
            show_notification(error);
        }
    }
}
export const create_task_redux = (data_task) => {
    return async (dispatch, getState) => {
        try {
            dispatch(task_start());
            let data = await create_task(data_task);
            if (data && data.data && data.data.success === 1) {
                dispatch(task_success());
                message.success('Thành công');
            } else {
                dispatch(task_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(task_faided());
            show_notification(error);
        }
    }
}
export const delete_list_task_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(task_start());
        for (const id of list_id) {
            try {
                let data = await delete_task(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(task_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(task_success());
    }
}
export const edit_list_task_redux = (list_id, data_task) => {
    return async (dispatch, getState) => {
        dispatch(task_start());
        for (const id of list_id) {
            try {
                let data = await edit_task(id, data_task);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(task_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(task_success());
    }
}
export const edit_task_redux = (id, data_task) => {
    return async (dispatch, getState) => {
        try {
            dispatch(task_start());
            let data = await edit_task(id, data_task);
            if (data && data.data && data.data.success === 1) {
                dispatch(task_success());
                message.success('Thành công');
            } else {
                dispatch(task_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(task_faided());
            show_notification(error);
        }
    }
}
export const task_start = () => ({
    type: action_types.TASK_START,
})
export const task_success = () => ({
    type: action_types.TASK_SUCCESS,
})
export const task_faided = () => ({
    type: action_types.TASK_FAIDED,
})

export const get_list_task_success = (data) => ({
    type: action_types.GET_LIST_TASK_SUCCESS,
    data
})
export const get_task_success = (data) => ({
    type: action_types.GET_TASK_SUCCESS,
    data
})
export const on_change_task_redux = (value, id) => ({
    type: action_types.ON_CHANGE_TASK,
    value,
    id,
})
export const set_data_task_redux = (data) => ({
    type: action_types.SET_DATA_TASK,
    data,
})