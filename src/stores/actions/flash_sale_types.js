import action_types from '@actions/action_types';
import { getListFlashSale, getDataFlashSale, createFlashSale, deleteFlashSale, editFlashSale } from '@services/flash_sale_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListFlashSaleRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flashSaleStart());
            let data = await getListFlashSale(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListFlashSaleSuccess(data.data.data));
            } else {
                dispatch(flashSaleFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flashSaleFaided());
            showNotification(error);
        }
    }
}
export const getDataFlashSaleRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flashSaleStart());
            let data = await getDataFlashSale(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getFlashSaleSuccess(data.data.data));
            } else {
                dispatch(flashSaleFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flashSaleFaided());
            showNotification(error);
        }
    }
}
export const createFlashSaleRedux = (dataFlashSale) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flashSaleStart());
            let data = await createFlashSale(dataFlashSale);
            if (data && data.data && data.data.success === 1) {
                dispatch(flashSaleSuccess());
                message.success('Thành công');
            } else {
                dispatch(flashSaleFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flashSaleFaided());
            if (error.response && error.response.status === 400) {
                message.error('Khoảng thời gian này đã tồn tại Flash sale');
                return;
            }
            showNotification(error);
        }
    }
}
export const deleteListFlashSaleRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(flashSaleStart());
        for (const id of list_id) {
            try {
                let data = await deleteFlashSale(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(flashSaleFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(flashSaleSuccess());
    }
}
export const editListFlashSaleRedux = (list_id, dataFlashSale) => {
    return async (dispatch, getState) => {
        dispatch(flashSaleStart());
        for (const id of list_id) {
            try {
                let data = await editFlashSale(id, dataFlashSale);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(flashSaleFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(flashSaleSuccess());
    }
}
export const editFlashSaleRedux = (id, dataFlashSale) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flashSaleStart());
            let data = await editFlashSale(id, dataFlashSale);
            if (data && data.data && data.data.success === 1) {
                dispatch(flashSaleSuccess());
                message.success('Thành công');
            } else {
                dispatch(flashSaleFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flashSaleFaided());
            showNotification(error);
        }
    }
}
export const flashSaleStart = () => ({
    type: action_types.FLASH_SALE_START,
})
export const flashSaleSuccess = () => ({
    type: action_types.FLASH_SALE_SUCCESS,
})
export const flashSaleFaided = () => ({
    type: action_types.FLASH_SALE_FAIDED,
})

export const getListFlashSaleSuccess = (data) => ({
    type: action_types.GET_LIST_FLASH_SALE_SUCCESS,
    data
})
export const getFlashSaleSuccess = (data) => ({
    type: action_types.GET_FLASH_SALE_SUCCESS,
    data
})
export const onChangeFlashSaleRedux = (value, id) => ({
    type: action_types.ON_CHANGE_FLASH_SALE,
    value,
    id,
})
export const setDataFlashSaleRedux = (data) => ({
    type: action_types.SET_DATA_FLASH_SALE,
    data,
})