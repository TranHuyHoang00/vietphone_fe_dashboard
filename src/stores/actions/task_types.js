import action_types from '@actions/action_types';
import { getListTask, getDataTask, createTask, deleteTask, editTask } from '@services/task_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListTaskRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(task_start());
            let data = await getListTask(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_task_success(data.data.data));
            } else {
                dispatch(task_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(task_faided());
            showNotification(error);
        }
    }
}
export const getDataTaskRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(task_start());
            let data = await getDataTask(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_task_success(data.data.data));
            } else {
                dispatch(task_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(task_faided());
            showNotification(error);
        }
    }
}
export const createTaskRedux = (dataTask) => {
    return async (dispatch, getState) => {
        try {
            dispatch(task_start());
            let data = await createTask(dataTask);
            if (data && data.data && data.data.success === 1) {
                dispatch(task_success());
                message.success('Thành công');
            } else {
                dispatch(task_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(task_faided());
            showNotification(error);
        }
    }
}
export const deleteListTaskRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(task_start());
        for (const id of list_id) {
            try {
                let data = await deleteTask(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(task_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(task_success());
    }
}
export const editListRaskRedux = (list_id, dataTask) => {
    return async (dispatch, getState) => {
        dispatch(task_start());
        for (const id of list_id) {
            try {
                let data = await editTask(id, dataTask);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(task_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(task_success());
    }
}
export const editTaskRedux = (id, dataTask) => {
    return async (dispatch, getState) => {
        try {
            dispatch(task_start());
            let data = await editTask(id, dataTask);
            if (data && data.data && data.data.success === 1) {
                dispatch(task_success());
                message.success('Thành công');
            } else {
                dispatch(task_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(task_faided());
            showNotification(error);
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
export const setDataTaskRedux = (data) => ({
    type: action_types.SET_DATA_TASK,
    data,
})