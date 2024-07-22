import actionTypes from '@actions/sapo/actionTypes';
import { getListCustomer, getDataCustomer, createCustomer, deleteCustomer, editCustomer } from '@services/sapo/customerServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListCustomerRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customerStart());
            const data = await getListCustomer(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListCustomerSuccess(data.data.data));
            } else {
                dispatch(customerFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customerFaided());
            showNotification(error);
        }
    }
}
export const getDataCustomerRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { customer } = getState();
            const { dataCustomer } = customer || {};
            if (dataCustomer?.id === id) {
                return;
            }
            dispatch(customerStart());
            const data = await getDataCustomer(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getCustomerSuccess(data.data.data));
            } else {
                dispatch(customerFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customerFaided());
            showNotification(error);
        }
    }
}
export const createCustomerRedux = (dataCustomer) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customerStart());
            const data = await createCustomer(dataCustomer);
            if (data && data.data && data.data.success === 1) {
                dispatch(customerSuccess());
                message.success('Thành công');
            } else {
                dispatch(customerFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customerFaided());
            showNotification(error);
        }
    }
}
export const deleteListCustomerRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(customerStart());
        for (const id of list_id) {
            try {
                const data = await deleteCustomer(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(customerFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(customerSuccess());
    }
}
export const editListCustomerRedux = (list_id, dataCustomer) => {
    return async (dispatch, getState) => {
        dispatch(customerStart());
        for (const id of list_id) {
            try {
                const data = await editCustomer(id, dataCustomer);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(customerFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(customerSuccess());
    }
}
export const editCustomerRedux = (id, dataCustomer) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customerStart());
            const data = await editCustomer(id, dataCustomer);
            if (data && data.data && data.data.success === 1) {
                dispatch(customerSuccess());
                message.success('Thành công');
            } else {
                dispatch(customerFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customerFaided());
            showNotification(error);
        }
    }
}
export const customerStart = () => ({
    type: actionTypes.CUSTOMER_START,
})
export const customerSuccess = () => ({
    type: actionTypes.CUSTOMER_SUCCESS,
})
export const customerFaided = () => ({
    type: actionTypes.CUSTOMER_FAIDED,
})

export const getListCustomerSuccess = (data) => ({
    type: actionTypes.GET_LIST_CUSTOMER_SUCCESS,
    data
})
export const getCustomerSuccess = (data) => ({
    type: actionTypes.GET_CUSTOMER_SUCCESS,
    data
})
export const on_change_customer_redux = (value, id) => ({
    type: actionTypes.ON_CHANGE_CUSTOMER,
    value,
    id,
})
export const setDataCustomerRedux = (data) => ({
    type: actionTypes.SET_DATA_CUSTOMER,
    data,
})