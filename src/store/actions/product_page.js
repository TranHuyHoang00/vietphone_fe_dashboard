import action_types from './action_types';
import { get_list_product_page, get_product_page, create_product_page, delete_product_page, edit_product_page } from '../../services/product_page_service';
import { message } from 'antd';

export const get_list_product_page_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(product_page_start());
            let data = await get_list_product_page(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_product_page_success(data.data.data));
            } else {
                dispatch(product_page_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(product_page_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const get_product_page_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(product_page_start());
            let data = await get_product_page(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_product_page_success(data.data.data));
            } else {
                dispatch(product_page_faided());
            }
        } catch (error) {
            dispatch(product_page_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_product_page_redux = (data_product_page) => {
    return async (dispatch, getState) => {
        try {
            dispatch(product_page_start());
            let data = await create_product_page(data_product_page);
            if (data && data.data && data.data.success === 1) {
                dispatch(product_page_success());
            } else {
                dispatch(product_page_faided());
            }
        } catch (error) {
            dispatch(product_page_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const delete_list_product_page_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(product_page_start());
        for (const id of list_id) {
            try {
                let data = await delete_product_page(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(product_page_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(product_page_success());
    }
}
export const edit_list_product_page_redux = (list_id, data_product_page) => {
    return async (dispatch, getState) => {
        dispatch(product_page_start());
        for (const id of list_id) {
            try {
                let data = await edit_product_page(id, data_product_page);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(product_page_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(product_page_success());
    }
}
export const edit_product_page_redux = (id, data_product_page) => {
    return async (dispatch, getState) => {
        try {
            dispatch(product_page_start());
            let data = await edit_product_page(id, data_product_page);
            if (data && data.data && data.data.success === 1) {
                dispatch(product_page_success());
            } else {
                dispatch(product_page_faided());
            }
        } catch (error) {
            dispatch(product_page_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const product_page_start = () => ({
    type: action_types.PRODUCT_PAGE_START,
})
export const product_page_success = () => ({
    type: action_types.PRODUCT_PAGE_SUCCESS,
})
export const product_page_faided = () => ({
    type: action_types.PRODUCT_PAGE_FAIDED,
})

export const get_list_product_page_success = (data) => ({
    type: action_types.GET_LIST_PRODUCT_PAGE_SUCCESS,
    data
})
export const get_product_page_success = (data) => ({
    type: action_types.GET_PRODUCT_PAGE_SUCCESS,
    data
})
export const on_change_product_page_redux = (value, id) => ({
    type: action_types.ON_CHANGE_PRODUCT_PAGE,
    value,
    id,
})
export const on_change_product_description_redux = (value) => ({
    type: action_types.ON_CHANGE_PRODUCT_DESCRIPTION,
    value,
})
export const set_data_product_page_redux = (data) => ({
    type: action_types.SET_DATA_PRODUCT_PAGE,
    data,
})