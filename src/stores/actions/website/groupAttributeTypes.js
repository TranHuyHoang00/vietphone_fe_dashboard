import actionTypes from './actionTypes';
import { getListGroupAttribute, getDataGroupAttribute, createGroupAttribute, deleteGroupAttribute, editGroupAttribute } from '@services/website/groupAttributeServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListGroupAttributeRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { groupAttribute } = getState();
            if (groupAttribute?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(groupAttributeStart());
            const data = await getListGroupAttribute(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListGroupAttributeSuccess(data.data.data, dataFilter?.limit));
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
            const { groupAttribute } = getState();
            const { dataGroupAttribute } = groupAttribute || {};
            if (dataGroupAttribute?.id === id) {
                return;
            }
            dispatch(groupAttributeStart());
            const data = await getDataGroupAttribute(id);
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
            const data = await createGroupAttribute(dataGroupAttribute);
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
                const data = await deleteGroupAttribute(id);
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
                const data = await editGroupAttribute(id, dataGroupAttribute);
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
            const data = await editGroupAttribute(id, dataGroupAttribute);
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
    type: actionTypes.GROUP_ATTRIBUTE_START,
})
export const groupAttributeSuccess = () => ({
    type: actionTypes.GROUP_ATTRIBUTE_SUCCESS,
})
export const groupAttributeFaided = () => ({
    type: actionTypes.GROUP_ATTRIBUTE_FAIDED,
})

export const getListGroupAttributeSuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_GROUP_ATTRIBUTE_SUCCESS,
    data,
    isRepeat
})
export const getGroupAttributeSuccess = (data) => ({
    type: actionTypes.GET_GROUP_ATTRIBUTE_SUCCESS,
    data
})
export const onChangeGroupAttributeRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_GROUP_ATTRIBUTE,
    value,
    id,
})
export const setDataGroupAttributeRedux = (data) => ({
    type: actionTypes.SET_DATA_GROUP_ATTRIBUTE,
    data,
})