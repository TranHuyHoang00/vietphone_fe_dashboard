import action_types from '@actions/action_types';
import { getListFlashSaleItem, getDataFlashSaleItem, createFlashSaleItem, deleteFlashSaleItem, editFlashSaleItem } from '@services/flash_sale_item_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListFlashSaleItemRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flashSaleItemStart());
            let data = await getListFlashSaleItem(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListFlashSaleItemSuccess(data.data.data));
            } else {
                dispatch(flashSaleItemFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flashSaleItemFaided());
            showNotification(error);
        }
    }
}
export const getDataFlashSaleItemRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flashSaleItemStart());
            let data = await getDataFlashSaleItem(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getFlashSaleItemSuccess(data.data.data));
            } else {
                dispatch(flashSaleItemFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flashSaleItemFaided());
            showNotification(error);
        }
    }
}
export const createFlashSaleItemRedux = (dataFlashSaleItem) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flashSaleItemStart());
            let data = await createFlashSaleItem(dataFlashSaleItem);
            if (data && data.data && data.data.success === 1) {
                dispatch(flashSaleItemSuccess());
                message.success('Thành công');
            } else {
                dispatch(flashSaleItemFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flashSaleItemFaided());
            showNotification(error);
        }
    }
}
export const createListFlashSaleItemRedux = (flash_sale_id, list_variant_id) => {
    return async (dispatch, getState) => {
        dispatch(flashSaleItemStart());
        for (const id of list_variant_id) {
            try {
                let data = await createFlashSaleItem({ flash_sale: flash_sale_id, product_variant: id });
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi tạo ID=${id}`);
                }
            } catch (error) {
                dispatch(flashSaleItemFaided());
            }
        }
        dispatch(flashSaleItemSuccess());
        message.success('Thành công');
    }
}
export const deleteListFlashSaleItemRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(flashSaleItemStart());
        for (const id of list_id) {
            try {
                let data = await deleteFlashSaleItem(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(flashSaleItemFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(flashSaleItemSuccess());
    }
}
export const editListFlashSaleItemRedux = (list_id, dataFlashSaleItem) => {
    return async (dispatch, getState) => {
        dispatch(flashSaleItemStart());
        for (const id of list_id) {
            try {
                let data = await editFlashSaleItem(id, dataFlashSaleItem);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(flashSaleItemFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(flashSaleItemSuccess());
    }
}
export const editFlashSaleItemRedux = (id, dataFlashSaleItem) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flashSaleItemStart());
            let data = await editFlashSaleItem(id, dataFlashSaleItem);
            if (data && data.data && data.data.success === 1) {
                dispatch(flashSaleItemSuccess());
                message.success('Thành công');
            } else {
                dispatch(flashSaleItemFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flashSaleItemFaided());
            showNotification(error);
        }
    }
}
export const flashSaleItemStart = () => ({
    type: action_types.FLASH_SALE_ITEM_START,
})
export const flashSaleItemSuccess = () => ({
    type: action_types.FLASH_SALE_ITEM_SUCCESS,
})
export const flashSaleItemFaided = () => ({
    type: action_types.FLASH_SALE_ITEM_FAIDED,
})

export const getListFlashSaleItemSuccess = (data) => ({
    type: action_types.GET_LIST_FLASH_SALE_ITEM_SUCCESS,
    data
})
export const getFlashSaleItemSuccess = (data) => ({
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