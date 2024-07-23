import actionTypes from './actionTypes';
import { getListFlashSaleItem, getDataFlashSaleItem, createFlashSaleItem, deleteFlashSaleItem, editFlashSaleItem } from '@services/website/flashSaleItemServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListFlashSaleItemRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flashSaleItemStart());
            const data = await getListFlashSaleItem(dataFilter);
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
            const { flashSaleItem } = getState();
            const { dataFlashSaleItem } = flashSaleItem || {};
            if (dataFlashSaleItem?.id === id) {
                return;
            }
            dispatch(flashSaleItemStart());
            const data = await getDataFlashSaleItem(id);
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
            const data = await createFlashSaleItem(dataFlashSaleItem);
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
                const data = await createFlashSaleItem({ flash_sale: flash_sale_id, product_variant: id });
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
                const data = await deleteFlashSaleItem(id);
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
                const data = await editFlashSaleItem(id, dataFlashSaleItem);
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
            const data = await editFlashSaleItem(id, dataFlashSaleItem);
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
    type: actionTypes.FLASH_SALE_ITEM_START,
})
export const flashSaleItemSuccess = () => ({
    type: actionTypes.FLASH_SALE_ITEM_SUCCESS,
})
export const flashSaleItemFaided = () => ({
    type: actionTypes.FLASH_SALE_ITEM_FAIDED,
})

export const getListFlashSaleItemSuccess = (data) => ({
    type: actionTypes.GET_LIST_FLASH_SALE_ITEM_SUCCESS,
    data
})
export const getFlashSaleItemSuccess = (data) => ({
    type: actionTypes.GET_FLASH_SALE_ITEM_SUCCESS,
    data
})
export const onChangeFlashSaleItemRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_FLASH_SALE_ITEM,
    value,
    id,
})
export const setDataFlashSaleItemRedux = (data) => ({
    type: actionTypes.SET_DATA_FLASH_SALE_ITEM,
    data,
})