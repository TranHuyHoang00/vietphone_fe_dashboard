import action_types from '@actions/action_types';
import { getListGroup, getDataGroup, createGroup, deleteGroup, editGroup } from '@services/group_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListGroupRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(groupStart());
            let data = await getListGroup(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListGroupSuccess(data.data.data));
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
            dispatch(groupStart());
            let data = await getDataGroup(id);
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
            let data = await createGroup(dataGroup);
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
                let data = await deleteGroup(id);
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
                let data = await editGroup(id, dataGroup);
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
            let data = await editGroup(id, dataGroup);
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
    type: action_types.GROUP_START,
})
export const groupSuccess = () => ({
    type: action_types.GROUP_SUCCESS,
})
export const groupFaided = () => ({
    type: action_types.GROUP_FAIDED,
})

export const getListGroupSuccess = (data) => ({
    type: action_types.GET_LIST_GROUP_SUCCESS,
    data
})
export const getGroupSuccess = (data) => ({
    type: action_types.GET_GROUP_SUCCESS,
    data
})
export const onChangeGroupRedux = (value, id) => ({
    type: action_types.ON_CHANGE_GROUP,
    value,
    id,
})
export const setDataGroupRedux = (data) => ({
    type: action_types.SET_DATA_GROUP,
    data,
})