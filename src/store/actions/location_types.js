import action_types from './action_types';
import { get_list_location, get_location, create_location, delete_location, edit_location } from '../../services/location_service';
import { message } from 'antd';
import { show_notification } from '../../utils/show_notification';

export const get_list_location_redux = (data_filter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(location_start());
            let data = await get_list_location(data_filter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_location_success(data.data.data));
            } else {
                dispatch(location_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(location_faided());
            show_notification(error);
        }
    }
}
export const get_location_redux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(location_start());
            let data = await get_location(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_location_success(data.data.data));
            } else {
                dispatch(location_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(location_faided());
            show_notification(error);
        }
    }
}
export const create_location_redux = (data_location) => {
    return async (dispatch, getState) => {
        try {
            dispatch(location_start());
            let data = await create_location(data_location);
            if (data && data.data && data.data.success === 1) {
                dispatch(location_success());
                message.success('Thành công');
            } else {
                dispatch(location_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(location_faided());
            show_notification(error);
        }
    }
}
export const delete_list_location_redux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(location_start());
        for (const id of list_id) {
            try {
                let data = await delete_location(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(location_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(location_success());
    }
}
export const edit_list_location_redux = (list_id, data_location) => {
    return async (dispatch, getState) => {
        dispatch(location_start());
        for (const id of list_id) {
            try {
                let data = await edit_location(id, data_location);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(location_faided());
                show_notification(error);
            }
        }
        message.success('Thành công');
        dispatch(location_success());
    }
}
export const edit_location_redux = (id, data_location) => {
    return async (dispatch, getState) => {
        try {
            dispatch(location_start());
            let data = await edit_location(id, data_location);
            if (data && data.data && data.data.success === 1) {
                dispatch(location_success());
                message.success('Thành công');
            } else {
                dispatch(location_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(location_faided());
            show_notification(error);
        }
    }
}
export const location_start = () => ({
    type: action_types.LOCATION_START,
})
export const location_success = () => ({
    type: action_types.LOCATION_SUCCESS,
})
export const location_faided = () => ({
    type: action_types.LOCATION_FAIDED,
})

export const get_list_location_success = (data) => ({
    type: action_types.GET_LIST_LOCATION_SUCCESS,
    data
})
export const get_location_success = (data) => ({
    type: action_types.GET_LOCATION_SUCCESS,
    data
})
export const on_change_location_redux = (value, id) => ({
    type: action_types.ON_CHANGE_LOCATION,
    value,
    id,
})
export const set_data_location_redux = (data) => ({
    type: action_types.SET_DATA_LOCATION,
    data,
})