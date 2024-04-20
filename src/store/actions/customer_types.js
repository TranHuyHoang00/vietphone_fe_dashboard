import action_types from '@actions/action_types';
import { get_list_customer, get_customer, create_customer, delete_customer, edit_customer } from '@services/customer_service';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_customer_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customer_start());
            let data = await get_list_customer(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_customer_success(data.data.data));
            } else {
                dispatch(customer_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customer_faided());
            show_notification(error);
        }
    }
}
export const get_customer_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customer_start());
            let data = await get_customer(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_customer_success(data.data.data));
            } else {
                dispatch(customer_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customer_faided());
            show_notification(error);
        }
    }
}
export const create_customer_redux = (data_customer) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customer_start());
            let data = await create_customer(data_customer);
            if (data && data.data && data.data.success === 1) {
                dispatch(customer_success());
                message.success('Thành công');
            } else {
                dispatch(customer_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customer_faided());
            show_notification(error);
        }
    }
}
export const delete_list_customer_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(customer_start());
        for (const id of list_id) {
            try {
                let data = await delete_customer(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(customer_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(customer_success());
    }
}
export const edit_list_customer_redux = (list_id, data_customer) => {
    return async (dispatch, getState) => {
        dispatch(customer_start());
        for (const id of list_id) {
            try {
                let data = await edit_customer(id, data_customer);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(customer_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(customer_success());
    }
}
export const edit_customer_redux = (id, data_customer) => {
    return async (dispatch, getState) => {
        try {
            dispatch(customer_start());
            let data = await edit_customer(id, data_customer);
            if (data && data.data && data.data.success === 1) {
                dispatch(customer_success());
                message.success('Thành công');
            } else {
                dispatch(customer_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(customer_faided());
            show_notification(error);
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
export const set_data_customer_redux = (data) => ({
    type: action_types.SET_DATA_CUSTOMER,
    data,
})