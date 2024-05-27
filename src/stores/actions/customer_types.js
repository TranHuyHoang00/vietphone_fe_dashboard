import action_types from '@actions/action_types';
import { getListCustomer, getDataCustomer, createCustomer, deleteCustomer, editCustomer } from '@services/customer_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListCustomerRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customerStart());
            let data = await getListCustomer(dataFilter);
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
            dispatch(customerStart());
            let data = await getDataCustomer(id);
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
            let data = await createCustomer(dataCustomer);
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
                let data = await deleteCustomer(id);
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
                let data = await editCustomer(id, dataCustomer);
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
            let data = await editCustomer(id, dataCustomer);
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
    type: action_types.CUSTOMER_START,
})
export const customerSuccess = () => ({
    type: action_types.CUSTOMER_SUCCESS,
})
export const customerFaided = () => ({
    type: action_types.CUSTOMER_FAIDED,
})

export const getListCustomerSuccess = (data) => ({
    type: action_types.GET_LIST_CUSTOMER_SUCCESS,
    data
})
export const getCustomerSuccess = (data) => ({
    type: action_types.GET_CUSTOMER_SUCCESS,
    data
})
export const on_change_customer_redux = (value, id) => ({
    type: action_types.ON_CHANGE_CUSTOMER,
    value,
    id,
})
export const setDataCustomerRedux = (data) => ({
    type: action_types.SET_DATA_CUSTOMER,
    data,
})