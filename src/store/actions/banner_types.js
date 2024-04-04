import action_types from './action_types';
import { get_list_banner, get_banner, create_banner, delete_banner, edit_banner } from '../../services/banner_service';
import { message } from 'antd';

export const get_list_banner_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(banner_start());
            let data = await get_list_banner(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_banner_success(data.data.data));
            } else {
                dispatch(banner_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(banner_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const get_banner_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(banner_start());
            let data = await get_banner(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_banner_success(data.data.data));
            } else {
                dispatch(banner_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(banner_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const create_banner_redux = (data_banner) => {
    return async (dispatch, getState) => {
        try {
            dispatch(banner_start());
            let data = await create_banner(data_banner);
            if (data && data.data && data.data.success === 1) {
                dispatch(banner_success());
                message.success('Thành công');
            } else {
                dispatch(banner_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(banner_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const delete_list_banner_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(banner_start());
        for (const id of list_id) {
            try {
                let data = await delete_banner(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(banner_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(banner_success());
    }
}
export const edit_list_banner_redux = (list_id, data_banner) => {
    return async (dispatch, getState) => {
        dispatch(banner_start());
        for (const id of list_id) {
            try {
                let data = await edit_banner(id, data_banner);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(banner_faided());
                message.error('Lỗi hệ thống');
            }
        }
        message.success('Thành công');
        dispatch(banner_success());
    }
}
export const edit_banner_redux = (id, data_banner) => {
    return async (dispatch, getState) => {
        try {
            dispatch(banner_start());
            let data = await edit_banner(id, data_banner);
            if (data && data.data && data.data.success === 1) {
                dispatch(banner_success());
                message.success('Thành công');
            } else {
                dispatch(banner_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(banner_faided());
            message.error('Lỗi hệ thống');
        }
    }
}
export const banner_start = () => ({
    type: action_types.BANNER_START,
})
export const banner_success = () => ({
    type: action_types.BANNER_SUCCESS,
})
export const banner_faided = () => ({
    type: action_types.BANNER_FAIDED,
})

export const get_list_banner_success = (data) => ({
    type: action_types.GET_LIST_BANNER_SUCCESS,
    data
})
export const get_banner_success = (data) => ({
    type: action_types.GET_BANNER_SUCCESS,
    data
})
export const on_change_banner_redux = (value, id) => ({
    type: action_types.ON_CHANGE_BANNER,
    value,
    id,
})
export const set_data_banner_redux = (data) => ({
    type: action_types.SET_DATA_BANNER,
    data,
})