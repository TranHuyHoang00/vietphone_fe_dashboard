import actionTypes from './actionTypes';
import { getListFlashSale, getDataFlashSale, createFlashSale, deleteFlashSale, editFlashSale } from '@services/website/flashSaleServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListFlashSaleRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { flashSale } = getState();
            if (flashSale?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(flashSaleStart());
            const data = await getListFlashSale(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListFlashSaleSuccess(data.data.data, dataFilter?.limit));
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
            const { flashSale } = getState();
            const { dataFlashSale } = flashSale || {};
            if (dataFlashSale?.id === id) {
                return;
            }
            dispatch(flashSaleStart());
            const data = await getDataFlashSale(id);
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
            const data = await createFlashSale(dataFlashSale);
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
                const data = await deleteFlashSale(id);
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
                const data = await editFlashSale(id, dataFlashSale);
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
            const data = await editFlashSale(id, dataFlashSale);
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
    type: actionTypes.FLASH_SALE_START,
})
export const flashSaleSuccess = () => ({
    type: actionTypes.FLASH_SALE_SUCCESS,
})
export const flashSaleFaided = () => ({
    type: actionTypes.FLASH_SALE_FAIDED,
})

export const getListFlashSaleSuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_FLASH_SALE_SUCCESS,
    data,
    isRepeat,
})
export const getFlashSaleSuccess = (data) => ({
    type: actionTypes.GET_FLASH_SALE_SUCCESS,
    data
})
export const onChangeFlashSaleRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_FLASH_SALE,
    value,
    id,
})
export const setDataFlashSaleRedux = (data) => ({
    type: actionTypes.SET_DATA_FLASH_SALE,
    data,
})