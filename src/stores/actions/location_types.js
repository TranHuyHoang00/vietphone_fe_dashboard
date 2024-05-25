import action_types from '@actions/action_types';
import { getListLocation, getDataLocation, createLocation, deleteLocation, editLocation } from '@services/location_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListLocationRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(location_start());
            let data = await getListLocation(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_location_success(data.data.data));
            } else {
                dispatch(location_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(location_faided());
            showNotification(error);
        }
    }
}
export const getDataLocationRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(location_start());
            let data = await getDataLocation(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_location_success(data.data.data));
            } else {
                dispatch(location_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(location_faided());
            showNotification(error);
        }
    }
}
export const createLocationRedux = (dataLocation) => {
    return async (dispatch, getState) => {
        try {
            dispatch(location_start());
            let data = await createLocation(dataLocation);
            if (data && data.data && data.data.success === 1) {
                dispatch(location_success());
                message.success('Thành công');
            } else {
                dispatch(location_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(location_faided());
            showNotification(error);
        }
    }
}
export const deleteListLocationRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(location_start());
        for (const id of list_id) {
            try {
                let data = await deleteLocation(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(location_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(location_success());
    }
}
export const editListLocationRedux = (list_id, dataLocation) => {
    return async (dispatch, getState) => {
        dispatch(location_start());
        for (const id of list_id) {
            try {
                let data = await editLocation(id, dataLocation);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(location_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(location_success());
    }
}
export const editLocationRedux = (id, dataLocation) => {
    return async (dispatch, getState) => {
        try {
            dispatch(location_start());
            let data = await editLocation(id, dataLocation);
            if (data && data.data && data.data.success === 1) {
                dispatch(location_success());
                message.success('Thành công');
            } else {
                dispatch(location_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(location_faided());
            showNotification(error);
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
export const onChangeLocationRedux = (value, id) => ({
    type: action_types.ON_CHANGE_LOCATION,
    value,
    id,
})
export const setDataLocationRedux = (data) => ({
    type: action_types.SET_DATA_LOCATION,
    data,
})