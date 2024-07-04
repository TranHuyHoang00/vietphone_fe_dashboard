import actionTypes from './actionTypes';
import { getListProductCategory, getDataProductCategory, createProductCategory, deleteProductCategory, editProductCategory } from '@services/sapo/productCategoryServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListProductCategoryRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productCategoryStart());
            const data = await getListProductCategory(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListProductCategorySuccess(data.data.data));
            } else {
                dispatch(productCategoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productCategoryFaided());
            showNotification(error);
        }
    }
}
export const getDataProductCategoryRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productCategoryStart());
            const data = await getDataProductCategory(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getProductCategorySuccess(data.data.data));
            } else {
                dispatch(productCategoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productCategoryFaided());
            showNotification(error);
        }
    }
}
export const createProductCategoryRedux = (dataProductCategory) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productCategoryStart());
            const data = await createProductCategory(dataProductCategory);
            if (data && data.data && data.data.success === 1) {
                dispatch(productCategorySuccess());
                message.success('Thành công');
            } else {
                dispatch(productCategoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productCategoryFaided());
            showNotification(error);
        }
    }
}
export const deleteListProductCategoryRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(productCategoryStart());
        for (const id of list_id) {
            try {
                const data = await deleteProductCategory(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(productCategoryFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(productCategorySuccess());
    }
}
export const editListProductCategoryRedux = (list_id, dataProductCategory) => {
    return async (dispatch, getState) => {
        dispatch(productCategoryStart());
        for (const id of list_id) {
            try {
                const data = await editProductCategory(id, dataProductCategory);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(productCategoryFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(productCategorySuccess());
    }
}
export const editProductCategoryRedux = (id, dataProductCategory) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productCategoryStart());
            const data = await editProductCategory(id, dataProductCategory);
            if (data && data.data && data.data.success === 1) {
                dispatch(productCategorySuccess());
                message.success('Thành công');
            } else {
                dispatch(productCategoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productCategoryFaided());
            showNotification(error);
        }
    }
}
export const productCategoryStart = () => ({
    type: actionTypes.PRODUCT_CATEGORY_START,
})
export const productCategorySuccess = () => ({
    type: actionTypes.PRODUCT_CATEGORY_SUCCESS,
})
export const productCategoryFaided = () => ({
    type: actionTypes.PRODUCT_CATEGORY_FAIDED,
})

export const getListProductCategorySuccess = (data) => ({
    type: actionTypes.GET_LIST_PRODUCT_CATEGORY_SUCCESS,
    data
})
export const getProductCategorySuccess = (data) => ({
    type: actionTypes.GET_PRODUCT_CATEGORY_SUCCESS,
    data
})
export const onChangeProductCategoryRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_PRODUCT_CATEGORY,
    value,
    id,
})
export const setDataProductCategoryRedux = (data) => ({
    type: actionTypes.SET_DATA_PRODUCT_CATEGORY,
    data,
})