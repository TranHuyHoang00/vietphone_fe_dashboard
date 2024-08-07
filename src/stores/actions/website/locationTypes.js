import actionTypes from './actionTypes';
import { getListLocation, getDataLocation, createLocation, deleteLocation, editLocation } from '@services/website/locationServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListLocationRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { location } = getState();
            if (location?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(locationStart());
            const data = await getListLocation(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListLocationSuccess(data.data.data, dataFilter?.limit));
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
            const { location } = getState();
            const { dataLocation } = location || {};
            if (dataLocation?.id === id) {
                return;
            }
            dispatch(locationStart());
            const data = await getDataLocation(id);
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
            const data = await createLocation(dataLocation);
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
                const data = await deleteLocation(id);
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
                const data = await editLocation(id, dataLocation);
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
            const data = await editLocation(id, dataLocation);
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
    type: actionTypes.LOCATION_START,
})
export const locationSuccess = () => ({
    type: actionTypes.LOCATION_SUCCESS,
})
export const locationFaided = () => ({
    type: actionTypes.LOCATION_FAIDED,
})

export const getListLocationSuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_LOCATION_SUCCESS,
    data,
    isRepeat
})
export const getLocationSuccess = (data) => ({
    type: actionTypes.GET_LOCATION_SUCCESS,
    data
})
export const onChangeLocationRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_LOCATION,
    value,
    id,
})
export const setDataLocationRedux = (data) => ({
    type: actionTypes.SET_DATA_LOCATION,
    data,
})