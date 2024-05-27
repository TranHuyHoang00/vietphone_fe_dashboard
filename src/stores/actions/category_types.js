import action_types from '@actions/action_types';
import { getListCategory, getDataCategory, createCategory, deleteCategory, editCategory } from '@services/category_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListCategoryRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(categoryStart());
            let data = await getListCategory(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListCategorySuccess(data.data.data));
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
            dispatch(categoryStart());
            let data = await getDataCategory(id);
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
            let data = await createCategory(dataCategory);
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
                let data = await deleteCategory(id);
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
                let data = await editCategory(id, dataCategory);
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
            let data = await editCategory(id, dataCategory);
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
    type: action_types.CATEGORY_START,
})
export const categorySuccess = () => ({
    type: action_types.CATEGORY_SUCCESS,
})
export const categoryFaided = () => ({
    type: action_types.CATEGORY_FAIDED,
})

export const getListCategorySuccess = (data) => ({
    type: action_types.GET_LIST_CATEGORY_SUCCESS,
    data
})
export const getCategorySuccess = (data) => ({
    type: action_types.GET_CATEGORY_SUCCESS,
    data
})
export const onChangeCategoryRedux = (value, id) => ({
    type: action_types.ON_CHANGE_CATEGORY,
    value,
    id,
})
export const setDataCategoryRedux = (data) => ({
    type: action_types.SET_DATA_CATEGORY,
    data,
})