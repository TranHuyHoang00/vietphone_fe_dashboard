import actionTypes from './actionTypes';
import { getListProductPage, getDataProductPage, createProductPage, deleteProductPage, editProductPage } from '@services/website/productPageServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListProductPageRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productPageStart());
            const data = await getListProductPage(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListProductPageSuccess(data.data.data));
            } else {
                dispatch(productPageFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productPageFaided());
            showNotification(error);
        }
    }
}
export const getDataProductPageRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { productPage } = getState();
            const { dataProductPage } = productPage || {};
            if (String(dataProductPage?.product?.id) === String(id)) {
                return;
            }
            dispatch(productPageStart());
            const data = await getDataProductPage(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getProductPageSuccess(data.data.data));
            } else {
                dispatch(getProductPageSuccess());
                dispatch(productPageFaided());
            }
        } catch (error) {
            dispatch(productPageFaided());
            showNotification(error);
        }
    }
}
export const createProductPageRedux = (dataProductPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productPageStart());
            const data = await createProductPage(dataProductPage);
            if (data && data.data && data.data.success === 1) {
                dispatch(productPageSuccess());
            } else {
                dispatch(productPageFaided());
            }
        } catch (error) {
            dispatch(productPageFaided());
            showNotification(error);
        }
    }
}
export const deleteListProductPageRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(productPageStart());
        for (const id of list_id) {
            try {
                const data = await deleteProductPage(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(productPageFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(productPageSuccess());
    }
}
export const editListProductPageRedux = (list_id, dataProductPage) => {
    return async (dispatch, getState) => {
        dispatch(productPageStart());
        for (const id of list_id) {
            try {
                const data = await editProductPage(id, dataProductPage);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(productPageFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(productPageSuccess());
    }
}
export const editProductPageRedux = (id, dataProductPage) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productPageStart());
            const data = await editProductPage(id, dataProductPage);
            if (data && data.data && data.data.success === 1) {
                dispatch(productPageSuccess());
            } else {
                dispatch(productPageFaided());
            }
        } catch (error) {
            dispatch(productPageFaided());
            showNotification(error);
        }
    }
}
export const productPageStart = () => ({
    type: actionTypes.PRODUCT_PAGE_START,
})
export const productPageSuccess = () => ({
    type: actionTypes.PRODUCT_PAGE_SUCCESS,
})
export const productPageFaided = () => ({
    type: actionTypes.PRODUCT_PAGE_FAIDED,
})

export const getListProductPageSuccess = (data) => ({
    type: actionTypes.GET_LIST_PRODUCT_PAGE_SUCCESS,
    data
})
export const getProductPageSuccess = (data) => ({
    type: actionTypes.GET_PRODUCT_PAGE_SUCCESS,
    data
})
export const onChangeProductPageRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_PRODUCT_PAGE,
    value,
    id,
})
export const setDataProductPageRedux = (data) => ({
    type: actionTypes.SET_DATA_PRODUCT_PAGE,
    data,
})