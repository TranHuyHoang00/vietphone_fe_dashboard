import action_types from '@actions/action_types';
import { getListTask, getDataTask, createTask, deleteTask, editTask } from '@services/task_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListTaskRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(taskStart());
            let data = await getListTask(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListTaskSuccess(data.data.data));
            } else {
                dispatch(taskFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(taskFaided());
            showNotification(error);
        }
    }
}
export const getDataTaskRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(taskStart());
            let data = await getDataTask(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getTaskSuccess(data.data.data));
            } else {
                dispatch(taskFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(taskFaided());
            showNotification(error);
        }
    }
}
export const createTaskRedux = (dataTask) => {
    return async (dispatch, getState) => {
        try {
            dispatch(taskStart());
            let data = await createTask(dataTask);
            if (data && data.data && data.data.success === 1) {
                dispatch(taskSuccess());
                message.success('Thành công');
            } else {
                dispatch(taskFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(taskFaided());
            showNotification(error);
        }
    }
}
export const deleteListTaskRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(taskStart());
        for (const id of list_id) {
            try {
                let data = await deleteTask(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(taskFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(taskSuccess());
    }
}
export const editListRaskRedux = (list_id, dataTask) => {
    return async (dispatch, getState) => {
        dispatch(taskStart());
        for (const id of list_id) {
            try {
                let data = await editTask(id, dataTask);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(taskFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(taskSuccess());
    }
}
export const editTaskRedux = (id, dataTask) => {
    return async (dispatch, getState) => {
        try {
            dispatch(taskStart());
            let data = await editTask(id, dataTask);
            if (data && data.data && data.data.success === 1) {
                dispatch(taskSuccess());
                message.success('Thành công');
            } else {
                dispatch(taskFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(taskFaided());
            showNotification(error);
        }
    }
}
export const taskStart = () => ({
    type: action_types.TASK_START,
})
export const taskSuccess = () => ({
    type: action_types.TASK_SUCCESS,
})
export const taskFaided = () => ({
    type: action_types.TASK_FAIDED,
})

export const getListTaskSuccess = (data) => ({
    type: action_types.GET_LIST_TASK_SUCCESS,
    data
})
export const getTaskSuccess = (data) => ({
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