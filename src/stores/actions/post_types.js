import action_types from '@actions/action_types';
import { getListPost, getDataPost, createPost, deletePost, editPost } from '@services/post_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListPostRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(post_start());
            let data = await getListPost(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_post_success(data.data.data));
            } else {
                dispatch(post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(post_faided());
            showNotification(error);
        }
    }
}
export const getDataPostRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(post_start());
            let data = await getDataPost(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_post_success(data.data.data));
            } else {
                dispatch(post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(post_faided());
            showNotification(error);
        }
    }
}
export const createPostRedux = (dataPost) => {
    return async (dispatch, getState) => {
        try {
            dispatch(post_start());
            let data = await createPost(dataPost);
            if (data && data.data && data.data.success === 1) {
                dispatch(post_success());
                message.success('Thành công');
            } else {
                dispatch(post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(post_faided());
            showNotification(error);
        }
    }
}
export const deleteListPostRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(post_start());
        for (const id of list_id) {
            try {
                let data = await deletePost(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(post_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(post_success());
    }
}
export const editListPostRedux = (list_id, dataPost) => {
    return async (dispatch, getState) => {
        dispatch(post_start());
        for (const id of list_id) {
            try {
                let data = await editPost(id, dataPost);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(post_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(post_success());
    }
}
export const editPostRedux = (id, dataPost) => {
    return async (dispatch, getState) => {
        try {
            dispatch(post_start());
            let data = await editPost(id, dataPost);
            if (data && data.data && data.data.success === 1) {
                dispatch(post_success());
                message.success('Thành công');
            } else {
                dispatch(post_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(post_faided());
            showNotification(error);
        }
    }
}
export const post_start = () => ({
    type: action_types.POST_START,
})
export const post_success = () => ({
    type: action_types.POST_SUCCESS,
})
export const post_faided = () => ({
    type: action_types.POST_FAIDED,
})

export const get_list_post_success = (data) => ({
    type: action_types.GET_LIST_POST_SUCCESS,
    data
})
export const get_post_success = (data) => ({
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