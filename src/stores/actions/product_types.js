import action_types from '@actions/action_types';
import { getListProduct, getDataProduct, createProduct, deleteProduct, editProduct } from '@services/product_service';
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
    type: action_types.PRODUCT_START,
})
export const productSuccess = () => ({
    type: action_types.PRODUCT_SUCCESS,
})
export const productFaided = () => ({
    type: action_types.PRODUCT_FAIDED,
})

export const getListProductSuccess = (data) => ({
    type: action_types.GET_LIST_PRODUCT_SUCCESS,
    data
})
export const getProductSuccess = (data) => ({
    type: action_types.GET_PRODUCT_SUCCESS,
    data
})
export const onChangeProductRedux = (value, id) => ({
    type: action_types.ON_CHANGE_PRODUCT,
    value,
    id,
})
export const setDataProductRedux = (data) => ({
    type: action_types.SET_DATA_PRODUCT,
    data,
})

export const clickEditProductRedux = (data) => ({
    type: action_types.CLICK_EDIT_PRODUCT,
    data: data
})
export const setDataFilterProductRedux = (data) => ({
    type: action_types.SET_DATA_FILTER_PRODUCT,
    data,
})
export const setDataFilterProductRepairRedux = (data) => ({
    type: action_types.SET_DATA_FILTER_PRODUCT_REPAIR,
    data,
})