import action_types from './action_types';
import { get_list_order, get_order, create_order, delete_order, edit_order } from '../../services/order_service';
import { message } from 'antd';

export const get_list_order_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(order_start());
            let data = await get_list_order(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_order_success(data.data.data));
            } else {
                dispatch(order_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(order_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const get_order_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(order_start());
            let data = await get_order(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_order_success(data.data.data));
            } else {
                dispatch(order_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(order_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_order_redux = (data_order) => {
    return async (dispatch, getState) => {
        try {
            dispatch(order_start());
            let data = await create_order(data_order);
            if (data && data.data && data.data.success === 1) {
                dispatch(order_success());
                message.success('Thành công');
            } else {
                dispatch(order_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(order_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const delete_list_order_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(order_start());
        for (const id of list_id) {
            try {
                let data = await delete_order(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(order_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(order_success());
    }
}
export const edit_list_order_redux = (list_id, data_order) => {
    return async (dispatch, getState) => {
        dispatch(order_start());
        for (const id of list_id) {
            try {
                let data = await edit_order(id, data_order);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(order_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(order_success());
    }
}
export const edit_order_redux = (id, data_order) => {
    return async (dispatch, getState) => {
        try {
            dispatch(order_start());
            let data = await edit_order(id, data_order);
            if (data && data.data && data.data.success === 1) {
                dispatch(order_success());
                message.success('Thành công');
            } else {
                dispatch(order_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(order_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const order_start = () => ({
    type: action_types.ORDER_START,
})
export const order_success = () => ({
    type: action_types.ORDER_SUCCESS,
})
export const order_faided = () => ({
    type: action_types.ORDER_FAIDED,
})

export const get_list_order_success = (data) => ({
    type: action_types.GET_LIST_ORDER_SUCCESS,
    data
})
export const get_order_success = (data) => ({
    type: action_types.GET_ORDER_SUCCESS,
    data
})
export const on_change_order_redux = (value, id) => ({
    type: action_types.ON_CHANGE_ORDER,
    value,
    id,
})
export const set_data_order_redux = (data) => ({
    type: action_types.SET_DATA_ORDER,
    data,
})