import action_types from '@actions/action_types';
import { getListGroupAttribute, getDataGroupAttribute, createGroupAttribute, deleteGroupAttribute, editGroupAttribute } from '@services/group_attribute_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListGroupAttributeRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_attribute_start());
            let data = await getListGroupAttribute(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_list_group_attribute_success(data.data.data));
            } else {
                dispatch(group_attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_attribute_faided());
            showNotification(error);
        }
    }
}
export const getDataGroupAttributeRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_attribute_start());
            let data = await getDataGroupAttribute(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(get_group_attribute_success(data.data.data));
            } else {
                dispatch(group_attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_attribute_faided());
            showNotification(error);
        }
    }
}
export const createGroupAttributeRedux = (dataGroupAttribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_attribute_start());
            let data = await createGroupAttribute(dataGroupAttribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(group_attribute_success());
                message.success('Thành công');
            } else {
                dispatch(group_attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_attribute_faided());
            showNotification(error);
        }
    }
}
export const deleteListGroupAttributeRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(group_attribute_start());
        for (const id of list_id) {
            try {
                let data = await deleteGroupAttribute(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(group_attribute_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(group_attribute_success());
    }
}
export const editListGroupAttributeRedux = (list_id, dataGroupAttribute) => {
    return async (dispatch, getState) => {
        dispatch(group_attribute_start());
        for (const id of list_id) {
            try {
                let data = await editGroupAttribute(id, dataGroupAttribute);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(group_attribute_faided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(group_attribute_success());
    }
}
export const editGroupAttributeRedux = (id, dataGroupAttribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(group_attribute_start());
            let data = await editGroupAttribute(id, dataGroupAttribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(group_attribute_success());
                message.success('Thành công');
            } else {
                dispatch(group_attribute_faided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(group_attribute_faided());
            showNotification(error);
        }
    }
}
export const group_attribute_start = () => ({
    type: action_types.GROUP_ATTRIBUTE_START,
})
export const group_attribute_success = () => ({
    type: action_types.GROUP_ATTRIBUTE_SUCCESS,
})
export const group_attribute_faided = () => ({
    type: action_types.GROUP_ATTRIBUTE_FAIDED,
})

export const get_list_group_attribute_success = (data) => ({
    type: action_types.GET_LIST_GROUP_ATTRIBUTE_SUCCESS,
    data
})
export const get_group_attribute_success = (data) => ({
    type: action_types.GET_GROUP_ATTRIBUTE_SUCCESS,
    data
})
export const onChangeGroupAttributeRedux = (value, id) => ({
    type: action_types.ON_CHANGE_GROUP_ATTRIBUTE,
    value,
    id,
})
export const setDataGroupAttributeRedux = (data) => ({
    type: action_types.SET_DATA_GROUP_ATTRIBUTE,
    data,
})