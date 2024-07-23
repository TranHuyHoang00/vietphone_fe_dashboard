import actionTypes from './actionTypes';
import { getListCategory, getDataCategory, createCategory, deleteCategory, editCategory } from '@services/website/categoryServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListCategoryRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { category } = getState();
            if (category?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(categoryStart());
            const data = await getListCategory(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListCategorySuccess(data.data.data, dataFilter?.limit));
            } else {
                dispatch(categoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(categoryFaided());
            showNotification(error);
        }
    }
}
export const getDataCategoryRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { category } = getState();
            const { dataCategory } = category || {};
            if (dataCategory?.id === id) {
                return;
            }
            dispatch(categoryStart());
            const data = await getDataCategory(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getCategorySuccess(data.data.data));
            } else {
                dispatch(categoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(categoryFaided());
            showNotification(error);
        }
    }
}
export const createCategoryRedux = (dataCategory) => {
    return async (dispatch, getState) => {
        try {
            dispatch(categoryStart());
            const data = await createCategory(dataCategory);
            if (data && data.data && data.data.success === 1) {
                dispatch(categorySuccess());
                message.success('Thành công');
            } else {
                dispatch(categoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(categoryFaided());
            showNotification(error);
        }
    }
}
export const deleteListCategoryRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(categoryStart());
        for (const id of list_id) {
            try {
                const data = await deleteCategory(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(categoryFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(categorySuccess());
    }
}
export const editListCategoryRedux = (list_id, dataCategory) => {
    return async (dispatch, getState) => {
        dispatch(categoryStart());
        for (const id of list_id) {
            try {
                const data = await editCategory(id, dataCategory);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(categoryFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(categorySuccess());
    }
}
export const editCategoryRedux = (id, dataCategory) => {
    return async (dispatch, getState) => {
        try {
            dispatch(categoryStart());
            const data = await editCategory(id, dataCategory);
            if (data && data.data && data.data.success === 1) {
                dispatch(categorySuccess());
                message.success('Thành công');
            } else {
                dispatch(categoryFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(categoryFaided());
            showNotification(error);
        }
    }
}
export const categoryStart = () => ({
    type: actionTypes.CATEGORY_START,
})
export const categorySuccess = () => ({
    type: actionTypes.CATEGORY_SUCCESS,
})
export const categoryFaided = () => ({
    type: actionTypes.CATEGORY_FAIDED,
})

export const getListCategorySuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_CATEGORY_SUCCESS,
    data,
    isRepeat,
})
export const getCategorySuccess = (data) => ({
    type: actionTypes.GET_CATEGORY_SUCCESS,
    data
})
export const onChangeCategoryRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_CATEGORY,
    value,
    id,
})
export const setDataCategoryRedux = (data) => ({
    type: actionTypes.SET_DATA_CATEGORY,
    data,
})