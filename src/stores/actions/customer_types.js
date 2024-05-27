import action_types from '@actions/action_types';
import { getListCustomer, getDataCustomer, createCustomer, deleteCustomer, editCustomer } from '@services/customer_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListCustomerRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customer_start());
            let data = await getListCustomer(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_customer_success(data.data.data));
            } else {
                dispatch(customer_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customer_faided());
            showNotification(error);
        }
    }
}
export const getDataCustomerRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customer_start());
            let data = await getDataCustomer(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_customer_success(data.data.data));
            } else {
                dispatch(customer_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customer_faided());
            showNotification(error);
        }
    }
}
export const createCustomerRedux = (dataCustomer) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customer_start());
            let data = await createCustomer(dataCustomer);
            if (data && data.data && data.data.success === 1) {
                dispatch(customer_success());
                message.success('Thành công');
            } else {
                dispatch(customer_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customer_faided());
            showNotification(error);
        }
    }
}
export const deleteListCustomerRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(customer_start());
        for (const id of list_id) {
            try {
                let data = await deleteCustomer(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(customer_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(customer_success());
    }
}
export const editListCustomerRedux = (list_id, dataCustomer) => {
    return async (dispatch, getState) => {
        dispatch(customer_start());
        for (const id of list_id) {
            try {
                let data = await editCustomer(id, dataCustomer);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(customer_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(customer_success());
    }
}
export const editCustomerRedux = (id, dataCustomer) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customer_start());
            let data = await editCustomer(id, dataCustomer);
            if (data && data.data && data.data.success === 1) {
                dispatch(customer_success());
                message.success('Thành công');
            } else {
                dispatch(customer_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customer_faided());
            showNotification(error);
        }
    }
}
export const customer_start = () => ({
    type: action_types.CUSTOMER_START,
})
export const customer_success = () => ({
    type: action_types.CUSTOMER_SUCCESS,
})
export const customer_faided = () => ({
    type: action_types.CUSTOMER_FAIDED,
})

export const get_list_customer_success = (data) => ({
    type: action_types.GET_LIST_CUSTOMER_SUCCESS,
    data
})
export const get_customer_success = (data) => ({
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