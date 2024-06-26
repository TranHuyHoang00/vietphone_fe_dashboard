import action_types from '@actions/action_types';
import { getListOrder, getDataOrder, createOrder, deleteOrder, editOrder } from '@services/order_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListOrderRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(orderStart());
            let data = await getListOrder(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListOrderSuccess(data.data.data));
            } else {
                dispatch(orderFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(orderFaided());
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
            dispatch(orderStart());
            let data = await getDataOrder(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getOrderSuccess(data.data.data));
            } else {
                dispatch(orderFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(orderFaided());
            showNotification(error);
        }
    }
}
export const createOrderRedux = (dataOrder) => {
    return async (dispatch, getState) => {
        try {
            dispatch(orderStart());
            let data = await createOrder(dataOrder);
            if (data && data.data && data.data.success === 1) {
                dispatch(orderSuccess());
                message.success('Thành công');
            } else {
                dispatch(orderFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(orderFaided());
            showNotification(error);
        }
    }
}
export const deleteListOrderRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(orderStart());
        for (const id of list_id) {
            try {
                let data = await deleteOrder(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(orderFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(orderSuccess());
    }
}
export const editListOrderRedux = (list_id, dataOrder) => {
    return async (dispatch, getState) => {
        dispatch(orderStart());
        for (const id of list_id) {
            try {
                let data = await editOrder(id, dataOrder);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(orderFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(orderSuccess());
    }
}
export const editOrderRedux = (id, dataOrder) => {
    return async (dispatch, getState) => {
        try {
            dispatch(orderStart());
            let data = await editOrder(id, dataOrder);
            if (data && data.data && data.data.success === 1) {
                dispatch(orderSuccess());
                message.success('Thành công');
            } else {
                dispatch(orderFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(orderFaided());
            showNotification(error);
        }
    }
}
export const orderStart = () => ({
    type: action_types.ORDER_START,
})
export const orderSuccess = () => ({
    type: action_types.ORDER_SUCCESS,
})
export const orderFaided = () => ({
    type: action_types.ORDER_FAIDED,
})

export const getListOrderSuccess = (data) => ({
    type: action_types.GET_LIST_ORDER_SUCCESS,
    data
})
export const getOrderSuccess = (data) => ({
    type: action_types.GET_ORDER_SUCCESS,
    data
})
export const onChangeOrderRedux = (value, id) => ({
    type: action_types.ON_CHANGE_ORDER,
    value,
    id,
})
export const setDataOrderRedux = (data) => ({
    type: action_types.SET_DATA_ORDER,
    data,
})