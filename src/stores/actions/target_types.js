import action_types from '@actions/action_types';
import { getListTarget, getDataTarget, createTarget, deleteTarget, editTarget } from '@services/target_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListTargetRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetStart());
            let data = await getListTarget(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListTargetSuccess(data.data.data));
            } else {
                dispatch(targetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetFaided());
            showNotification(error);
        }
    }
}
export const getDataTargetRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetStart());
            let data = await getDataTarget(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getTargetSuccess(data.data.data));
            } else {
                dispatch(targetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetFaided());
            showNotification(error);
        }
    }
}
export const createTargetRedux = (dataTarget) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetStart());
            let data = await createTarget(dataTarget);
            if (data && data.data && data.data.success === 1) {
                dispatch(targetSuccess());
                message.success('Thành công');
            } else {
                dispatch(targetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetFaided());
            showNotification(error);
        }
    }
}
export const deleteListTargetRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(targetStart());
        for (const id of list_id) {
            try {
                let data = await deleteTarget(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(targetFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(targetSuccess());
    }
}
export const editListTargetRedux = (list_id, dataTarget) => {
    return async (dispatch, getState) => {
        dispatch(targetStart());
        for (const id of list_id) {
            try {
                let data = await editTarget(id, dataTarget);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(targetFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(targetSuccess());
    }
}
export const editTargetRedux = (id, dataTarget) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetStart());
            let data = await editTarget(id, dataTarget);
            if (data && data.data && data.data.success === 1) {
                dispatch(targetSuccess());
                message.success('Thành công');
            } else {
                dispatch(targetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetFaided());
            showNotification(error);
        }
    }
}
export const targetStart = () => ({
    type: action_types.TARGET_START,
})
export const targetSuccess = () => ({
    type: action_types.TARGET_SUCCESS,
})
export const targetFaided = () => ({
    type: action_types.TARGET_FAIDED,
})

export const getListTargetSuccess = (data) => ({
    type: action_types.GET_LIST_TARGET_SUCCESS,
    data
})
export const getTargetSuccess = (data) => ({
    type: action_types.GET_TARGET_SUCCESS,
    data
})
export const onChangeTargetRedux = (value, id) => ({
    type: action_types.ON_CHANGE_TARGET,
    value,
    id,
})
export const setDataTargetRedux = (data) => ({
    type: action_types.SET_DATA_TARGET,
    data,
})