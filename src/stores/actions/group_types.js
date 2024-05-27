import action_types from '@actions/action_types';
import { getListGroup, getDataGroup, createGroup, deleteGroup, editGroup } from '@services/group_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListGroupRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_start());
            let data = await getListGroup(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_group_success(data.data.data));
            } else {
                dispatch(group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_faided());
            showNotification(error);
        }
    }
}
export const getDataGroupRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_start());
            let data = await getDataGroup(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_group_success(data.data.data));
            } else {
                dispatch(group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_faided());
            showNotification(error);
        }
    }
}
export const createGroupRedux = (dataGroup) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_start());
            let data = await createGroup(dataGroup);
            if (data && data.data && data.data.success === 1) {
                dispatch(group_success());
                message.success('Thành công');
            } else {
                dispatch(group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_faided());
            showNotification(error);
        }
    }
}
export const deleteListGroupRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(group_start());
        for (const id of list_id) {
            try {
                let data = await deleteGroup(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(group_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(group_success());
    }
}
export const editListGroupRedux = (list_id, dataGroup) => {
    return async (dispatch, getState) => {
        dispatch(group_start());
        for (const id of list_id) {
            try {
                let data = await editGroup(id, dataGroup);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(group_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(group_success());
    }
}
export const editGroupRedux = (id, dataGroup) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_start());
            let data = await editGroup(id, dataGroup);
            if (data && data.data && data.data.success === 1) {
                dispatch(group_success());
                message.success('Thành công');
            } else {
                dispatch(group_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_faided());
            showNotification(error);
        }
    }
}
export const group_start = () => ({
    type: action_types.GROUP_START,
})
export const group_success = () => ({
    type: action_types.GROUP_SUCCESS,
})
export const group_faided = () => ({
    type: action_types.GROUP_FAIDED,
})

export const get_list_group_success = (data) => ({
    type: action_types.GET_LIST_GROUP_SUCCESS,
    data
})
export const get_group_success = (data) => ({
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