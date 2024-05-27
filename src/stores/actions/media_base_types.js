import action_types from '@actions/action_types';
import { getListMediaBase, getDataMediaBase, createMediaBase, deleteMediaBase, editMediaBase } from '@services/media_base_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListMediaBaseRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(media_base_start());
            let data = await getListMediaBase(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_media_base_success(data.data.data));
            } else {
                dispatch(media_base_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(media_base_faided());
            showNotification(error);
        }
    }
}
export const getDataMediaBaseRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(media_base_start());
            let data = await getDataMediaBase(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_media_base_success(data.data.data));
            } else {
                dispatch(media_base_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(media_base_faided());
            showNotification(error);
        }
    }
}
export const createMediaBaseRedux = (dataMediaBase) => {
    return async (dispatch, getState) => {
        try {
            dispatch(media_base_start());
            let data = await createMediaBase(dataMediaBase);
            if (data && data.data && data.data.success === 1) {
                dispatch(media_base_success());
                message.success('Thành công');
            } else {
                dispatch(media_base_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(media_base_faided());
            showNotification(error);
        }
    }
}
export const deleteListMediaBaseRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(media_base_start());
        for (const id of list_id) {
            try {
                let data = await deleteMediaBase(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(media_base_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(media_base_success());
    }
}
export const editListMediaBaseRedux = (list_id, dataMediaBase) => {
    return async (dispatch, getState) => {
        dispatch(media_base_start());
        for (const id of list_id) {
            try {
                let data = await editMediaBase(id, dataMediaBase);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(media_base_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(media_base_success());
    }
}
export const editMediaBaseRedux = (id, dataMediaBase) => {
    return async (dispatch, getState) => {
        try {
            dispatch(media_base_start());
            let data = await editMediaBase(id, dataMediaBase);
            if (data && data.data && data.data.success === 1) {
                dispatch(media_base_success());
                message.success('Thành công');
            } else {
                dispatch(media_base_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(media_base_faided());
            showNotification(error);
        }
    }
}
export const media_base_start = () => ({
    type: action_types.MEIDA_BASE_START,
})
export const media_base_success = () => ({
    type: action_types.MEIDA_BASE_SUCCESS,
})
export const media_base_faided = () => ({
    type: action_types.MEIDA_BASE_FAIDED,
})

export const get_list_media_base_success = (data) => ({
    type: action_types.GET_LIST_MEIDA_BASE_SUCCESS,
    data
})
export const get_media_base_success = (data) => ({
    type: action_types.GET_MEIDA_BASE_SUCCESS,
    data
})
export const on_change_media_base_redux = (value, id) => ({
    type: action_types.ON_CHANGE_MEIDA_BASE,
    value,
    id,
})
export const set_data_media_base_redux = (data) => ({
    type: action_types.SET_DATA_MEIDA_BASE,
    data,
})