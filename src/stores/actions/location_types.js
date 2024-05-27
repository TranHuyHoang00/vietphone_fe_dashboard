import action_types from '@actions/action_types';
import { getListLocation, getDataLocation, createLocation, deleteLocation, editLocation } from '@services/location_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListLocationRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(locationStart());
            let data = await getListLocation(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListLocationSuccess(data.data.data));
            } else {
                dispatch(locationFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(locationFaided());
            showNotification(error);
        }
    }
}
export const getDataLocationRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(locationStart());
            let data = await getDataLocation(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getLocationSuccess(data.data.data));
            } else {
                dispatch(locationFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(locationFaided());
            showNotification(error);
        }
    }
}
export const createLocationRedux = (dataLocation) => {
    return async (dispatch, getState) => {
        try {
            dispatch(locationStart());
            let data = await createLocation(dataLocation);
            if (data && data.data && data.data.success === 1) {
                dispatch(locationSuccess());
                message.success('Thành công');
            } else {
                dispatch(locationFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(locationFaided());
            showNotification(error);
        }
    }
}
export const deleteListLocationRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(locationStart());
        for (const id of list_id) {
            try {
                let data = await deleteLocation(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(locationFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(locationSuccess());
    }
}
export const editListLocationRedux = (list_id, dataLocation) => {
    return async (dispatch, getState) => {
        dispatch(locationStart());
        for (const id of list_id) {
            try {
                let data = await editLocation(id, dataLocation);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(locationFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(locationSuccess());
    }
}
export const editLocationRedux = (id, dataLocation) => {
    return async (dispatch, getState) => {
        try {
            dispatch(locationStart());
            let data = await editLocation(id, dataLocation);
            if (data && data.data && data.data.success === 1) {
                dispatch(locationSuccess());
                message.success('Thành công');
            } else {
                dispatch(locationFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(locationFaided());
            showNotification(error);
        }
    }
}
export const locationStart = () => ({
    type: action_types.LOCATION_START,
})
export const locationSuccess = () => ({
    type: action_types.LOCATION_SUCCESS,
})
export const locationFaided = () => ({
    type: action_types.LOCATION_FAIDED,
})

export const getListLocationSuccess = (data) => ({
    type: action_types.GET_LIST_LOCATION_SUCCESS,
    data
})
export const getLocationSuccess = (data) => ({
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