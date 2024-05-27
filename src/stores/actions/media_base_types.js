import action_types from '@actions/action_types';
import { getListMediaBase, getDataMediaBase, createMediaBase, deleteMediaBase, editMediaBase } from '@services/media_base_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListMediaBaseRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(mediaBaseStart());
            let data = await getListMediaBase(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListMediaBaseSuccess(data.data.data));
            } else {
                dispatch(mediaBaseFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(mediaBaseFaided());
            showNotification(error);
        }
    }
}
export const getDataMediaBaseRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(mediaBaseStart());
            let data = await getDataMediaBase(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getMediaBaseSuccess(data.data.data));
            } else {
                dispatch(mediaBaseFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(mediaBaseFaided());
            showNotification(error);
        }
    }
}
export const createMediaBaseRedux = (dataMediaBase) => {
    return async (dispatch, getState) => {
        try {
            dispatch(mediaBaseStart());
            let data = await createMediaBase(dataMediaBase);
            if (data && data.data && data.data.success === 1) {
                dispatch(mediaBaseSuccess());
                message.success('Thành công');
            } else {
                dispatch(mediaBaseFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(mediaBaseFaided());
            showNotification(error);
        }
    }
}
export const deleteListMediaBaseRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(mediaBaseStart());
        for (const id of list_id) {
            try {
                let data = await deleteMediaBase(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(mediaBaseFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(mediaBaseSuccess());
    }
}
export const editListMediaBaseRedux = (list_id, dataMediaBase) => {
    return async (dispatch, getState) => {
        dispatch(mediaBaseStart());
        for (const id of list_id) {
            try {
                let data = await editMediaBase(id, dataMediaBase);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(mediaBaseFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(mediaBaseSuccess());
    }
}
export const editMediaBaseRedux = (id, dataMediaBase) => {
    return async (dispatch, getState) => {
        try {
            dispatch(mediaBaseStart());
            let data = await editMediaBase(id, dataMediaBase);
            if (data && data.data && data.data.success === 1) {
                dispatch(mediaBaseSuccess());
                message.success('Thành công');
            } else {
                dispatch(mediaBaseFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(mediaBaseFaided());
            showNotification(error);
        }
    }
}
export const mediaBaseStart = () => ({
    type: action_types.MEIDA_BASE_START,
})
export const mediaBaseSuccess = () => ({
    type: action_types.MEIDA_BASE_SUCCESS,
})
export const mediaBaseFaided = () => ({
    type: action_types.MEIDA_BASE_FAIDED,
})

export const getListMediaBaseSuccess = (data) => ({
    type: action_types.GET_LIST_MEIDA_BASE_SUCCESS,
    data
})
export const getMediaBaseSuccess = (data) => ({
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