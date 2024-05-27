import action_types from '@actions/action_types';
import { getListOrder, getDataOrder, createOrder, deleteOrder, editOrder } from '@services/order_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListOrderRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(order_start());
            let data = await getListOrder(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_order_success(data.data.data));
            } else {
                dispatch(order_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(order_faided());
            if (error.response && error.response.status === 400) {
                message.error('Không có đơn hàng nào cho mục này');
                return;
            }
            showNotification(error);
        }
    }
}
export const getDataOrderRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(order_start());
            let data = await getDataOrder(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_order_success(data.data.data));
            } else {
                dispatch(order_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(order_faided());
            showNotification(error);
        }
    }
}
export const createOrderRedux = (dataOrder) => {
    return async (dispatch, getState) => {
        try {
            dispatch(order_start());
            let data = await createOrder(dataOrder);
            if (data && data.data && data.data.success === 1) {
                dispatch(order_success());
                message.success('Thành công');
            } else {
                dispatch(order_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(order_faided());
            showNotification(error);
        }
    }
}
export const deleteListOrderRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(order_start());
        for (const id of list_id) {
            try {
                let data = await deleteOrder(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(order_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(order_success());
    }
}
export const editListOrderRedux = (list_id, dataOrder) => {
    return async (dispatch, getState) => {
        dispatch(order_start());
        for (const id of list_id) {
            try {
                let data = await editOrder(id, dataOrder);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(order_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(order_success());
    }
}
export const editOrderRedux = (id, dataOrder) => {
    return async (dispatch, getState) => {
        try {
            dispatch(order_start());
            let data = await editOrder(id, dataOrder);
            if (data && data.data && data.data.success === 1) {
                dispatch(order_success());
                message.success('Thành công');
            } else {
                dispatch(order_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(order_faided());
            showNotification(error);
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
export const setDataOrderRedux = (data) => ({
    type: action_types.SET_DATA_ORDER,
    data,
})