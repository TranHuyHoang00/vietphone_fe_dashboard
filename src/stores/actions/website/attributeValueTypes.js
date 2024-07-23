import actionTypes from './actionTypes';
import { getListAttributeValue, getAttributeValueDetail, createAttributeValue, deleteAttributeValue, editAttributeValue } from '@services/website/attributeValueServices';
import { message } from 'antd';
import { showNotification } from '@utils/handleFuncNotification';
export const getListAttributeValueRedux = (dataFilter) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attributeValueStart());
            const data = await getListAttributeValue(dataFilter);
            if (data && data.data && data.data.success === 1) {
                dispatch(getListAttributeValueSuccess(data.data.data));
            } else {
                dispatch(attributeValueFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeValueFaided());
            showNotification(error);
        }
    }
}
export const getDataAttributeValueRedux = (id) => {
    return async (dispatch, getState) => {
        try {
            const { attributeValue } = getState();
            const { dataAttributeValue } = attributeValue || {};
            if (dataAttributeValue?.id === id) {
                return;
            }
            dispatch(attributeValueStart());
            const data = await getAttributeValueDetail(id);
            if (data && data.data && data.data.success === 1) {
                dispatch(getAttributeValueSuccess(data.data.data));
            } else {
                dispatch(attributeValueFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeValueFaided());
            showNotification(error);
        }
    }
}
export const createAttributeValueRedux = (dataAttributeValue) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attributeValueStart());
            const data = await createAttributeValue(dataAttributeValue);
            if (data && data.data && data.data.success === 1) {
                dispatch(attributeValueSuccess());
                message.success('Thành công');
            } else {
                dispatch(attributeValueFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeValueFaided());
            showNotification(error);
        }
    }
}
export const deleteListAttributeValueRedux = (list_id) => {
    return async (dispatch, getState) => {
        dispatch(attributeValueStart());
        for (const id of list_id) {
            try {
                const data = await deleteAttributeValue(id);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi xóa ID=${id}`);
                }
            } catch (error) {
                dispatch(attributeValueFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(attributeValueSuccess());
    }
}
export const editListAttributeValueRedux = (list_id, dataAttributeValue) => {
    return async (dispatch, getState) => {
        dispatch(attributeValueStart());
        for (const id of list_id) {
            try {
                const data = await editAttributeValue(id, dataAttributeValue);
                if (data && data.data && data.data.success !== 1) {
                    message.error(`Lỗi sửa ID=${id}`);
                }
            } catch (error) {
                dispatch(attributeValueFaided());
                showNotification(error);
            }
        }
        message.success('Thành công');
        dispatch(attributeValueSuccess());
    }
}
export const editAttributeValueRedux = (id, dataAttributeValue) => {
    return async (dispatch, getState) => {
        try {
            dispatch(attributeValueStart());
            const data = await editAttributeValue(id, dataAttributeValue);
            if (data && data.data && data.data.success === 1) {
                dispatch(attributeValueSuccess());
                message.success('Thành công');
            } else {
                dispatch(attributeValueFaided());
                message.error('Lỗi');
            }
        } catch (error) {
            dispatch(attributeValueFaided());
            showNotification(error);
        }
    }
}
export const attributeValueStart = () => ({
    type: actionTypes.ATTRIBUTE_VALUE_START,
})
export const attributeValueSuccess = () => ({
    type: actionTypes.ATTRIBUTE_VALUE_SUCCESS,
})
export const attributeValueFaided = () => ({
    type: actionTypes.ATTRIBUTE_VALUE_FAIDED,
})

export const getListAttributeValueSuccess = (data) => ({
    type: actionTypes.GET_LIST_ATTRIBUTE_VALUE_SUCCESS,
    data
})
export const getAttributeValueSuccess = (data) => ({
    type: actionTypes.GET_ATTRIBUTE_VALUE_SUCCESS,
    data
})
export const onChangeAttributeValueRedux = (value, id) => ({
    type: actionTypes.ON_CHANGE_ATTRIBUTE_VALUE,
    value,
    id,
})
export const setDataAttributeValueRedux = (data) => ({
    type: actionTypes.SET_DATA_ATTRIBUTE_VALUE,
    data,
})