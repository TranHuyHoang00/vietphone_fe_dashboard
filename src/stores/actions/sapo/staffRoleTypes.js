import actionTypes from './actionTypes';
import { getListStaffRole, getDataStaffRole, createStaffRole, deleteStaffRole, editStaffRole } from '@services/sapo/staffRoleServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListStaffRoleRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { staffRole } = getState();
            if (staffRole?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(staffRoleStart());
            let data = await getListStaffRole(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListStaffRoleSuccess(data.data.data, dataFilter?.limit));
            } else {
                dispatch(staffRoleFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(staffRoleFaided());
            showNotification(error);
        }
    }
}
export const getDataStaffRoleRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { staffRole } = getState();
            const { dataStaffRole } = staffRole || {};
            if (dataStaffRole?.id === id) {
                return;
            }
            dispatch(staffRoleStart());
            let data = await getDataStaffRole(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getStaffRoleSuccess(data.data.data));
            } else {
                dispatch(staffRoleFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(staffRoleFaided());
            showNotification(error);
        }
    }
}
export const createStaffRoleRedux = (dataStaffRole) => {
    return async (dispatch, getState) => {
        try {
            dispatch(staffRoleStart());
            let data = await createStaffRole(dataStaffRole);
            if (data && data.data && data.data.success === 1) {
                dispatch(staffRoleSuccess());
                message.success('Thành công');
            } else {
                dispatch(staffRoleFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(staffRoleFaided());
            showNotification(error);
        }
    }
}
export const deleteListStaffRoleRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(staffRoleStart());
        for (const id of list_id) {
            try {
                let data = await deleteStaffRole(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(staffRoleFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(staffRoleSuccess());
    }
}
export const editListStaffRoleRedux = (list_id, dataStaffRole) => {
    return async (dispatch, getState) => {
        dispatch(staffRoleStart());
        for (const id of list_id) {
            try {
                let data = await editStaffRole(id, dataStaffRole);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(staffRoleFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(staffRoleSuccess());
    }
}
export const editStaffRoleRedux = (id, dataStaffRole) => {
    return async (dispatch, getState) => {
        try {
            dispatch(staffRoleStart());
            let data = await editStaffRole(id, dataStaffRole);
            if (data && data.data && data.data.success === 1) {
                dispatch(staffRoleSuccess());
                message.success('Thành công');
            } else {
                dispatch(staffRoleFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(staffRoleFaided());
            showNotification(error);
        }
    }
}
export const staffRoleStart = () => ({
    type: actionTypes.STAFF_ROLE_START,
})
export const staffRoleSuccess = () => ({
    type: actionTypes.STAFF_ROLE_SUCCESS,
})
export const staffRoleFaided = () => ({
    type: actionTypes.STAFF_ROLE_FAIDED,
})

export const getListStaffRoleSuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_STAFF_ROLE_SUCCESS,
    data,
    isRepeat,
})
export const getStaffRoleSuccess = (data) => ({
    type: actionTypes.GET_STAFF_ROLE_SUCCESS,
    data
})
export const onChangeStaffRoleRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_STAFF_ROLE,
    value,
    id,
})
export const setDataStaffRoleRedux = (data) => ({
    type: actionTypes.SET_DATA_STAFF_ROLE,
    data,
})