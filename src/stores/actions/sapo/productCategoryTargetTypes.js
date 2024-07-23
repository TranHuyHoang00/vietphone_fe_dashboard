import actionTypes from './actionTypes';
import { getListProductCategoryTarget, getDataProductCategoryTarget, createProductCategoryTarget, deleteProductCategoryTarget, editProductCategoryTarget } from '@services/sapo/productCategoryTargetServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListProductCategoryTargetRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { productCategoryTarget } = getState();
            if (productCategoryTarget?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(productCategoryTargetStart());
            const data = await getListProductCategoryTarget(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListProductCategoryTargetSuccess(data.data.data, dataFilter?.limit));
            } else {
                dispatch(productCategoryTargetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productCategoryTargetFaided());
            showNotification(error);
        }
    }
}
export const getDataProductCategoryTargetRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { productCategoryTarget } = getState();
            const { dataProductCategoryTarget } = productCategoryTarget || {};
            if (dataProductCategoryTarget?.id === id) {
                return;
            }
            dispatch(productCategoryTargetStart());
            const data = await getDataProductCategoryTarget(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getProductCategoryTargetSuccess(data.data.data));
            } else {
                dispatch(productCategoryTargetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productCategoryTargetFaided());
            showNotification(error);
        }
    }
}
export const createProductCategoryTargetRedux = (dataProductCategoryTarget) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productCategoryTargetStart());
            const data = await createProductCategoryTarget(dataProductCategoryTarget);
            if (data && data.data && data.data.success === 1) {
                dispatch(productCategoryTargetSuccess());
                message.success('Thành công');
            } else {
                dispatch(productCategoryTargetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productCategoryTargetFaided());
            showNotification(error);
        }
    }
}
export const deleteListProductCategoryTargetRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(productCategoryTargetStart());
        for (const id of list_id) {
            try {
                const data = await deleteProductCategoryTarget(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(productCategoryTargetFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(productCategoryTargetSuccess());
    }
}
export const editListProductCategoryTargetRedux = (list_id, dataProductCategoryTarget) => {
    return async (dispatch, getState) => {
        dispatch(productCategoryTargetStart());
        for (const id of list_id) {
            try {
                const data = await editProductCategoryTarget(id, dataProductCategoryTarget);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(productCategoryTargetFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(productCategoryTargetSuccess());
    }
}
export const editProductCategoryTargetRedux = (id, dataProductCategoryTarget) => {
    return async (dispatch, getState) => {
        try {
            dispatch(productCategoryTargetStart());
            const data = await editProductCategoryTarget(id, dataProductCategoryTarget);
            if (data && data.data && data.data.success === 1) {
                dispatch(productCategoryTargetSuccess());
                message.success('Thành công');
            } else {
                dispatch(productCategoryTargetFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(productCategoryTargetFaided());
            showNotification(error);
        }
    }
}
export const productCategoryTargetStart = () => ({
    type: actionTypes.PRODUCT_CATEGORY_TARGET_START,
})
export const productCategoryTargetSuccess = () => ({
    type: actionTypes.PRODUCT_CATEGORY_TARGET_SUCCESS,
})
export const productCategoryTargetFaided = () => ({
    type: actionTypes.PRODUCT_CATEGORY_TARGET_FAIDED,
})

export const getListProductCategoryTargetSuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_PRODUCT_CATEGORY_TARGET_SUCCESS,
    data,
    isRepeat
})
export const getProductCategoryTargetSuccess = (data) => ({
    type: actionTypes.GET_PRODUCT_CATEGORY_TARGET_SUCCESS,
    data
})
export const onChangeProductCategoryTargetRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_PRODUCT_CATEGORY_TARGET,
    value,
    id,
})
export const setDataProductCategoryTargetRedux = (data) => ({
    type: actionTypes.SET_DATA_PRODUCT_CATEGORY_TARGET,
    data,
})