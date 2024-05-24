import action_types from '@actions/action_types';
import { get_list_flash_sale_item, get_flash_sale_item, create_flash_sale_item, delete_flash_sale_item, edit_flash_sale_item } from '@services/flash_sale_item_service';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const get_list_flash_sale_item_redux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_item_start());
            let data = await get_list_flash_sale_item(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_flash_sale_item_success(data.data.data));
            } else {
                dispatch(flash_sale_item_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_item_faided());
            show_notification(error);
        }
    }
}
export const get_flash_sale_item_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_item_start());
            let data = await get_flash_sale_item(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_flash_sale_item_success(data.data.data));
            } else {
                dispatch(flash_sale_item_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_item_faided());
            show_notification(error);
        }
    }
}
export const create_flash_sale_item_redux = (data_flash_sale_item) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_item_start());
            let data = await create_flash_sale_item(data_flash_sale_item);
            if (data && data.data && data.data.success === 1) {
                dispatch(flash_sale_item_success());
                message.success('Thành công');
            } else {
                dispatch(flash_sale_item_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_item_faided());
            show_notification(error);
        }
    }
}
export const create_list_flash_sale_item_redux = (flash_sale_id, list_variant_id) => {
    return async (dispatch, getState) => {
        dispatch(flash_sale_item_start());
        for (const id of list_variant_id) {
            try {
                let data = await create_flash_sale_item({ flash_sale: flash_sale_id, product_variant: id });
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi tạo ID=${id}`);
                }
            } catch (error) {
                dispatch(flash_sale_item_faided());
            }
        }
        message.success('Thành công');
        dispatch(flash_sale_item_success());
    }
}
export const delete_list_flash_sale_item_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(flash_sale_item_start());
        for (const id of list_id) {
            try {
                let data = await delete_flash_sale_item(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(flash_sale_item_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(flash_sale_item_success());
    }
}
export const edit_list_flash_sale_item_redux = (list_id, data_flash_sale_item) => {
    return async (dispatch, getState) => {
        dispatch(flash_sale_item_start());
        for (const id of list_id) {
            try {
                let data = await edit_flash_sale_item(id, data_flash_sale_item);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(flash_sale_item_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(flash_sale_item_success());
    }
}
export const edit_flash_sale_item_redux = (id, data_flash_sale_item) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_item_start());
            let data = await edit_flash_sale_item(id, data_flash_sale_item);
            if (data && data.data && data.data.success === 1) {
                dispatch(flash_sale_item_success());
                message.success('Thành công');
            } else {
                dispatch(flash_sale_item_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_item_faided());
            show_notification(error);
        }
    }
}
export const flash_sale_item_start = () => ({
    type: action_types.FLASH_SALE_ITEM_START,
})
export const flash_sale_item_success = () => ({
    type: action_types.FLASH_SALE_ITEM_SUCCESS,
})
export const flash_sale_item_faided = () => ({
    type: action_types.FLASH_SALE_ITEM_FAIDED,
})

export const get_list_flash_sale_item_success = (data) => ({
    type: action_types.GET_LIST_FLASH_SALE_ITEM_SUCCESS,
    data
})
export const get_flash_sale_item_success = (data) => ({
    type: action_types.GET_FLASH_SALE_ITEM_SUCCESS,
    data
})
export const on_change_flash_sale_item_redux = (value, id) => ({
    type: action_types.ON_CHANGE_FLASH_SALE_ITEM,
    value,
    id,
})
export const set_data_flash_sale_item_redux = (data) => ({
    type: action_types.SET_DATA_FLASH_SALE_ITEM,
    data,
})