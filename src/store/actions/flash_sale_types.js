import action_types from './action_types';
import { get_list_flash_sale, get_flash_sale, create_flash_sale, delete_flash_sale, edit_flash_sale } from '../../services/flash_sale_service';
import { message } from 'antd';

export const get_list_flash_sale_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_start());
            let data = await get_list_flash_sale(data_filter);
            if (data && data.data && data.data.success == 1) {
                dispatch(get_list_flash_sale_success(data.data.data));
            } else {
                dispatch(flash_sale_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const get_flash_sale_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_start());
            let data = await get_flash_sale(id);
            if (data && data.data && data.data.success == 1) {
                dispatch(get_flash_sale_success(data.data.data));
            } else {
                dispatch(flash_sale_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_flash_sale_redux = (data_flash_sale) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_start());
            let data = await create_flash_sale(data_flash_sale);
            if (data && data.data && data.data.success == 1) {
                dispatch(flash_sale_success());
                message.success('Thành công');
            } else {
                dispatch(flash_sale_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_faided());
            if (error.response && error.response.status == 400) {
                message.error('Khoảng thời gian này đã tồn tại Flash sale');
                return;
            }
            message.error('Lỗi hệ thống');
        }
    }
}
export const delete_list_flash_sale_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(flash_sale_start());
        for (const id of list_id) {
            try {
                let data = await delete_flash_sale(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(flash_sale_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(flash_sale_success());
    }
}
export const edit_list_flash_sale_redux = (list_id, data_flash_sale) => {
    return async (dispatch, getState) => {
        dispatch(flash_sale_start());
        for (const id of list_id) {
            try {
                let data = await edit_flash_sale(id, data_flash_sale);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(flash_sale_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(flash_sale_success());
    }
}
export const edit_flash_sale_redux = (id, data_flash_sale) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_start());
            let data = await edit_flash_sale(id, data_flash_sale);
            if (data && data.data && data.data.success == 1) {
                dispatch(flash_sale_success());
                message.success('Thành công');
            } else {
                dispatch(flash_sale_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const flash_sale_start = () => ({
    type: action_types.FLASH_SALE_START,
})
export const flash_sale_success = () => ({
    type: action_types.FLASH_SALE_SUCCESS,
})
export const flash_sale_faided = () => ({
    type: action_types.FLASH_SALE_FAIDED,
})

export const get_list_flash_sale_success = (data) => ({
    type: action_types.GET_LIST_FLASH_SALE_SUCCESS,
    data
})
export const get_flash_sale_success = (data) => ({
    type: action_types.GET_FLASH_SALE_SUCCESS,
    data
})
export const on_change_flash_sale_redux = (value, id) => ({
    type: action_types.ON_CHANGE_FLASH_SALE,
    value,
    id,
})
export const set_data_flash_sale_redux = (data) => ({
    type: action_types.SET_DATA_FLASH_SALE,
    data,
})