import action_types from '@actions/action_types';
import { getListGroupAttribute, getDataGroupAttribute, createGroupAttribute, deleteGroupAttribute, editGroupAttribute } from '@services/group_attribute_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListGroupAttributeRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(groupAttributeStart());
            let data = await getListGroupAttribute(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListGroupAttributeSuccess(data.data.data));
            } else {
                dispatch(groupAttributeFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(groupAttributeFaided());
            showNotification(error);
        }
    }
}
export const getDataGroupAttributeRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            dispatch(groupAttributeStart());
            let data = await getDataGroupAttribute(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getGroupAttributeSuccess(data.data.data));
            } else {
                dispatch(groupAttributeFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(groupAttributeFaided());
            showNotification(error);
        }
    }
}
export const createGroupAttributeRedux = (dataGroupAttribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(groupAttributeStart());
            let data = await createGroupAttribute(dataGroupAttribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(groupAttributeSuccess());
                message.success('Thành công');
            } else {
                dispatch(groupAttributeFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(groupAttributeFaided());
            showNotification(error);
        }
    }
}
export const deleteListGroupAttributeRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(groupAttributeStart());
        for (const id of list_id) {
            try {
                let data = await deleteGroupAttribute(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(groupAttributeFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(groupAttributeSuccess());
    }
}
export const editListGroupAttributeRedux = (list_id, dataGroupAttribute) => {
    return async (dispatch, getState) => {
        dispatch(groupAttributeStart());
        for (const id of list_id) {
            try {
                let data = await editGroupAttribute(id, dataGroupAttribute);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(groupAttributeFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(groupAttributeSuccess());
    }
}
export const editGroupAttributeRedux = (id, dataGroupAttribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(groupAttributeStart());
            let data = await editGroupAttribute(id, dataGroupAttribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(groupAttributeSuccess());
                message.success('Thành công');
            } else {
                dispatch(groupAttributeFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(groupAttributeFaided());
            showNotification(error);
        }
    }
}
export const groupAttributeStart = () => ({
    type: action_types.GROUP_ATTRIBUTE_START,
})
export const groupAttributeSuccess = () => ({
    type: action_types.GROUP_ATTRIBUTE_SUCCESS,
})
export const groupAttributeFaided = () => ({
    type: action_types.GROUP_ATTRIBUTE_FAIDED,
})

export const getListGroupAttributeSuccess = (data) => ({
    type: action_types.GET_LIST_GROUP_ATTRIBUTE_SUCCESS,
    data
})
export const getGroupAttributeSuccess = (data) => ({
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