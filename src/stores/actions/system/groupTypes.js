import actionTypes from './actionTypes';
import { getListGroup, getDataGroup, createGroup, deleteGroup, editGroup } from '@services/system/groupServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListGroupRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { group } = getState();
            if (group?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(groupStart());
            const data = await getListGroup(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListGroupSuccess(data.data.data, dataFilter?.limit));
            } else {
                dispatch(groupFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(groupFaided());
            showNotification(error);
        }
    }
}
export const getDataGroupRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { group } = getState();
            const { dataGroup } = group || {};

            if (dataGroup?.id === id) {
                return;
            }
            dispatch(groupStart());
            const data = await getDataGroup(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getGroupSuccess(data.data.data));
            } else {
                dispatch(groupFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(groupFaided());
            showNotification(error);
        }
    }
}
export const createGroupRedux = (dataGroup) => {
    return async (dispatch, getState) => {
        try {
            dispatch(groupStart());
            const data = await createGroup(dataGroup);
            if (data && data.data && data.data.success === 1) {
                dispatch(groupSuccess());
                message.success('Thành công');
            } else {
                dispatch(groupFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(groupFaided());
            showNotification(error);
        }
    }
}
export const deleteListGroupRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(groupStart());
        for (const id of list_id) {
            try {
                const data = await deleteGroup(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(groupFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(groupSuccess());
    }
}
export const editListGroupRedux = (list_id, dataGroup) => {
    return async (dispatch, getState) => {
        dispatch(groupStart());
        for (const id of list_id) {
            try {
                const data = await editGroup(id, dataGroup);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(groupFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(groupSuccess());
    }
}
export const editGroupRedux = (id, dataGroup) => {
    return async (dispatch, getState) => {
        try {
            dispatch(groupStart());
            const data = await editGroup(id, dataGroup);
            if (data && data.data && data.data.success === 1) {
                dispatch(groupSuccess());
                message.success('Thành công');
            } else {
                dispatch(groupFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(groupFaided());
            showNotification(error);
        }
    }
}
export const groupStart = () => ({
    type: actionTypes.GROUP_START,
})
export const groupSuccess = () => ({
    type: actionTypes.GROUP_SUCCESS,
})
export const groupFaided = () => ({
    type: actionTypes.GROUP_FAIDED,
})

export const getListGroupSuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_GROUP_SUCCESS,
    data,
    isRepeat,
})
export const getGroupSuccess = (data) => ({
    type: actionTypes.GET_GROUP_SUCCESS,
    data
})
export const onChangeGroupRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_GROUP,
    value,
    id,
})
export const setDataGroupRedux = (data) => ({
    type: actionTypes.SET_DATA_GROUP,
    data,
})