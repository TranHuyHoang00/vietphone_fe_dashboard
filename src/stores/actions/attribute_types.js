import action_types from '@actions/action_types';
import { getListAttribute, getDataAttribute, createAttribute, deleteAttribute, editAttribute } from '@services/attribute_service';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';

export const getListAttributeRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attributeStart());
            const data = await getListAttribute(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListAttributeSuccess(data.data.data));
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
    type: action_types.ATTRIBUTE_START,
})
export const attributeSuccess = () => ({
    type: action_types.ATTRIBUTE_SUCCESS,
})
export const attributeFaided = () => ({
    type: action_types.ATTRIBUTE_FAIDED,
})

export const getListAttributeSuccess = (data) => ({
    type: action_types.GET_LIST_ATTRIBUTE_SUCCESS,
    data
})
export const getAttributeSuccess = (data) => ({
    type: action_types.GET_ATTRIBUTE_SUCCESS,
    data
})
export const onChangeAttributeRedux = (value, id) => ({
    type: action_types.ON_CHANGE_ATTRIBUTE,
    value,
    id,
})
export const setDataAttributeRedux = (data) => ({
    type: action_types.SET_DATA_ATTRIBUTE,
    data,
})