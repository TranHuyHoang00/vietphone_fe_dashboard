import actionTypes from './actionTypes';
import { getListTargetStaff, getDataTargetStaff, createTargetStaff, deleteTargetStaff, editTargetStaff } from '@services/target/targetStaffServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListTargetStaffRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetStaffStart());
            const data = await getListTargetStaff(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListTargetStaffSuccess(data.data.data));
            } else {
                dispatch(targetStaffFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetStaffFaided());
            showNotification(error);
        }
    }
}
export const getDataTargetStaffRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetStaffStart());
            const data = await getDataTargetStaff(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getTargetStaffSuccess(data.data.data));
            } else {
                dispatch(targetStaffFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetStaffFaided());
            showNotification(error);
        }
    }
}
export const createTargetStaffRedux = (dataTargetStaff) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetStaffStart());
            const data = await createTargetStaff(dataTargetStaff);
            if (data && data.data && data.data.success === 1) {
                dispatch(targetStaffSuccess());
            } else {
                dispatch(targetStaffFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetStaffFaided());
            showNotification(error);
        }
    }
}
export const deleteListTargetStaffRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(targetStaffStart());
        for (const id of list_id) {
            try {
                const data = await deleteTargetStaff(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(targetStaffFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(targetStaffSuccess());
    }
}
export const editListTargetStaffRedux = (list_id, dataTargetStaff) => {
    return async (dispatch, getState) => {
        dispatch(targetStaffStart());
        for (const id of list_id) {
            try {
                const data = await editTargetStaff(id, dataTargetStaff);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(targetStaffFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(targetStaffSuccess());
    }
}
export const editTargetStaffRedux = (id, dataTargetStaff) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetStaffStart());
            const data = await editTargetStaff(id, dataTargetStaff);
            if (data && data.data && data.data.success === 1) {
                dispatch(targetStaffSuccess());
                message.success('Thành công');
            } else {
                dispatch(targetStaffFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetStaffFaided());
            showNotification(error);
        }
    }
}
export const targetStaffStart = () => ({
    type: actionTypes.TARGET_STAFF_START,
})
export const targetStaffSuccess = () => ({
    type: actionTypes.TARGET_STAFF_SUCCESS,
})
export const targetStaffFaided = () => ({
    type: actionTypes.TARGET_STAFF_FAIDED,
})

export const getListTargetStaffSuccess = (data) => ({
    type: actionTypes.GET_LIST_TARGET_STAFF_SUCCESS,
    data
})
export const getTargetStaffSuccess = (data) => ({
    type: actionTypes.GET_TARGET_STAFF_SUCCESS,
    data
})
export const onChangeTargetStaffRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_TARGET_STAFF,
    value,
    id,
})
export const setDataTargetStaffRedux = (data) => ({
    type: actionTypes.SET_DATA_TARGET_STAFF,
    data,
})