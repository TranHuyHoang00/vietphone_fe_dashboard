import actionTypes from './actionTypes';
import { getListTargetProductCategory, getDataTargetProductCategory, createTargetProductCategory, deleteTargetProductCategory, editTargetProductCategory } from '@services/targets/targetProductCategoryServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListTargetProductCategoryRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetProductCategoryStart());
            const data = await getListTargetProductCategory(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListTargetProductCategorySuccess(data.data.data));
            } else {
                dispatch(targetProductCategoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetProductCategoryFaided());
            showNotification(error);
        }
    }
}
export const getDataTargetProductCategoryRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetProductCategoryStart());
            const data = await getDataTargetProductCategory(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getTargetProductCategorySuccess(data.data.data));
            } else {
                dispatch(targetProductCategoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetProductCategoryFaided());
            showNotification(error);
        }
    }
}
export const createTargetProductCategoryRedux = (dataTargetProductCategory) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetProductCategoryStart());
            const data = await createTargetProductCategory(dataTargetProductCategory);
            if (data && data.data && data.data.success === 1) {
                dispatch(targetProductCategorySuccess());
                message.success('Thành công');
            } else {
                dispatch(targetProductCategoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetProductCategoryFaided());
            showNotification(error);
        }
    }
}
export const deleteListTargetProductCategoryRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(targetProductCategoryStart());
        for (const id of list_id) {
            try {
                const data = await deleteTargetProductCategory(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(targetProductCategoryFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(targetProductCategorySuccess());
    }
}
export const editListTargetProductCategoryRedux = (list_id, dataTargetProductCategory) => {
    return async (dispatch, getState) => {
        dispatch(targetProductCategoryStart());
        for (const id of list_id) {
            try {
                const data = await editTargetProductCategory(id, dataTargetProductCategory);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(targetProductCategoryFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(targetProductCategorySuccess());
    }
}
export const editTargetProductCategoryRedux = (id, dataTargetProductCategory) => {
    return async (dispatch, getState) => {
        try {
            dispatch(targetProductCategoryStart());
            const data = await editTargetProductCategory(id, dataTargetProductCategory);
            if (data && data.data && data.data.success === 1) {
                dispatch(targetProductCategorySuccess());
                message.success('Thành công');
            } else {
                dispatch(targetProductCategoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(targetProductCategoryFaided());
            showNotification(error);
        }
    }
}
export const targetProductCategoryStart = () => ({
    type: actionTypes.TARGET_PRODUCT_CATEGORY_START,
})
export const targetProductCategorySuccess = () => ({
    type: actionTypes.TARGET_PRODUCT_CATEGORY_SUCCESS,
})
export const targetProductCategoryFaided = () => ({
    type: actionTypes.TARGET_PRODUCT_CATEGORY_FAIDED,
})

export const getListTargetProductCategorySuccess = (data) => ({
    type: actionTypes.GET_LIST_TARGET_PRODUCT_CATEGORY_SUCCESS,
    data
})
export const getTargetProductCategorySuccess = (data) => ({
    type: actionTypes.GET_TARGET_PRODUCT_CATEGORY_SUCCESS,
    data
})
export const onChangeTargetProductCategoryRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_TARGET_PRODUCT_CATEGORY,
    value,
    id,
})
export const setDataTargetProductCategoryRedux = (data) => ({
    type: actionTypes.SET_DATA_TARGET_PRODUCT_CATEGORY,
    data,
})