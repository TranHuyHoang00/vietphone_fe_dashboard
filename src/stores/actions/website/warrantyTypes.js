import actionTypes from './actionTypes';
import { getListWarranty, getDataWarranty, createWarranty, deleteWarranty, editWarranty } from '@services/website/warrantyServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListWarrantyRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(warrantyStart());
            let data = await getListWarranty(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListWarrantySuccess(data.data.data));
            } else {
                dispatch(warrantyFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(warrantyFaided());
            showNotification(error);
        }
    }
}
export const getDataWarrantyRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(warrantyStart());
            let data = await getDataWarranty(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getWarrantySuccess(data.data.data));
            } else {
                dispatch(warrantyFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(warrantyFaided());
            showNotification(error);
        }
    }
}
export const createWarrantyRedux = (dataWarranty) => {
    return async (dispatch, getState) => {
        try {
            dispatch(warrantyStart());
            let data = await createWarranty(dataWarranty);
            if (data && data.data && data.data.success === 1) {
                dispatch(warrantySuccess());
                message.success('Thành công');
            } else {
                dispatch(warrantyFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(warrantyFaided());
            showNotification(error);
        }
    }
}
export const deleteListWarrantyRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(warrantyStart());
        for (const id of list_id) {
            try {
                let data = await deleteWarranty(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(warrantyFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(warrantySuccess());
    }
}
export const editListWarrantyRedux = (list_id, dataWarranty) => {
    return async (dispatch, getState) => {
        dispatch(warrantyStart());
        for (const id of list_id) {
            try {
                let data = await editWarranty(id, dataWarranty);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(warrantyFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(warrantySuccess());
    }
}
export const editWarrantyRedux = (id, dataWarranty) => {
    return async (dispatch, getState) => {
        try {
            dispatch(warrantyStart());
            let data = await editWarranty(id, dataWarranty);
            if (data && data.data && data.data.success === 1) {
                dispatch(warrantySuccess());
                message.success('Thành công');
            } else {
                dispatch(warrantyFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(warrantyFaided());
            showNotification(error);
        }
    }
}
export const warrantyStart = () => ({
    type: actionTypes.WARRANTY_START,
})
export const warrantySuccess = () => ({
    type: actionTypes.WARRANTY_SUCCESS,
})
export const warrantyFaided = () => ({
    type: actionTypes.WARRANTY_FAIDED,
})

export const getListWarrantySuccess = (data) => ({
    type: actionTypes.GET_LIST_WARRANTY_SUCCESS,
    data
})
export const getWarrantySuccess = (data) => ({
    type: actionTypes.GET_WARRANTY_SUCCESS,
    data
})
export const onChangeWarrantyRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_WARRANTY,
    value,
    id,
})
export const setDataWarrantyRedux = (data) => ({
    type: actionTypes.SET_DATA_WARRANTY,
    data,
})