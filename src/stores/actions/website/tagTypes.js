import actionTypes from './actionTypes';
import { getListTag, getDataTag, createTag, deleteTag, editTag } from '@services/website/tagServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListTagRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tagStart());
            let data = await getListTag(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListTagSuccess(data.data.data));
            } else {
                dispatch(tagFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tagFaided());
            showNotification(error);
        }
    }
}
export const getDataTagRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tagStart());
            let data = await getDataTag(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getTagSuccess(data.data.data));
            } else {
                dispatch(tagFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tagFaided());
            showNotification(error);
        }
    }
}
export const createTagRedux = (dataTag) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tagStart());
            let data = await createTag(dataTag);
            if (data && data.data && data.data.success === 1) {
                dispatch(tagSuccess());
                message.success('Thành công');
            } else {
                dispatch(tagFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tagFaided());
            showNotification(error);
        }
    }
}
export const deleteListTagRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(tagStart());
        for (const id of list_id) {
            try {
                let data = await deleteTag(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(tagFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(tagSuccess());
    }
}
export const editListTagRedux = (list_id, dataTag) => {
    return async (dispatch, getState) => {
        dispatch(tagStart());
        for (const id of list_id) {
            try {
                let data = await editTag(id, dataTag);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(tagFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(tagSuccess());
    }
}
export const editTagRedux = (id, dataTag) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tagStart());
            let data = await editTag(id, dataTag);
            if (data && data.data && data.data.success === 1) {
                dispatch(tagSuccess());
                message.success('Thành công');
            } else {
                dispatch(tagFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tagFaided());
            showNotification(error);
        }
    }
}
export const tagStart = () => ({
    type: actionTypes.TAG_START,
})
export const tagSuccess = () => ({
    type: actionTypes.TAG_SUCCESS,
})
export const tagFaided = () => ({
    type: actionTypes.TAG_FAIDED,
})

export const getListTagSuccess = (data) => ({
    type: actionTypes.GET_LIST_TAG_SUCCESS,
    data
})
export const getTagSuccess = (data) => ({
    type: actionTypes.GET_TAG_SUCCESS,
    data
})
export const onChangeTagRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_TAG,
    value,
    id,
})
export const setDataTagRedux = (data) => ({
    type: actionTypes.SET_DATA_TAG,
    data,
})