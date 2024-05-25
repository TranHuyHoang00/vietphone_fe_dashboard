import action_types from '@actions/action_types';
import { getListCategory, getDataCategory, createCategory, deleteCategory, editCategory } from '@services/category_service';
import { message } from 'antd';
import { show_notification } from '@utils/show_notification';

export const getListCategoryRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_start());
            let data = await getListCategory(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_category_success(data.data.data));
            } else {
                dispatch(category_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_faided());
            show_notification(error);
        }
    }
}
export const getDataCategoryRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_start());
            let data = await getDataCategory(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_category_success(data.data.data));
            } else {
                dispatch(category_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_faided());
            show_notification(error);
        }
    }
}
export const createCategoryRedux = (dataCategory) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_start());
            let data = await createCategory(dataCategory);
            if (data && data.data && data.data.success === 1) {
                dispatch(category_success());
                message.success('Thành công');
            } else {
                dispatch(category_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_faided());
            show_notification(error);
        }
    }
}
export const deleteListCategoryRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(category_start());
        for (const id of list_id) {
            try {
                let data = await deleteCategory(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(category_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(category_success());
    }
}
export const editListCategoryRedux = (list_id, dataCategory) => {
    return async (dispatch, getState) => {
        dispatch(category_start());
        for (const id of list_id) {
            try {
                let data = await editCategory(id, dataCategory);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(category_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(category_success());
    }
}
export const editCategoryRedux = (id, dataCategory) => {
    return async (dispatch, getState) => {
        try {
            dispatch(category_start());
            let data = await editCategory(id, dataCategory);
            if (data && data.data && data.data.success === 1) {
                dispatch(category_success());
                message.success('Thành công');
            } else {
                dispatch(category_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(category_faided());
            show_notification(error);
        }
    }
}
export const category_start = () => ({
    type: action_types.CATEGORY_START,
})
export const category_success = () => ({
    type: action_types.CATEGORY_SUCCESS,
})
export const category_faided = () => ({
    type: action_types.CATEGORY_FAIDED,
})

export const get_list_category_success = (data) => ({
    type: action_types.GET_LIST_CATEGORY_SUCCESS,
    data
})
export const get_category_success = (data) => ({
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