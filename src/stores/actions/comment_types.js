import action_types from '@actions/action_types';
import { getListComment, getDataComment, createComment, deleteComment, editComment } from '@services/comment_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListCommentRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(commentStart());
            let data = await getListComment(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListCommentSuccess(data.data.data));
            } else {
                dispatch(commentFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(commentFaided());
            showNotification(error);
        }
    }
}
export const getDataCommentRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(commentStart());
            let data = await getDataComment(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getCommentSuccess(data.data.data));
            } else {
                dispatch(commentFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(commentFaided());
            showNotification(error);
        }
    }
}
export const createCommentRedux = (dataComment) => {
    return async (dispatch, getState) => {
        try {
            dispatch(commentStart());
            let data = await createComment(dataComment);
            if (data && data.data && data.data.success === 1) {
                dispatch(commentSuccess());
                message.success('Thành công');
            } else {
                dispatch(commentFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(commentFaided());
            showNotification(error);
        }
    }
}
export const deleteListCommentRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(commentStart());
        for (const id of list_id) {
            try {
                let data = await deleteComment(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(commentFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(commentSuccess());
    }
}
export const editListCommentRedux = (list_id, dataComment) => {
    return async (dispatch, getState) => {
        dispatch(commentStart());
        for (const id of list_id) {
            try {
                let data = await editComment(id, dataComment);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(commentFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(commentSuccess());
    }
}
export const editCommentRedux = (id, dataComment) => {
    return async (dispatch, getState) => {
        try {
            dispatch(commentStart());
            let data = await editComment(id, dataComment);
            if (data && data.data && data.data.success === 1) {
                dispatch(commentSuccess());
                message.success('Thành công');
            } else {
                dispatch(commentFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(commentFaided());
            showNotification(error);
        }
    }
}
export const commentStart = () => ({
    type: action_types.COMMENT_START,
})
export const commentSuccess = () => ({
    type: action_types.COMMENT_SUCCESS,
})
export const commentFaided = () => ({
    type: action_types.COMMENT_FAIDED,
})

export const getListCommentSuccess = (data) => ({
    type: action_types.GET_LIST_COMMENT_SUCCESS,
    data
})
export const getCommentSuccess = (data) => ({
    type: action_types.GET_COMMENT_SUCCESS,
    data
})
export const onChangeCommentRedux = (value, id) => ({
    type: action_types.ON_CHANGE_COMMENT,
    value,
    id,
})
export const setDataCommentRedux = (data) => ({
    type: action_types.SET_DATA_COMMENT,
    data,
})