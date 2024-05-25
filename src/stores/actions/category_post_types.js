import action_types from '@actions/action_types';
import { getListCategoryPost, getDataCategoryPost, createCategoryPost, deleteCategoryPost, editCategoryPost } from '@services/category_post_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListCategoryPostRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_post_start());
            let data = await getListCategoryPost(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_category_post_success(data.data.data));
            } else {
                dispatch(category_post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_post_faided());
            showNotification(error);
        }
    }
}
export const getDataCategoryPostRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_post_start());
            let data = await getDataCategoryPost(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_category_post_success(data.data.data));
            } else {
                dispatch(category_post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_post_faided());
            showNotification(error);
        }
    }
}
export const createCategoryPostRedux = (dataCategoryPost) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_post_start());
            let data = await createCategoryPost(dataCategoryPost);
            if (data && data.data && data.data.success === 1) {
                dispatch(category_post_success());
                message.success('Thành công');
            } else {
                dispatch(category_post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_post_faided());
            showNotification(error);
        }
    }
}
export const deleteListCategoryPostRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(category_post_start());
        for (const id of list_id) {
            try {
                let data = await deleteCategoryPost(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(category_post_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(category_post_success());
    }
}
export const editListCategoryPostRedux = (list_id, dataCategoryPost) => {
    return async (dispatch, getState) => {
        dispatch(category_post_start());
        for (const id of list_id) {
            try {
                let data = await editCategoryPost(id, dataCategoryPost);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(category_post_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(category_post_success());
    }
}
export const editCategoryPostRedux = (id, dataCategoryPost) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_post_start());
            let data = await editCategoryPost(id, dataCategoryPost);
            if (data && data.data && data.data.success === 1) {
                dispatch(category_post_success());
                message.success('Thành công');
            } else {
                dispatch(category_post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_post_faided());
            showNotification(error);
        }
    }
}
export const category_post_start = () => ({
    type: action_types.CATEGORY_POST_START,
})
export const category_post_success = () => ({
    type: action_types.CATEGORY_POST_SUCCESS,
})
export const category_post_faided = () => ({
    type: action_types.CATEGORY_POST_FAIDED,
})

export const get_list_category_post_success = (data) => ({
    type: action_types.GET_LIST_CATEGORY_POST_SUCCESS,
    data
})
export const get_category_post_success = (data) => ({
    type: action_types.GET_CATEGORY_POST_SUCCESS,
    data
})
export const onChangeCategoryPostRedux = (value, id) => ({
    type: action_types.ON_CHANGE_CATEGORY_POST,
    value,
    id,
})
export const setDataCategoryPostRedux = (data) => ({
    type: action_types.SET_DATA_CATEGORY_POST,
    data,
})