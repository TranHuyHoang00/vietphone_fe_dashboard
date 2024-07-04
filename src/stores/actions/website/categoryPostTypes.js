import actionTypes from './actionTypes';
import { getListCategoryPost, getDataCategoryPost, createCategoryPost, deleteCategoryPost, editCategoryPost } from '@services/website/categoryPostServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListCategoryPostRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(categoryPostStart());
            let data = await getListCategoryPost(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListCategoryPostSuccess(data.data.data));
            } else {
                dispatch(categoryPostFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(categoryPostFaided());
            showNotification(error);
        }
    }
}
export const getDataCategoryPostRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(categoryPostStart());
            let data = await getDataCategoryPost(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getCategoryPostSuccess(data.data.data));
            } else {
                dispatch(categoryPostFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(categoryPostFaided());
            showNotification(error);
        }
    }
}
export const createCategoryPostRedux = (dataCategoryPost) => {
    return async (dispatch, getState) => {
        try {
            dispatch(categoryPostStart());
            let data = await createCategoryPost(dataCategoryPost);
            if (data && data.data && data.data.success === 1) {
                dispatch(categoryPostSuccess());
                message.success('Thành công');
            } else {
                dispatch(categoryPostFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(categoryPostFaided());
            showNotification(error);
        }
    }
}
export const deleteListCategoryPostRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(categoryPostStart());
        for (const id of list_id) {
            try {
                let data = await deleteCategoryPost(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(categoryPostFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(categoryPostSuccess());
    }
}
export const editListCategoryPostRedux = (list_id, dataCategoryPost) => {
    return async (dispatch, getState) => {
        dispatch(categoryPostStart());
        for (const id of list_id) {
            try {
                let data = await editCategoryPost(id, dataCategoryPost);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(categoryPostFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(categoryPostSuccess());
    }
}
export const editCategoryPostRedux = (id, dataCategoryPost) => {
    return async (dispatch, getState) => {
        try {
            dispatch(categoryPostStart());
            let data = await editCategoryPost(id, dataCategoryPost);
            if (data && data.data && data.data.success === 1) {
                dispatch(categoryPostSuccess());
                message.success('Thành công');
            } else {
                dispatch(categoryPostFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(categoryPostFaided());
            showNotification(error);
        }
    }
}
export const categoryPostStart = () => ({
    type: actionTypes.CATEGORY_POST_START,
})
export const categoryPostSuccess = () => ({
    type: actionTypes.CATEGORY_POST_SUCCESS,
})
export const categoryPostFaided = () => ({
    type: actionTypes.CATEGORY_POST_FAIDED,
})

export const getListCategoryPostSuccess = (data) => ({
    type: actionTypes.GET_LIST_CATEGORY_POST_SUCCESS,
    data
})
export const getCategoryPostSuccess = (data) => ({
    type: actionTypes.GET_CATEGORY_POST_SUCCESS,
    data
})
export const onChangeCategoryPostRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_CATEGORY_POST,
    value,
    id,
})
export const setDataCategoryPostRedux = (data) => ({
    type: actionTypes.SET_DATA_CATEGORY_POST,
    data,
})