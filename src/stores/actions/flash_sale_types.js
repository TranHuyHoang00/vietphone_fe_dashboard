import action_types from '@actions/action_types';
import { getListFlashSale, getDataFlashSale, createFlashSale, deleteFlashSale, editFlashSale } from '@services/flash_sale_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListFlashSaleRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_start());
            let data = await getListFlashSale(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_flash_sale_success(data.data.data));
            } else {
                dispatch(flash_sale_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_faided());
            showNotification(error);
        }
    }
}
export const getDataFlashSaleRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_start());
            let data = await getDataFlashSale(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_flash_sale_success(data.data.data));
            } else {
                dispatch(flash_sale_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_faided());
            showNotification(error);
        }
    }
}
export const createFlashSaleRedux = (dataFlashSale) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_start());
            let data = await createFlashSale(dataFlashSale);
            if (data && data.data && data.data.success === 1) {
                dispatch(flash_sale_success());
                message.success('Thành công');
            } else {
                dispatch(flash_sale_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_faided());
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
        dispatch(flash_sale_start());
        for (const id of list_id) {
            try {
                let data = await deleteFlashSale(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(flash_sale_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(flash_sale_success());
    }
}
export const editListFlashSaleRedux = (list_id, dataFlashSale) => {
    return async (dispatch, getState) => {
        dispatch(flash_sale_start());
        for (const id of list_id) {
            try {
                let data = await editFlashSale(id, dataFlashSale);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(flash_sale_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(flash_sale_success());
    }
}
export const editFlashSaleRedux = (id, dataFlashSale) => {
    return async (dispatch, getState) => {
        try {
            dispatch(flash_sale_start());
            let data = await editFlashSale(id, dataFlashSale);
            if (data && data.data && data.data.success === 1) {
                dispatch(flash_sale_success());
                message.success('Thành công');
            } else {
                dispatch(flash_sale_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(flash_sale_faided());
            showNotification(error);
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
export const onChangeFlashSaleRedux = (value, id) => ({
    type: action_types.ON_CHANGE_FLASH_SALE,
    value,
    id,
})
export const setDataFlashSaleRedux = (data) => ({
    type: action_types.SET_DATA_FLASH_SALE,
    data,
})