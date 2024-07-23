import actionTypes from './actionTypes';
import { getListAttribute, getDataAttribute, createAttribute, deleteAttribute, editAttribute } from '@services/website/attributeServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListAttributeRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            const { attribute } = getState();
            if (attribute?.isRepeat === process.env.REACT_APP_API_LIMIT && dataFilter?.limit === process.env.REACT_APP_API_LIMIT) {
                return;
            }
            dispatch(attributeStart());
            const data = await getListAttribute(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListAttributeSuccess(data.data.data, dataFilter?.limit));
            } else {
                dispatch(attributeFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeFaided());
            showNotification(error);
        }
    }
}
export const getDataAttributeRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { attribute } = getState();
            const { dataAttribute } = attribute || {};
            if (dataAttribute?.id === id) {
                return;
            }
            dispatch(attributeStart());
            const data = await getDataAttribute(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getAttributeSuccess(data.data.data));
            } else {
                dispatch(attributeFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeFaided());
            showNotification(error);
        }
    }
}
export const createAttributeRedux = (dataAttribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attributeStart());
            const data = await createAttribute(dataAttribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(attributeSuccess());
                message.success('Thành công');
            } else {
                dispatch(attributeFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeFaided());
            showNotification(error);
        }
    }
}
export const deleteListAttributeRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(attributeStart());
        for (const id of list_id) {
            try {
                const data = await deleteAttribute(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(attributeFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(attributeSuccess());
    }
}
export const editListAttributeRedux = (list_id, dataAttribute) => {
    return async (dispatch, getState) => {
        dispatch(attributeStart());
        for (const id of list_id) {
            try {
                const data = await editAttribute(id, dataAttribute);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(attributeFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(attributeSuccess());
    }
}
export const editAttributeRedux = (id, dataAttribute) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attributeStart());
            const data = await editAttribute(id, dataAttribute);
            if (data && data.data && data.data.success === 1) {
                dispatch(attributeSuccess());
                message.success('Thành công');
            } else {
                dispatch(attributeFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeFaided());
            showNotification(error);
        }
    }
}
export const attributeStart = () => ({
    type: actionTypes.ATTRIBUTE_START,
})
export const attributeSuccess = () => ({
    type: actionTypes.ATTRIBUTE_SUCCESS,
})
export const attributeFaided = () => ({
    type: actionTypes.ATTRIBUTE_FAIDED,
})

export const getListAttributeSuccess = (data, isRepeat) => ({
    type: actionTypes.GET_LIST_ATTRIBUTE_SUCCESS,
    data,
    isRepeat
})
export const getAttributeSuccess = (data) => ({
    type: actionTypes.GET_ATTRIBUTE_SUCCESS,
    data
})
export const onChangeAttributeRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_ATTRIBUTE,
    value,
    id,
})
export const setDataAttributeRedux = (data) => ({
    type: actionTypes.SET_DATA_ATTRIBUTE,
    data,
})