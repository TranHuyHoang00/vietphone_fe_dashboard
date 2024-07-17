import actionTypes from './actionTypes';
import { getListProduct, getDataProduct, createProduct, deleteProduct, editProduct } from '@services/website/productServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListProductRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productStart());
            let data = await getListProduct(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListProductSuccess(data.data.data));
            } else {
                dispatch(productFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productFaided());
            showNotification(error);
        }
    }
}
export const getDataProductRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productStart());
            let data = await getDataProduct(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getProductSuccess(data.data.data));
            } else {
                dispatch(productFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productFaided());
            showNotification(error);
        }
    }
}
export const createProductRedux = (dataProduct) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productStart());
            let data = await createProduct(dataProduct);
            if (data && data.data && data.data.success === 1) {
                dispatch(productSuccess());
                message.success('Thành công');
            } else {
                dispatch(productFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productFaided());
            showNotification(error);
        }
    }
}
export const deleteListProductRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(productStart());
        for (const id of list_id) {
            try {
                let data = await deleteProduct(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(productFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(productSuccess());
    }
}
export const editListProductRedux = (list_id, dataProduct) => {
    return async (dispatch, getState) => {
        dispatch(productStart());
        for (const id of list_id) {
            try {
                let data = await editProduct(id, dataProduct);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(productFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(productSuccess());
    }
}
export const editProductRedux = (id, dataProduct) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productStart());
            let data = await editProduct(id, dataProduct);
            if (data && data.data && data.data.success === 1) {
                dispatch(productSuccess());
                message.success('Thành công');
            } else {
                dispatch(productFaided());
                message.error('Lỗi khi sửa sản phẩm');
            }
        } catch (error) {
            dispatch(productFaided());
            showNotification(error);
        }
    }
}
export const productStart = () => ({
    type: actionTypes.PRODUCT_START,
})
export const productSuccess = () => ({
    type: actionTypes.PRODUCT_SUCCESS,
})
export const productFaided = () => ({
    type: actionTypes.PRODUCT_FAIDED,
})

export const getListProductSuccess = (data) => ({
    type: actionTypes.GET_LIST_PRODUCT_SUCCESS,
    data
})
export const getProductSuccess = (data) => ({
    type: actionTypes.GET_PRODUCT_SUCCESS,
    data
})
export const onChangeProductRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_PRODUCT,
    value,
    id,
})
export const setDataProductRedux = (data) => ({
    type: actionTypes.SET_DATA_PRODUCT,
    data,
})

export const clickEditProductRedux = (data) => ({
    type: actionTypes.CLICK_EDIT_PRODUCT,
    data: data
})
export const setDataFilterProductRedux = (data) => ({
    type: actionTypes.SET_DATA_FILTER_PRODUCT,
    data,
})
export const setDataFilterProductRepairRedux = (data) => ({
    type: actionTypes.SET_DATA_FILTER_PRODUCT_REPAIR,
    data,
})
export const onChangeProductDescriptionRedux = (value) => ({
    type: actionTypes.ON_CHANGE_PRODUCT_DESCRIPTION,
    value,
})
export const onChangeProductShortDescriptionRedux = (value) => ({
    type: actionTypes.ON_CHANGE_PRODUCT_SHORT_DESCRIPTION,
    value,
})