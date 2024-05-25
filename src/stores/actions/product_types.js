import action_types from '@actions/action_types';
import { get_list_product, get_product, create_product, delete_product, edit_product } from '@services/product_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const get_list_product_redux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(product_start());
            let data = await get_list_product(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_product_success(data.data.data));
            } else {
                dispatch(product_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(product_faided());
            showNotification(error);
        }
    }
}
export const get_product_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(product_start());
            let data = await get_product(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_product_success(data.data.data));
            } else {
                dispatch(product_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(product_faided());
            showNotification(error);
        }
    }
}
export const create_product_redux = (data_product) => {
    return async (dispatch, getState) => {
        try {
            dispatch(product_start());
            let data = await create_product(data_product);
            if (data && data.data && data.data.success === 1) {
                dispatch(product_success());
                message.success('Thành công');
            } else {
                dispatch(product_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(product_faided());
            showNotification(error);
        }
    }
}
export const delete_list_product_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(product_start());
        for (const id of list_id) {
            try {
                let data = await delete_product(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(product_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(product_success());
    }
}
export const edit_list_product_redux = (list_id, data_product) => {
    return async (dispatch, getState) => {
        dispatch(product_start());
        for (const id of list_id) {
            try {
                let data = await edit_product(id, data_product);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(product_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(product_success());
    }
}
export const edit_product_redux = (id, data_product) => {
    return async (dispatch, getState) => {
        try {
            dispatch(product_start());
            let data = await edit_product(id, data_product);
            if (data && data.data && data.data.success === 1) {
                dispatch(product_success());
                message.success('Thành công');
            } else {
                dispatch(product_faided());
                message.error('Lỗi khi sửa sản phẩm');
            }
        } catch (error) {
            dispatch(product_faided());
            showNotification(error);
        }
    }
}
export const product_start = () => ({
    type: action_types.PRODUCT_START,
})
export const product_success = () => ({
    type: action_types.PRODUCT_SUCCESS,
})
export const product_faided = () => ({
    type: action_types.PRODUCT_FAIDED,
})

export const get_list_product_success = (data) => ({
    type: action_types.GET_LIST_PRODUCT_SUCCESS,
    data
})
export const get_product_success = (data) => ({
    type: action_types.GET_PRODUCT_SUCCESS,
    data
})
export const on_change_product_redux = (value, id) => ({
    type: action_types.ON_CHANGE_PRODUCT,
    value,
    id,
})
export const set_data_product_redux = (data) => ({
    type: action_types.SET_DATA_PRODUCT,
    data,
})

export const click_edit_product_redux = (data) => ({
    type: action_types.CLICK_EDIT_PRODUCT,
    data: data
})
export const set_dataFilter_product_redux = (data) => ({
    type: action_types.SET_dataFilter_PRODUCT,
    data,
})