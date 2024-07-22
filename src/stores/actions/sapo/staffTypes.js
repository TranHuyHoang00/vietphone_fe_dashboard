import actionTypes from './actionTypes';
import { getListStaff, getDataStaff, createStaff, deleteStaff, editStaff } from '@services/sapo/staffServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListStaffRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { staff } = getState();
            if (staff?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(staffStart());
            const data = await getListStaff(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListStaffSuccess(data.data.data, dataFilter?.limit));
            } else {
                dispatch(staffFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(staffFaided());
            showNotification(error);
        }
    }
}
export const getDataStaffRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { staff } = getState();
            const { dataStaff } = staff || {};
            if (dataStaff?.id === id) {
                return;
            }
            dispatch(staffStart());
            const data = await getDataStaff(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getStaffSuccess(data.data.data));
            } else {
                dispatch(staffFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(staffFaided());
            showNotification(error);
        }
    }
}
export const createStaffRedux = (dataStaff) => {
    return async (dispatch, getState) => {
        try {
            dispatch(staffStart());
            const data = await createStaff(dataStaff);
            if (data && data.data && data.data.success === 1) {
                dispatch(staffSuccess());
                message.success('Thành công');
            } else {
                dispatch(staffFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(staffFaided());
            showNotification(error);
        }
    }
}
export const deleteListStaffRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(staffStart());
        for (const id of list_id) {
            try {
                const data = await deleteStaff(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(staffFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(staffSuccess());
    }
}
export const editListStaffRedux = (list_id, dataStaff) => {
    return async (dispatch, getState) => {
        dispatch(staffStart());
        for (const id of list_id) {
            try {
                const data = await editStaff(id, dataStaff);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(staffFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(staffSuccess());
    }
}
export const editStaffRedux = (id, dataStaff) => {
    return async (dispatch, getState) => {
        try {
            dispatch(staffStart());
            const data = await editStaff(id, dataStaff);
            if (data && data.data && data.data.success === 1) {
                dispatch(staffSuccess());
                message.success('Thành công');
            } else {
                dispatch(staffFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(staffFaided());
            showNotification(error);
        }
    }
}
export const staffStart = () => ({
    type: actionTypes.STAFF_START,
})
export const staffSuccess = () => ({
    type: actionTypes.STAFF_SUCCESS,
})
export const staffFaided = () => ({
    type: actionTypes.STAFF_FAIDED,
})

export const getListStaffSuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_STAFF_SUCCESS,
    data,
    isRepeat,
})
export const getStaffSuccess = (data) => ({
    type: actionTypes.GET_STAFF_SUCCESS,
    data
})
export const onChangeStaffRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_STAFF,
    value,
    id,
})
export const setDataStaffRedux = (data) => ({
    type: actionTypes.SET_DATA_STAFF,
    data,
})