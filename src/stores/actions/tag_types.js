import action_types from '@actions/action_types';
import { getListTag, getDataTag, createTag, deleteTag, editTag } from '@services/tag_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListTagRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tag_start());
            let data = await getListTag(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_tag_success(data.data.data));
            } else {
                dispatch(tag_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tag_faided());
            showNotification(error);
        }
    }
}
export const getDataTagRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tag_start());
            let data = await getDataTag(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_tag_success(data.data.data));
            } else {
                dispatch(tag_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tag_faided());
            showNotification(error);
        }
    }
}
export const createTagRedux = (dataTag) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tag_start());
            let data = await createTag(dataTag);
            if (data && data.data && data.data.success === 1) {
                dispatch(tag_success());
                message.success('Thành công');
            } else {
                dispatch(tag_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tag_faided());
            showNotification(error);
        }
    }
}
export const deleteListTagRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(tag_start());
        for (const id of list_id) {
            try {
                let data = await deleteTag(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(tag_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(tag_success());
    }
}
export const editListTagRedux = (list_id, dataTag) => {
    return async (dispatch, getState) => {
        dispatch(tag_start());
        for (const id of list_id) {
            try {
                let data = await editTag(id, dataTag);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(tag_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(tag_success());
    }
}
export const editTagRedux = (id, dataTag) => {
    return async (dispatch, getState) => {
        try {
            dispatch(tag_start());
            let data = await editTag(id, dataTag);
            if (data && data.data && data.data.success === 1) {
                dispatch(tag_success());
                message.success('Thành công');
            } else {
                dispatch(tag_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(tag_faided());
            showNotification(error);
        }
    }
}
export const tag_start = () => ({
    type: action_types.TAG_START,
})
export const tag_success = () => ({
    type: action_types.TAG_SUCCESS,
})
export const tag_faided = () => ({
    type: action_types.TAG_FAIDED,
})

export const get_list_tag_success = (data) => ({
    type: action_types.GET_LIST_TAG_SUCCESS,
    data
})
export const get_tag_success = (data) => ({
    type: action_types.GET_TAG_SUCCESS,
    data
})
export const onChangeTagRedux = (value, id) => ({
    type: action_types.ON_CHANGE_TAG,
    value,
    id,
})
export const setDataTagRedux = (data) => ({
    type: action_types.SET_DATA_TAG,
    data,
})