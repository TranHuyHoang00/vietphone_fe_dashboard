import action_types from '@actions/action_types';
import { getListFlashSaleItem, getDataFlashSaleItem, createFlashSaleItem, deleteFlashSaleItem, editFlashSaleItem } from '@services/flash_sale_item_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const get_list_flash_sale_item_redux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_item_start());
            let data = await getListFlashSaleItem(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_flash_sale_item_success(data.data.data));
            } else {
                dispatch(flash_sale_item_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_item_faided());
            showNotification(error);
        }
    }
}
export const getDataFlashSaleItemRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_item_start());
            let data = await getDataFlashSaleItem(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_flash_sale_item_success(data.data.data));
            } else {
                dispatch(flash_sale_item_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_item_faided());
            showNotification(error);
        }
    }
}
export const create_flash_sale_item_redux = (dataFlashSaleItem) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_item_start());
            let data = await createFlashSaleItem(dataFlashSaleItem);
            if (data && data.data && data.data.success === 1) {
                dispatch(flash_sale_item_success());
                message.success('Thành công');
            } else {
                dispatch(flash_sale_item_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_item_faided());
            showNotification(error);
        }
    }
}
export const createListFlashSaleItemRedux = (flash_sale_id, list_variant_id) => {
    return async (dispatch, getState) => {
        dispatch(flash_sale_item_start());
        for (const id of list_variant_id) {
            try {
                let data = await createFlashSaleItem({ flash_sale: flash_sale_id, product_variant: id });
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi tạo ID=${id}`);
                }
            } catch (error) {
                dispatch(flash_sale_item_faided());
            }
        }
        dispatch(flash_sale_item_success());
        message.success('Thành công');
    }
}
export const deleteListFlashSaleItemRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(flash_sale_item_start());
        for (const id of list_id) {
            try {
                let data = await deleteFlashSaleItem(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(flash_sale_item_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(flash_sale_item_success());
    }
}
export const edit_list_flash_sale_item_redux = (list_id, dataFlashSaleItem) => {
    return async (dispatch, getState) => {
        dispatch(flash_sale_item_start());
        for (const id of list_id) {
            try {
                let data = await editFlashSaleItem(id, dataFlashSaleItem);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(flash_sale_item_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(flash_sale_item_success());
    }
}
export const editFlashSaleItemRedux = (id, dataFlashSaleItem) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_item_start());
            let data = await editFlashSaleItem(id, dataFlashSaleItem);
            if (data && data.data && data.data.success === 1) {
                dispatch(flash_sale_item_success());
                message.success('Thành công');
            } else {
                dispatch(flash_sale_item_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_item_faided());
            showNotification(error);
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
export const onChangeFlashSaleItemRedux = (value, id) => ({
    type: action_types.ON_CHANGE_FLASH_SALE_ITEM,
    value,
    id,
})
export const setDataFlashSaleItemRedux = (data) => ({
    type: action_types.SET_DATA_FLASH_SALE_ITEM,
    data,
})