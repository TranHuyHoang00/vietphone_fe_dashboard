import action_types from '@actions/action_types';
import { getListPost, getDataPost, createPost, deletePost, editPost } from '@services/post_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListPostRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(postStart());
            let data = await getListPost(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListPostSuccess(data.data.data));
            } else {
                dispatch(postFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(postFaided());
            showNotification(error);
        }
    }
}
export const getDataPostRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(postStart());
            let data = await getDataPost(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getPostSuccess(data.data.data));
            } else {
                dispatch(postFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(postFaided());
            showNotification(error);
        }
    }
}
export const createPostRedux = (dataPost) => {
    return async (dispatch, getState) => {
        try {
            dispatch(postStart());
            let data = await createPost(dataPost);
            if (data && data.data && data.data.success === 1) {
                dispatch(postSuccess());
                message.success('Thành công');
            } else {
                dispatch(postFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(postFaided());
            showNotification(error);
        }
    }
}
export const deleteListPostRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(postStart());
        for (const id of list_id) {
            try {
                let data = await deletePost(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(postFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(postSuccess());
    }
}
export const editListPostRedux = (list_id, dataPost) => {
    return async (dispatch, getState) => {
        dispatch(postStart());
        for (const id of list_id) {
            try {
                let data = await editPost(id, dataPost);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(postFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(postSuccess());
    }
}
export const editPostRedux = (id, dataPost) => {
    return async (dispatch, getState) => {
        try {
            dispatch(postStart());
            let data = await editPost(id, dataPost);
            if (data && data.data && data.data.success === 1) {
                dispatch(postSuccess());
                message.success('Thành công');
            } else {
                dispatch(postFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(postFaided());
            showNotification(error);
        }
    }
}
export const postStart = () => ({
    type: action_types.POST_START,
})
export const postSuccess = () => ({
    type: action_types.POST_SUCCESS,
})
export const postFaided = () => ({
    type: action_types.POST_FAIDED,
})

export const getListPostSuccess = (data) => ({
    type: action_types.GET_LIST_POST_SUCCESS,
    data
})
export const getPostSuccess = (data) => ({
    type: action_types.GET_POST_SUCCESS,
    data
})
export const onChangePostRedux = (value, id) => ({
    type: action_types.ON_CHANGE_POST,
    value,
    id,
})
export const setDataPostRedux = (data) => ({
    type: action_types.SET_DATA_POST,
    data,
})